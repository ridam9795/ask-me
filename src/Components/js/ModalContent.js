import React, { useRef, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Textarea, Button } from '@chakra-ui/react'
import {    Box } from '@chakra-ui/react'
import Modal from 'react-modal';
import { CloseIcon } from '@chakra-ui/icons';
import '../css/ModalContent.css';
import { SiteState } from '../../Context/AskMeProvider';

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
      const {content,setContent}=SiteState();
      const {modalIsOpen, setIsOpen,isPost,setIsPost,openModal,closeModal}=SiteState();
 
  const addQuestion=(e)=>{
        e.preventDefault();
                console.log("content: ",content)

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
                      <Textarea h={'20px'} mb={'153px'} w={'102%'} placeholder="Start your Question with 'What','How','Why', etc. "></Textarea>
                        <hr />
                        <Button colorScheme={'#1d1d1d'} onClick={closeModal} color={'white'} ml={'67%'} mr={'15px'} mt={'10px'} borderRadius={'30px'} >Cancel</Button>
                        <Button colorScheme={'blue'} mt={'10px'} borderRadius={'30px'} onClick={addQuestion} >Add question</Button>
                    </TabPanel>
                    <TabPanel>
<Textarea h={'193px'} mb={'40px'} placeholder="Say Something..."></Textarea>
                        <hr />
                        <Button colorScheme={'#1d1d1d'} onClick={closeModal} color={'white'} ml={'70%'} mr={'15px'} mt={'10px'} borderRadius={'30px'} >Cancel</Button>
                        <Button colorScheme={'blue'} mt={'10px'} borderRadius={'30px'}  >Add Post</Button>
                                         
                    </TabPanel>

                  </TabPanels>
                </Tabs>
          </Box>
         
        
        </Modal>
        </div>
  )
}

export default ModalContent