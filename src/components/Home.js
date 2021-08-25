import React, { useEffect, useState } from 'react'
import { Link,useHistory } from 'react-router-dom';
import { db } from '../Firebase';
import "../asset/home.scss"
import "../asset/header.scss"
import Header from './Header';
function Home(props) {
  const history = useHistory();
  let [posts,setPosts] = useState([])
  let user =props.user
  let order;

  useEffect(()=>{
    db.collection("post").onSnapshot((snapshot)=>{
      let postArray = snapshot.docs.map((doc)=>({
        ...doc.data(),
        id :doc.id
      }))
      setPosts(postArray)
    })
  },[])

    return (
      <div className="main">
        <div className="in_wrap">
            <Header/>
            <section className="post_section">
              {
                posts.map(function(post,i){
                  return <>
                  <Link to={`/detail?id=${post.id}`} style={order = {
                    order : post.order
                  }}>
                  <div className="post">
                    <figure className="thumbnail">
                      {
                        post.url === "" ? <img src="./img/no-image.jpg" alt="" height="200px"/> : <img src={post.url[0]} alt=""/>
                      }
                    </figure>
                    <div className="text_wrap">
                      <p className="post_title">{post.title}</p>
                      <p className="post_text">{post.text}</p>
                      <p className="post_date">{post.date}</p>
                    </div>
                    <div className="writer_wrap">
                      <div className="id">
                        <img src={post.profile} alt="" className="profile"/>
                        <p className="profile_id">{post.user}</p>
                      </div>
                      <p className="favorite">❤{post.favorite}</p> 
                    </div>
                  </div>
                  </Link>
                  </>
                })
              }
            </section>
            <button className="new-post">
              <Link to="/upload"><img src="./img/add.svg" alt=""/></Link></button>
        </div>
        </div>
    )
}

export default Home;

