import { Avatar, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import '../css/PostCard.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import CommentBoxCard from './CommentBoxCard';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { SiteState } from '../../Context/AskMeProvider';
function Postcard({postValue}) {
  const {_id,user,userName,content,likeCount,designation}=postValue;
  const [liked,setLiked]=useState(false);
  const [unliked,setUnliked]=useState(false);
  const [visibility,setVisibility]=useState(false);
  const [comment,setComment]=useState('');
  const [commentList,setCommentList]=useState([]);
  const [itemToShow,setItemToShow]=useState(3);
  const [showCommentVisibility,setShowCommnentVisibility ]=useState(true);
  //const {user}=SiteState();
   useEffect(()=>{
     let len=commentList.length;
     console.log(postValue)
     console.log("id: "+(_id)+" user: "+user+" content: "+content+" likes: "+likeCount+" comment: "+commentList.length+" designation: "+designation)
       if(itemToShow<len){
         setShowCommnentVisibility(true)
       }
   },[commentList.length,itemToShow])
  const handleLike=()=>{
   setLiked(!liked);
   setUnliked(false);
  }
  const handleUnLike=()=>{
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
  const handleComment=(e)=>{
    setComment(e.target.value)
  }
  const handleSubmit=(e)=>{
    if(e.key==="Enter"){
      setCommentList([comment,...commentList])
      setComment("")
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
               <input type="text" className='commentBox' placeholder='Add Comment...' value={comment} onChange={handleComment} onKeyUpCapture={handleSubmit} />
                {
                  commentList.slice(0,itemToShow).map((item,index)=>{
                     return  <CommentBoxCard key={index} comment={item} setItemToShow={setItemToShow} />
                  })
                }
                     {commentList.length>3 && showCommentVisibility ?(<Button colorScheme='blue' ml={'30%'} onClick={handleShowComment } ><ArrowDownwardIcon />View More Comments </Button>):(<></>) }   


        </div>:(<></>)}
      </div>
    </div>
  )
}

export default Postcard