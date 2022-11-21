import { Avatar, Box, Button, Textarea } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import "../css/PostCard.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import CommentBoxCard from "./CommentBoxCard";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { SiteState } from "../../Context/AskMeProvider";
import axios from "axios";
import { Link } from "react-router-dom";
function Postcard(props) {
  const { _id, user, content, designation } = props.postValue;

  const {
    postList,
    questionList,
    signedIn,
    currLocationPath,
    currTab,
    loggedInUser,
    setLoggedInUser,
  } = SiteState();

  const [liked, setLiked] = useState(false);
  const [answerVisibility, setAnswerVisibility] = useState(false);
  const [commentVisibility, setCommentVisibility] = useState(false);
  const [following, setFollowing] = useState();
  const [updated, setUpdated] = useState(false);

  const comment = useRef(null);
  const answer = useRef(null);
  const categoryComment = useRef(null);
  const categoryAnswer = useRef(null);
  let { likeCount, commentList } = props.postValue;
  let [currCommentList, setCommentList] = useState([]);
  let lc = false;
  let loggedInUserId = "";
  let user_designation = "";

  //const {user}=SiteState();
  useEffect(() => {
    if (loggedInUser.following) {
      setFollowing(loggedInUser.following.includes(user._id));
    }
  });
  useEffect(() => {
    setLiked(lc);
    setCommentList(commentList);
  }, []);

  const handleLike = async () => {
    if (currLocationPath === "answer" || currTab == "answer") {
      let updatePostLikes = await axios
        .put(
          "/api/user/updatePostLikes",
          {
            id: _id,
            likeCount: likeCount,
            user_id: loggedInUser._id,
            isLiked: !liked,
          },
          { params: { currLocationPath: "answer" } }
        )
        .then((data) => {});
    } else {
      let updatePostLikes = await axios
        .put(
          "/api/user/updatePostLikes",
          {
            id: _id,
            likeCount: likeCount,
            user_id: loggedInUser._id,
            isLiked: !liked,
          },
          { params: { currLocationPath: "" } }
        )
        .then((data) => {});
    }

    setLiked(!liked);
  };

  const handleComment = async (e) => {
    if (e.key === "Enter") {
      try {
        let addComment = {};
        if (props.isCategory) {
          if (currTab == "answer") {
            addComment = await axios.put(
              "/api/user/addComment",
              {
                post_id: _id,
                user_name: loggedInUser.name,
                user_designation: user_designation,
                comment: categoryAnswer.current.value,
              },
              { params: { currLocationPath: "answer" } }
            );
            categoryAnswer.current.value = "";
          } else {
            addComment = await axios.put(
              "/api/user/addComment",
              {
                post_id: _id,
                user_name: loggedInUser.name,
                user_designation: user_designation,
                comment: categoryComment.current.value,
              },
              { params: { currLocationPath: "" } }
            );
            categoryComment.current.value = "";
          }
        } else {
          if (
            currLocationPath === "answer" &&
            answer.current.value.length > 1
          ) {
            addComment = await axios.put(
              "/api/user/addComment",
              {
                post_id: _id,
                user_name: loggedInUser.name,
                user_designation: user_designation,
                comment: answer.current.value,
              },
              { params: { currLocationPath: "answer" } }
            );
            answer.current.value = "";
          } else {
            addComment = await axios.put(
              "/api/user/addComment",
              {
                post_id: _id,
                user_name: loggedInUser.name,
                user_designation: user_designation,
                comment: comment.current.value,
              },
              { params: { currLocationPath: "" } }
            );
            comment.current.value = "";
          }
        }

        if (addComment) {
          setCommentList(addComment.data.commentList);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  const handleFollow = async () => {
    console.log("loggedIn ", loggedInUser, " currUser: ", user);
    setFollowing(!following);
    setUpdated(!updated);
    props.setPostUpdated(!props.postUpdated);
    props.setPostUpdated(!props.postUpdated);
    try {
      if (!following) {
        console.log("Not following");
        setLoggedInUser({
          ...loggedInUser,
          following: [...loggedInUser.following, user._id],
        });
        const followUser = await axios.put("/api/user/follow", {
          loggedInUser: loggedInUser._id,
          followedUser: user._id,
        });
        user.followers = user.followers.filter((id) => {
          return id != loggedInUser._id;
        });
      } else {
        console.log("following");
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
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Box>
      <Box className="postCard" ml={props.isCategory ? "0%" : "83%"}>
        <Box className="postCardHeader">
          <Box style={{ width: "10%" }}>
            <Avatar
              name={user ? user.name : ""}
              src="https://bit.ly/broken-link"
              size={"sm"}
            />
          </Box>
          <Box style={{ width: "90%" }}>
            <p style={{ fontWeight: "750" }}>
              <Link to={`/profile/${user._id}`}>
                {user.name ? user.name.toUpperCase() : "Anonymous"}
              </Link>

              {user._id != loggedInUser._id && currLocationPath !== "answer" ? (
                <Button
                  colorScheme={"#1d1d1d"}
                  color="#4fa8db"
                  fontSize={"15px"}
                  height="5"
                  mb={"1"}
                  onClick={handleFollow}
                >
                  {following ? "Following" : "Follow"}
                </Button>
              ) : (
                <></>
              )}
            </p>
            <p style={{ fontSize: "12px" }}>{user ? designation : ""}</p>
          </Box>
        </Box>
        <Box
          className="postCardBody"
          dangerouslySetInnerHTML={{ __html: content }}
        ></Box>
        <Box className="postCardFooter">
          <ThumbUpIcon
            style={{ color: liked ? "green" : "4fa8db" }}
            onClick={handleLike}
          />
          {currLocationPath === "answer" ? (
            <QuestionAnswerIcon
              style={{ marginLeft: "25px" }}
              onClick={() => {
                setAnswerVisibility(!answerVisibility);
              }}
            />
          ) : (
            <></>
          )}
          {currLocationPath === "" ? (
            <CommentIcon
              style={{ marginLeft: "25px" }}
              onClick={() => {
                setCommentVisibility(!commentVisibility);
              }}
            />
          ) : (
            <></>
          )}
          {props.isCategory && currTab == "post" ? (
            <CommentIcon
              style={{ marginLeft: "25px" }}
              onClick={() => {
                setCommentVisibility(!commentVisibility);
              }}
            />
          ) : (
            <></>
          )}
          {props.isCategory && currTab == "answer" ? (
            <QuestionAnswerIcon
              style={{ marginLeft: "25px" }}
              onClick={() => {
                setAnswerVisibility(!answerVisibility);
              }}
            />
          ) : (
            <></>
          )}
        </Box>
      </Box>
      <Box>
        <Box className="commentSection" ml={props.isCategory ? "0%" : "83%"}>
          {currLocationPath === "answer" && answerVisibility ? (
            <>
              <Textarea
                type="text"
                w={"95%"}
                color={"white"}
                className="commentBox"
                placeholder="Add Answer"
                ref={answer}
                onKeyUpCapture={handleComment}
              />
              {currCommentList.map((item, index) => {
                return (
                  <CommentBoxCard
                    key={index}
                    comment={item.comment}
                    user_name={item.user_name}
                    designation={item.user_designation}
                  />
                );
              })}
            </>
          ) : (
            <></>
          )}
          {currLocationPath == "" && commentVisibility ? (
            <>
              <input
                type="text"
                className="commentBox"
                placeholder="Add Comment..."
                ref={comment}
                onKeyUpCapture={handleComment}
              />
              {currCommentList.map((item, index) => {
                return (
                  <CommentBoxCard
                    key={index}
                    comment={item.comment}
                    user_name={item.user_name}
                    designation={item.user_designation}
                  />
                );
              })}
            </>
          ) : (
            <></>
          )}
          {props.isCategory && commentVisibility && currTab == "post" ? (
            <>
              <input
                type="text"
                className="commentBox"
                placeholder="Add Comment..."
                ref={categoryComment}
                onKeyUpCapture={handleComment}
              />
              {currCommentList.map((item, index) => {
                return (
                  <CommentBoxCard
                    key={index}
                    comment={item.comment}
                    user_name={item.user_name}
                    designation={item.user_designation}
                  />
                );
              })}
            </>
          ) : (
            <></>
          )}

          {props.isCategory && answerVisibility && currTab == "answer" ? (
            <>
              <Textarea
                type="text"
                w={"95%"}
                color={"white"}
                className="commentBox"
                placeholder="Add Answer"
                ref={categoryAnswer}
                onKeyUpCapture={handleComment}
              />
              {currCommentList.map((item, index) => {
                return (
                  <CommentBoxCard
                    key={index}
                    comment={item.comment}
                    user_name={item.user_name}
                    designation={item.user_designation}
                  />
                );
              })}
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Postcard;
