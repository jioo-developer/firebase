import React from 'react'
import { Route, useHistory } from 'react-router-dom';
function Home() {
  const history = useHistory();
  
  function OnLogOut(){
    authService.signOut();
    history.push("/")
  }
    return (
        <div className="wrap">
         {
            <button onClick={OnLogOut}>로그아웃</button>
         }
        </div>
    )
}

export default Home
