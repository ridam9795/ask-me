import { Box } from '@chakra-ui/react';
import React from 'react'
import { SiteState } from '../../Context/AskMeProvider';
import CreatePost from '../CreatePost'
import Postcard from './Postcard'

function Post() {
        const {postList}=SiteState();

  return (
    <>
     <CreatePost />
     <div style={{marginTop:'100px'}}>
       {
        postList.length>0? postList.map((post,index)=>{
          return   <Postcard key={index} postValue={post} />

         }):(<Box ml={'100%'} w={'100%'} fontSize={'40px'} color={'white'} mt={'40%'} fontWeight={'800'} > Add your Post here</Box>)
       }
          
     </div>
    

    </>
  )
}

export default Post