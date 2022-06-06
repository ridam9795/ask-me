import React from 'react'
import CreatePost from '../CreatePost'
import Postcard from './Postcard'

function Post() {
  return (
    <>
     <CreatePost />
     <div style={{marginTop:'100px'}}>
 <Postcard />
          <Postcard />

     <Postcard />
     </div>
    

    </>
  )
}

export default Post