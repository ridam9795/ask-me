import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SiteState } from "../../Context/AskMeProvider";
import PersonCard from "./PersonCard";

function FindPeople() {
  const [allUser, setAllUser] = useState([]);
  const { loggedInUser, search } = SiteState();

  useEffect(() => {
    fetchAllUser();
  }, []);
  useEffect(() => {
    let searched = search.trim().toLowerCase();

    console.log("search: ", searched);
  }, [search]);
  const getFilteredUser = () => {
    let searched = search.trim().toLowerCase();
    if (searched.length > 0) {
      let filterUser = allUser.filter((user) => {
        return user.name.toLowerCase().includes(searched);
      });
      return filterUser;
    } else {
      return allUser;
    }
  };
  const fetchAllUser = async () => {
    try {
      const fetchedUsers = await axios.get("/api/user/fetchAllUsers");
      if (fetchedUsers) {
        console.log(fetchedUsers.data);
        setAllUser(fetchedUsers.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box ml={"83%"} w="150%">
      <Box>
        <Text
          fontSize={"30px"}
          fontFamily={"Georgia"}
          as="i"
          color="#fff"
          ml={"35%"}
          textAlign="center"
        >
          Suggestions for you
        </Text>
      </Box>
      <Box>
        {getFilteredUser()?.map((user) => {
          if (user._id != loggedInUser._id) {
            return <PersonCard user={user} key={user._id}></PersonCard>;
          }
        })}
      </Box>
    </Box>
  );
}

export default FindPeople;
