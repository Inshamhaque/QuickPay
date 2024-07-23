import { Transactions } from "../../../components/transactions_page/Transactions"
import db from '@repo/db/client';
async function getTransactions(){
    const trxns  = await db.p2p.findMany({
        select :{
            fromUserId : true,
            amount : true,
            toUserId : true,
            timeStamp : true
        }
    })
    return trxns;
}

export default async function Transaction(){
    const trxns = await getTransactions();
    return(
        <div>
            <Transactions transactions={trxns} />
        </div>
    )
}
