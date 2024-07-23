"use client"
import { usePathname, useRouter } from "next/navigation"

interface props{
    href : string,
    title : string,
    icon : React.ReactNode,
}
export const Sidebar = ({ href, title, icon}:props)=>{
    const router = useRouter();
    const pathname = usePathname();
    return(
        <div className="flex flex-row">
            {pathname===href?<div onClick={()=>{router.push(href)}} className=" flex flex-row gap-x-2 font-semibold text-[#6a51a6] text-md items-center cursor-pointer">{icon}{title}</div>:<div onClick={()=>{router.push(href)}} className="flex flex-row gap-x-2 items-center cursor-pointer font-semibold text-blue-500 text-sm">{icon}{title}</div>}   
        </div>
    )
}