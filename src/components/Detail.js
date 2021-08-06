import React, { useEffect, useState } from 'react'
import { db, storageService } from '../Firebase'
import "../asset/detail.scss"
import { useHistory } from 'react-router-dom'
import Header from './Header'
import { connect } from 'react-redux'

function Detail(props) {
  let [posts,setPosts] = useState([])
  let [favoriteBtn,setFavoriteBtn] = useState(false)
  let 쿼리스트링 = new URLSearchParams(window.location.search)
  let [reply,setreply] = useState([])
  let [comment,setcomment] = useState("")
  const history = useHistory();
  let user = props.user
  var uid = user.displayName
  var id = user.uid
  let time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth()+1;
  let day = time.getDate();
  let locations = 쿼리스트링.get("id")
  let [fileNamed,setFileNamed] = useState("")

  function setCookie(name,value,expiredays){
    let today = new Date();
    today.setDate(today.getDate() + expiredays);
    document.cookie =  `${name} = ${escape(value)}; expires =${today.toUTCString()};`
  }

  useEffect(()=>{
    db.collection("post").doc(쿼리스트링.get("id")).onSnapshot((snapshot)=>{
      let postArray = ({...snapshot.data()})
      setPosts(postArray)
    })
      let cookieCheck = document.cookie
      if(cookieCheck === "Cookie=done"){
        setFavoriteBtn(true)
    } else {
        setFavoriteBtn(false)
    }

    db.collection("post").doc(쿼리스트링.get("id")).collection("reply").onSnapshot((replys)=>{
      let replyArray = replys.docs.map((doc)=>({
        ...doc.data()
      }))
      setreply(replyArray)
    })

  },[])

  useEffect(()=>{
    console.log(reply)
  },[reply])

  useEffect(()=>{
    setFileNamed(posts.fileName)
  },[posts])

  async function onDelete(e){
    e.preventDefault();
    const ok = window.confirm("정말 삭제 하시겠습니까?");
    if(ok){
      await db.doc(`post/${쿼리스트링.get("id")}`).delete().then(()=>{
        history.push("/")
      })
      let storageRef = storageService.ref();
      let imagesRef = storageRef.child(`${posts.user}/${fileNamed}`)
      imagesRef.delete().then(()=>{
          console.log("성공")
      })
    }
  }

  async function commentUpload(e){
    e.preventDefault();
    var comment_content = {
          replyrer : uid,
          comment : comment,
          date: `${year}년${month}월${day}일`,
          profile : user.photoURL
    };

    await db.collection("post").doc(locations).collection("reply").doc(id).set(comment_content).then(()=>{
      window.alert("댓글을 달았습니다.")
    })
  }
    return (
            <div className="detail_wrap">
              <Header/>
              <div className="in_wrap">
                <section className="sub_header">
                    <h1>{posts.title}</h1>
                    <div className="writer_wrap">
                        <div className="left_wrap">
                          <img src={posts.profile} alt="" className="profile"/>
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
                  <div> <figure><img src={posts.url} alt="" className="imgs"/></figure></div>
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
                        {
                          reply.map(function(com,i){
                            return <>
                            <div className="reply_wrap">
                            <div className="user_info">
                            <img src={com.profile} alt=""/>
                            <div className="user_text">
                            <p className="reply_name">{com.replyrer}</p>
                            <p className="reply_date">{com.date}</p>
                            </div>
                            <div className="edit_comment">
                              <div className="edit btns">수정</div>
                              <div className="delete btns">삭제</div>
                            </div>
                            </div>
                            <p className="reply_text">{com.comment}</p>
                            </div>
                            </>
                          })
                        }
                      <form onSubmit={commentUpload}>
                      <textarea className="comment_input" onChange={e=>setcomment(e.target.value)}/>
                      <button className="btn">댓글 작성</button>
                      </form>
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
