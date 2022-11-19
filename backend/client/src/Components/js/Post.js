import { Box, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SiteState } from "../../Context/AskMeProvider";
import CreatePost from "../CreatePost";
import Postcard from "./Postcard";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";
import { useCallback } from "react";
import React from "react";
import { useLocation } from "react-router";
function Post() {
  console.log("Post js triggeres");
  const {
    postList,
    setPostList,
    questionList,
    setQuestionList,
    search,
    signedIn,
    currLocationPath,
    filteredPost,
    setFilteredPost,
    loggedInUser,
  } = SiteState();
  const [postNotFound, setPostNotFound] = useState(false);
  const [currLoggedUser, setCurrLoggedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const location = useLocation();
  useEffect(() => {
    fetchPostList();
    fetchQuestionList();
  }, []);
  const fetchPostList = async () => {
    try {
      let fetchPost;
      fetchPost = await axios.get("/api/user/postList");
      if (fetchPost.data) {
        console.log("post data: ", fetchPost.data);
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
        console.log("Question data: ", fetchQuestion.data);
        setQuestionList(fetchQuestion.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const getCurrentList = () => {
    let path = location.pathname;
    console.log(
      "getCurrentList path ",
      path,
      " search: ",
      search,
      " list ",
      postList
    );

    if (path == "/") {
      return postList.filter((post) => {
        return post.content.toLowerCase().includes(search.toLowerCase());
      });
    } else if (path == "/answer") {
      return questionList.filter((question) => {
        return question.content.toLowerCase().includes(search.toLowerCase());
      });
    }
  };

  return (
    <>
      <CreatePost />
      <div style={{ marginTop: "100px" }}>
        {getCurrentList().length > 0 ? (
          getCurrentList().map((post) => {
            return (
              <Postcard
                key={post._id}
                postValue={post}
                isCategory={false}
                currLoggedUser={currLoggedUser}
              />
            );
          })
        ) : (
          <Box
            justifyContent={"center"}
            position={"absolute"}
            w={"50%"}
            ml={"33%"}
            fontSize={"30px"}
            mt={"10%"}
          >
            {location.pathname === "/" ? (
              <h1> NO POST MATCHES THE SEARCH CRITERIA</h1>
            ) : (
              <h1>NO QUESTION MATCHES THE SEARCH CRITERIA</h1>
            )}
          </Box>
        )}
      </div>
    </>
  );
}

export default React.memo(Post);
