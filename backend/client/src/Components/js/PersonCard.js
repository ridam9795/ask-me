import { Avatar, Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SiteState } from "../../Context/AskMeProvider";
import "../css/PersonCard.css";

function PeopleCard({ user }) {
  const { loggedInUser, setLoggedInUser } = SiteState();
  const [Following, setFollowing] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      let follow = loggedInUser.following.includes(user._id);
      setFollowing(follow);
    }
  });

  const handleFollow = async () => {
    setFollowing(!Following);

    if (Following) {
      const updatedFollowing = loggedInUser.following.filter((id) => {
        return id != user._id;
      });
      setLoggedInUser({
        ...loggedInUser,
        following: updatedFollowing,
      });
      const unfollowUser = await axios.put("/api/user/unfollow", {
        loggedInUser: loggedInUser._id,
        followedUser: user._id,
      });
    } else {
      setLoggedInUser({
        ...loggedInUser,
        following: [...loggedInUser.following, user._id],
      });
      const followUser = await axios.put("/api/user/follow", {
        loggedInUser: loggedInUser._id,
        followedUser: user._id,
      });
    }
  };

  return (
    <div className="personCard">
      <div className="comment">
        <div style={{ width: "10%" }}>
          <Avatar
            src="https://bit.ly/broken-link"
            name={user.name}
            size={"md"}
          />
        </div>
        <div style={{ width: "90%", height: "auto" }}>
          <p style={{ fontWeight: "750", fontSize: "18px" }}>{user.name}</p>
          <p style={{ fontSize: "12px" }}>{user.designation}</p>
          <p style={{ color: "black", fontWeight: "400" }}></p>
        </div>
        {Following ? (
          <Button onClick={handleFollow} colorScheme="blue">
            Following
          </Button>
        ) : (
          <Button onClick={handleFollow} colorScheme="blue">
            Follow
          </Button>
        )}
      </div>
    </div>
  );
}

export default PeopleCard;
