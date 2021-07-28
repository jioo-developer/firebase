import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import "../asset/detail.scss"

function Detail() {
  let [posts,setPosts] = useState([])
  useEffect(()=>{
    db.collection("post").onSnapshot((snapshot)=>{
      let postArray = snapshot.docs.map((doc)=>({
        ...doc.data()
      }))
      setPosts(postArray)
    })
  },[])
    return (
            <div className="detail_wrap">
                <header>
                    <h1>제목입니다.</h1>
                    <div className="writer_wrap">
                        <div className="left_wrap">
                            <p className="writer">작성자</p>
                            <p className="date">2021년 7월 29일</p>
                        </div>
                        <div className="right_wrap">
                            <button className="edit">수정</button>
                            <button className="delete">삭제</button>
                        </div>
                    </div>
                </header>
                <section className="content_wrap"></section>
            </div>  
    )
}

export default Detail
