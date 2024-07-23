"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from '@repo/db/client';

export async function p2ptransfer(phone: string, amount: string) {
    const session = await getServerSession(authOptions);
    const fromuser = session?.user;

    const money_to_transfer = Number(amount) * 100;

    if (!fromuser) {
        return { error: "user not found" };
    }

    const touser = await db.user.findUnique({
        where: {
            number: phone,
        },
    });

    if (!touser) {
        return { error: "to user not found" };
    }

    try {
        const result = await db.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT * from "Balance" where "userId"=${Number(fromuser.id)} FOR UPDATE `;
            const fromBalance = await tx.balance.findUnique({
                where: {
                    userId: Number(fromuser.id),
                },
            });

            if (!fromBalance || fromBalance.amount < money_to_transfer) {
                throw new Error("insufficient funds");
            }

            await tx.balance.update({
                where: {
                    userId: Number(fromuser.id),
                },
                data: {
                    amount: {
                        decrement: money_to_transfer,
                    },
                },
            });

            await tx.balance.update({
                where: {
                    userId: touser.id,
                },
                data: {
                    amount: {
                        increment: money_to_transfer,
                    },
                },
            });

            await tx.p2p.create({
                data:{
                    fromUserId:Number(fromuser.id),
                    toUserId:Number(touser.id),
                    amount:money_to_transfer,
                    timeStamp:new Date()
                }
            })

            return { msg: "Transfer successful" };
        });

        return result;
    } catch (e) {
        console.error("Transaction failed:", e);
        return { error: "Transaction failed" };
    }
}
