import Banner from "./components/banner/Banner";
import Header from "./components/header/Header";
import TaskList from "./components/taskList/TaskList";

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

const list = [
  {id:1, created_at:'27.01.2025', complited_at:'28.01.2025', points:[1,2,3,4], description:'description', members: ['Демин О.С.','Петров А.Г.'], status: 'complite'},
  {id:2, created_at:'21.01.2025', complited_at:'29.01.2025', points:[1,5,3,4], description:'description 2', members: ['Демин О.С.','Петров А.Г.'], status: 'start'},
  {id:3, created_at:'20.01.2025', complited_at:'21.02.2025', points:[1,5,3,4], description:'description 3', members: ['Иванов О.С.','Петров А.Г.'], status: 'complite'},
  {id:4, created_at:'11.01.2025', complited_at:'24.03.2025', points:[1,5,3,4], description:'description 4', members: ['Семенов О.С.','Алексеев А.Г.'], status: 'start'},

]

function App() {

  const sortedList = list
  .filter(item => item.status !== 'complite')
  .sort((a, b) => {
      const dateA = new Date(a.complited_at.split('.').reverse().join('-'));
      const dateB = new Date(b.complited_at.split('.').reverse().join('-'));
      return dateB - dateA;
  });
  return (
      <div>
          <Header/>
          Магазин картин
          <Banner/>
          <TaskList list={sortedList}/>
          <Footer/>
      </div>
  );
}

export default App;