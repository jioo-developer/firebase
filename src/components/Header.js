import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { authService } from '../Firebase';
function Header(props) {
    let [navToggle,setNavToggle] = useState(false)
    let [nameLoading,setNameLoading] = useState(false)
    const history = useHistory();
    function logout(){
        authService.signOut();
        history.push("/")
    }

    useEffect(()=>{
        setTimeout(() => {
            setNameLoading(true)
        },1000);
    },[])
    
    return (
        <>
            <header>
                {
                    nameLoading ? (
                        <>
                        <p className="title"><Link to="/">{props.receive[0].displayName}.log</Link></p> 
                        <div className="menu" onClick={()=>{
                            setNavToggle(!navToggle)
                        }}>
                        <img src={props.receive[0].photoURL} alt="" className="profile"/>
                        <img src="./img/arrow.svg" alt="" className="arrow"/>
                        </div>
                        </>
                    )
                    
                    : "로그인정보를 가져오는중..."
                }
            </header>
            {
                navToggle ? (
                    <>
                    <ul className="sub_menu">
                    <li><Link to="/profile">설정</Link></li>
                    <li><Link to="notice">공지사항</Link></li>
                    <li onClick={logout}>로그아웃</li>
                    </ul> 
                    </>
                ) : null
            }     
        </>
    )
}

function name받기(state){
    return {
        receive : state.reducer2
    }
}

export default connect(name받기)(Header);
