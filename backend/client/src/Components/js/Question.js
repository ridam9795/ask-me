import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { SiteState } from '../../Context/AskMeProvider'
import QuestionCard from './QuestionCard';

function Question() {

  const {questionList} = SiteState();
  useEffect(()=>{

  },[questionList.length])
  return (
    <>
    {
      questionList.length>0?questionList.map((question,index)=>{
          return  <QuestionCard  key={index} question={question} />
      }):(<Box ml={'100%'} w={'100%'} fontSize={'40px'} color={'white'} mt={'40%'} fontWeight={'800'} > Add your Question here</Box>)
    }
      
    </>
  )
}

export default Question