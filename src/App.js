import { useState } from 'react';
import './App.css';
import CreatePost from './Components/CreatePost';
import Header from './Components/js/Header';
import Sidebar from './Components/js/Sidebar';

function App() {
    let subtitle;

    const [modalIsOpen, setIsOpen] = useState(false);
      const [isPost,setIsPost]=useState(false);


  function openModal(tab) {
    console.log("tab>>>>>>",tab)
    if(tab==="ask"){
      setIsPost(false);
    }else{
      setIsPost(true);
    }
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
   // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div >
      <Header openModal={openModal} afterOpenModal={afterOpenModal} closeModal={closeModal}  modalIsOpen={modalIsOpen} isPost={isPost} setPost={setIsPost} />
      <div className='content'>
      <div className='leftPane'>
          <Sidebar />
      </div>
      <div className='rightPane'>
             <CreatePost openModal={openModal} afterOpenModal={afterOpenModal} closeModal={closeModal} isPost={isPost} setPost={setIsPost} />
      </div>
      </div>

    
      
    </div>
  );
}

export default App;
