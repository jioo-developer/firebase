import React, { useEffect, useState } from 'react'
import { db, storageService } from '../Firebase'
import "../asset/detail.scss"
import { useHistory } from 'react-router-dom'
import Header from './Header'
import { connect } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize';
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
  let [commentChange,setCommentChange] = useState(false)
  let [newComment,setNewComment] = useState("")

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
        ...doc.data(),
        id: doc.id
      }))
      setreply(replyArray)
    })

  },[])

  useEffect(()=>{
    setFileNamed(posts.fileName)
  },[posts])

  async function onDelete(e){
    e.preventDefault();
    const ok = window.confirm("정말 삭제 하시겠습니까?");
    let locate = db.collection("post").doc(쿼리스트링.get("id"))
    if(ok){
      reply.map(function(a,i){
        locate.collection("reply").doc(reply[i].id).delete();
      })
      await locate.delete().then(()=>{
        history.push("/")
      });
      let storageRef = storageService.ref();
      let imagesRef = storageRef.child(`${posts.user}/${fileNamed}`)
      imagesRef.delete()
    }
  }

  async function commentUpload(e){
    e.preventDefault();
    var comment_content = {
          replyrer : uid,
          comment : comment,
          date: `${year}년${month}월${day}일`,
          profile : user.photoURL,
          uids : user.uid
    };

    await db.collection("post").doc(locations).collection("reply").add(comment_content).then(()=>{
      window.alert("댓글을 달았습니다.")
      document.querySelector(".comment_input").value=""
    })
  }

  function edit_reply(e){
    setCommentChange(true)
    let btn = e.target.getAttribute("data-index")
    let tests = Array.from(document.querySelectorAll(".reply_text"))
    tests.forEach((index)=>{
      var indexData = index.getAttribute("data-index")
      if(btn === indexData){
        document.querySelector(`.reply_text${indexData}`).classList.add("none")
        document.querySelector(`.reply_input${indexData}`).classList.add("block")
      }
    })
  }

    function edit_end(e){
    setCommentChange(false)
    let btn = e.target.getAttribute("data-index")
    let inputs = Array.from(document.querySelectorAll(".reply_input"))
    inputs.map(function(a,i){
      var indexInput = a.getAttribute("data-index")
      if(btn === indexInput){
        document.querySelector(`.reply_text${i}`).classList.remove("none")
        document.querySelector(`.reply_input${i}`).classList.remove("block")
        var indexID = document.querySelector(`.reply_input${i}`).getAttribute("data-id")
        db.collection("post").doc(locations).collection("reply").doc(indexID).update({comment:newComment})
      }
    })
  }

  function reply_delete(e){
    let btn = e.target.getAttribute("data-index")
    let deletes = Array.from(document.querySelectorAll(".reply_text"))
    deletes.map(function(a,i){
      var deleteIndex = a.getAttribute("data-index")
      if(btn === deleteIndex){
        var deleteID = document.querySelector(`.reply_text${i}`).getAttribute("data-id")
        const ok = window.confirm("정말 삭제 하시겠습니까?");
        if(ok){
          db.collection("post").doc(locations).collection("reply").doc(deleteID).delete();
        }
      }
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
                        <p className="com_title">게시글에 대한 댓글을 달아주세요.</p>
                        <input type="checkbox" id="favorite_check" onClick={e=>{
                        if(e.target.checked){
                          db.collection("post").doc(쿼리스트링.get("id")).update({
                          favorite:posts.favorite+1
                        }).then(()=>{
                        setCookie("Cookie","done",1)
                        setFavoriteBtn(true)
                        })
                        } 
                      }}/>
                      {
                        favoriteBtn !==  true ? <label htmlFor="favorite_check" className="favorite_btn"><span>👍</span>추천&nbsp;{posts.favorite}</label> : <div className="favorite_btn"><span>👍</span>추천&nbsp;{posts.favorite}</div>
                      }
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
                            {
                              user.uid === com.uids ? (
                                <>
                                <div className="edit_comment">
                                  {
                                    commentChange === false ? (
                                      <>
                                      <div className="edit btns" data-index={i} onClick={edit_reply}>수정</div>
                                      </>
                                    ) : <div className="edit btns" data-index={i} onClick={edit_end}>완료</div>
                                  }
                                  <div className="delete btns" data-index={i} onClick={reply_delete}>삭제</div>
                                </div>
                                </>
                              ) : null
                            }
                            </div>
                              <p className={`reply_text reply_text${i}`} data-id={com.id} data-index={i}>{com.comment}</p>
                              <input type="text" className={`reply_input reply_input${i} form-control`} placeholder={com.comment}  data-index={i} data-id={com.id} onChange={e=>setNewComment(e.target.value)}/>
                            </div>
                            </>
                          })
                        }
                      <form onSubmit={commentUpload}>
                      <TextareaAutosize
                      cacheMeasurements
                      onHeightChange={(height) => console.log(height)}
                      minRows={4}
                      className="comment_input"
                      onChange={e=>setcomment(e.target.value)}
                    />
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
