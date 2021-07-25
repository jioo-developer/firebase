import React, { useEffect, useState } from 'react'
import { Route, useHistory } from 'react-router-dom';
import './App.css';
import Sign from './components/Sign';
import {authService} from "./Firebase"
import "./asset/header.scss"
import Find from './components/Find';
function App() {
  const [init,setInit] = useState(false);
  const [Login,setLogin] = useState(false);
  const history = useHistory();
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

  function OnLogOut(){
    authService.signOut();
    history.push("/")
  }
  return (
    <div className="App">
      {
        init ? (
          Login ? (
            <Route exact path="/">
              <div className="wrap">
                {
                  <button onClick={OnLogOut}>로그아웃</button>
                }
              </div>
            </Route>
          ) : (
            <Route exact path="/">
              <Sign/>
            </Route>
          ) 
        ) : ""
      }
      <Route exact path="/Find">
        <Find/>
      </Route>
    </div>
  );
}

export default App;
