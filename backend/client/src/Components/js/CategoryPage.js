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
  const [follow, setFollow] = useState(false);
  let { category } = useParams();
  const [postNotFound, setPostNotFound] = useState(false);
  const [quesNotFound, setQuesNotFound] = useState(false);

  category = category.replaceAll("-", " ");
  const {
    categoryList,
    setCategoryList,
    readQuestions,
    setReadQuestions,
    readPosts,
    setReadPosts,
    currTab,
    setCurrTab,
    filteredReadPost,
    setFilteredReadPost,
    filteredQuestion,
    setFilteredQuestion,
    search,
    setSearch,
    tabIdx,
    setTabIdx,
  } = SiteState();

  useEffect(() => {
    if (filteredReadPost.length > 0) {
      setReadPosts(filteredReadPost);
      setPostNotFound(false);
    } else {
      if (search.length > 0) {
        setPostNotFound(true);
      } else {
        setPostNotFound(false);
        filterPost();
      }
    }
    if (filteredQuestion.length > 0) {
      setReadQuestions(filteredQuestion);
      setQuesNotFound(false);
    } else {
      if (search.length > 0) {
        setQuesNotFound(true);
      } else {
        setQuesNotFound(false);
        filterQuestion();
      }
    }
  }, [category, search, filteredReadPost.length, filteredQuestion.length]);
  const filterPost = async () => {
    try {
      const postsForCurrentCategory = await axios.get(
        "/api/user/filterPostCategory",
        {
          params: { selectedCategory: category },
        }
      );
      if (postsForCurrentCategory) {
        setReadPosts(postsForCurrentCategory.data);
      }
    } catch (err) {
      console.log("error occured while finding post: ", err);
    }
  };
  const filterQuestion = async (req, res) => {
    try {
      const QuestionsForCurrentCategory = await axios.get(
        "/api/user/filterQuestionCategory",
        {
          params: { selectedCategory: category },
        }
      );
      if (QuestionsForCurrentCategory) {
        setReadQuestions(QuestionsForCurrentCategory.data);
      }
    } catch (err) {
      console.log("error occured while finding question");
    }
  };

  const handleFollow = () => {
    const data = [];
    categoryList.map((item) => {
      if (item.name === category) {
        data.push({ name: item.name, isFollowing: !item.isFollowing });
      } else {
        data.push({ name: item.name, isFollowing: item.isFollowing });
      }
    });
    setCategoryList(data);
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
        <Img
          src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2021/12/Digital-marketing-trends-2022.jpg"
          className="categoryImage"
          alt="categoryImage"
        />
        <Box>
          <Text fontSize={"25px"} fontWeight={"500"}>
            {category}
          </Text>
          {categoryList.map((item, index) => {
            if (item.name === category) {
              return (
                <Button
                  colorScheme={"blue"}
                  h={"8"}
                  mt={"5"}
                  onClick={handleFollow}
                  key={index}
                >
                  {item.isFollowing ? "Following" : "Follow"}
                </Button>
              );
            }
          })}
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
            {!postNotFound ? (
              readPosts.map((post) => {
                return (
                  <Box key={post._id}>
                    <Postcard postValue={post} isCategory={true} />
                  </Box>
                );
              })
            ) : (
              <Box color={"white"} mb={"90px"} mt={"80px"} fontSize={"30px"}>
                NO POST MATCHES THE SEARCH CRITERIA IN THIS CATEGORY
              </Box>
            )}
            {!postNotFound && readPosts.length == 0 ? (
              <Box color={"white"} mb={"90px"} mt={"80px"} fontSize={"30px"}>
                NO POST UNDER GIVEN CATEGORY
              </Box>
            ) : (
              <Box></Box>
            )}
          </TabPanel>
          <TabPanel>
            {!quesNotFound ? (
              readQuestions.map((post) => {
                return (
                  <Box key={post._id}>
                    <Postcard postValue={post} isCategory={true} />
                  </Box>
                );
              })
            ) : (
              <Box color={"white"} mb={"90px"} mt={"80px"} fontSize={"30px"}>
                NO QUESTION MATCHES THE SEARCH CRITERIA IN THIS CATEGORY
              </Box>
            )}
            {!quesNotFound && readQuestions.length == 0 ? (
              <Box
                color={"white"}
                mb={"90px"}
                mt={"80px"}
                fontSize={"30px"}
                w={"120%"}
              >
                NO QUESTION UNDER GIVEN CATEGORY
              </Box>
            ) : (
              <Box></Box>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default CategoryPage;
