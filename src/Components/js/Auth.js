import React, { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, Text, Input, Img } from '@chakra-ui/react'
import {    Box } from '@chakra-ui/react'
import Modal from 'react-modal';
import '../css/ModalContent.css';
import { FormLabel, useToast } from '@chakra-ui/core';
import googleIcon from '../../../src/googleIcon.png'
import { SiteState } from '../../Context/AskMeProvider';
import axios from 'axios';

const customStyles = {
  content: {
    top: '56%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#181818',
    width:'33%',
    height:'550px',
    zIndex:100,


  },
};
function Auth({openAuth,setOpenAuth,closeAuthModal}) {
 const [signUpEmail,setSignUpEmail]=useState("");
 const [signUpPass,setSignUpPass]=useState("");
  const [signUpName,setSignUpName]=useState("");
 const [signUpConfPass,setSignUpConfPass]=useState("");
 const [signInEmail,setSignInEmail]=useState("");
 const [signInPass,setSignInPass]=useState("");
 const {signedIn,setSignedIn,user,setUser}=SiteState();
 const [designation,setDesignation]=useState("");

const proxy="http:localhost:5000/"
 const toast=useToast();
axios.defaults.baseURL = 'http://localhost:5000';

 const handleLogin=async(e)=>{
  console.log("Login",signInEmail,signInPass,"e: ",e)
  if(!signInEmail || !signInPass ){
   toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
  }

  try{

  const {data} = await axios.post('/api/user/login',{signInEmail,signInPass})
  console.log("returned data",data)
  setSignedIn(true);
  localStorage.setItem("userInfo",JSON.stringify(data));
  setUser(data);
  
  }catch(error){
     toast({
        title: "Error Occured!",
        status: error.response.data.message,
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

  }
 }
 const handleSignup= async ()=>{
  console.log("Sign up",signUpEmail,signUpPass,signUpName,signUpConfPass,designation)
  if(!signUpEmail || !signUpPass || !signUpName || !signUpConfPass ){
   toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
  }
  if( signUpPass!==signUpConfPass ){
     toast({
        title: "password and confirm password must be same",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
  }
  try{

  const {data} = await axios.post('/api/user/',{signUpName,signUpEmail,signUpPass,designation})
  console.log("returned data",data)
  setSignedIn(true);
  localStorage.setItem("userInfo",JSON.stringify(data));
  setUser(data);
  }catch(error){
     toast({
        title: "Error Occured!",
        status: error.response.data.message,
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

  }
 




 }

  return (
    
      <>
            <Modal
        isOpen={openAuth}
        onRequestClose={closeAuthModal}
        style={customStyles}
        contentLabel="Sign in/Sign up"
      > 
      <Tabs variant='soft-rounded' colorScheme='blue'>
  <TabList>
    <Tab w={'50%'}>Sign in</Tab>
    <Tab w={'50%'}>Sign up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
     <Box>
     
         <Box mt={'15%'} >
             <Button  fontWeight={'600'} colorScheme={'#1d1d1d'} border={'3px solid white'} w={'80%'} ml={'10%'}>
              <Img h={'7'} mr={'2'} ml={'-5'} src={googleIcon} alt="google_icon" />
              Login With google</Button>
              <Text color={'white'} textAlign={'center'} mt={'8%'} mb={'5%'}>OR</Text>
           <Input 
           type="text" 
           placeholder='Enter Email' 
           w={'80%' } 
           ml={'10%'} 
           color={'white'} 
           onChange={(e)=>{setSignInEmail(e.target.value)}}
           value={signInEmail}
           />
            <Input 
            type="password" 
            placeholder='Enter password'
             w={'80%' } 
             ml={'10%'} 
             color={'white'} 
             mt={'5%'}
             onChange={(e)=>{setSignInPass(e.target.value) }}
             value={signInPass}
             
             />

         </Box>  
         <Box mt={'5%'} >
           <Button ml={'10%'} colorScheme={'green'} w={'80%'} mt={'10%'} onClick={handleLogin} >Sign in</Button>
          </Box>   
      </Box>
    </TabPanel>
    <TabPanel>
     <Box>
     
         <Box >
         <FormLabel color={'white'} ml={'5%'} mb={'2%'}  >Name</FormLabel>       
         <Input 
         type="text"
          placeholder='Enter Name' 
          w={'90%' } 
          ml={'5%'} 
          color={'white'}
           mb={'5%'} 
           onChange={(e)=>{
            setSignUpName(e.target.value);
           }}
           value={signUpName}
           />

            <FormLabel color={'white'}  ml={'5%'}  mb={'2%'} >Email</FormLabel>   
             <Input 
             type="text"
              placeholder='Enter Email'
               w={'90%' }
                ml={'5%'} 
                color={'white'}
                 mb={'5%'} 
                  onChange={(e)=>{
            setSignUpEmail(e.target.value);
           }}
           value={signUpEmail}
                 />
            <FormLabel color={'white'} ml={'5%'} mb={'2%'}  >Designation</FormLabel>       
              <Input 
              type="text"
                placeholder='Enter Designation' 
                w={'90%' } 
                ml={'5%'} 
                color={'white'}
                mb={'5%'} 
                onChange={(e)=>{
                  setDesignation(e.target.value);
                }}
                value={designation}
                />
              <FormLabel color={'white'}   ml={'5%'}  mb={'2%'} >Password</FormLabel>   
              <Input 
              type="password" 
              placeholder='Enter password'
               w={'90%' } ml={'5%'} 
               color={'white'}
                mb={'5%'}
                 onChange={(e)=>{
            setSignUpPass(e.target.value);
           }}
           value={signUpPass}
                
                />
              <FormLabel color={'white'}  ml={'5%'}  mb={'2%'} >Confirm Password</FormLabel> 
            <Input 
            type="password" 
            placeholder='Confirm password' 
            w={'90%' } ml={'5%'} 
            color={'white'} 
            mb={'5%'}
             onChange={(e)=>{
            setSignUpConfPass(e.target.value);
           }}
           value={signUpConfPass}
            
            
            />


         </Box>  
         <Box mt={'5%'} >
           <Button ml={'10%'} colorScheme={'red'} w={'80%'} onClick={handleSignup} >Create Account</Button>
          </Box>   
      </Box>
    </TabPanel>
  </TabPanels>
</Tabs>
      




      
      <Box>

      </Box>
         
         
        
        </Modal>
        </>
  )
}

export default Auth