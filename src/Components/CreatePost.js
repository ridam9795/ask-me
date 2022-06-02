import React from 'react'
import { Avatar } from 'react-profile-avatar'
import './css/CreatePost.css';
import ModalContent from './js/ModalContent';
function CreatePost(props) {
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
            <p className='button' onClick={()=>props.openModal("ask")} >Ask</p>
          <p className='button'>Answer</p>

            <p className='button' onClick={()=>props.openModal("post")}  >Post</p>
                   <ModalContent content={props}/> 


            

        </div>


                
                      

                   </div>
  )
}

export default CreatePost