import React from 'react'
import { Route, useHistory } from 'react-router-dom';
import Header from './Header';
import Title from './Title';
import { authService } from '../Firebase';
import "../asset/home.scss"
function Home() {
  const history = useHistory();
  
  function OnLogOut(){
    authService.signOut();
    history.push("/")
  }
    return (
        <div className="wrap">
            <Header/>
            <div className="header">
            <Title/>
            <p className="title">지로마켓</p>
            <div className="icon_wrap">
                <button className="search">
                 <img src="./img/search.svg" alt=""/>
                </button>
                <ul className="nav">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <button className="bell">
                 <img src="./img/bell.svg" alt=""/>
                </button>
            </div>
            </div>
        </div>
    )
}

export default Home
