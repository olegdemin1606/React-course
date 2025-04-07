import styles from './taskList.module.css';
import {useState} from 'react';

export default function TaskList({list}) {
    return(
        <div>
            {list.map(item=><TaskItem key={item.id} item={item}/>)}
        </div>
    )

}

function TaskItem({item}) {
    const [isDetail, setIsDetail] = useState(false)

    const handleToggle = () => {
        setIsDetail(prevState=>!prevState)
    }
    return(
        <div className={styles.item} onClick={handleToggle}>
           <div>Дата создания: {item.created_at}</div>
           <div>Дата завершения: {item.complited_at}</div>
           <div>Статус: {item.status}</div>
           {isDetail && <>
            <div>Метки: {item.points.join(', ')}</div>
            <div>Описание: {item.description}</div>
            <div>Участники: {item.members.join(', ')}</div>
           </>}

        </div>
    )
}