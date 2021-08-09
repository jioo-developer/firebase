import React, { useEffect, useState } from 'react'
import "../asset/upload.scss"
import { useHistory } from 'react-router-dom';
import { db, storageService } from '../Firebase';
import {connect} from "react-redux";
import TextareaAutosize from 'react-textarea-autosize';
function Edit(props) {
    let [posts,setPosts] = useState([])
    let [file,setFile] = useState("");
    let [fileName,setFileName] = useState("")
    let [fileCheck,setFilecheck] = useState(false)
    let [changeFile,setChangeFile] = useState(false)
    let [title,setTitle] = useState("")
    let [textarea,setTextarea] =  useState("");
    let deleteImg;
    let user = props.user
    const history = useHistory();
    let locationEdit = props.reducer[0]
    let [attchmentUrl,setattchmentUrl] = useState("")
    let [fileNamed,setFileNamed] = useState("")
    let [deleteBtn,setDeleteBtn] = useState(false)
    let [유지,set유지] = useState(false)

  useEffect(()=>{
    db.collection("post").doc(`${locationEdit}`).onSnapshot((snapshot)=>{
      let postArray = ({...snapshot.data()})
      setPosts(postArray)
    })
    document.querySelector(".cancel_wrap").style.width="240px"
    document.querySelector(".warnning").style.fontSize="14px"
    document.querySelector(".warnning").style.color="gray"
  },[])
  useEffect(()=>{
    setTitle(posts.title)
    setTextarea(posts.text)
    deleteImg = posts.url
    setattchmentUrl(deleteImg)
    setFileNamed(posts.fileName)
  },[posts])
  
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
        set유지(true)
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

    async function post(e){
        e.preventDefault();
        if(file !== ""){
            const fileRef = storageService.ref().child(`${user.displayName}/${fileName.name}`)
            const response = await fileRef.putString(file,"data_url");
            attchmentUrl = await response.ref.getDownloadURL();
        }

        const content = {
            title : title,
            text : textarea,
            url : attchmentUrl,
            fileName : deleteBtn === true || file === "" ? "" : fileName.name
        }
        await db.doc(`post/${locationEdit}`).update(content).then(()=>{
            if(deleteBtn === false && 유지 === true){
                let storageRef = storageService.ref();
                let imagesRef = storageRef.child(`${posts.user}/${fileNamed}`)
                imagesRef.delete().then(()=>{
                console.log("성공")
            })
            }
            window.alert("수정이 완료되었습니다.")
            history.push(`/detail?id=${locationEdit}`)
        })
    }

    async function deletes() {
            setFilecheck(true)
            setChangeFile(false)
            setattchmentUrl("")
            document.querySelector("figure").remove();
            let storageRef = storageService.ref();
            let imagesRef = storageRef.child(`${posts.user}/${fileNamed}`)
            imagesRef.delete().then(()=>{
             console.log("성공")
            })
            setDeleteBtn(true)
    }

    return (
        <div className="upload">
            <form onSubmit={post}>
                <input type="text" className="form-control titlearea" id="title" value={title}  maxLength={120} onChange={e=>setTitle(e.target.value)}/>
                <div className="textarea">
                    <TextareaAutosize
                    cacheMeasurements
                    onHeightChange={(height) => console.log(height)}
                    className="text"
                    value={textarea} 
                    onChange={e=>setTextarea(e.target.value)}
                    />
                    <div>
                    <figure>
                        {
                            posts.url === "" ? "" : <img src={posts.url} className="att"  alt=""/>
                        }
                    </figure>
                    </div>
                </div>
                <input type="file" accept="image/*" className="file-form" id="image" onChange={onFileChange}/>
                <label htmlFor="image" className="Attachment image-att">이미지를 담아주세요</label>
                <p className="warnning">※ 파일삭제는 게시글에 이미지를 안넣고 싶을 때만 사용해주세요.</p>
                <div className="bottom_wrap">
                <div className="exit" onClick={()=>{
                    history.push(`/detail?id=${locationEdit}`)
                }}>← &nbsp;나가기</div>
            <div className="cancel_wrap">
                <div className="delete" onClick={deletes}>파일삭제</div>
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
