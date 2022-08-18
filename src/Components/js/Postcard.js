import { Avatar, Box, Button } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import '../css/PostCard.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import CommentBoxCard from './CommentBoxCard';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { SiteState } from '../../Context/AskMeProvider';
import axios from 'axios';
function Postcard({postValue}) {
  const {_id,user,userName,content,designation}=postValue; 
  const {postList,signedIn}=SiteState();
  const [liked,setLiked]=useState(false);
  const [unliked,setUnliked]=useState(false);
  const [visibility,setVisibility]=useState(false);
  //const [commentList,setCommentList]=useState([]);
  const [itemToShow,setItemToShow]=useState(3);
  const [showCommentVisibility,setShowCommnentVisibility ]=useState(true);
  const comment=useRef(null);
  let {likeCount,commentList}=postValue;
  let [currCommentList,setCommentList]=useState(commentList);
  let lc=false;
  let loggedInUserId="";
  let loggedInUserName="";
  let user_designation="";
    if(localStorage.getItem("userInfo")){
      let currUser=JSON.parse(localStorage.getItem("userInfo"))
    loggedInUserName=currUser.name;
    loggedInUserId=currUser._id;
    user_designation=currUser.designation;
   lc=likeCount.includes(loggedInUserId.toString());
  } 
  //const {user}=SiteState();
   useEffect(()=>{
    setLiked(lc);
     let len=currCommentList.length;
     
     if(itemToShow<len){
         setShowCommnentVisibility(true)
       }
   },[currCommentList.length,itemToShow,JSON.stringify(postList),signedIn,lc])
  

  const handleLike=async ()=>{
   let updatePostLikes=await axios.put('/api/user/updatePostLikes',{id:_id,likeCount:likeCount,user_id:loggedInUserId.toString(),isLiked:!liked}).then((data)=>{
   });
   setLiked(!liked)
   setUnliked(false);
  }

  const handleUnLike=async ()=>{
      setUnliked(!unliked);
      setLiked(false);

  }
  const handleShowComment=()=>{
    let len=commentList.length;
   if(itemToShow+3>=len){
     setShowCommnentVisibility(false)
   }
setItemToShow(itemToShow+3)
  }
 
  const handleSubmit=async(e)=>{
    if(e.key==="Enter"){
          //console.log(comment.current.value)
          try{
     let addComment= await axios.put("/api/user/addComment",{post_id:_id,user_name:loggedInUserName,user_designation:user_designation ,comment:comment.current.value})
    if(addComment){
       setCommentList(addComment.data.commentList);
    }

      comment.current.value=""
          }catch(err){
            console.log("Some Error occurred")

          }
   
    }
  }
  return (
    <div>
      <div  className='postCard'>
        <div className='postCardHeader' >
            <div style={{width:'10%'}}>
    <Avatar name={user?userName:""} src='https://bit.ly/broken-link'size={'sm'} /> 

            </div>
            <div style={{width:'90%'}}>
                <p style={{fontWeight:'750' }}>{user?userName:"Anonymous"} <Button colorScheme={'#1d1d1d'} color='#4fa8db' fontSize={'15px'} height='5' mb={'1'}>Follow</Button></p>
                <p style={{fontSize:'12px'}} >{user?designation:""}</p>
            </div>
        </div>
        <div className='postCardBody' dangerouslySetInnerHTML={{__html:content}} ></div>
        <div className='postCardFooter' >
          <ThumbUpIcon style={{color:liked?'green':'4fa8db'}}  onClick={handleLike} />
           
          <ThumbDownIcon style={{ marginLeft:'25px',color:unliked?'#eb332d':'4fa8db' }}  onClick={handleUnLike}/>

          <CommentIcon style={{ marginLeft:'25px' }} onClick={()=>{setVisibility(!visibility)}} />
           
        </div>
      </div>
      <div>
       
        { visibility? <div className='commentSection'>
               <input type="text" className='commentBox' placeholder='Add Comment...' ref={comment} onKeyUpCapture={handleSubmit} />
                {
                  currCommentList.slice(0,itemToShow).map((item,index)=>{
                     return  <CommentBoxCard key={index} comment={item.comment} user_name={item.user_name} designation={item.user_designation} setItemToShow={setItemToShow} />
                  })
                }
                     {currCommentList.length>3 && showCommentVisibility ?(<Button colorScheme='blue' ml={'30%'} onClick={handleShowComment } ><ArrowDownwardIcon />View More Comments </Button>):(<></>) }   


        </div>:(<></>)}
      </div>
    </div>
  )
}

export default Postcard