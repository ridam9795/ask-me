import React from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';


function Sidebar() {
  

    const sidePanelList=["Marketing","Finance","Invention and Inventions","The Internet","Computer Science"
           ,"Current Events in Technology","Mathematics","Economics","Business","Education","Science",
           "Technology","Discover Spaces"]

  return (
    <div className='sidebar'>
<ProSidebar >
  <Menu iconShape="square">
      {sidePanelList.map((item,index)=>{
          return (
               <MenuItem ><Link to={`/topic/${item}`}>{item}</Link></MenuItem>
            
    

          )
      })}
    
  </Menu>
</ProSidebar>
    </div>


  )
}

export default Sidebar