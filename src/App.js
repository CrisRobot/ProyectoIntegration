
import Cards from './components/Cards/Cards.jsx'
import Nav from './components/nav/nav.jsx';
import About from './components/About/About.jsx';
import Detail from './components/Detail/Detail.jsx';
import Error from './components/Error/Error.jsx';
import Form from './components/Froms/form.jsx';
import imagenfondo from './imagenes/webbdeepfield.jpg';
import styles from "./components/CardsStyles.module.css";
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate} from "react-router-dom";


function App () {
  console.log(styles);
  const[characters, setCharacters] = useState([]);
  const {pathname} = useLocation();
  const [access, setAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    !access && navigate("/");
  }, [access]);

  const username = "cristian@gmail.com";
  const password = "soyhenry";

  const onSearch = (id) => {
    const URL_BASE = "https://be-a-rym.up.railway.app/api";
    const KEY = "c83dd84be5eb.66d624a8ccae84db8dce";

    if(characters.find((char) => char.id === id)){
      return alert("Personaje repetido");
    }

    fetch(`${URL_BASE}/character/${id}?key=${KEY}`)
    .then((response)=>response.json())
    .then((data) => {
      if (data.name) {
        setCharacters((oldChars) => [...oldChars, data]);
      } else {
        alert("Algo salió mal");
      }
    });
  };

  const onClose = (id) => {
    setCharacters(characters.filter((char) => char.id !== id));
  };

  const login = (userData) => {
  if(userData.username === username && userData.password === password){
    setAccess(true);
    navigate("/home");
  }
  else{
    alert("Credenciales incorrectas");
  }
};

  return (
    
    <div   className='App' style={{ padding: '25px'}}>
      
        {pathname !== "/" && <Nav onSearch={onSearch}/>}
      

      <Routes>
        <Route path="/" element={<Form login={login}/>}></Route>
        <Route path="/home" element={<Cards characters={characters} onClose={onClose}/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/detail/:detailId" element={<Detail/>}></Route>
        <Route path="*" element={<Error/>}></Route>
      </Routes>
    
    </div>
  );
}

export default App;