import React, { createContext, useContext, useState } from 'react'
import RichTextEditor from "react-rte";

const SiteContext=createContext();
const  AskMeProvider=({children})=> {
     const [modalIsOpen, setIsOpen] = useState(false);
      const [isPost,setIsPost]=useState(false);
          const [question,setQuestion]=useState(RichTextEditor.createEmptyValue());
            const [post,setPost]=useState(RichTextEditor.createEmptyValue());
            const [questionContent,setQuestionContent]=useState('')
            const [postContent,setPostContent]=useState('');
            const [postList,setPostList]=useState([]);
            const [questionList,setQuestionList]=useState([]);


 function openModal(tab) {
    if(tab==="ask"){
      setIsPost(false);
    }else{
      setIsPost(true);
    }
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }

  return (
    <SiteContext.Provider value={{
        question,
        setQuestion,
        post,
        setPost,
        modalIsOpen, 
        setIsOpen,
        isPost,
        setIsPost,
        openModal,
        closeModal,
        questionContent,
        setQuestionContent,
        postContent,
        setPostContent,
        postList,
        setPostList,
        questionList,
        setQuestionList
    }}   >

        {children}
    </SiteContext.Provider>
  )
}
export const SiteState=()=>{
    return useContext(SiteContext);
}
export default AskMeProvider
