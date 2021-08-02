import React from 'react'

function Header() {
    return (
        <>
            <header>
                <p className="title">J.log</p>
                <div className="menu">
                <img src="./img/default.svg" alt="" className="profile"/>
                <img src="./img/arrow.svg" alt="" className="arrow"/>
            </div>
            </header>       
        </>
    )
}

export default Header
