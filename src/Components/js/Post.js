import { Box } from "@chakra-ui/react";
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
  } = SiteState();
  //  console.log("curr: ", currLocationPath);
  const [loading, setLoading] = useState(false);
  const getList = async () => {
    let fetchedList = [];
    //  console.log("currLocation: ", currLocationPath);
    if (currLocationPath === "") {
      fetchedList = await axios.get("/api/user/postList", {
        params: { currLocationPath: "" },
      });
    } else if (currLocationPath === "answer") {
      fetchedList = await axios.get("/api/user/postList", {
        params: { currLocationPath: "answer" },
      });
    }
    if (fetchedList.data.length === 0) {
      setLoading(true);
    } else {
      setPostList(fetchedList.data);
      setLoading(false);
    }

    //    console.log("fetched List",fetchedList.data)
  };
  useEffect(() => {
    getList();
  }, [postList.length, questionList.length, signedIn, currLocationPath]);

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
        ) : !loading && postList.length > 0 ? (
          postList.map((post, index) => {
            return <Postcard key={index} postValue={post} />;
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
