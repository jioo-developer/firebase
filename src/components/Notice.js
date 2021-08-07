import React from 'react'
import Header from './Header'
import "../asset/notice.scss"

function Notice() {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let day = time.getDate();
    const noticeData = [
        {title:"좋아요 기능안내",
        text : "좋아요 기능은 무분별한 좋아요를 방지하고자 하루에 한번만 누를 수 있게 제작하였습니다."
        },
        {title:"닉네임 변경 기능안내",
        text : "닉네임 변경 시 이전에 작성하신 게시물들의 작성자는 바뀌지 않습니다."
        },
        {title:"사진 업로드 기능안내",
        text : "현재 베타버전이기 때문에 사진은 한장만 올라갑니다 양해 부탁드립니다."
        },
        {title:"비밀번호 변경문의 안내",
        text : "비밀번호 변경은 비밀번호 찾기를 통해 이메일로 전송되는 메일을 통해 변경 하실 수 있습니다."
        }
    ]
    return (
        <div className="notice_wrap">
            <Header/>
            <section className="post_area">
             {
                 noticeData.map(function(data,i){
                     return <>
                        <div className={`in_wrap in_wrap${i}`}>
                            <div className="notice">
                                <figure><img src="./img/default.svg" alt=""/></figure>
                                <div className="text_wrap">
                                <p className="notice_title">{noticeData[i].title}</p>
                                <p className="notice_text">{noticeData[i].text}</p>
                                <div className="tag">
                                <p className="tag_in">공지사항</p>
                            </div>
                            <div className="post_date">{`${year}년${month}월${day}일`}</div>
                        </div>
                      </div>
                     </div>
                     </>
                 })
             }
            </section>
        </div>
    )
}

export default Notice;
