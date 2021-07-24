import React, {useState,useEffect} from 'react';
import moment from 'moment';
function Header() {
    let [time,setTime] =useState(moment());

    useEffect(()=>{
        setInterval(() => {
    setTime(moment())
    },1000);
    // 시간 업데이트
    },[])

    return (
        <header>
            <div className="time">{time.format('HH:mm')}</div>
             <img src="/img/phone_base.svg" alt="phone_Base"></img>      
        </header>
    )
}

export default Header
