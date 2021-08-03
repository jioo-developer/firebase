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
    let [fileCheck,setFilecheck] = useState(false)
    let [changeFile,setChangeFile] = useState(false)
    let user = props.user
    const history = useHistory();
    let locationEdit = props.reducer[0]

  useEffect(()=>{
    db.collection("post").doc(`${locationEdit}`).onSnapshot((snapshot)=>{
      let postArray = ({...snapshot.data()})
      setPosts(postArray)
    })
  },[])

     useEffect(()=>{
        if(fileCheck){
            let img = document.createElement("img");
            img.src=`${file}`
            img.classList.add("att")
            document.querySelector("figure").append(img)
        }
        if(changeFile){
            let img = document.createElement("img");
            img.src=`${file}`
            img.classList.add("att")
            document.querySelector("figure").append(img)
            }
    },[file])

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

        let findImg =document.querySelector(".att");
        if(findImg !== null){
            findImg.remove();
            setChangeFile(true)
        } else {
            setFilecheck(true)
        }
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

    async function clearPhoto(){
        setFilecheck(true)
        setChangeFile(false)
        document.querySelector(".att").remove();
    }

    async function post(e){
        e.preventDefault();
        let attchmentUrl = "";
        if(file !== ""){
            const fileRef = storageService.ref().child(`${user.id}/${fileName.name}`)
            const response = await fileRef.putString(file,"data_url");
            attchmentUrl = await response.ref.getDownloadURL();
        }

        const content = {
            title : title,
            text : textarea,
            url : attchmentUrl
        }

        await db.doc(`post/${locationEdit}`).update(content).then(()=>{
            history.push(`/detail?id=${locationEdit}`)
            window.alert("수정이 완료되었습니다.")
        })
    }

    return (
        <div className="upload">
            <form onSubmit={post}>
                <input type="text" className="form-control titlearea" id="title" placeholder={posts.title === "" ? "제목을 입력해주세요" : posts.title} maxLength={120} onChange={e=>setTitle(e.target.value)}/>
                <div className="textarea">
                    <textarea className="text" placeholder={posts.text === "" ? "당신의 이야기를 입력해주세요" : posts.text} onKeyUp={enterEvent} onChange={e=>setTextarea(e.target.value)}></textarea>
                    <figure>
                        {
                            posts.url === "" ? "" : <img src={posts.url} className="att" alt=""/>
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
        reducer : state.reducer
    }
}

export default connect(location공장)(Edit);
