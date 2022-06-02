import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import {    Box } from '@chakra-ui/react'
import Modal from 'react-modal';
import { CloseIcon } from '@chakra-ui/icons';
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
    console.log("content: ",props.content.isPost)
  return (
      <div>
            <Modal
        isOpen={props.content.modalIsOpen}
        onAfterOpen={props.content.afterOpenModal}
        onRequestClose={props.content.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      > 
          <Box className='modalHeader'>
                <CloseIcon onClick={props.content.closeModal} mr={'10px'} cursor='pointer' />
                <Tabs defaultIndex={props.content.isPost?1:0}>
                  <TabList>
                    <Tab w={'400px'} >Add Question </Tab>
                    <Tab w={'400px'}>Create Post</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                      <p>two!</p>
                    </TabPanel>

                  </TabPanels>
                </Tabs>
          </Box>
        </Modal>
        </div>
  )
}

export default ModalContent