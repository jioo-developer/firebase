import React, { useState } from 'react'
import "../asset/profile.scss"
import { db, storageService } from '../Firebase';

function Profile(props) {
    let [file,setFile] = useState("");
    let [fileName,setFileName] = useState("")
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

        let attchmentUrl ="";

        const fileRef = storageService.ref().child(`${user.id}.img/${fileName.name}`)
            const response = await fileRef.putString(file,"data_url");
            attchmentUrl = await response.ref.getDownloadURL();

        await db.collection("post").add(attchmentUrl)
    }
    
    function clearPhoto(){
        setFile(null)
        document.querySelector(".file-form").value=null;
    }

    return (
        <div className="profile_wrap">
            <header>
                <p className="title">J.log</p>
                <div className="menu">
                <img src="./img/profile.svg" alt="" className="profile"/>
                <img src="./img/arrow.svg" alt="" className="arrow"/>
            </div>
            </header>
            <section className="content">
                <div className="profile_area">
                    <div className="img_wrap">
                        <input type="file" accept="image/*" id="img_check"/>
                        <label htmlFor="img_check" className="profileImg">
                            <img src="./img/profile.svg" alt=""/>
                        </label>
                            <button className="uploads btn" onClick={onFileChange}>이미지 업로드</button>
                            <button className="deletes btn" onClick={clearPhoto}>이미지 제거</button>
                    </div>
                    <div className="name_area">
                        <b className="nickname">테스터</b>
                        <p className="sub_name">프론트엔드가 좋은 웹쟁이</p>
                        <button className="btn nick_btn">닉네임 수정</button>
                        <button className="btn comment_btn">코멘트 수정</button>
                    </div>
                </div>
                <div className="title_edit">
                    <div className="title_wrap">
                        <p className="title">블로그 제목</p>
                        <p className="titleName">jioo.log</p>
                        <button className="btn">수정</button>
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
            </section>
        </div>
    )
}

export default Profile
