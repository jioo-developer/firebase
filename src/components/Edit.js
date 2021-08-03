import React, { useEffect, useState } from 'react'
import "../asset/upload.scss"
import { useHistory } from 'react-router-dom';
import { db, storageService } from '../Firebase';
import {connect} from "react-redux";
function Edit(props) {
    let [posts,setPosts] = useState([])
    let [title,setTitle] = useState("")
    let [textarea,setTextarea] =  useState("");
    let [file,setFile] = useState("");
    let [fileName,setFileName] = useState("")
    let [deleteUrl,setDeleteUrl] =useState("")
    let user = props.user
    const history = useHistory();
    let locationEdit = props.reducer[0]

  useEffect(()=>{
    db.collection("post").doc(`${locationEdit}`).onSnapshot((snapshot)=>{
      let postArray = ({...snapshot.data()})
      setPosts(postArray)
    })
  },[])

    function onFileChange(e){
        const theFile = e.target.files[0];
        setFileName(theFile)
        const reader = new FileReader();
        reader.onloadend = (finished) => {
            const {
                currentTarget : {result},
            } = finished

            setFile(result)
        }
            if(theFile){
                reader.readAsDataURL(theFile)
            }
    }

    async function post(e){
        e.preventDefault();
        let attchmentUrl =""; //이미지 추출경로 변수
        if(file !== ""){
            const fileRef = storageService.ref().child(`${user.id}/${fileName.name}`)
            const response = await fileRef.putString(file,"data_url");
            attchmentUrl = await response.ref.getDownloadURL();
        }

        const content = {
            title : title,
            text: textarea,
            url : attchmentUrl
        }
        await db.doc(`post/${locationEdit}`).update(content).then(()=>{
            storageService.refFromURL(deleteUrl).delete();
            history.push(`/detail?id=${locationEdit}`)
            window.alert("수정이 완료되었습니다.")
        })

    }

    function clearPhoto(){
        setFile(null)
        let editImgs = document.querySelector(".edit_att");
        if(editImgs !== null){
            setDeleteUrl(posts.url)
            editImgs.remove();
        }
        document.querySelector(".file-form").value=null;
    }

    function enterEvent(){
        let height = document.querySelector(".text");
        if(window.event.keyCode === 13){
            height.style.height="auto";
            height.style.height = height.scrollHeight + "px";
        } else if(window.event.keyCode === 8) {
            height.style.height="auto";  
            height.style.height = height.scrollHeight + "px";
        }

        //미완
    }

    return (
        <div className="upload">
            <form onSubmit={post}>
                <input type="text" className="form-control titlearea" id="title" placeholder={posts.title}  maxLength={120} onChange={e=>setTitle(e.target.value)}/>
                <div className="textarea">
                    <textarea className="text" placeholder={posts.text} onKeyUp={enterEvent} onChange={e=>setTextarea(e.target.value)}></textarea>
                    <figure>
                    {
                        posts.url !== "" ? <img src={posts.url} className="att edit_att" alt=""/> : ""
                    }
                    {
                        file && <img src={file} className="att" alt=""/>
                    }
                    </figure>
                </div>
                <input type="file" accept="image/*" className="file-form" id="image" onChange={onFileChange}/>
                <label htmlFor="image" className="Attachment image-att">이미지를 담아주세요</label>
                <div className="bottom_wrap">
                <div className="exit" onClick={()=>{
                    history.push("/")
                }}>← &nbsp;나가기</div>
            <div className="cancel_wrap">
                <div className="delete" onClick={clearPhoto}>파일삭제</div>
                <button type="submit" className="post">글작성</button>
            </div>
            </div>
            </form>
        </div>
    )
}

function location공장(state){
    return{
        reducer : state
    }
}

export default connect(location공장)(Edit);
