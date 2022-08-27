import React, { useState } from "react";
import TagContainer from "./TagContainer";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Badge,
  Input,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import Modal from "react-modal";
import { CloseIcon } from "@chakra-ui/icons";
import "../css/ModalContent.css";
import { SiteState } from "../../Context/AskMeProvider";
import RichTextEditor from "react-rte";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#181818",
    width: "60%",
    height: "400px",
    zIndex: 100,
  },
};
function ModalContent(props) {
  const {
    postList,
    setPostList,
    questionList,
    user,
    setQuestionList,
    modalIsOpen,
    isPost,
    closeModal,
    postContent,
    setPostContent,
    signedIn,
    questionContent,
    categoryList,
    setQuestionContent,
    tag,
    setTag,
    badge,
    setBadge,
    searchPostTag,
    setSearchPostTag,
  } = SiteState();
  const [question, setQuestion] = useState(RichTextEditor.createEmptyValue());
  const [post, setPost] = useState(RichTextEditor.createEmptyValue());
  // const [tag, setTag] = useState([]);
  // const [searchPostTag, setSearchPostTag] = useState("");
  // const [badge, setBadge] = useState([]);

  const toast = useToast();
  const handleSearch = (e) => {
    let val = e.target.value;
    if (val.length > 0) {
      const data = [];
      categoryList.map((item) => {
        if (item.name.toLowerCase().includes(val.toLowerCase())) {
          data.push(item.name);
        }
      });
      setTag(data);
      setSearchPostTag(val);
    } else {
      setSearchPostTag("");
      setTag([]);
    }
  };
  const handleBadge = (currBadge) => {
    if (!badge.includes(currBadge)) {
      setBadge([...badge, currBadge]);
    } else {
      toast({
        title: "Badge Already exists",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  };
  const onAddQuestion = (value) => {
    setQuestion(value);
    setQuestionContent(value.toString("html"));
  };
  const onAddPost = (value) => {
    setPost(value);
    setPostContent(value.toString("html"));
  };

  const addQuestion = async (e) => {
    e.preventDefault();
    if (!signedIn) {
      toast({
        title: "Please Sign in to add question.",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      try {
        const currQuestionPost = await axios.post(
          "/api/user/createpost",
          {
            id: user._id,
            userName: user.name,
            designation: user.designation,
            content: questionContent,
            likeCount: [],
            commentList: [],
            tag: badge,
          },
          { params: { currLocationPath: "answer" } }
        );
        setQuestionList([currQuestionPost.data, ...questionList]);
        setQuestionContent("");
        setQuestion(RichTextEditor.createEmptyValue());
        closeModal();
        setBadge([]);
        setSearchPostTag("");
        setTag([]);
      } catch (err) {
        toast({
          title: err,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };
  const addPost = async (e) => {
    e.preventDefault();

    if (!signedIn) {
      toast({
        title: "Please Sign in to add post.",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      try {
        const currPost = await axios.post(
          "/api/user/createpost",
          {
            id: user._id,
            userName: user.name,
            designation: user.designation,
            content: postContent,
            likeCount: [],
            commentList: [],
            tag: badge,
          },
          { params: { currLocationPath: "" } }
        );
        setPostList([currPost.data, ...postList]);
        setPostContent("");
        setPost(RichTextEditor.createEmptyValue());
        closeModal();
        setBadge([]);
        setSearchPostTag("");
        setTag([]);
      } catch (err) {
        toast({
          title: err,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };
  const handleRemove = (idx) => {
    console.log("idx", idx);
    const filtertedBadge = badge.filter((item, index) => {
      return index !== idx;
    });
    setBadge(filtertedBadge);
  };
  const resetTags = () => {
    setBadge([]);
    setTag([]);
    setSearchPostTag("");
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Ask/Post"
      >
        <Box className="modalHeader">
          <CloseIcon onClick={closeModal} mr={"10px"} cursor="pointer" />
          <Tabs defaultIndex={isPost ? 1 : 0}>
            <TabList>
              <Link to="/answer">
                <Tab w={"365px"} onClick={resetTags}>
                  Add Question{" "}
                </Tab>
              </Link>
              <Link to="/">
                <Tab w={"365px"} onClick={resetTags}>
                  Create Post
                </Tab>
              </Link>
            </TabList>

            <TabPanels>
              <TabPanel>
                <RichTextEditor
                  editorClassName="edit"
                  toolbarClassName="toolbar"
                  value={question}
                  onChange={onAddQuestion}
                />
                <TagContainer />
                <hr />
                <Button
                  colorScheme={"#1d1d1d"}
                  onClick={closeModal}
                  color={"white"}
                  ml={"67%"}
                  mr={"15px"}
                  mt={"10px"}
                  borderRadius={"30px"}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme={"blue"}
                  mt={"10px"}
                  borderRadius={"30px"}
                  onClick={addQuestion}
                >
                  Add question
                </Button>
              </TabPanel>
              <TabPanel>
                <RichTextEditor
                  editorClassName="edit"
                  toolbarClassName="toolbar"
                  value={post}
                  onChange={onAddPost}
                />
                <TagContainer />
                <hr />

                <Button
                  colorScheme={"#1d1d1d"}
                  onClick={closeModal}
                  color={"white"}
                  ml={"70%"}
                  mr={"15px"}
                  mt={"10px"}
                  borderRadius={"30px"}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme={"blue"}
                  mt={"10px"}
                  borderRadius={"30px"}
                  onClick={addPost}
                >
                  Add Post
                </Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalContent;
