import { Avatar } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';
import './css/CreatePost.css';
import ModalContent from './js/ModalContent';
function CreatePost(props) {
  return (
    <div className='createPost' >
        <div style={{height:'40px',display:'flex',width:'100%',backgroundColor:'#1d1d1d'}}>

    <Avatar src='https://bit.ly/broken-link'size={'sm'} /> 
          <div className='InputDiv'>What do you want to ask or share?</div>
        </div>
        <div className='buttons'>
            <p className='button' onClick={()=>props.openModal("ask")} >Ask</p>
          <p className='button'><Link to="/answer" > Answer</Link></p>

            <p className='button' onClick={()=>props.openModal("post")}  >Post</p>
                   <ModalContent content={props}/> 


            

        </div>


                
                      

                   </div>
  )
}

export default CreatePost