import { CloseIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import '../css/PostCard.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';

function Postcard() {
  const [liked,setLiked]=useState(false);
  const [unliked,setUnliked]=useState(false);
  const [visibility,setVisibility]=useState(false);

  const handleLike=()=>{
   setLiked(!liked);
   setUnliked(false);
  }
  const handleUnLike=()=>{
      setUnliked(!unliked);
      setLiked(false);

  }
  return (
    <div>
      <div  className='postCard'>

      
      
        <div className='postCardHeader' >
            <div style={{width:'10%'}}>
    <Avatar src='https://bit.ly/broken-link'size={'sm'} /> 

            </div>
            <div style={{width:'90%'}}>
                <p>Ridam Nagar . <Button colorScheme={'#1d1d1d'} color='#4fa8db' fontSize={'15px'} height='5' mb={'1'}>Follow</Button></p>
                <p style={{fontSize:'12px'}} >Software Engineer</p>
            </div>
        <CloseIcon />
        </div>
        <div className='postCardBody' >dsd</div>
        <div className='postCardFooter' >
          <ThumbUpIcon style={{color:liked?'green':'4fa8db'}}  onClick={handleLike} />
          <ThumbDownIcon style={{ marginLeft:'25px',color:unliked?'#eb332d':'4fa8db' }}  onClick={handleUnLike}/>

          <CommentIcon style={{ marginLeft:'25px' }} onClick={()=>{setVisibility(!visibility)}} />
           
        </div>
      </div>
      <div>
        { visibility? <div className='commentSection'>
               <input type="text" className='commentBox' placeholder='Add Comment...' />
        </div>:(<></>)}
      </div>
    </div>
  )
}

export default Postcard