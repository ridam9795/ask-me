import React, { createContext, useContext, useState } from "react";
import RichTextEditor from "react-rte";

const SiteContext = createContext();
const AskMeProvider = ({ children }) => {
  const sidePanelList = [
    {
      name: "Marketing",
      url: "https://www.insegment.com/blog/wp-content/uploads/2016/04/The-Role-of-Marketing-1.jpg",
      isFollowing: false,
    },
    {
      name: "Finance",
      url: "https://img.freepik.com/free-vector/finance-financial-performance-concept-illustration_53876-40450.jpg",
      isFollowing: false,
    },
    {
      name: "Invention and Inventions",
      url: "https://career101.in/wp-content/uploads/2022/05/Inventions-that-Changed-the-World.jpg",
      isFollowing: false,
    },
    {
      name: "The Internet",
      url: "https://www.howtogeek.com/wp-content/uploads/2018/02/img_5a78dece9a202.jpg",
      isFollowing: false,
    },
    {
      name: "Computer Science",
      url: "https://c8.alamy.com/comp/F08JHA/science-concept-computer-science-on-digital-background-F08JHA.jpg",
      isFollowing: false,
    },
    {
      name: "Mathematics",
      url: "https://miro.medium.com/max/1400/1*L76A5gL6176UbMgn7q4Ybg.jpeg",
      isFollowing: false,
    },
    {
      name: "Economics",
      url: "https://m.media-amazon.com/images/I/91LUJScnhDL.jpg",
      isFollowing: false,
    },
    {
      name: "Business",
      url: "https://imageio.forbes.com/blogs-images/alejandrocremades/files/2018/07/desk-3139127_1920-1200x773.jpg",
      isFollowing: false,
    },
    {
      name: "Education",
      url: "https://images.hindustantimes.com/rf/image_size_640x362/HT/p2/2015/12/01/Pictures/_c34102da-9849-11e5-b4f4-1b7a09ed2cea.jpg",
      isFollowing: false,
    },
    {
      name: "Science",
      url: "https://img.freepik.com/free-vector/colorful-science-education-background_23-2148490697.jpg",
      isFollowing: false,
    },
    {
      name: "Technology",
      url: "https://images.moneycontrol.com/static-mcnews/2022/04/shutterstock_767487700-1.png",
      isFollowing: false,
    },
    {
      name: "Discover Spaces",
      url: "https://media.npr.org/assets/img/2020/11/18/nh-sc-pluto-illustration-71deaf602c8fe8dd73777e1cbf859507923366fc-s1100-c50.jpg",
      isFollowing: false,
    },
  ];
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [question, setQuestion] = useState(RichTextEditor.createEmptyValue());
  const [post, setPost] = useState(RichTextEditor.createEmptyValue());
  const [questionContent, setQuestionContent] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postList, setPostList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [categoryList, setCategoryList] = useState(sidePanelList);
  const [signedIn, setSignedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [currLocationPath, setCurrLocationPath] = useState("");
  const [filteredPost, setFilteredPost] = useState([]);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState([]);
  const [searchPostTag, setSearchPostTag] = useState("");
  const [badge, setBadge] = useState([]);
  const [readPosts, setReadPosts] = useState([]);
  const [readQuestions, setReadQuestions] = useState([]);
  const [currTab, setCurrTab] = useState("post");
  const [filteredReadPost, setFilteredReadPost] = useState([]);
  const [filteredQuestion, setFilteredQuestion] = useState([]);
  const [tabIdx, setTabIdx] = useState(0);
  const [following, setFollowing] = useState(false);

  function openModal(tab) {
    if (tab === "ask") {
      setIsPost(false);
    } else {
      setIsPost(true);
    }
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <SiteContext.Provider
      value={{
        question,
        setQuestion,
        post,
        setPost,
        modalIsOpen,
        setIsOpen,
        isPost,
        setIsPost,
        openModal,
        closeModal,
        questionContent,
        setQuestionContent,
        postContent,
        setPostContent,
        postList,
        setPostList,
        questionList,
        setQuestionList,
        categoryList,
        setCategoryList,
        signedIn,
        setSignedIn,
        loggedInUser,
        setLoggedInUser,
        currLocationPath,
        setCurrLocationPath,
        filteredPost,
        setFilteredPost,
        search,
        setSearch,
        tag,
        setTag,
        searchPostTag,
        setSearchPostTag,
        badge,
        setBadge,
        readPosts,
        setReadPosts,
        readQuestions,
        setReadQuestions,
        currTab,
        setCurrTab,
        filteredReadPost,
        setFilteredReadPost,
        filteredQuestion,
        setFilteredQuestion,
        tabIdx,
        setTabIdx,
        following,
        setFollowing,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
export const SiteState = () => {
  return useContext(SiteContext);
};
export default AskMeProvider;
