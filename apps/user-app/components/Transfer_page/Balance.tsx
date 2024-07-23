import { Card } from "@repo/ui/card"

export const Balance = ({amount, locked}:{
    amount : number,
    locked : number
})=>{

    return(
        <Card title="Balance">
            <div className="flex flex-col gap-y-3">
                <div className="flex justify-between mt-2 pb-2 border-b border-slate-400">
                    <div>Unlocked balance</div>
                    <div>{amount/100} INR</div>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-400">
                    <div>Total Locked Balance</div>
                    <div>{locked/100} INR</div>
                </div>
                <div className="flex justify-between pb-2  border-b border-slate-400">
                    <div>Total Balance</div>
                    <div>{(locked+amount)/100} INR</div>
                </div>
            </div>
        </Card>
    )
}