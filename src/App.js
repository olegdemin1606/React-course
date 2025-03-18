import Banner from "./components/banner/Banner";
import Header from "./components/header/Header";

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
  return (
      <div>
          <Header/>
          Магазин картин
          <Banner/>
          <Footer/>
      </div>
  );
}

export default App;