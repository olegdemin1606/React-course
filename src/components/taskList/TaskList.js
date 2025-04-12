import styles from './taskList.module.css';
import { useContext, useMemo, useState } from 'react';
import { calculateAge } from '../utils/date';
import { MyContext } from '../store/Context';

export default function TaskList({list}) {
    return(
        <div>
            {list.map(item=><TaskItem key={item.id} item={item}/>)}
            {!list.length && <h4>Нет записей</h4>}
        </div>
    )
}

function MemberItem({itemId, member}) {
    const [isEdit, setIsEdit] = useState(false)
    const [editFields, setEditFields] = useState(member)
    const [errors, setErrors] = useState({})
    const { dispatch } = useContext(MyContext);

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
        dispatch({type: 'CHANGE_LIST_ITEM_MEMBER', payload: {itemId, member:editFields}})
        setIsEdit(false)
    }

    const isDisabled = useMemo(()=>{
        return !!Object.keys(errors).some(key=>!!errors[key])
    },[errors])
    
    return(<>
    {isEdit ?
     <div onClick={e=>e.stopPropagation()}>
        <div>ФИО<input name='fio' value={editFields.fio} onChange={handleInput}/>{errors.fio}</div>
        <div>Дата рождения<input name='date' type='date' value={editFields.date} onChange={handleInput}/>{errors.date}</div>
        <button onClick={handleSave} disabled={isDisabled}>V</button>
        <button onClick={(e)=>handleEdit(e, false)}>X</button>
     </div>: 
    <div>
        Фио: {member.fio} возраст: {calculateAge(member.date)} <button onClick={(e)=>handleEdit(e, true)}>Редактировать</button>
    </div>}
    </>)
}

function TaskItem({item}) {
    const [isDetail, setIsDetail] = useState(false)
    const { dispatch } = useContext(MyContext);

    const handleToggle = () => {
        setIsDetail(prevState=>!prevState)
    }
    const handleComplite = (e) => {
        e.stopPropagation()
        dispatch({type: 'CHANGE_LIST_ITEM', payload: {item: {...item, status: 'complite'}}})
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
                    <MemberItem member={member} itemId={item.id}/>
                    </li>)} 
                </ul>
            </div>
           </>}

        </div>
    )
}