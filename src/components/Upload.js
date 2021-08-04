import React, { useState } from 'react'
import "../asset/upload.scss"
import { useHistory } from 'react-router-dom';
import { db, storageService } from '../Firebase';
function Upload(props) {
    let [title,setTitle] = useState("")
    let [textarea,setTextarea] =  useState("");
    let [file,setFile] = useState("");
    let [fileName,setFileName] = useState("")
    let user = props.user
    let attchmentUrl ="";
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let day = time.getDate();
    const history = useHistory();

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
        if(file !== "" ){
            const fileRef = storageService.ref().child(`${user.displayName}/${fileName.name}`)
            const response = await fileRef.putString(file,"data_url");
            attchmentUrl = await response.ref.getDownloadURL();
        } 

        const content = {
            title : title,
            text: textarea,
            user :user.displayName,
            writer : user.uid,
            date: `${year}년${month}월${day}일`,
            url : attchmentUrl,
            favorite : 0
        }

        await db.collection("post").add(content).then(()=>{
            window.alert("포스트가 업로드 되었습니다.")
            history.push("/")
        })
    }

    function reset(){
        document.querySelector("#title").value="";
        document.querySelector(".text").value="";
        document.querySelector(".file-form").value=null;
        setTimeout(() => {
            setFile(null)
        }, 1000);
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
                <input type="text" className="form-control titlearea" id="title" placeholder="제목을 입력하세요." maxLength={120} onChange={e=>setTitle(e.target.value)}/>
                <div className="textarea">
                    <textarea className="text" placeholder="당신의 이야기를 적어보세요." onKeyUp={enterEvent} onChange={e=>setTextarea(e.target.value)}></textarea>
                    <figure>
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
                <button type="submit" className="post" onClick={reset}>글작성</button>
            </div>
            </div>
            </form>
        </div>
    )
}

export default Upload
