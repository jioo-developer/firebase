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
import { connect } from 'react-redux';
import Notice from './components/Notice';
function App(props) {
  const [init,setInit] = useState(false);
  const [Login,setLogin] = useState(false);
  const [userObj,setUserObj] = useState(null)
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user) {
        setLogin(true)
        setUserObj(user)
        props.dispatch({type:"활동명",payload2:user})
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
              <Home user={userObj}/>
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
            <Route exact path="/notice">
              <Notice/>
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

function name보내기(state){
  return {
    goName : state.reducer2
  }
}

export default connect(name보내기)(App);