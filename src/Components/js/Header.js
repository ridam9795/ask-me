import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react';
import home from '../../../src/home.png'
import edit from '../../../src/edit.png'
import bell from '../../../src/bell.png'
import following from '../../../src/following.png'
import {BellIcon, EditIcon, SearchIcon} from '@chakra-ui/icons'
import {AiOutlineHome} from "react-icons/ai";
import '../css/Header.css'

function Header() {
  return (
    <Box backgroundColor={'#262626'} mt={'1px'} height={'60px'} >
        <Box  height={'60px'} ml={'10%'} mr={'10%'}  d='flex'>
             <Box pt={'5px'}
              fontSize={'30'}
              fontWeight={'800'} 
              color={'red'} 
              width={'12%'}
              d={'flex'} >
                 ASK ME  
             </Box>

          
              <div className='nav'>
                     <img src={home} alt="home" className='image'/>
                     <EditIcon color={'white'} boxSize={'30px'}  marginLeft={'4%'}/>
                     <BellIcon  color={'white'} boxSize={'30px'}  marginLeft={'4%'}/>
                     
                 <input type="text" className='Input' placeholder='search'/>
                 <Button colorScheme={'red'} ml={'5%'} height={'8'} >Ask Question</Button>
               </div>
   


            
        </Box>
    </Box>
  )
}

export default Header