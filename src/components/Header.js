import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom';
import { authService } from '../Firebase';
function Header(props) {
    let [navToggle,setNavToggle] = useState(false)
    const history = useHistory();

    function logout(){
        authService.signOut();
        history.push("/")
    }
    return (
        <>
            <header>
                <p className="title"><Link to="/">{props.user.displayName}.log</Link></p>
                <div className="menu" onClick={()=>{
                    setNavToggle(!navToggle)
                }}>
                <img src="./img/default.svg" alt="" className="profile"/>
                <img src="./img/arrow.svg" alt="" className="arrow"/>
            </div>
            </header>
            {
                navToggle ? (
                    <>
                    <ul className="sub_menu">
                    <li><Link to="/profile">설정</Link></li>
                    <li onClick={logout}>로그아웃</li>
                    </ul> 
                    </>
                ) : null
            }     
        </>
    )
}

export default Header
