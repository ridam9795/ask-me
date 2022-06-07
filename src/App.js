import { useMemo, useRef, useState } from 'react';
import './App.css';
import CreatePost from './Components/CreatePost';
import Header from './Components/js/Header';
import Sidebar from './Components/js/Sidebar';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import CategoryPage from './Components/js/CategoryPage';
import { SiteState } from './Context/AskMeProvider';
import Post from './Components/js/Post';
function App() {

      const {postContent,setPostContent,questionContent,setQuestionContent}=SiteState('');

  return (
    <Router >
      <Header   />
      <div className='content'>

      <div className='leftPane'>
       
          <Sidebar />
      
      </div>
      <div className='rightPane'>
                
               <Routes>
                 <Route path="/" exact element={<Post   />} />
                 <Route path="/topic/:category" element={<CategoryPage /> } />
               </Routes>
               
            
             
      </div>
                                      

      </div>

    
      
    </Router>
  );
}

export default App;
