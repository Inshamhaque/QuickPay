import { AddMoney } from "../../../components/Transfer_page/AddMoney";
import { Balance } from "../../../components/Transfer_page/Balance";
import { Transactions } from "../../../components/Transfer_page/Transactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import db from '@repo/db/client';
async function getBalance(){
    const session = await getServerSession(authOptions);
    const balance = await db.balance.findFirst({
        where:{
            userId: Number(session.user.id)
        }
    });
    return {
        amount : balance?.amount,
        locked : balance?.locked
    }
}
async function getTransactions(){
    const session = await getServerSession(authOptions);
    const trns = await db.onRampTransaction.findMany({
        where:{
            userId:Number(session.user.id)
        }
    })
    return trns.map(t=>({
        time : t.startTime,
        amount : t.amount,
        status:t.status,
        provider :t.provider
    }));
}
export default async function Transfer(){
    const balance = await getBalance();
    const transactions = await getTransactions();
    return(
        <div className="w-full h-screen overflow-hidden">
            <div className="text-2xl mt-6 ml-2 font-bold text-[#6a51a6]">Transfer</div>
            <div className="grid grid-cols-2 mt-5 w-full h-full">
                <div className="col-span-1 "><AddMoney /></div>
                <div className="flex flex-col">
                    <Balance amount={balance.amount||0} locked={balance.locked||0} />
                    <div>
                        <Transactions transactions={transactions} />
                    </div> 
                </div>
            </div>
        </div>
    )
}