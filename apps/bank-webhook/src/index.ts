import express from 'express';
import db from '@repo/db/client'; // Ensure this path is correct

const app = express();
app.use(express.json());

app.post('/hdfcwebhook', async (req, res) => {
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }
    //ToDO : Add a zod validation 
    //TODO : Check if this on Ramo txn is processing or not else the money can be added infinitely many times. 
    const trxns = await db.onRampTransaction.findUnique({
        where : {
            token : paymentInformation.token
        },
    })
    if(trxns?.status=='Success' || trxns?.status=='Failure'){
        return res.status(411).json({
            msg: "duplicate transaction"
        })
    }
    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success",
                }
            })
        ]);

        const balance = await db.balance.findUnique({
            where: {
                userId: Number(paymentInformation.userId)
            }
        });

        res.json({
            msg: "Captured",
            balance: (balance.amount)/100 // Correctly return the balance amount
        });
    } catch (e) {
        console.log(e);
        await db.onRampTransaction.update({
            where:{
                token: paymentInformation.token
            },
            data:{
                status: "Failure"
            }
        })
        res.status(500).json({
            msg: "Error while processing webhook",
        });
    }
});

app.listen(3003, () => {
    console.log("Webhook Server is running on port 3003");
});
