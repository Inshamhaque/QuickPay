"use client"
import { Card } from "@repo/ui/card"
import { Textinput } from "@repo/ui/TextInput"
import { Button } from "@repo/ui/button"
import { useState } from 'react';
import { p2ptransfer } from "../../app/lib/actions/p2ptransfer";

export const Send_Card = ()=>{
    //Do zod validation here for amount and phone number 
    const [phone,setPhone] = useState("");
    const [amount,setAmount] = useState("");
    return(
        <Card title="Send Money">
            <Textinput Onchange={(value:string)=>{setPhone(value)}} placeholder="1212121212" label="Number" />
            <Textinput Onchange={(value:string)=>{setAmount(value)}} placeholder="1234" label="Amount" />
            <div className="flex justify-center mt-5">
                <Button onClick={async ()=>{
                    await p2ptransfer(phone,amount);
                    window.open('https://www.google.com');
                }}>Send</Button>
            </div>
        </Card>
    )
}