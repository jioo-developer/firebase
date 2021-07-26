import React, { useState } from 'react'
import Header from './Header'
import "../asset/find.scss"
import { authService } from '../Firebase';
import Title from './Title';
function Find() {
    let [findPw,setFindPw] = useState("")
    async function resetpw(e){
        e.preventDefault();
        if(findPw !==""){
            authService.sendPasswordResetEmail(findPw).then(()=>{
                window.alert("입력하신 메일로 비밀번호 안내드렸습니다.")
            })
        }
    }
    return (
        <div className="find_wrap wrap">
            <Header/>
            <div className="title_area">
              <Title/>
                <p>아이디 / 비밀번호 찾기</p>
            </div>
            <form className="find-form" onSubmit={resetpw}>
                <input type="text" class="form-control" placeholder="이메일을 입력하세요." required  value={findPw} onChange={e => setFindPw(e.target.value)}/>
                <button className="btn">비밀번호 찾기</button>
            </form>
        </div>
    )
}

export default Find