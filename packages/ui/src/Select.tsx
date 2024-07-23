export const Select = ({ options, onSelect }:{
    options : {
        key : string, 
        value : string
    }[],
    onSelect : (value : string) => void
})=>{
    return(
        <div className="w-full pl-2 pt-2 pr-4">
        <select onChange={(e:any)=>{
            onSelect(e.target.value);
        }} className="w-full ">
            {options.map((option)=>{
                return(
                    <option key = {option.key}>
                        {option.value}
                    </option>
                )
            })}
        </select>
        </div>
    )
}