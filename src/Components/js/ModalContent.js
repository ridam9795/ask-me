import React, { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, HStack, Badge, Input } from '@chakra-ui/react'
import {    Box } from '@chakra-ui/react'
import Modal from 'react-modal';
import { CloseIcon } from '@chakra-ui/icons';
import '../css/ModalContent.css';
import { SiteState } from '../../Context/AskMeProvider';
import RichTextEditor from "react-rte";
import { useToast } from '@chakra-ui/react'
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from '@chakra-ui/react'

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
      const {postList,setPostList,questionList,
        setQuestionList,modalIsOpen,isPost,closeModal
        ,postContent,setPostContent,signedIn,
        questionContent,categoryList,setQuestionContent}=SiteState();
      const [question,setQuestion]=useState(RichTextEditor.createEmptyValue());
      const [post,setPost]=useState(RichTextEditor.createEmptyValue());
      const [tag,setTag]=useState([])
      const [search,setSearch]=useState('');
      const [badge,setBadge]=useState([])
      const toast=useToast();
const handleSearch=(e)=>{
  let val=e.target.value;
  if(val.length>0){
  
  const data=[];
  categoryList.map((item)=>{
     if(item.name.toLowerCase().includes(val.toLowerCase())){
      data.push(item.name)

      }
     
  })
  setTag(data); 
setSearch(val);
 }else{
  setSearch("")
  setTag([])
 }
  
  

        
}
const handleBadge=(currBadge)=>{
   if(!badge.includes(currBadge)){
 setBadge([...badge,currBadge])
   }else{
     toast({
          title: 'Badge Already exists',
          status: 'info',
          duration: 5000,
          isClosable: true,
        })
    return;
   }
  
}
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
        if(!signedIn){
              toast({
        title: "Please Sign in to add question.",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
        }else{
        setQuestionList([...questionList,questionContent ])
        setQuestionContent("");
        setQuestion(RichTextEditor.createEmptyValue());
        closeModal();

        }
     
  }
  const addPost=(e)=>{
            e.preventDefault();

    if(!signedIn){
          toast({
        title: "Please Sign in to add post.",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }else{
        setPostList([...postList,postContent])
        setPostContent("")
        setPost(RichTextEditor.createEmptyValue())
        closeModal();
        setBadge([])
        setSearch("");
        setTag([])
    }

        
  }
  const handleRemove=(idx)=>{
    console.log("idx",idx);
    const filtertedBadge=badge.filter((item,index)=>{
      return index!=idx;
    })
    setBadge(filtertedBadge)
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
                        <Input
                         type="text"
                         placeholder='Add tag eg. Marketing,Science'
                         mb={1}
                         onChange={handleSearch}
                         value={search}
                         mt={'5'}
                        
                        />
                       
                        {
                          badge.map((item,index)=>{
                            return (

                              <Badge px={2}
                                    py={1}
                                    borderRadius="lg"
                                    m={1}
                                    mb={2}
                                    variant="solid"
                                    fontSize={12}
                                    colorScheme="whiteAlpha"
                                    cursor="pointer"
                                    key={index}
                                   
                                    
                                    
                                    
                                    >
                              {item}
                              <CloseIcon ml={'3'} onClick={()=>handleRemove(index)}/>
                            </Badge>
                            )
                          })
                        }
                        {tag.map((item,index)=>{
                          return (
                            <Box d={'flex'}>
                            <Badge px={2}
                                    py={1}
                                    borderRadius="lg"
                                    m={1}
                                    mb={2}
                                    variant="solid"
                                    fontSize={12}
                                    colorScheme="whiteAlpha"
                                    cursor="pointer"
                                    key={index}
                                    
                                    onClick={()=>handleBadge(item)}
                                    >
                              {item}
                            </Badge>
                            </Box>
                          )
                        })}
                      
                     
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