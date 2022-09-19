import { Avatar, Box, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import UserCard from "./UserCard";

function ProfilePage() {
  let { userID } = useParams();
  const [profileUser, setProfileUser] = useState({});
  const fetchProfileUser = async () => {
    try {
      const user = await axios.get("/api/user/fetchUserProfileData", {
        params: { user_id: userID },
      });
      if (user.data) {
        console.log(user.data);

        setProfileUser(user.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProfileUser();
    console.log(userID);
  }, [userID]);
  return (
    <>
      <Box bg="#383735" w={"850px"} ml={"-250px"} display="flex" pt={5} pb={5}>
        <Avatar size={"2xl"} ml={10}></Avatar>
        <Box>
          <Text w="100%" color="white" ml={8} fontSize={30} fontWeight={"bold"}>
            {profileUser.name}
          </Text>
          <Text w="100%" color="white" ml={8} fontSize={15} fontWeight={"bold"}>
            {profileUser.designation}
          </Text>
          <Text w="100%" color="white" ml={8} fontSize={15} fontWeight={"bold"}>
            {profileUser.followers ? profileUser.followers.length : 0} followers
            . {profileUser.following ? profileUser.following.length : 0}{" "}
            following
          </Text>
        </Box>
      </Box>
      <Box
        bg="#383735"
        w={"850px"}
        ml={"-250px"}
        display="flex"
        mt={3}
        pb={5}
        height={"500px"}
      >
        <Tabs w="100%" color={"white"}>
          <TabList>
            <Tab w="50%">Followers</Tab>
            <Tab w="50%">Following</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {profileUser.followers &&
                profileUser.followers.map((user) => {
                  return (
                    <Box key={user._id}>
                      <UserCard
                        name={user.name}
                        designation={user.designation}
                      />
                    </Box>
                  );
                })}
            </TabPanel>
            <TabPanel>
              {profileUser.following &&
                profileUser.following.map((user) => {
                  return (
                    <Box key={user._id}>
                      <UserCard
                        name={user.name}
                        designation={user.designation}
                      />
                    </Box>
                  );
                })}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default ProfilePage;