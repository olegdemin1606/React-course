import { useContext, useState } from "react";
import { MyContext } from "../store/Context";

export default function ListForm() {
    const initialForm = {
        title:'',
        complited_at:'', 
        description: '',
        points: '',
        members: []

    }
    const [editFields, setEditFields] = useState(initialForm)
    const [errors, setErrors] = useState({})
    const { dispatch } = useContext(MyContext);

    const handleInput =(e)=>{
        const {name, value} = e.target;
        setEditFields(prevState=>({...prevState, [name]:value}))
        setErrors(prevState=>({...prevState, [name]:value.length < 2 || value.length > 12 ? 'Длина строки должа быть от 2 до 12': ''}))
    }

    const handleMemberInput =(e, index, id)=>{
        const {name, value} = e.target;
        setEditFields(prevState=>({...prevState, members: prevState.members.map((member, ind)=>ind === index? {...member, [name]: value}: member)}))
        setErrors(prevState=>({...prevState, members:{... prevState?.members, [id]: {...prevState?.members?.[id], [name]:value.length < 2 || value.length > 12 ? 'Длина строки должа быть от 2 до 12': ''}}}))
    }

    const handleAddMember = () => {
        setEditFields(prevState=>({...prevState, members:[...prevState.members, {id:+prevState.members[prevState.members.length]?.id+1??1, fio:'', date:''}]}))
    }

    const handleSave =()=>{
        dispatch({type: 'ADD_LIST_ITEM', payload: {newItem:editFields}})
        setEditFields(initialForm)
        setErrors({})
    }
    return(<div>
        <h4>Форма создания</h4>
        <div>Заголовок<input name='title' value={editFields.title} onChange={handleInput}/>{errors.title}</div>
        <div>Описание<input name='description' value={editFields.description} onChange={handleInput}/>{errors.description}</div>
        <div>Дата завершения<input name='complited_at' type='date' value={editFields.complited_at} onChange={handleInput}/>{errors.complited_at}</div>
        <div>Метки<input name='points' value={editFields.points} onChange={handleInput}/>{errors.points}</div>
        <div>Участники</div>
        <ul>
            {editFields?.members?.map((member, index)=><li key={index}>
                <div>ФИО<input name='fio' value={member.fio} onChange={e=>handleMemberInput(e, index, member.id)}/>{errors.members?.[member.id]?.fio}</div>
                <div>Дата рождения<input name='date' value={member.date} onChange={e=>handleMemberInput(e, index, member.id)}/>{errors.members?.[member.id]?.date}</div>
                <div>Дата рождения<input name='date' type='date' value={member.date} onChange={e=>handleMemberInput(e, index, member.id)}/>{errors.members?.[member.id]?.date}</div>
            </li>)}
        </ul>
        <button onClick={handleAddMember}>Добавить участника</button>
        <button onClick={handleSave} disabled={!editFields.title || !editFields.complited_at}>Добавить задачу</button>
     </div>)
}