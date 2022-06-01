import {  AvatarGroup, Box, Button } from '@chakra-ui/react';
import React from 'react'
import { Avatar } from 'react-profile-avatar'
import './css/CreatePost.css';
function CreatePost() {
  return (
    <div className='createPost' >
        <div style={{height:'40px',display:'flex',width:'100%',backgroundColor:'#1d1d1d'}}>

    <Avatar 
                        name={'Ridam Nagar'}
                        colour={'#1d1d1d'}
                        className="avatar"
                      />       <div className='InputDiv'>What do you want to ask or share?</div>
        </div>
        <div className='buttons'>
            <p className='button'>Ask</p>
          <p className='button'>Answer</p>

            <p className='button'>Post</p>

            

        </div>


                
                      

                   </div>
  )
}

export default CreatePost