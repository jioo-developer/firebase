import React, { useEffect, useState } from 'react'
import Header from './Header'
import { authService, firebaseInstance } from '../Firebase';
import { Link } from 'react-router-dom';
import "../asset/Sign.scss"
function Sign() {
    const [id,setId] = useState(""); 
    const [password,setPassword] = useState("")
    let provider;

    async function LoginF(e){
        e.preventDefault( );
            try{
                await authService.signInWithEmailAndPassword(id,password)
            } catch(error){
                window.confirm(error)
        }
    }

    async function onGoogle(){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
             await authService.signInWithPopup(provider)
    }

    async function onFacebook(){
            provider = new firebaseInstance.auth.FacebookAuthProvider();
             await authService.signInWithPopup(provider)
    }

    return (
        <div className="sign_wrap">
            <Header/>
            <h1 className="logo">
             <img src="./img/logo.svg" alt=""/>
             <figcaption className="logo_title">사용하실 프로젝트를 입력하세요.</figcaption>
            </h1>
            <form onSubmit={LoginF} className="sign-form">
                <input type="text" class="form-control" name="id" placeholder="id" required  value={id} onChange={e => setId(e.target.value)}/>
                <input type="password" className="form-control" name="password" placeholder="password" required  value={password} onChange={e => setPassword(e.target.value)}/>
                <button className="btn">로그인</button>
            </form>
            <div className="sns_sign">
                <button className="sns-btn"  name="google" onClick={onGoogle}>
                <img src="./img/google.svg" alt=""/>    
                <figcaption class="btn_title">구글로 시작하기</figcaption>
                </button>
                <button className="sns-btn"  name="facebook" onClick={onFacebook}>
                <img src="./img/facebook.svg" alt=""/>    
                <figcaption class="btn_title">페이스북으로 시작하기</figcaption>
                </button>
            </div>
            <div className="assistance">
             <button className="pw_reset ass_btn"><Link to="/Find">비밀번호 재설정</Link></button>
             <button className="ass_auth ass_btn"><Link to="">회원가입</Link></button>
            </div>
        </div>
    )
}

export default Sign
