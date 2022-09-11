import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

function UserCard(props) {
  return (
    <Box display="flex" w="100%" bg="#1d1d1d" p={3} mt={2} h="70px">
      <Avatar name={props.name} mr={5} />
      <Box>
        <Text fontSize={"20px"} fontFamily={"bold"}>
          {props.name.toUpperCase()}
        </Text>
        <Text fontSize={"10px"}>{props.designation.toUpperCase()}</Text>
      </Box>
    </Box>
  );
}

export default UserCard;
