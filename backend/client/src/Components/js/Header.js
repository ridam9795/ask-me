import { Avatar, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "react-profile-avatar/dist/index.css";
import { BellIcon, ChevronDownIcon, EditIcon } from "@chakra-ui/icons";
import "../css/Header.css";
import ModalContent from "./ModalContent";
import { Link, NavLink, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { SiteState } from "../../Context/AskMeProvider";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import Auth from "./Auth";
import axios from "axios";
function Header(props) {
  const location = useLocation();

  let activeStyle = {
    borderBottom: "3px solid red",
  };
  const {
    signedIn,
    setSignedIn,
    openModal,
    loggedInUser,
    setLoggedInUser,
    currLocationPath,
    setCurrLocationPath,
    filteredPost,
    setFilteredPost,
    search,
    setSearch,
    currTab,
    setCurrTab,
    filteredReadPost,
    setFilteredReadPost,
    filteredQuestion,
    setFilteredQuestion,
    tabIdx,
    setTabIdx,
  } = SiteState();
  const [openAuth, setOpenAuth] = useState(false);
  useEffect(() => {
    const data = localStorage.getItem("userInfo");
    if (data) {
      setLoggedInUser(JSON.parse(data));
      setSignedIn(true);
    }
  }, []);
  useEffect(() => {
    setCurrLocationPath(location.pathname.slice(1));
    setSearch("");
    setCurrTab("post");
    setTabIdx(0);
  }, [location.pathname]);
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setSignedIn(false);
    setLoggedInUser(null);
  };
  const filter = async (e) => {
    let val = e.target.value;
    setSearch(val);
    // console.log("currLocation: ", currLocationPath);

    if (val.replaceAll(" ", "").length === 0) {
      setFilteredPost([]);
      setFilteredReadPost([]);
      setFilteredQuestion([]);
      return;
    }
    let searchedPost = [];
    if (currLocationPath === "answer") {
      searchedPost = await axios.get("/api/user/search", {
        params: { search: e.target.value.trim(), currLocationPath: "answer" },
      });
      if (searchedPost.data.length > 0) {
        setFilteredPost(searchedPost.data);
      } else {
        setFilteredPost([]);
      }
    } else if (currLocationPath === "") {
      searchedPost = await axios.get("/api/user/search", {
        params: { search: e.target.value.trim(), currLocationPath: "" },
      });
      if (searchedPost.data.length > 0) {
        setFilteredPost(searchedPost.data);
      } else {
        setFilteredPost([]);
      }
    } else {
      let currCat = currLocationPath.split("/")[1];
      if (currTab == "answer") {
        const searchQuestionCategory = await axios.get(
          "/api/user/searchQuestionCategory",
          {
            params: {
              selectedCategory: currCat,
              searchValue: e.target.value.trim(),
            },
          }
        );
        if (searchQuestionCategory.data.length > 0) {
          setFilteredQuestion(searchQuestionCategory.data);
        } else {
          setFilteredQuestion([]);
        }
      } else {
        //   console.log("posTab");
        const searchPostCategory = await axios.get(
          "/api/user/searchPostCategory",
          {
            params: {
              selectedCategory: currCat,
              searchValue: e.target.value.trim(),
            },
          }
        );
        if (searchPostCategory.data.length > 0) {
          setFilteredReadPost(searchPostCategory.data);
        } else {
          setFilteredReadPost([]);
        }
      }
    }
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
          to="/notifications"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="tooltip"
        >
          <BellIcon
            color={"white"}
            boxSize={"25px"}
            marginLeft={"4%"}
            backgroundColor={"#1d1d1d"}
          />
          <span className="tooltiptext">Notifications</span>
        </NavLink>

        {/* <Link to="/" className='image'><img src={home} alt="home" /></Link>   */}
        {/* <EditIcon color={'white'} boxSize={'30px'}  marginLeft={'4%'} backgroundColor={'#1d1d1d'}/> */}
        {/* <BellIcon  color={'white'} boxSize={'30px'}  marginLeft={'4%'} backgroundColor={'#1d1d1d'}/>                 */}
        <input
          type="text"
          className="Input"
          placeholder="Search..."
          onChange={filter}
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

export default Header;
