import {     Avatar, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import 'react-profile-avatar/dist/index.css'
import {BellIcon, ChevronDownIcon, EditIcon} from '@chakra-ui/icons'
import '../css/Header.css';
import ModalContent from './ModalContent';
import { Link, NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { SiteState } from '../../Context/AskMeProvider';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react'
import Auth from './Auth';
function Header(props) {


 let activeStyle = {
    borderBottom:"3px solid red",
  };
  const {signedIn,setSignedIn,openModal,user,setUser}=SiteState();
  const [openAuth,setOpenAuth]=useState(false);
   useEffect(()=>{
    const data=localStorage.getItem("userInfo");
    if(data){
      setUser(JSON.parse(data) );
      setSignedIn(true)
    }
},[])

const handleLogout=()=>{
 localStorage.removeItem("userInfo");
 setSignedIn(false);
 setUser(null)
}

 const openAuthModal=()=> {
    
    setOpenAuth(true);
  }


  const closeAuthModal=()=> {
    setOpenAuth(false);
  }

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
                    <Button colorScheme={'red'} ml={'2%'} height={'8'} mt={'2'} onClick={()=>openModal("ask")} >Ask Question</Button>
       <ModalContent /> 
       {signedIn?( <Menu w={'10px'} ml={'100px'} pl={'20%'}>
  <MenuButton w={'60px'} ml={'5%'} righticon={<ChevronDownIcon />}>
     <Avatar 
          src='https://bit.ly/broken-link'
           name={user?user.name:""}
              size={'md'}
              
            />  
  </MenuButton>
  <MenuList >
    <MenuItem fontWeight={'800'} >{user?user.email:""}</MenuItem>
    <MenuDivider />
    <MenuItem fontWeight={'500'} >Profile</MenuItem>
    <MenuItem fontWeight={'500'} onClick={handleLogout}>Logout</MenuItem>
   
  </MenuList>
</Menu>):(<><Button ml={'2%'} mt={'2'} height={'8'} colorScheme={'green'} onClick={openAuthModal}>Sign in or Create account</Button>               <Auth openAuth={openAuth} setOpenAuth={setOpenAuth} closeAuthModal={closeAuthModal}/>
</>)}
     
        
                   
 

             </div>
   

            </div>

            
        
  )
}

export default Header