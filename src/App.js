import React, { useEffect, useState } from 'react'
import {Route} from 'react-router-dom';
import Sign from './components/Sign';
import {authService} from "./Firebase"
import Auth from './components/Auth';
import Home from './components/Home';
import Upload from './components/Upload';
import Detail from './components/Detail';
import Profile from './components/Profile';
import Edit from './components/Edit';
import Header from './components/Header';
function App() {
  const [init,setInit] = useState(false);
  const [Login,setLogin] = useState(false);
  const [userObj,setUserObj] = useState(null)
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user) {
        setLogin(true)
        setUserObj(user)
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
              <Upload user={userObj}/>
            </Route>
            <Route exact path="/detail">
              <Detail user={userObj}/>
            </Route>
            <Route exact path="/profile">
              <Profile user={userObj}/>
            </Route>
            <Route exact path="/edit">
              <Edit user={userObj}/>
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
