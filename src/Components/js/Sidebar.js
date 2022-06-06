import React from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, NavLink } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box } from '@chakra-ui/react';


function Sidebar() {
   let activeStyle = {
    color:"red"
  };

    const sidePanelList=["Marketing","Finance","Invention and Inventions","The Internet","Computer Science"
           ,"Current Events in Technology","Mathematics","Economics","Business","Education","Science",
           "Technology","Discover Spaces"]

  return (
    <Box className='sidebar'>
<ProSidebar >
  <Menu iconShape="square">
      {sidePanelList.map((item,index)=>{
        let val=item.replaceAll(" ","-")
          return (
               <MenuItem key={index}><NavLink 
                
               to={`/topic/${val}`}
               style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }  
               >{item}</NavLink></MenuItem>
            
    

          )
      })}
    
  </Menu>
</ProSidebar>
    </Box>


  )
}

export default Sidebar