import React, { useEffect, useState } from 'react'
import {Route} from 'react-router-dom';
import "./asset/reset.css"
import "./asset/common.scss"
import Sign from './components/Sign';
import {authService} from "./Firebase"
import Auth from './components/Auth';
import Home from './components/Home';
import Upload from './components/Upload';
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
            <>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/upload">
              <Upload/>
            </Route>
            </>
          ) :
          <>
            <Route exact path="/">
              <Sign/>
            </Route>

            <Route exact path="/Auth">
              <Auth/>
            </Route>
            </>
        ) : ""
      }
    </div>
  );
}

export default App;
