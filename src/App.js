import { useState } from 'react';
import './App.css';
import CreatePost from './Components/CreatePost';
import Header from './Components/js/Header';
import Sidebar from './Components/js/Sidebar';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import CategoryPage from './Components/js/CategoryPage';

function App() {

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
    <Router >
      <Header openModal={openModal} afterOpenModal={afterOpenModal} closeModal={closeModal}  modalIsOpen={modalIsOpen} isPost={isPost} setPost={setIsPost} />
      <div className='content'>
      <div className='leftPane'>
          <Sidebar />
      </div>
      <div className='rightPane'>
             
               <Routes>
                 <Route path="/" exact element={<CreatePost openModal={openModal} afterOpenModal={afterOpenModal} closeModal={closeModal} isPost={isPost} setPost={setIsPost} />} />
                 <Route path="/topic/:category" element={<CategoryPage /> } />
               </Routes>
             
      </div>
      </div>

    
      
    </Router>
  );
}

export default App;
