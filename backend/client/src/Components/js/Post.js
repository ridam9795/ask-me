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
  const {
    postList,
    setPostList,
    questionList,
    setQuestionList,
    search,
    signedIn,
  } = SiteState();
  const [postNotFound, setPostNotFound] = useState(false);
  const [currLoggedUser, setCurrLoggedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [postUpdated, setPostUpdated] = useState(false);
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

  const getCurrentList = () => {
    let path = location.pathname;

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
        {signedIn && getCurrentList().length > 0 ? (
          getCurrentList().map((post, index) => {
            return (
              <div key={index}>
                <Postcard
                  postUpdated={postUpdated}
                  setPostUpdated={setPostUpdated}
                  postValue={post}
                  isCategory={false}
                  currLoggedUser={currLoggedUser}
                />
              </div>
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
              <Text ml={"23%"} color={"white"}>
                {" "}
                NO POST TO SHOW
              </Text>
            ) : (
              <Text ml={"20%"} color={"white"}>
                NO QUESTION TO SHOW
              </Text>
            )}
          </Box>
        )}
      </div>
    </>
  );
}

export default React.memo(Post);
