import Banner from "./components/banner/Banner";
import ListFilter from "./components/filter/ListFilter";
import ListForm from "./components/form/ListForm";
import Header from "./components/header/Header";
import ListSort from "./components/sort/ListSort";
import { MyContext } from "./components/store/Context";
import TaskList from "./components/taskList/TaskList";
import {useState, useMemo, useContext} from 'react';

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

function App() {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('default');
  const { state, dispatch } = useContext(MyContext);
  const {list} = state;

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
          const dateA = new Date(a.complited_at);
          const dateB = new Date(b.complited_at);
          return dateB - dateA;
        });
        break;
      case 'members':
        filteredList.sort((a, b) => b.members.length - a.members.length);
        break;
      case 'created_at':
        filteredList.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB - dateA;
        });
        break;
      case 'default':
      default:
        filteredList.sort((a, b) => {
          console.log('T',a.complited_at, b.complited_at)
          const dateA = new Date(a.complited_at);
          const dateB = new Date(b.complited_at);
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
          <ListForm/>
          <TaskList list={sortedList}/>
          <Footer/>
      </div>
  );
}

export default App;