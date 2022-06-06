import {     Avatar, Button } from '@chakra-ui/react'
import React from 'react';
import 'react-profile-avatar/dist/index.css'
import {BellIcon, EditIcon} from '@chakra-ui/icons'
import '../css/Header.css';
import ModalContent from './ModalContent';
import { Link, NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { SiteState } from '../../Context/AskMeProvider';

function Header(props) {
 let activeStyle = {
    borderBottom:"3px solid red",
  };
        const {modalIsOpen, setIsOpen,isPost,setIsPost,openModal,closeModal}=SiteState();



  return (
            <div className='navbar'>
              
              <div className='nav'>
              <Link to="/">  <p className='siteName'> ASK ME   </p></Link>
                
                 
              <NavLink to="/" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }  className="tooltip"> <HomeIcon style={{color:'white',fontSize:'30px'}} /><span className=' hometext' >Home</span></NavLink>
                    <NavLink to="/answer" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }  className="tooltip"><EditIcon color={'white'} boxSize={'25px'}  marginLeft={'4%'} backgroundColor={'#1d1d1d'}/><span className='tooltiptext' >Answer</span></NavLink>
                 <NavLink to="/notifications" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }  className="tooltip"><BellIcon  color={'white'} boxSize={'25px'}  marginLeft={'4%'} backgroundColor={'#1d1d1d'}/><span className='tooltiptext' >Notifications</span></NavLink>
                  
                   {/* <Link to="/" className='image'><img src={home} alt="home" /></Link>   */}
                     {/* <EditIcon color={'white'} boxSize={'30px'}  marginLeft={'4%'} backgroundColor={'#1d1d1d'}/> */}
                     {/* <BellIcon  color={'white'} boxSize={'30px'}  marginLeft={'4%'} backgroundColor={'#1d1d1d'}/>                 */}
                     <input type="text" className='Input' placeholder='search'/>
                    <Button colorScheme={'red'} ml={'5%'} height={'8'} mt={'2'} onClick={()=>openModal("ask")} >Ask Question</Button>
               
       <ModalContent /> 
     
        
                    <Avatar 
                    src='https://bit.ly/broken-link'
                    // name={"ridam Nagar"}
                        size={'md'}
                        ml={'80px'}
                      />  

             </div>
   

            </div>

            
        
  )
}

export default Header