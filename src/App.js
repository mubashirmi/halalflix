import Header from "./components/Header";
import Cards from "./components/Cards";
import { Routes,Route } from "react-router-dom";
import Addmovie from "./components/Addmovie";
import Detail from "./components/Detail";
import { createContext, useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { auth } from "./firebase/firebase";
const Appstate = createContext();

function App() {
  const [ login , setLogin ] = useState(false);
  const [ username , setUsername ] = useState("");
  const [ reload , setReload ] = useState(0);
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setLogin(true);
        setUsername(user.displayName);
      }
    })
  },[])
  return (
    <Appstate.Provider value={{login,username,reload,setReload,setLogin,setUsername}} >
    <div className="App relative">
      <Header />
      <Routes>
        <Route path="/" element={<Cards />}/> 
        <Route path="/addmovie" element={<Addmovie />}/> 
        <Route path="/detail/:id" element={<Detail />}/> 
        <Route path="/login" element={<Login />}/> 
        <Route path="/signup" element={<Signup />}/> 

      </Routes>
    </div>
    </Appstate.Provider>
  );
}
export { Appstate }
export default App