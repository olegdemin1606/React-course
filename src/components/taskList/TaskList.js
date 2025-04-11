import styles from './taskList.module.css';
import { useMemo, useState } from 'react';
import { calculateAge } from '../utils/date';

export default function TaskList({list, setList}) {
    return(
        <div>
            {list.map(item=><TaskItem key={item.id} item={item} setList={setList}/>)}
            {!list.length && <h4>Нет записей</h4>}
        </div>
    )

}

function MemberItem({itemId, member, setList}) {
    const [isEdit, setIsEdit] = useState(false)
    const [editFields, setEditFields] = useState(member)
    const [errors, setErrors] = useState({})

    const handleEdit = (e, isEdit) =>{
        e.stopPropagation();
        setIsEdit(isEdit)
    }

    const handleInput =(e)=>{
        const {name, value} = e.target;
        setEditFields(prevState=>({...prevState, [name]:value}))
        setErrors(prevState=>({...prevState, [name]:value.length < 2 || value.length > 12 ? 'Длина строки должа быть от 2 до 12': ''}))
    }

    const handleSave =()=>{
        setList(prevState=>prevState.map(item=>item.id === itemId ? {...item, members: item.members.map(member=>member.id === editFields.id ? editFields : member)} : item))
        setIsEdit(false)
    }

    const isDisabled = useMemo(()=>{
        return !!Object.keys(errors).some(key=>!!errors[key])
    },[errors])
    
    return(<>
    {isEdit ?
     <div onClick={e=>e.stopPropagation()}>
        <div>ФИО<input name='fio' value={editFields.fio} onChange={handleInput}/>{errors.fio}</div>
        <div>Дата рождения<input name='date' value={editFields.date} onChange={handleInput}/>{errors.date}</div>
        <button onClick={handleSave} disabled={isDisabled}>V</button>
        <button onClick={(e)=>handleEdit(e, false)}>X</button>
     </div>: 
    <div>
        Фио: {member.fio} возраст: {calculateAge(member.date)} <button onClick={(e)=>handleEdit(e, true)}>Редактировать</button>
    </div>}
    </>)
}

function TaskItem({item, setList}) {
    const [isDetail, setIsDetail] = useState(false)

    const handleToggle = () => {
        setIsDetail(prevState=>!prevState)
    }
    const handleComplite = (e) => {
        e.stopPropagation()
        setList(prevState=>prevState.map(listItem=>listItem.id === item.id ? {...listItem, status: 'complite'} : listItem))
    }
    return(
        <div className={styles.item} onClick={handleToggle}>
            <h4>{item.title}</h4>
           <div>Дата создания: {item.created_at}</div>
           <div>Дата завершения: {item.complited_at}</div>
           <div>Статус: {item.status}</div> <button onClick={handleComplite}>Завершить задачу</button>
           {isDetail && <>
            <div>Метки: {item.points.join(', ')}</div>
            <div>Описание: {item.description}</div>
            <div>Участники:
                <ul>
                {item.members.map(member=><li key={member.id}>
                    <MemberItem member={member} setList={setList} itemId={item.id}/>
                    </li>)} 
                </ul>
            </div>
           </>}

        </div>
    )
}