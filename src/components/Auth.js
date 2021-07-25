import React from 'react'
import Header from './Header'
import Title from './Title'
import "../asset/auth.scss"

function Auth() {
    return (
        <div className="Auth_wrap wrap">
            <Header/>
            <div className="title_area">
               <Title/>
                <p>회원가입</p>
            </div>
        </div>
    )
}

export default Auth
