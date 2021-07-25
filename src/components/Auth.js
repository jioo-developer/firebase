import React, { useState } from 'react'
import Header from './Header'
import Title from './Title'
import "../asset/auth.scss"
import { authService } from '../Firebase';
import {useHistory} from 'react-router-dom';

function Auth() {
    let [id,setId] = useState("");
    let [password,setPassword] = useState("");
    let [check,setCheck] = useState(false);
    let[dataCheck,setDataCheck] = useState(false);
    let[locationCheck,setLocationCheck] = useState(false);
    const history = useHistory();

    async function SignF(e){
        e.preventDefault();
        try{
            await authService.createUserWithEmailAndPassword(id,password).then(()=>{
               window.alert("회원가입을 환영합니다.")
               history.push("/")
            })
        } catch(error){
            if(error.message === "The email address is badly formatted."){
                window.alert("올바른 이메일 형식이 아닙니다.")
            } else if(error.message === "Password should be at least 6 characters"){
                window.alert("비밀번호가 너무짧습니다.")
            } else if(error.message === "The email address is already in use by another account."){
                window.alert("이미 사용중인 이메일입니다.")
            } else{
                console.log(error.message)
            }
        }
    }
    return (
        <div className="Auth_wrap wrap">
            <Header/>
            <div className="title_area">
               <Title/>
                <p>회원가입</p>
            </div>
            <form className="auth-form" onSubmit={SignF}>
                <p className="id_title">이메일&nbsp;<span>*</span></p>
                <input type="text" className="form-control" name="id" placeholder="이메일을 입력하세요." required  value={id} onChange={e => setId(e.target.value)}/>
                <p className="warning">※ 실제 사용하시는 이메일을 사용하셔야 비밀번호를 찾으실 수 있습니다.</p>
                <p className="id_title">비밀번호</p>
                <input type="password" className="form-control" name="password" placeholder="8자리 이상 입력하세요." required  value={password} onChange={e => setPassword(e.target.value)}/>
           <section className="terms">
             <div className="all_check">
                <input type="checkbox" id="all_check" onClick={e=>{
                    let target = e.target.nextSibling;
                    if(e.target.checked){
                        setCheck(true)
                        target.style.backgroundImage="url('./img/checked.svg')"
                        target.style.border=0
                    } else {
                        setCheck(false)
                        target.style.backgroundImage="url('')"
                        target.style.border="1px solid #eee"
                    }
                }}/>
                <label htmlFor="all_check" className="check"></label>
                <p className="check_text">전체 약관 동의</p>
             </div>
             <ul className="check_wrap">
                 <li>
                    <input type="checkbox" id="auth_check" onClick={e=>{
                    let target = e.target.nextSibling;
                        if(e.target.checked){
                            setDataCheck(true)
                            target.style.backgroundImage="url('./img/checked.svg')"
                            target.style.border=0
                        } else {
                            setDataCheck(false)
                            target.style.backgroundImage="url('')"
                            target.style.border="1px solid #eee"
                        }
                    }}/>
                    <label htmlFor="auth_check" className="check"></label>
                    <p className="check_text">회원가입및 운영약관 동의 (필수)</p>
                </li>
                 <li>
                    <input type="checkbox" id="data_check" onClick={e=>{
                        let target = e.target.nextSibling;
                        if(e.target.checked){
                            setLocationCheck(true)
                            target.style.backgroundImage="url('./img/checked.svg')"
                            target.style.border=0
                        } else{
                            setLocationCheck(false)
                            target.style.backgroundImage="url('')"
                            target.style.border="1px solid #eee"
                        }
                    }}/>
                    <label htmlFor="data_check" className="check"></label>
                    <p className="check_text">개인정보 수집 및 동의 (필수)</p>
                </li>
                 <li>
                    <input type="checkbox" id="location_check"/>
                    <label htmlFor="location_check" className="check"></label>
                    <p className="check_text">위치정보 이용약관 동의 (선택)</p>
                </li>
             </ul>
            </section>
            {
                 check || dataCheck && locationCheck ? <button className="btn">회원가입</button> : <div className="un_btn">회원가입</div>
             }
            </form>
        </div>
    )
}

export default Auth
