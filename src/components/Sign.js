import React, { useEffect, useState } from 'react'
import Header from './Header'
import { authService, firebaseInstance } from '../Firebase';
function Sign() {
    const [id,setId] = useState(""); 
    const [password,setPassword] = useState("")

    async function LoginF(e){
        e.preventDefault( );
            try{
                await authService.signInWithEmailAndPassword(id,password)
            } catch(error){
                window.confirm(error)
        }
    }

    return (
        <div className="sign_wrap">
            <Header/>
            <h1 className="logo">
             <img src="./img/logo.svg" alt=""/>
             <figcaption className="logo_title">사용하실 프로젝트를 입력하세요.</figcaption>
            </h1>
            <form onSubmit={LoginF}>
                <input type="text" class="form-control" name="id" placeholder="id" required  value={id} onChange={e => setId(e.target.value)}/>
                <input type="password" className="form-control" name="password" placeholder="password" required  value={password} onChange={e => setPassword(e.target.value)}/>
                <button className="btn btn-danger">로그인</button>
            </form>
            <div className="sns_sign">
                <button className="btn btn-danger"  name="google">구글로 시작하기</button>
                <button className="btn btn-danger"  name="google">페이스북으로 시작하기</button>
            </div>
            <div className="assistance">
             <button className="pw_reset">비밀번호 재설정</button>
             <button className="ass_auth">회원가입</button>
            </div>
        </div>
    )
}

export default Sign
