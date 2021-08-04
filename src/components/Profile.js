import React, { useEffect, useState } from 'react'
import "../asset/profile.scss"
import { db, storageService } from '../Firebase';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import "../asset/header.scss"

function Profile(props) {
    let user = props.user
    let [file,setFile] = useState("");
    let [title,setTitle] = useState("")
    let [fileName,setFileName] = useState("")
    let [NameEdit,setNameEdit] = useState(false)
    let [uploadCheck,setUploadCheck] = useState(false)
    let [deleteProfile,setDeleteProfile] = useState("")
    let [preview,setpreview] = useState(false)
    let profileUrl= "";
    const history = useHistory();

    useEffect(()=>{
        setTitle(user.displayName)
        setDeleteProfile(user.photoURL)
        console.log(user.photoURL)
    },[])

    async function onFileChange(e){
        setpreview(true)
        setUploadCheck(true)
        const theFile = e.target.files[0];
        setFileName(theFile)
        const reader = new FileReader();
        reader.onloadend = (finished) => {
            const {
                currentTarget : {result},
            } = finished

            setFile(result)
            }
            reader.readAsDataURL(theFile)
    }
    
    async function clearPhoto(){
        setFile(null)
        document.querySelector("#img_check").value=null;
        storageService.refFromURL(deleteProfile).delete();
        await user.updateProfile({photoURL:"https://firebasestorage.googleapis.com/v0/b/retry-b4e10.appspot.com/o/%ED%85%8C%EC%8A%A4%ED%84%B04-profileImg%2Fdefault.svg?alt=media&token=36af18d0-c303-42d5-a190-41bf0d9f9a91"})
    }

    async function NameF(){
        setNameEdit(!NameEdit)
        await user.updateProfile({displayName : title}).then(()=>{
            setNameEdit(!NameEdit)
        })
    }

    async function uploadEnd(){
        const fileRef = storageService.ref().child(`${title}-profileImg/${fileName.name}`)
        const response = await fileRef.putString(file,"data_url");
        profileUrl = await response.ref.getDownloadURL();
        
        await user.updateProfile({photoURL : profileUrl,}).then(()=>{
            storageService.refFromURL(deleteProfile).delete();
            setpreview(false)
            setUploadCheck(false)
            window.alert("프로필 변경이 완료되었습니다.")
            history.push("/")
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
                                preview ? <img src={file} width="130px" height="135px"/> : <img src={user.photoURL} width="130px" height="135px"/>
                            }
                        </figure>
                            {
                                uploadCheck ? <div className="uploads btn" onClick={uploadEnd}>바꾸기 완료</div> : <label htmlFor="img_check" className="uploads btn" >이미지 업로드</label>
                            }
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
