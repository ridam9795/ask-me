import React from 'react'
import { SiteState } from '../../Context/AskMeProvider';
import CreatePost from '../CreatePost'
import Postcard from './Postcard'

function Post() {
        const {postList,setPostList,postContent,setPostContent,questionContent,setQuestionContent}=SiteState();

  return (
    <>
     <CreatePost />
     <div style={{marginTop:'100px'}}>
       {
         postList.map((post,index)=>{
          return   <Postcard key={index} postValue={post} />

         })
       }
          
     </div>
    

    </>
  )
}

export default Post