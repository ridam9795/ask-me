import { Avatar, Button } from '@chakra-ui/react'
import React from 'react'
import { SiteState } from '../../Context/AskMeProvider';
import '../css/CommentBoxCard.css'
function CommentBoxCard({comment,setItemToShow}) {
    const {user}=SiteState();

  return (
    <div className='boxCard' >
            <div className='comment' >
            <div style={{width:'10%'}}>
    <Avatar src='https://bit.ly/broken-link' size={'sm'} /> 

            </div>
            <div style={{width:'90%',height:'auto'}}>
                <p style={{fontWeight:'750' ,fontSize:'18px'}} >{user.name} </p>
                                <p style={{fontSize:'12px'}} >Software Engineer</p>

                <p style={{color:'black',fontWeight:'400' }}>{comment}</p>
            </div>
        </div>

    </div>
  )
}

export default CommentBoxCard