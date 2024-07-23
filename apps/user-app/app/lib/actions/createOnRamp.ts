"use server"

import { getServerSession } from "next-auth";
import { authOptions } from '../auth';
import db from '@repo/db/client'
export async function OnRampTransaction(amount:number, provider:string){
    const session = await getServerSession(authOptions);
    const userId = session.user.id;
    if(!userId){
        return{
            message : "user not logged in"
        }
    }
    const token = Math.random().toString();
    await db.onRampTransaction.create({
        data :{
            userId : Number(userId),
            amount :  amount*100,
            provider,
            startTime : new Date(),
            token : token,
            status : "Processing"
        }
    })
    return {
        message : "On ramp trans added"
    }
}