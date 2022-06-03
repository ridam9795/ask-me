import React, { useState } from 'react'
import '../css/CategoryPage.css'
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Img, Text } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Textarea } from '@chakra-ui/react'


function CategoryPage() {
    const [follow,setFollow]=useState(false)
    const {category}=useParams();
  return (
    < >
      <Box className='categoryContent'>
       <Img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2021/12/Digital-marketing-trends-2022.jpg" className='categoryImage' alt="categoryImage"/>
       <Box>
       <Text fontSize={'25px'} fontWeight={'500'} >{category} </Text>
        <Button colorScheme={'blue'} h={'8'} mt={'5'} onClick={()=>{setFollow(!follow)}} >{follow?"Following":"Follow"}</Button>
       </Box>
       

      </Box>
      <Tabs size='md' variant='line' position={'relative'} mt={'30%'} ml={'88%'} w={'100%'} colorScheme={'red'} isLazy={'true'} >
  <TabList >
    <Tab color={'white'} >Read</Tab>
    <Tab color={'white'} >Answers</Tab>
    <Tab color={'white'} >Most Viewed Writers</Tab>

  </TabList>
  <TabPanels>
    <TabPanel>
      <p>one!</p>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
      
     </>
  )
}

export default CategoryPage