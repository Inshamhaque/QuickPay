"use client"
import  { useState } from 'react';
import { Textinput} from '@repo/ui/TextInput'
import { Card } from "@repo/ui/card"
import { Select } from "@repo/ui/Select"
import { Button } from '@repo/ui/button';
import db from '@repo/db/client'
import { OnRampTransaction } from '../../app/lib/actions/createOnRamp';

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export function AddMoney(){
    const [amount,setAmount] = useState(0);
    const [url,seturl] = useState(SUPPORTED_BANKS[0]?.redirectUrl||"");
    const [bank,setBank] = useState(SUPPORTED_BANKS[0]?.name||"");
    return(
        <Card title="Add Money">
            <div className='w-full'>
                <Textinput label='Amount' Onchange={(value)=>{
                    setAmount(Number(value));
                }} placeholder='Amount'/>
            </div>
            <div className='mt-3'>Bank</div>
            <Select options={SUPPORTED_BANKS.map(x=>({
                key : x.name,
                value : x.name,
            }))} onSelect={(value)=>{
                seturl(SUPPORTED_BANKS.find(x=>x.name===value)?.redirectUrl||"")
                setBank(SUPPORTED_BANKS.find(x=>x.name===value)?.name||"")}
            } />
            <div className='flex justify-center mt-3'>
            <Button  onClick={async ()=>{
                await OnRampTransaction(amount,bank);
                window.open(url);

            }} > Add money </Button>
            </div>
        </Card>
    )
}

function textinputonchange(e:any){
    //here we need to display the amount to be added into the database

}