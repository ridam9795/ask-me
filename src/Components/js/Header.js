import {     Button } from '@chakra-ui/react'
import React from 'react';
import home from '../../../src/home.png'
import { Avatar } from 'react-profile-avatar'
import 'react-profile-avatar/dist/index.css'
import {BellIcon, EditIcon} from '@chakra-ui/icons'
import '../css/Header.css';
import ModalContent from './ModalContent';
import { Link } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Tooltip } from '@chakra-ui/react'

import HomeIcon from '@mui/icons-material/Home';function Header(props) {
  return (
            <div className='navbar'>
              
              <div className='nav'>
              <Link to="/">  <p className='siteName'> ASK ME   </p></Link>
                
                 
              <Link to="/" className="tooltip" > <HomeIcon style={{color:'white',fontSize:'30px'}} /><span className=' hometext' >Home</span></Link>
                    <Link to="/answer" className="tooltip"><EditIcon color={'white'} boxSize={'25px'}  marginLeft={'4%'} backgroundColor={'#1d1d1d'}/><span className='tooltiptext' >Answer</span></Link>
                 <Link to="/notifications" className="tooltip"><BellIcon  color={'white'} boxSize={'25px'}  marginLeft={'4%'} backgroundColor={'#1d1d1d'}/><span className='tooltiptext' >Notifications</span></Link>
                  
                   {/* <Link to="/" className='image'><img src={home} alt="home" /></Link>   */}
                     {/* <EditIcon color={'white'} boxSize={'30px'}  marginLeft={'4%'} backgroundColor={'#1d1d1d'}/> */}
                     {/* <BellIcon  color={'white'} boxSize={'30px'}  marginLeft={'4%'} backgroundColor={'#1d1d1d'}/>                 */}
                     <input type="text" className='Input' placeholder='search'/>
                    <Button colorScheme={'red'} ml={'5%'} height={'8'} mt={'2'} onClick={()=>props.openModal("ask")} >Ask Question</Button>
               
       <ModalContent content={props}/> 
     
        
                    <Avatar 
                        name={'Ridam Nagar'}
                        colour={'#1d1d1d'}
                        className="avatar"
                        style={{marginLeft:'120px',marginTop:'5px'}}
                      />  

             </div>
   

            </div>

            
        
  )
}

export default Header