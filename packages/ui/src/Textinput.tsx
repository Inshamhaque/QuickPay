export const Textinput = ({label,Onchange,placeholder}:{
    placeholder : string, 
    Onchange : any,
    label : string 
})=>{
    return(
        <div className="mt-3">
            <label className="block mb-2 font-regular ">{label}</label>
            <div className="pl-2 pr-4"><input className="w-full pl-2 rounded-md border border-slate-200"  type="number" onChange={(e)=>Onchange(e.target.value)} placeholder={placeholder} /></div>
        </div>
    )
}