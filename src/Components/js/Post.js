import { Box } from "@chakra-ui/react";
import { React, useEffect, useState } from "react";
import { SiteState } from "../../Context/AskMeProvider";
import CreatePost from "../CreatePost";
import Postcard from "./Postcard";
import axios from "axios";

function Post() {
  const { postList, setPostList, signedIn } = SiteState();
  const getList = async () => {
    const fetchedList = await axios.get("/api/user/postList");
    setPostList(fetchedList.data);
    //    console.log("fetched List",fetchedList.data)
  };
  useEffect(() => {
    getList();
  }, [JSON.stringify(postList), postList.length, signedIn]);

  return (
    <>
      <CreatePost />
      <div style={{ marginTop: "100px" }}>
        {postList.length > 0 ? (
          postList.map((post, index) => {
            return <Postcard key={index} postValue={post} />;
          })
        ) : (
          <Box
            ml={"100%"}
            w={"100%"}
            fontSize={"40px"}
            color={"white"}
            mt={"40%"}
            fontWeight={"800"}
          >
            {" "}
            Add your Post here
          </Box>
        )}
      </div>
    </>
  );
}

export default Post;
