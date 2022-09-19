import React, { createContext, useContext, useState } from "react";
import RichTextEditor from "react-rte";

const SiteContext = createContext();
const AskMeProvider = ({ children }) => {
  const sidePanelList = [
    { name: "Marketing", isFollowing: false },
    { name: "Finance", isFollowing: false },
    { name: "Invention and Inventions", isFollowing: false },
    { name: "The Internet", isFollowing: false },
    { name: "Computer Science", isFollowing: false },
    { name: "Mathematics", isFollowing: false },
    { name: "Economics", isFollowing: false },
    { name: "Business", isFollowing: false },
    { name: "Education", isFollowing: false },
    { name: "Science", isFollowing: false },
    { name: "Technology", isFollowing: false },
    { name: "Discover Spaces", isFollowing: false },
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