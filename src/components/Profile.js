import React, { useEffect, useState } from 'react'
import "../asset/profile.scss"
import { db, storageService } from '../Firebase';
import Header from './Header';
import "../asset/header.scss"

function Profile(props) {
    let user = props.user
    let [file,setFile] = useState("");
    let [title,setTitle] = useState("")
    let [comment,setcomment] = useState("")
    let [fileName,setFileName] = useState("")
    let [commentEdit,setCommentEdit] = useState(false)
    let [NameEdit,setNameEdit] = useState(false)

    useEffect(()=>{
        setTitle(user.displayName)
    },[])

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

    async function NameF(){
        setNameEdit(!NameEdit)
        await user.updateProfile({displayName : title}).then(()=>{
            setNameEdit(!NameEdit)
        })
    }

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
                        {
                            NameEdit ? <input type="text" value={title} className="form-control" onChange={e=>setTitle(e.target.value)}/> : <b className="nickname">{user.displayName}</b>
                        }
                        {
                             NameEdit ? <button className="btn comment_btn" onClick={NameF}>수정완료</button> : <button className="btn comment_btn" onClick={()=>{
                                setNameEdit(true)
                            }}>닉네임 수정</button>
                        }
                    </div>
                </div>
                <div className="suggest">
                    <p className="suggest_title">문의사항</p>
                    <p className="director_email">rlawlgh388@naver.com</p>
                </div>
                <div className="withdrawal">
                    <div className="delete_wrap">
                        <p className="withdrawal_title">회원 탈퇴</p>
                        <button className="btn">회원 탈퇴</button>
                    </div>
                    <p className="explan">탈퇴 시 작성한 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.</p>
                </div>
            </section>
        </div>
    )
}

export default Profile
