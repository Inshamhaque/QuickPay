import { Card } from "@repo/ui/card"
import { getServerSession } from "next-auth"
import { authOptions } from "../../app/lib/auth"
export const Transactions  = ({ transactions } :{ transactions :{
    fromUserId : Number,
    toUserId : Number,
    amount : Number,
    timeStamp : Date
}[]})=>{
    const session = getServerSession(authOptions);
    const userId = session?.user?.Id;
    if(!userId){
        return{
            error : "error occurred"
        }
    }
    return(
        <div className="w-screen h-screen">
            <Card title="Recent Transactions">
                <div>
                    <div className="font-semibold">Incoming transactions</div>
                    <div>
                        {transactions
                        .filter(tr=>tr.fromUserId===userId)
                        .map((tx)=>{
                            return(
                                <div>From user: {}</div>
                            )
                        })
                        
                        }
                        
                    </div>
                </div>
                <div>
                    <div className="font-semibold">Outgoing transactions</div>
                    <div></div>
                </div>
            </Card>
        </div>
    )
}