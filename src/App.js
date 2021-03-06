import './App.css';
import Header from './Components/js/Header';
import Sidebar from './Components/js/Sidebar';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import CategoryPage from './Components/js/CategoryPage';
import Post from './Components/js/Post';
import Question from './Components/js/Question';
function App() {


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
                 <Route path="/answer" element={<Question /> } />
               </Routes>
               
            
             
      </div>
                                      

      </div>

    
      
    </Router>
  );
}

export default App;
