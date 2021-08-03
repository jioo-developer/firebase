import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import "../asset/detail.scss"
import { useHistory } from 'react-router-dom'
import Header from './Header'
import { connect } from 'react-redux'

function Detail(props) {
  let [posts,setPosts] = useState([])
  let [favoriteBtn,setFavoriteBtn] = useState(false)
  let 쿼리스트링 = new URLSearchParams(window.location.search)
  const history = useHistory();
  let user = props.user
  let locations = 쿼리스트링.get("id")

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
    db.collection("post").doc(쿼리스트링.get("id")).onSnapshot((snapshot)=>{
      let postArray = ({...snapshot.data()})
      setPosts(postArray)
    })
  },[])

  async function onDelete(e){
    e.preventDefault();
    const ok = window.confirm("정말 삭제 하시겠습니까?");
    if(ok){
      await db.doc(`post/${쿼리스트링.get("id")}`).delete().then(()=>{
        history.push("/")
      })
    }
  }
    return (
            <div className="detail_wrap">
              <Header/>
              <div className="in_wrap">
                <section className="sub_header">
                    <h1>{posts.title}</h1>
                    <div className="writer_wrap">
                        <div className="left_wrap">
                            <p className="writer">{posts.user}</p>
                            <p className="date">{posts.date}</p>
                        </div>
                        {
                          user.uid === posts.writer ? (
                            <>
                            <div className="right_wrap">
                            <button className="edit" onClick={()=>{
                              props.dispatch({type:"쿼리스트링보내기",payload:locations})
                              history.push("/edit")
                            }}>수정</button>
                            <button className="delete" onClick={onDelete}>삭제</button>
                            </div>
                            </>
                          ) : null
                        } 
                    </div>
                </section>
                <section className="content_wrap">
                  <p className="text">{posts.text}</p>
                  <figure><img src={posts.url} alt=""/></figure>
                    <div className="comment">
                      <div className="favorite_wrap">
                        <p className="com_title">게시글에 대한 의견을 달아주세요.</p>
                        <input type="checkbox" id="favorite_check" onClick={e=>{
                        if(e.target.checked){
                          db.collection("post").doc(쿼리스트링.get("id")).update({
                          favorite:posts.favorite+1
                        })
                        setCookie("Cookie","done",1)
                        setFavoriteBtn(true)
                        } 
                      }}/>
                      <label htmlFor="favorite_check" className="favorite_btn"><span>👍</span>추천&nbsp;{posts.favorite}</label>
                      </div>
                      <textarea className="comment_input"/>
                      <button className="btn">댓글 작성</button>
                    </div>
                </section>
                </div>
            </div>  
    )
}

function location공장(state){
  return{
    reducer:state.reducer
  }
}

export default connect(location공장)(Detail);
