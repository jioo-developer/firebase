import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom';
import './App.css';
import Sign from './components/Sign';
import {authService} from "./Firebase"
function App() {
  const [init,setInit] = useState(false);
  const [Login,setLogin] = useState(false);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user) {
        setLogin(true)
      } else {
        setLogin(false)
      }
      setInit(true)
    })
  },[])
  return (
    <div className="App">
      {
        init ? (
          Login ? (
            <Route exact path="/">
              <div className="wrap">홈</div>
            </Route>
          ) : (
            <Route exact path="/">
              <Sign/>
            </Route>
          ) 
        ) : ""
      }
    </div>
  );
}

export default App;
