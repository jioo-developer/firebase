import React, { useEffect, useState } from 'react'
import "../asset/auth.scss"
import { authService, db } from '../Firebase';
import {Link,useHistory} from 'react-router-dom';

function Auth() {
    let [id,setId] = useState("");
    let [password,setPassword] = useState("");
    let [check,setCheck] = useState(false);
    let[checkLength,setCheckLength] = useState(0)
    let[nickname,setNickname] = useState("")
    const history = useHistory();
    const authData = [{id:"auth",text:"회원가입및 운영약관 동의"},{id:"data",text:"개인정보 수집 및 동의"},{id:"location",text:"위치정보 이용약관 동의"}]
    useEffect(()=>{
        console.log(checkLength)
        let all_check = document.getElementById("all_check")
        let checks = document.querySelector("#all_check").nextSibling;
        if(checkLength === 2){
            checks.style.backgroundImage="url('')";
         } else if(checkLength === 3){
             checks.style.backgroundImage="url('./img/checked.svg')";
             checks.style.border=0
             all_check.checked = true
             setCheck(true)
        } else {
            checks.style.backgroundImage="url('')";
            checks.style.border="1px solid #eee"
            all_check.checked = false
            setCheck(false)
        }
    },[checkLength])
    async function SignF(e){
        e.preventDefault();
        try{
            await authService.createUserWithEmailAndPassword(id,password).then((result)=>{
               window.alert("회원가입을 환영합니다.")
               history.push("/")
               result.user.updateProfile({
                   displayName:nickname,
                   photoURL : "./img/default.svg"
                })
            })
        } catch(error){
            if(error.message === "The email address is badly formatted."){
                window.alert("올바른 이메일 형식이 아닙니다.")
            } else if(error.message === "Password should be at least 6 characters"){
                window.alert("비밀번호가 너무짧습니다.")
            } else if(error.message === "The email address is already in use by another account."){
                window.alert("이미 사용중인 이메일입니다.")
            } else{
                window.alert(error.message)
            }
        }
    }

    function checkSelectAll(e){
        let target = e.target.nextSibling;
        if(e.target.checked){
            target.style.backgroundImage="url('./img/checked.svg')"
            target.style.border=0
            setCheckLength(checkLength+1)
        }else {
            target.style.backgroundImage="url('')"
            target.style.border="1px solid #eee"
             setCheckLength(checkLength-1)
        }

        console.log(checkLength)
    }

    function allCheck(e){
        let subCheck = document.querySelectorAll("input[name='sub_check']")
        if(e.target.checked){
            setCheck(!check)
            subCheck.forEach((checkbox)=>{
            checkbox.checked = true
            e.target.nextSibling.style.backgroundImage="url('./img/checked.svg')"
            e.target.nextSibling.style.border=0
            checkbox.nextSibling.style.backgroundImage="url('./img/checked.svg')"
            checkbox.nextSibling.style.border=0
        })
        setCheckLength(3)
        } else {
            setCheck(!check)
            subCheck.forEach((checkbox)=>{
            checkbox.checked = false
            e.target.nextSibling.style.backgroundImage="url('')"
            checkbox.nextSibling.style.backgroundImage="url('')"
            e.target.nextSibling.style.border="1px solid #eee"
            checkbox.nextSibling.style.border="1px solid #eee"
        })
        setCheckLength(0)
        }
    }

    return (
        <div className="Auth_wrap">
            <div className="title_area">
                <Link to="/"><img src="./img/close-24px.svg" className="close" alt=""/></Link>
                <p>회원가입</p>
            </div>
            <form className="auth-form" onSubmit={SignF}>
                <p className="id_title">이메일&nbsp;<span>*</span></p>
                <input type="text" className="form-control" name="id" id="id" placeholder="이메일을 입력하세요." required  value={id} onChange={e => setId(e.target.value)}/>
                <p className="warning">※ 실제 사용하시는 이메일을 사용하셔야 비밀번호를 찾으실 수 있습니다.</p>
                <p className="id_title">비밀번호&nbsp;<span>*</span></p>
                <input type="password" className="form-control" name="password" placeholder="8자리 이상 입력하세요." required  value={password} onChange={e => setPassword(e.target.value)}/>
                <p className="id_title">활동명 &nbsp;<span>*</span></p>
                <input type="text" className="form-control" name="name" placeholder="활동명을 입력하세요." required value={nickname} onChange={e=>setNickname(e.target.value)}/>
           <section className="terms">
             <div className="all_check">
                <input type="checkbox" id="all_check" onClick={allCheck}/>
                <label htmlFor="all_check" className="check"></label>
                <p className="check_text">전체 약관 동의</p>
             </div>
             <ul className="check_wrap">
                 {
                     authData.map(function(data,i){
                         return <li key={i}>
                             <input type="checkbox" id={`${data.id}_check`} name="sub_check" onClick={checkSelectAll}/>
                             <label htmlFor={`${data.id}_check`} className="check"></label>
                             <p className="check_text">{data.text}</p>
                         </li>
                     })
                 }
             </ul>
            </section>
            {
                 check ? <button className="btn">회원가입</button> : <div className="un_btn">회원가입</div>
             }
            </form>
        </div>
    )
}

export default Auth
