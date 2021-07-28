import React, { useEffect, useState } from 'react'
import {Route} from 'react-router-dom';
import Sign from './components/Sign';
import {authService} from "./Firebase"
import Auth from './components/Auth';
import Home from './components/Home';
import Upload from './components/Upload';
function App() {
  const [init,setInit] = useState(false);
  const [Login,setLogin] = useState(false);
  const [userObj,setUserObj] = useState(null)
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user) {
        setLogin(true)
        setUserObj(user)
        console.log(user)
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
