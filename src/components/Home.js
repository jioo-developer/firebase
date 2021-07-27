import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Header from './Header';
import Title from './Title';
import { authService, db } from '../Firebase';
import "../asset/home.scss"
function Home() {
  const history = useHistory();
  let [posts,setPosts] = useState([])
  useEffect(()=>{
    db.collection("rlawlgh388").onSnapshot((snapshot)=>{
      let postArray = snapshot.docs.map((doc)=>({
        ...doc.data()
      }))
      setPosts(postArray)
    })
  },[])
  
  function OnLogOut(){
    authService.signOut();
    history.push("/")
  }
    return (
        <div className="main">
            <Header/>
            <div className="header">
            <Title/>
            <p className="title">J.log</p>
            <div className="menu">
            <input type="text" id="search_form"/>
            <label htmlFor="search" className="search"><img src="./img/search.svg" alt=""/></label>
            <img src="./img/profile.svg" alt="" className="profile"/>
            <img src="./img/arrow.svg" alt="" className="arrow"/>
            </div>
            </div>
            <section className="post_section">
              {
                posts.map(function(post,i){
                  return <>
                  <div className="post">
                    <figure className="thumbnail">
                      <img src="./img/test.jpg" alt=""/>
                    </figure>
                    <div className="text_wrap">
                      <p className="post_title">{post.title}</p>
                      <p className="post_text">{post.text}</p>
                      <p className="post_date">{post.date}</p>
                    </div>
                    <div className="writer_wrap">
                      <div className="id">
                        <img src="./img/profile.svg" alt="" className="profile"/>
                        <p className="profile_id">rlawlgh388</p>
                      </div>
                      <p className="favorite">🤍 0</p>
                    </div>
                  </div>
                  </>
                })
              }
            </section>
            <button className="btn" onClick={OnLogOut}>로그아웃</button>
        </div>
    )
}

export default Home
