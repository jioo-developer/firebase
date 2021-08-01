import React, { useState } from 'react'
import { authService, firebaseInstance } from '../Firebase';
import { Link } from 'react-router-dom';
import "../asset/Sign.scss"
function Sign() {
    const [id,setId] = useState(""); 
    const [password,setPassword] = useState("")
    let [findToggle,setFIndToggle] = useState(false);
    let [findPw,setFindPw] = useState("")
    let provider;

    async function resetpw(e){
        e.preventDefault();
        if(findPw !==""){
            authService.sendPasswordResetEmail(findPw).then(()=>{
                window.alert("입력하신 메일로 비밀번호 안내드렸습니다.")
            })
        }
    }

    async function LoginF(e){
        e.preventDefault( );
            try{
                await authService.signInWithEmailAndPassword(id,password)
            } catch(error){
                if(error.message === "The password is invalid or the user does not have a password."){
                    window.alert("암호가 잘못되었거나 사용자에게 암호가 없습니다.")
                } else if(error.message === "There is no user record corresponding to this identifier. The user may have been deleted."){
                        window.alert("이메일이 존재하지않거나, 삭제된 이메일입니다.")
                } else if(error.message === "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."){
                    window.alert("로그인 시도 실패로 인해 이 계정에 대한 액세스가 일시적으로 비활성화되었습니다. 암호를 재설정하여 즉시 복원하거나 나중에 다시 시도할 수 있습니다.")
                } else {
                    window.alert(error.message)
                }
        }
    }

    async function onGoogle(){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
             await authService.signInWithPopup(provider).then((result)=>{
                //  result.user.updateProfile({displayName:result.user.displayName})
             })
    }

    async function onFacebook(){
            provider = new firebaseInstance.auth.FacebookAuthProvider();
             await authService.signInWithPopup(provider)
    }

    return (
        <>
        <div className="sign_wrap">
            <h1 className="logo">
             <img src="./img/logo.svg" alt=""/>
             <figcaption className="logo_title">J.log</figcaption>
            </h1>
            <form onSubmit={LoginF} className="sign-form">
                <input type="text" class="form-control" name="id" placeholder="아이디" required  value={id} onChange={e => setId(e.target.value)}/>
                <input type="password" className="form-control" name="password" placeholder="비밀번호" required  value={password} onChange={e => setPassword(e.target.value)}/>
                <button className="btn">로그인</button>
            </form>
            <div className="sns_sign">
                <button className="sns-btn"  name="google" onClick={onGoogle}>
                <img src="./img/google.svg" alt=""/>    
                <figcaption class="btn_title">구글로 시작하기</figcaption>
                </button>
                <button className="sns-btn"  name="facebook" onClick={onFacebook}>
                <img src="./img/facebook.svg" alt=""/>    
                <figcaption className="btn_title">페이스북으로 시작하기</figcaption>
                </button>
            </div>
            <div className="assistance">
             <button className="pw_reset ass_btn" onClick={()=>{
                 setFIndToggle(true)
             }}>비밀번호 찾기</button>
             <button className="ass_auth ass_btn"><Link to="/Auth">회원가입</Link></button>
            </div>
        </div>
        {
            findToggle ?
            <>
            <section className="find">
                <div className="find_wrap">
                    <p>비밀번호를 잊어 버리셨나요?</p>
                <form className="find-form" onSubmit={resetpw}>
                    <input type="text" className="form-control" placeholder="이메일을 입력하세요." required  value={findPw} onChange={e => setFindPw(e.target.value)}/>
                    <div className="btn_wrap">
                    <div className="btn" onClick={()=>{
                        setFIndToggle(false)
                    }}>취소</div>
                    <button className="btn">찾기</button>
                    </div>
                </form>
                </div>
            </section>
            </>
            : null
        }
        </>
    )
}

export default Sign
