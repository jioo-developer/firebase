import React, { useEffect, useState } from 'react'
import "../asset/upload.scss"
import { useHistory } from 'react-router-dom';
import { db, storageService } from '../Firebase';
import { connect } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize';
function Upload(props) {
    let [title,setTitle] = useState("")
    let [posts,setPosts] = useState([])
    let [textarea,setTextarea] =  useState("");
    let user = props.user
    let attchmentUrl =[];
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let day = time.getDate();
    const history = useHistory();
    let max = 10000
    let [preview,setPreview] = useState([])
    let [filename,setFileName] = useState([])
    let array = []

    useEffect(()=>{
    db.collection("post").onSnapshot((snapshot)=>{
      let postArray = snapshot.docs.map((doc)=>({
        ...doc.data()
      }))
      setPosts(postArray)
    })
  },[])

    function onFileChange(e){
    let files = Array.from(e.target.files)
    setFileName(files)
    for(var i =0; i < files.length; i++){
          const reader = new FileReader();
      if(files){
        reader.readAsDataURL(files[i])
      }

      reader.onload = async e =>{
        array.push(e.target.result)
        let copyPreview = [...preview]
        await copyPreview.push(...array);
        setPreview(copyPreview)
      }
    }
    }
    
    async function post(e){
        e.preventDefault();
        if(preview.length !== 0 ){
            for(var i=0; i<preview.length; i++){
                const fileRef = storageService.ref().child(`${user.displayName}/${filename[i].name}`)
                const response = await fileRef.putString(preview[i],"data_url");
                attchmentUrl.push(await response.ref.getDownloadURL());
            }
        } 

        const content = {
            title : title,
            text: textarea,
            user :user.displayName,
            writer : user.uid,
            date: `${year}년${month}월${day}일`,
            url : attchmentUrl.length === 0 ? "" : attchmentUrl,
            favorite : 0,
            profile : user.photoURL,
            fileName : filename.length === 0 ? "" : filename.map(function(a,i){
              return filename[i].name
            }),
            order : max-posts.length-1
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
            setPreview(null)
        }, 1000);
    }

    return (
        <div className="upload">
            <form onSubmit={post}>
                <input type="text" className="form-control titlearea" id="title" placeholder="제목을 입력하세요." maxLength={120} onChange={e=>setTitle(e.target.value)}/>
                <div className="textarea">
                    <TextareaAutosize
                    cacheMeasurements
                    contenteditable="true"
                    onHeightChange={(height) => console.log(height)}
                    className="text"
                    placeholder="당신의 이야기를 적어보세요."
                    onChange={e=>setTextarea(e.target.value)}
                    />
                    <figure>
                      {
                        preview && preview.map(function(url,i){
                          return <img src={url} alt="" className="att" key={i}></img>
                        })
                      }
                    </figure>
                </div>
                <input type="file" accept="image/*" multiple className="file-form" id="image" onChange={onFileChange}/>
                <label htmlFor="image" className="Attachment image-att">이미지를 담아주세요</label>
                <p className="warnning">※ 이미지를 한번에 업로드 해주세요. (하나씩X)</p>
                <div className="bottom_wrap">
                <div className="exit" onClick={()=>{
                    history.push("/")
                }}>← &nbsp;나가기</div>
            <div className="cancel_wrap">
                {
                  title !== "" && textarea !== "" ? <button type="submit" className="post" onClick={reset}>글작성</button> : <div className='none_text post' onClick={()=>{
                    window.alert("제목과 내용을 다 입력하셨는지 확인해주세요")
                  }}>글작성</div> 
                }
            </div>
            </div>
            </form>
        </div>
    )
}

function 게시글갯수공장(state){
  return{
    reducer:state.reducer3
  }
}

export default connect(게시글갯수공장)(Upload);

