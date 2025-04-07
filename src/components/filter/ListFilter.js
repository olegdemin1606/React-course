

export default function ListFilter({value, setValue}) {
const handleChange = e => {
    const {name, value} = e.target;
    setValue(value)
}
 return(<div>
    <input value={value} onChange={handleChange}/>
 </div>)
}