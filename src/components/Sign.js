import React, { useState } from 'react'
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
                if(error.message ==="The password is invalid or the user does not have a password"){
                    window.alert("암호가 잘못되었거나 사용자에게 암호가 없습니다.")
                } else{
                    if(error.message === "There is no user record corresponding to this identifier. The user may have been deleted."){
                        window.alert("이메일이 존재하지않거나, 삭제된 이메일입니다.")
                    }
                }
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
        <div className="sign_wrap wrap">
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
             <button className="ass_auth ass_btn"><Link to="/Auth">회원가입</Link></button>
            </div>
        </div>
    )
}

export default Sign
