import "./App.css";
import Header from "./Components/js/Header";
import Sidebar from "./Components/js/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryPage from "./Components/js/CategoryPage";
import Post from "./Components/js/Post";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let location = useLocation();
  return (
    <>
      <Header />
      <div className="content">
        <div className="leftPane">
          {!location.pathname.startsWith("/profile") && <Sidebar />}
        </div>
        <div className="rightPane">
          <Routes>
            <Route path="/" exact element={<Post />} />
            <Route path="/topic/:category" element={<CategoryPage />} />
            <Route path="/answer" element={<Post />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
