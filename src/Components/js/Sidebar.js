import React from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import {  NavLink } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box } from '@chakra-ui/react';
import { SiteState } from '../../Context/AskMeProvider';


function Sidebar() {
   let activeStyle = {
    color:"red"
  };

   const {categoryList,setCategoryList}=SiteState();

  return (
    <Box className='sidebar'>
<ProSidebar >
  <Menu iconShape="square">
      {categoryList.map((item,index)=>{
        let val=item.name.replaceAll(" ","-")
          return (
               <MenuItem key={index}><NavLink 
                
               to={`/topic/${val}`}
               style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }  
               >{item.name}</NavLink></MenuItem>
            
    

          )
      })}
    
  </Menu>
</ProSidebar>
    </Box>


  )
}

export default Sidebar