import './App.css';
import CreatePost from './Components/CreatePost';
import Header from './Components/js/Header';
import Sidebar from './Components/js/Sidebar';

function App() {
  return (
    <div >
      <Header />
      <div className='content'>
      <div className='leftPane'>
          <Sidebar />
      </div>
      <div className='rightPane'>
             <CreatePost />
      </div>
      </div>

    
      
    </div>
  );
}

export default App;
