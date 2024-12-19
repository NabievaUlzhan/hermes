import React,{useEffect, useState} from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./routes/AppRouter";
import './App.css';
import './Adaptive.css'
import {AuthContext} from "../src/context/index";

function App() {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(()=>{
    if (localStorage.getItem('auth')){
      setIsAuth(true)
    }
  }, [])

  return (
    <div className="App">
      <AuthContext.Provider value={{isAuth, setIsAuth}}>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;