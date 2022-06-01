import React from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';



function Sidebar() {
    const sidePanelList=["Marketing","Finance","Invention and Inventions","The Internet","Computer Science"
           ,"Current Events in Technology","Mathematics","Economics","Business","Education","Science",
           "Technology","Discover Spaces"]

  return (
    
<ProSidebar>
  <Menu iconShape="square">
      {sidePanelList.map((item,index)=>{
          return (
       <MenuItem key={index}>{item}</MenuItem>

          )
      })}
    
  </Menu>
</ProSidebar>
  )
}

export default Sidebar