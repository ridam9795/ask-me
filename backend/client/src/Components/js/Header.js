import { Avatar, Button } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import "react-profile-avatar/dist/index.css";
import { ChevronDownIcon, EditIcon } from "@chakra-ui/icons";
import "../css/Header.css";
import ModalContent from "./ModalContent";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import { SiteState } from "../../Context/AskMeProvider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import Auth from "./Auth";
import axios from "axios";
import People from "@mui/icons-material/People";
function Header(props) {
  const searchRef = useRef();
  let activeStyle = {
    borderBottom: "3px solid red",
  };
  const {
    signedIn,
    setSignedIn,
    openModal,
    loggedInUser,
    setLoggedInUser,
    search,
    setSearch,
    postList,
    setPostList,
    questionList,
    setQuestionList,
    socket,
  } = SiteState();
  const navigate = useNavigate();
  const location = useLocation();
  const [openAuth, setOpenAuth] = useState(false);
  useEffect(() => {
    if (socket.id) {
      socket.on("notification", (data) => {
        if (loggedInUser && data.user._id == loggedInUser._id) {
          console.log(data.message);
        }
      });
    }
  });
  useEffect(() => {
    setSearch("");
  }, [location.pathname]);
  useEffect(() => {
    fetchQuestionList();
  }, [questionList.length]);
  useEffect(() => {
    fetchPostList();
  }, [postList.length]);
  const fetchPostList = async () => {
    try {
      let fetchPost;
      fetchPost = await axios.get("/api/user/postList");
      if (fetchPost.data) {
        setPostList(fetchPost.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const fetchQuestionList = async () => {
    try {
      let fetchQuestion;
      fetchQuestion = await axios.get("/api/user/questionList");

      if (fetchQuestionList) {
        setQuestionList(fetchQuestion.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    if (data) {
      fetchUser(data);
    } else {
      openAuthModal();
    }
  }, [signedIn]);
  const fetchUser = async (userInfo) => {
    userInfo = JSON.parse(userInfo);
    try {
      const user = await axios.get("/api/user/fetchUserDetail", {
        params: {
          email: userInfo.email,
        },
      });
      if (user.data) {
        setLoggedInUser(user.data);
        setSignedIn(true);
      }
    } catch (err) {
      console.log("Error occured while fetching user", err);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setSignedIn(false);
    setLoggedInUser(null);
    window.location.reload();
  };
  const handleSearch = async (e) => {
    setSearch(e.target.value);
  };
  const openAuthModal = () => {
    setOpenAuth(true);
  };

  const closeAuthModal = () => {
    setOpenAuth(false);
  };

  return (
    <div className="navbar">
      <div className="nav">
        <Link to="/">
          {" "}
          <p className="siteName"> ASK ME </p>
        </Link>

        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="tooltip"
        >
          {" "}
          <HomeIcon style={{ color: "white", fontSize: "30px" }} />
          <span className=" hometext">Home</span>
        </NavLink>
        <NavLink
          to="/answer"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="tooltip"
        >
          <EditIcon
            color={"white"}
            boxSize={"25px"}
            marginLeft={"4%"}
            backgroundColor={"#1d1d1d"}
          />
          <span className="tooltiptext">Answer</span>
        </NavLink>
        <NavLink
          to="find-people"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="tooltip"
        >
          <People style={{ color: "white", fontSize: "30px" }} />
        </NavLink>

        <input
          type="text"
          className="Input"
          placeholder="Search..."
          onChange={handleSearch}
          value={search}
        />

        <Button
          colorScheme={"red"}
          ml={"2%"}
          height={"8"}
          mt={"2"}
          onClick={() => openModal("ask")}
        >
          Ask Question
        </Button>
        <ModalContent />
        {signedIn ? (
          <Menu w={"10px"} ml={"100px"} pl={"20%"}>
            <MenuButton w={"60px"} ml={"5%"} righticon={<ChevronDownIcon />}>
              <Avatar
                src="https://bit.ly/broken-link"
                name={loggedInUser ? loggedInUser.name : ""}
                size={"md"}
                mb={"12px"}
              />
            </MenuButton>
            <MenuList>
              <MenuItem fontWeight={"800"}>
                {loggedInUser ? loggedInUser.email : ""}
              </MenuItem>
              <MenuDivider />
              <Link to={`/profile/${loggedInUser._id}`}>
                <MenuItem fontWeight={"500"}>Profile</MenuItem>
              </Link>
              <MenuItem fontWeight={"500"} onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <>
            <Button
              ml={"2%"}
              mt={"2"}
              height={"8"}
              colorScheme={"green"}
              onClick={openAuthModal}
            >
              Sign in or Create account
            </Button>{" "}
            <Auth
              openAuth={openAuth}
              setOpenAuth={setOpenAuth}
              closeAuthModal={closeAuthModal}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(Header);
