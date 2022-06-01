import {    Box, Button, Text } from '@chakra-ui/react'
import React from 'react';
import home from '../../../src/home.png'

import { Avatar } from 'react-profile-avatar'
import 'react-profile-avatar/dist/index.css'
import {BellIcon, EditIcon, SearchIcon} from '@chakra-ui/icons'
import '../css/Header.css'

function Header() {
  return (
            <div className='navbar'>

              <div className='nav'>
                <p className='siteName'> ASK ME   </p>
                     <img src={home} alt="home" className='image'/>
                     <EditIcon color={'white'} boxSize={'30px'}  marginLeft={'4%'} backgroundColor={'#1d1d1d'}/>
                     <BellIcon  color={'white'} boxSize={'30px'}  marginLeft={'4%'} backgroundColor={'#1d1d1d'}/>                
                     <input type="text" className='Input' placeholder='search'/>
                    <Button colorScheme={'red'} ml={'5%'} height={'8'}   >Ask Question</Button>
                    <Avatar 
                        name={'Ridam Nagar'}
                        colour={'#1d1d1d'}
                        className="avatar"
                        style={{marginLeft:'70px'}}
                      />  

             </div>
   

            </div>

            
        
  )
}

export default Header