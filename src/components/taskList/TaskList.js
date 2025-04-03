import styles from './taskList.module.css';


export default function TaskList({list}) {
    return(
        <div>
            {list.map(item=><TaskItem key={item.id} item={item}/>)}
        </div>
    )

}

function TaskItem({item}) {
    
    return(
        <div className={styles.item}>
           <div>Дата создания: {item.created_at}</div>
           <div>Дата завершения: {item.complited_at}</div>
           <div>Метки: {item.points.join(', ')}</div>
           <div>Описание: {item.description}</div>
           <div>Участники: {item.members.join(', ')}</div>
           <div>Статус: {item.status}</div>
        </div>
    )
}