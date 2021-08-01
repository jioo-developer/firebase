import React, { useEffect, useState } from 'react'
import { Link,useHistory } from 'react-router-dom';
import { authService, db } from '../Firebase';
import "../asset/home.scss"
function Home(props) {
  const history = useHistory();
  let [posts,setPosts] = useState([])
  let [favoriteBtn,setFavoriteBtn] = useState(false)

  function setCookie(name,value,expiredays){
    let today = new Date();
    today.setDate(today.getDate() + expiredays);
    document.cookie =  `${name} = ${escape(value)}; expires =${today.toUTCString()};`
  }

  useEffect(()=>{
    let cookieCheck = document.cookie
    if(cookieCheck === "Cookie=done"){
      setFavoriteBtn(true)
    } else {
      setFavoriteBtn(false)
    }
  },[])

  useEffect(()=>{
    db.collection("post").onSnapshot((snapshot)=>{
      let postArray = snapshot.docs.map((doc)=>({
        ...doc.data(),
        id :doc.id
      }))
      setPosts(postArray)
    })
  },[])

    return (
      <div className="main">
        <div className="in_wrap">
            <header>
            <p className="title">J.log</p>
            <div className="menu">
            <img src="./img/profile.svg" alt="" className="profile"/>
            <img src="./img/arrow.svg" alt="" className="arrow"/>
            </div>
            </header>
            <section className="post_section">
              {
                posts.map(function(post,i){
                  return <>
                  <Link to="">
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
                        <p className="profile_id">{post.user}</p>
                      </div>
                      {
                        favoriteBtn ? <p className="favorite">❤{post.favorite}</p> : (
                          <>
                      <p className="favorite" onClick={()=>{
                        db.collection("post").doc(post.id).update({
                          favorite:post.favorite+1
                        })
                        setCookie("Cookie","done",1)
                        setFavoriteBtn(true)
                        }}>❤{post.favorite}</p>                          
                          </>
                        )
                      }
                    </div>
                  </div>
                  </Link>
                  </>
                })
              }
            </section>
            <button className="new-post">
              <Link to="/upload"><img src="./img/add.svg" alt=""/></Link></button>
        </div>
        </div>
    )
}

export default Home
