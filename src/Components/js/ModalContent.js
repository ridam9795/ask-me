import React, { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button } from '@chakra-ui/react'
import {    Box } from '@chakra-ui/react'
import Modal from 'react-modal';
import { CloseIcon } from '@chakra-ui/icons';
import '../css/ModalContent.css';
import { SiteState } from '../../Context/AskMeProvider';
import RichTextEditor from "react-rte";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#181818',
    width:'60%',
    height:'400px',
    zIndex:100,


  },
};
function ModalContent(props) {
      const {postList,setPostList,questionList,setQuestionList,modalIsOpen,isPost,closeModal,postContent,setPostContent,questionContent,setQuestionContent}=SiteState();
      const [question,setQuestion]=useState(RichTextEditor.createEmptyValue());
            const [post,setPost]=useState(RichTextEditor.createEmptyValue());


const  onAddQuestion = value => {
    setQuestion(value );
    setQuestionContent(value.toString("html"))
  
  };
  const onAddPost=value =>{
    setPost(value);
    setPostContent(value.toString("html"))

  }

  const addQuestion=(e)=>{
        e.preventDefault();
        setQuestionList([...questionList,questionContent ])
        setQuestionContent("");
        setQuestion(RichTextEditor.createEmptyValue());
        closeModal();
  }
  const addPost=(e)=>{
    e.preventDefault();
        setPostList([...postList,postContent])
setPostContent("")
setPost(RichTextEditor.createEmptyValue())
        closeModal();
  }
  
  return (
    
      <div>
            <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Ask/Post"
      > 
          <Box className='modalHeader'>
                <CloseIcon onClick={closeModal} mr={'10px'} cursor='pointer' />
                <Tabs defaultIndex={isPost?1:0}>
                  <TabList>
                    <Tab w={'365px'} >Add Question </Tab>
                    <Tab w={'365px'}>Create Post</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                              <RichTextEditor
                               editorClassName="edit"
                            toolbarClassName="toolbar"
                              value={question} onChange={onAddQuestion} />
                        <hr />
                        <Button colorScheme={'#1d1d1d'} onClick={closeModal} color={'white'} ml={'67%'} mr={'15px'} mt={'10px'} borderRadius={'30px'} >Cancel</Button>
                        <Button colorScheme={'blue'} mt={'10px'} borderRadius={'30px'} onClick={addQuestion} >Add question</Button>
                    </TabPanel>
                    <TabPanel>
                        <RichTextEditor
                               editorClassName="edit"
                            toolbarClassName="toolbar"
                              value={post} onChange={onAddPost} />
                        <hr />
                        <Button colorScheme={'#1d1d1d'} onClick={closeModal} color={'white'} ml={'70%'} mr={'15px'} mt={'10px'} borderRadius={'30px'} >Cancel</Button>
                        <Button colorScheme={'blue'} mt={'10px'} borderRadius={'30px'} onClick={addPost}  >Add Post</Button>
                                         
                    </TabPanel>

                  </TabPanels>
                </Tabs>
          </Box>
         
        
        </Modal>
        </div>
  )
}

export default ModalContent