import React from "react";
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
import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { SiteState } from "../../Context/AskMeProvider";
import { useToast } from "@chakra-ui/react";

function TagContainer() {
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
  const toast = useToast();
  const handleRemove = (idx) => {
    console.log("idx", idx);
    const filtertedBadge = badge.filter((item, index) => {
      return index !== idx;
    });
    setBadge(filtertedBadge);
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
  return (
    <>
      <Input
        type="text"
        placeholder="Add tag eg. Marketing,Science"
        mb={1}
        onChange={handleSearch}
        value={searchPostTag}
        mt={"5"}
      />

      {badge.map((item, index) => {
        return (
          <Badge
            px={2}
            py={1}
            borderRadius="lg"
            m={1}
            mb={2}
            variant="solid"
            fontSize={12}
            colorScheme="whiteAlpha"
            cursor="pointer"
            key={index}
          >
            {item}
            <CloseIcon ml={"3"} onClick={() => handleRemove(index)} />
          </Badge>
        );
      })}
      {tag.map((item, index) => {
        return (
          <Box d={"flex"}>
            <Badge
              px={2}
              py={1}
              borderRadius="lg"
              m={1}
              mb={2}
              variant="solid"
              fontSize={12}
              colorScheme="whiteAlpha"
              cursor="pointer"
              key={index}
              onClick={() => handleBadge(item)}
            >
              {item}
            </Badge>
          </Box>
        );
      })}
    </>
  );
}

export default TagContainer;
