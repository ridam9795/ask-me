import { Box, useToast } from "@chakra-ui/react";
import { React, useEffect, useState } from "react";
import { SiteState } from "../../Context/AskMeProvider";
import CreatePost from "../CreatePost";
import Postcard from "./Postcard";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

function Post() {
  const {
    postList,
    setPostList,
    questionList,
    setQuestionList,
    signedIn,
    currLocationPath,
    filteredPost,
    setFilteredPost,
    search,
    setSearch,
    loggedInUser,
  } = SiteState();
  const [postNotFound, setPostNotFound] = useState(false);
  const [followStatus, setFollowStatus] = useState(false);
  const [currLoggedUser, setCurrLoggedUser] = useState({});
  //  console.log("curr: ", currLocationPath);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (filteredPost.length > 0) {
      setPostList(filteredPost);
      setPostNotFound(false);
    } else {
      if (search.length > 0) {
        setPostNotFound(true);
      } else {
        setPostNotFound(false);
        getList();
      }
    }
  }, [
    postList.length,
    questionList.length,
    signedIn,
    currLocationPath,
    filteredPost.length,
    search,
    followStatus,
  ]);
  useEffect(() => {
    setSearch("");
    setFilteredPost([]);
  }, [currLocationPath]);

  const getList = async () => {
    let fetchedList = {};
    try {
      if (loggedInUser) {
        //let parsedLoggedUser = JSON.parse(loggedInUser);
        //console.log(parsedLoggedUser);
        let currLoggedUserInfo = await axios.get("/api/user/fetchUsers", {
          params: { loggedInUser: loggedInUser._id },
        });
        if (currLoggedUserInfo.data.length > 0) {
          setCurrLoggedUser(currLoggedUserInfo.data);
        }
      }
      if (currLocationPath === "") {
        fetchedList = await axios.get("/api/user/postList", {
          params: { currLocationPath: "" },
        });
      } else if (currLocationPath === "answer") {
        fetchedList = await axios.get("/api/user/postList", {
          params: { currLocationPath: "answer" },
        });
      }
      if (fetchedList["data"] != null) {
        if (fetchedList.data.length === 0) {
          setLoading(true);
        } else {
          setPostList(fetchedList.data);
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <CreatePost />
      <div style={{ marginTop: "100px" }}>
        {!signedIn ? (
          <Box
            height={"340px"}
            ml={"90%"}
            w={"100%"}
            fontSize={"40px"}
            color={"white"}
            mt={"40%"}
            fontWeight={"800"}
          >
            {" "}
            Login to see or add post
          </Box>
        ) : postNotFound ? (
          <Box
            ml={"85%"}
            w={"100%"}
            fontSize={"40px"}
            color={"white"}
            mt={"40%"}
            fontWeight={"800"}
          >
            No post matches the search criteria
          </Box>
        ) : !loading && postList.length > 0 ? (
          postList.map((post, index) => {
            return (
              <Postcard
                key={index}
                postValue={post}
                isCategory={false}
                setFollowStatus={setFollowStatus}
                followStatus={followStatus}
                currLoggedUser={currLoggedUser}
              />
            );
          })
        ) : (
          <Box
            ml={"129%"}
            w={"100%"}
            fontSize={"40px"}
            color={"white"}
            mt={"40%"}
            fontWeight={"800"}
          >
            <Spinner />
          </Box>
        )}
      </div>
    </>
  );
}

export default Post;
