import React, { useEffect, useState } from "react";
import "../css/CategoryPage.css";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Img, Text } from "@chakra-ui/react";
import axios from "axios";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
} from "@chakra-ui/react";
import { SiteState } from "../../Context/AskMeProvider";
import Postcard from "./Postcard";

function CategoryPage() {
  let { category } = useParams();

  category = category.replaceAll("-", " ");
  const {
    categoryList,
    setCurrTab,
    setSearch,
    tabIdx,
    setTabIdx,
    postList,
    questionList,
    search,
  } = SiteState();

  const filterPost = () => {
    console.log(category, " ", postList);
    const filteredPostList = postList.filter((post) => {
      return post.tag.includes(category);
    });
    console.log("filterd post ", filteredPostList);
    if (search.length > 0) {
      return filteredPostList.filter((post) => {
        return post.content.toLowerCase().includes(search.toLowerCase());
      });
    }
    return filteredPostList;
  };
  const filterQuestion = () => {
    console.log(category, " ", questionList);
    const filteredQuestionList = questionList.filter((question) => {
      return question.tag.includes(category);
    });
    console.log("filterd Question ", filteredQuestionList);
    if (search.length > 0) {
      return filteredQuestionList.filter((question) => {
        return question.content.toLowerCase().includes(search.toLowerCase());
      });
    }
    return filteredQuestionList;
  };

  const setTab = (tab) => {
    setCurrTab(tab);
    if (tab == "answer") {
      setTabIdx(1);
    } else {
      setTabIdx(0);
    }
    setSearch("");
  };

  return (
    <>
      <Box className="categoryContent">
        {categoryList.map((item, index) => {
          if (item.name === category) {
            return (
              <Img
                src={item.url}
                className="categoryImage"
                alt="categoryImage"
              />
            );
          }
        })}
        <Box>
          <Text fontSize={"25px"} fontWeight={"500"}>
            {category}
          </Text>
        </Box>
      </Box>
      <Tabs
        size="md"
        variant="line"
        position={"relative"}
        mt={"30%"}
        ml={"88%"}
        w={"100%"}
        colorScheme={"red"}
        isLazy={"true"}
        index={tabIdx}
      >
        <TabList>
          <Tab w={"50%"} color={"white"} onClick={() => setTab("post")}>
            Read Posts
          </Tab>
          <Tab w={"50%"} color={"white"} onClick={() => setTab("answer")}>
            Answers
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {filterPost().length > 0 ? (
              filterPost().map((post) => {
                return (
                  <div key={post._id}>
                    <Postcard postValue={post} isCategory={true} type={"/"} />
                  </div>
                );
              })
            ) : (
              <Text
                ml={"18%"}
                mt={"15%"}
                color={"white"}
                fontSize={"35px"}
                w={"80%"}
              >
                {" "}
                NO POST TO SHOW
              </Text>
            )}
          </TabPanel>
          <TabPanel>
            {filterQuestion().length > 0 ? (
              filterQuestion().map((question) => {
                return (
                  <div key={question._id}>
                    <Postcard
                      postValue={question}
                      isCategory={true}
                      type={"/answer"}
                    />
                  </div>
                );
              })
            ) : (
              <Text
                ml={"15%"}
                mt={"15%"}
                color={"white"}
                fontSize={"35px"}
                w={"80%"}
              >
                {" "}
                NO QUESTION TO SHOW
              </Text>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default CategoryPage;
