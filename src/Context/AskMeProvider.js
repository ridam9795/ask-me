import React, { createContext, useContext, useState } from 'react'
import RichTextEditor from 'react-rte';

const SiteContext=createContext();
const  AskMeProvider=({children})=> {
 const [content,setContent]= useState('');
     const [modalIsOpen, setIsOpen] = useState(false);
      const [isPost,setIsPost]=useState(false);
 function openModal(tab) {
    console.log("tab>>>>>>",tab)
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
        content,
        setContent,
        modalIsOpen, 
        setIsOpen,
        isPost,
        setIsPost,
        openModal,
        closeModal
    }}   >

        {children}
    </SiteContext.Provider>
  )
}
export const SiteState=()=>{
    return useContext(SiteContext);
}
export default AskMeProvider
