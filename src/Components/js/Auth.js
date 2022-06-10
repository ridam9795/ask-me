import React, { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, Text, Input } from '@chakra-ui/react'
import {    Box } from '@chakra-ui/react'
import Modal from 'react-modal';
import '../css/ModalContent.css';
const customStyles = {
  content: {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#181818',
    width:'33%',
    height:'475px',
    zIndex:100,


  },
};
function Auth({openAuth,setOpenAuth,closeAuthModal}) {
 
  return (
    
      <>
            <Modal
        isOpen={openAuth}
        onRequestClose={closeAuthModal}
        style={customStyles}
        contentLabel="Sign in/Sign up"
      > 
         <Box>
             <Text color={'white'} textAlign={'center'} fontSize={'40px'} >Create Account</Text>
         </Box>
         <Box mt={'10%'} >
             <Button colorScheme={'#1d1d1d'} border={'3px solid white'} w={'80%'} ml={'10%'}>Login With google</Button>
              <Text color={'white'} textAlign={'center'} mt={'8%'} mb={'5%'}>OR</Text>
           <Input type="text" placeholder='Enter Email' w={'80%' } ml={'10%'} color={'white'}/>
            <Input type="password" placeholder='Enter Email' w={'80%' } ml={'10%'} color={'white'} mt={'5%'}/>

         </Box>  
         <Box mt={'5%'} >
           <Button ml={'10%'} colorScheme={'red'} w={'80%'} >Create Account</Button>
          <div style={{display:'flex'}} ><p style={{color:'white',textAlign:'center',marginTop:'10px',marginLeft:'20%' }}>Already have an account ? </p><p style={{color:'#2ee677',marginTop:'10px',marginLeft:'5px',cursor:'pointer',textDecoration:'underline' }}> Sign in</p> </div> 
          </Box>   
         
        
        </Modal>
        </>
  )
}

export default Auth