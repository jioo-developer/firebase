import React, { useState } from 'react'
import "../asset/profile.scss"
import { db, storageService } from '../Firebase';
import Header from './Header';
import "../asset/header.scss"

function Profile(props) {
    let [file,setFile] = useState("");
    let [title,setTitle] = useState("")
    let [comment,setcomment] = useState("")
    let [fileName,setFileName] = useState("")
    let [commentEdit,setCommentEdit] = useState(false)
    let [NameEdit,setNameEdit] = useState(false)
    let user = props.user

    async function onFileChange(e){
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
    
    function clearPhoto(){
        setFile(null)
        document.querySelector("#img_check").value=null;
    }

    async function comEdit(e){}

    return (
        <div className="profile_wrap">
            <Header/>
            <section className="content">
                <div className="profile_area">
                    <div className="img_wrap">
                        <input type="file" accept="image/*" id="img_check" onChange={onFileChange}/>
                        <figure className="profileImg">
                            {
                                file ? <img src={file} width="130px" height="auto"/> : <img src="./img/default.svg" alt=""/>
                            }
                        </figure>
                            <label htmlFor="img_check" className="uploads btn">이미지 업로드</label>
                            <button className="deletes btn" onClick={clearPhoto}>이미지 제거</button>
                    </div>
                    <div className="name_area">
                        <b className="nickname">{user.displayName}</b>
                        {
                            commentEdit ? <input type="text"  className="form-control" onChange={e=>setTitle(e.target.value)}/> : <p className="sub_name">프론트엔드가 좋은 웹쟁이</p>
                        }
                        {
                            commentEdit ? <button className="btn comment_btn" onClick={comEdit}>수정완료</button> : <button className="btn comment_btn" onClick={()=>{
                                setCommentEdit(true)
                            }}>코멘트 수정</button>
                        }
                    </div>
                </div>
                <div className="title_edit">
                    <div className="title_wrap">
                        <p className="title">블로그 제목</p>
                        {
                            NameEdit ? <input type="text" className="form-control"/> : <p className="titleName">{user.displayName}</p>
                        }
                        <button className="btn" onClick={()=>{
                            setNameEdit(!NameEdit)
                        }}>{
                            NameEdit ? "완료" : "수정"
                        }</button>
                    </div>
                    <p className="explan">개인 페이지의 좌측 상단에 나타나는 페이지 제목입니다.</p>
                </div>
                <div className="withdrawal">
                    <div className="delete_wrap">
                        <p className="withdrawal_title">회원 탈퇴</p>
                        <button className="btn">회원 탈퇴</button>
                    </div>
                    <p className="explan">탈퇴 시 작성한 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.</p>
                </div>
                < button className="end_btn">완료</button>
            </section>
        </div>
    )
}

export default Profile
