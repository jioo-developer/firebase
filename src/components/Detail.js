import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import "../asset/detail.scss"
import { useHistory } from 'react-router-dom'
import Header from './Header'

function Detail(props) {
  let [posts,setPosts] = useState([])
  let 쿼리스트링 = new URLSearchParams(window.location.search)
  const history = useHistory();
  let user = props.user
  useEffect(()=>{
    db.collection("post").doc(쿼리스트링.get("id")).onSnapshot((snapshot)=>{
      let postArray = ({...snapshot.data()})
      setPosts(postArray)
    })
  },[])

  console.log(posts)

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
                          user && (
                            <>
                            <div className="right_wrap">
                            <button className="edit">수정</button>
                            <button className="delete" onClick={onDelete}>삭제</button>
                            </div>
                            </>
                          )
                        }
                    </div>
                </section>
                <section className="content_wrap">
                  <p className="text">{posts.text}</p>
                  <figure><img src={posts.url} alt=""/></figure>
                    <div className="comment">
                      <p className="com_title">게시글에 대한 의견을 달아주세요.</p>
                      <textarea className="comment_input"/>
                      <button className="btn">댓글 작성</button>
                    </div>
                </section>
                </div>
            </div>  
    )
}

export default Detail
