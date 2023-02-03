import { Box, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SiteState } from "../../Context/AskMeProvider";
import CreatePost from "../CreatePost";
import Postcard from "./Postcard";
import React from "react";
import { useLocation, useParams } from "react-router";

function Post() {
  const {
    postList,
    questionList,
    search,
    signedIn,
    notification,
    setNotification,
  } = SiteState();
  const location = useLocation();

  const getCurrentList = () => {
    let path = location.pathname;

    if (path == "/") {
      return postList.filter((post) => {
        return post.content.toLowerCase().includes(search);
      });
    } else if (path == "/answer") {
      return questionList.filter((question) => {
        return question.content.toLowerCase().includes(search);
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
                  postValue={post}
                  isCategory={false}
                  type={location.pathname}
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
