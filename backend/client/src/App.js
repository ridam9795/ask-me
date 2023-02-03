import "./App.css";
import Header from "./Components/js/Header";
import Sidebar from "./Components/js/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryPage from "./Components/js/CategoryPage";
import Post from "./Components/js/Post";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProfilePage from "./Components/js/ProfilePage";
import { Box } from "@chakra-ui/react";
import FindPeople from "./Components/js/FindPeople";
 //import io from "socket.io-client";
 import { useState } from "react";
 import { SiteState } from "./Context/AskMeProvider";
 function App() {
   let endpoint = "http://localhost:5000";
   const {  loggedInUser } = SiteState();

   useEffect(() => {
    //  if (loggedInUser && loggedInUser._id) {
    //    let skt = io(endpoint);
    //    skt.on("connect", () => {
    //      setSocket(skt);
    //      console.log("Connected to client socket", skt.id);
    //    });
    //  }

     window.scrollTo(0, 0);
   }, [JSON.stringify(loggedInUser)]);
   let location = useLocation();
   return (
     <>
       <Header />
       <div className="content">
         <div className="leftPane">
           {!location.pathname.startsWith("/profile") && <Sidebar />}
         </div>
         <div className="middlePane">
           <Routes>
             <Route path="/" exact element={<Post />} />
             <Route path="/topic/:category" element={<CategoryPage />} />
             {/* <Route path="/answer" element={<Post socket={socket} />} /> */}
             <Route path="/answer" element={<Post  />} />
             <Route path="/find-people" element={<FindPeople />} />
           </Routes>
         </div>
         <Box className="profile">
           <Routes>
             <Route path="/profile/:userID" element={<ProfilePage />} />
           </Routes>
         </Box>
       </div>
     </>
   );
 }

export default App;
