import Banner from "./components/banner/Banner";
import ListFilter from "./components/filter/ListFilter";
import Header from "./components/header/Header";
import ListSort from "./components/sort/ListSort";
import TaskList from "./components/taskList/TaskList";
import {useState, useMemo} from 'react';

const footerStyle = {
  padding: '20px',
  backgroundColor: '#454046',
  color: '#A2A1A9'
}

function Footer() {
  return(
    <footer style={footerStyle}>
      Подвал сайта
    </footer>
  )
}

const members = [
  {id:1, fio: 'Демин О.С.', date: '21.01.2001'},
  {id:2, fio: 'Петров А.В.', date: '21.11.2002'},
  {id:3, fio: 'Семенов Д.С.', date: '28.01.2000'},
  {id:4, fio: 'Иванов С.С.', date: '20.02.2001'},
]

const initialList = [
  {id:1, title:'Телевизор', created_at:'27.01.2025', complited_at:'28.01.2025', points:[1,2,3,4], description:'описание', members: [members[0], members[1]], status: 'complite'},
  {id:2, title:'Компьютер', created_at:'21.01.2025', complited_at:'29.01.2025', points:[1,5,3,7], description:'описание 2', members: [members[0], members[1], members[2], members[3]], status: 'start'},
  {id:3, title:'Телефон', created_at:'20.01.2025', complited_at:'21.02.2025', points:[1,5,3,8], description:'описание 3', members: [members[0], members[1], members[2]], status: 'complite'},
  {id:4, title:'Магнитофон', created_at:'11.01.2025', complited_at:'24.03.2025', points:[1,5,3,2], description:'описание 4', members: [members[1], members[2]], status: 'start'},
  {id:5, title:'Пылесос', created_at:'27.01.2025', complited_at:'27.01.2025', points:[1,2,3,6], description:'описание 2111', members: [members[2], members[3]], status: 'start'},
  {id:6, title:'Фен', created_at:'21.01.2025', complited_at:'29.01.2025', points:[1,5,3,7], description:'описание 22', members: [members[0]], status: 'start'},
  {id:7, title:'Холодильник', created_at:'20.01.2025', complited_at:'11.02.2025', points:[1,5,3,8], description:'описание 613', members: [members[0], members[2]], status: 'start'},
  {id:8, title:'Вентилятор', created_at:'11.01.2025', complited_at:'14.03.2025', points:[1,5,3,2], description:'описание 4221', members: [members[0], members[3]], status: 'start'},

]

function App() {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('default')
  const [list, setList] = useState(initialList)

  const sortedList = useMemo(()=>{
    let filteredList = list
    .filter(item => {
      if (!filter) return true;
      const filterNumbers = filter.split(',').map(Number);
      return filterNumbers.some(num => item.points.includes(num));
    })
    .filter(item => item.status !== 'complite');

    switch (sort) {
      case 'alphabet':
        filteredList.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'count':
        filteredList.sort((a, b) => a.title.length - b.title.length);
        break;
      case 'urgency':
        filteredList.sort((a, b) => {
          const dateA = new Date(a.complited_at.split('.').reverse().join('-'));
          const dateB = new Date(b.complited_at.split('.').reverse().join('-'));
          return dateB - dateA;
        });
        break;
      case 'members':
        filteredList.sort((a, b) => b.members.length - a.members.length);
        break;
      case 'created_at':
        filteredList.sort((a, b) => {
          const dateA = new Date(a.created_at.split('.').reverse().join('-'));
          const dateB = new Date(b.created_at.split('.').reverse().join('-'));
          return dateB - dateA;
        });
        break;
      case 'default':
      default:
        filteredList.sort((a, b) => {
          const dateA = new Date(a.complited_at.split('.').reverse().join('-'));
          const dateB = new Date(b.complited_at.split('.').reverse().join('-'));
          return dateB - dateA;
        });
        break;
    }

  return filteredList;
  },[filter, sort, list])

  return (
      <div>
          <Header/>
          Магазин картин
          <Banner/>
          Поиск по меткам<ListFilter value={filter} setValue={setFilter}/>
          Сортировка<ListSort value={sort} setValue={setSort}/>
          <TaskList list={sortedList} setList={setList}/>
          <Footer/>
      </div>
  );
}

export default App;