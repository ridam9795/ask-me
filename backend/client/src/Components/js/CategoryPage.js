import React, { useEffect, useState } from "react";
import "../css/CategoryPage.css";
import { useParams } from "react-router-dom";
import { Box, Img, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
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
    const filteredPostList = postList.filter((post) => {
      return post.tag.includes(category);
    });
    if (search.length > 0) {
      return filteredPostList.filter((post) => {
        return post.content.toLowerCase().includes(search.toLowerCase());
      });
    }
    return filteredPostList;
  };
  const filterQuestion = () => {
    const filteredQuestionList = questionList.filter((question) => {
      return question.tag.includes(category);
    });
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
                  <Postcard
                    key={post._id}
                    postValue={post}
                    isCategory={true}
                    type={"/"}
                  />
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
              filterQuestion().map((question, index) => {
                return (
                  <Postcard
                    key={question._id}
                    postValue={question}
                    isCategory={true}
                    type={"/answer"}
                  />
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
