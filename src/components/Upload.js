import React, { useState } from 'react'
import "../asset/upload.scss"
import { Link,useHistory } from 'react-router-dom';
function Upload() {
    let [title,setTitle] = useState("")
    let [textarea,setTextarea] =  useState("");
    let [file,setFile] = useState("");
    let [fileName,setFileName] = useState("")

    const history = useHistory();
    return (
        <div className="upload">
            <form>
                <input type="text" className="form-control titlearea" id="title" placeholder="제목을 입력하세요." maxLength={120} onChange={e=>setTitle(e.target.value)}/>
                <textarea className="form-control textarea" id="text" placeholder="당신의 이야기를 적어보세요." onChange={e=>setTextarea(e.target.value)}/>
                <input type="file" accept="image/*" className="file-form" id="image"/>
                <label htmlFor="image" className="Attachment image-att">이미지를 담아주세요</label>
                <input type="file" accept="" className="file-form" id="file" />
                <label htmlFor="file" className="Attachment">파일을 담아주세요</label>
            </form>
            <div className="cancel_wrap">
                <button className="exit" onClick={()=>{
                    history.push("/")
                }}>← &nbsp;나가기</button>
                <button className="post">글작성</button>
            </div>
        </div>
    )
}

export default Upload
