import { Avatar, Box, Button, Textarea } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import "../css/PostCard.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import CommentBoxCard from "./CommentBoxCard";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { SiteState } from "../../Context/AskMeProvider";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function Postcard(props) {
  const { _id, user, content, designation } = props.postValue;

  const {
    postList,
    setPostList,
    setQuestionList,
    questionList,
    currLocationPath,
    currTab,
    loggedInUser,
    setLoggedInUser,
    socket,
    setSocket,
  } = SiteState();

  const location = useLocation();

  const [liked, setLiked] = useState(false);
  const [answerVisibility, setAnswerVisibility] = useState(false);
  const [commentVisibility, setCommentVisibility] = useState(false);
  const [following, setFollowing] = useState();
  const comment = useRef(null);
  const answer = useRef(null);
  let { likeCount, commentList } = props.postValue;
  let lc = false;
  let user_designation = "";

  useEffect(() => {
    setLiked(likeCount.includes(loggedInUser._id));
    if (loggedInUser.following) {
      setFollowing(loggedInUser.following.includes(user._id));
    }
  });

  const handleLike = async () => {
    if (props.type === "/answer") {
      if (liked) {
        let updatedQuestionList = [];
        questionList.map((question) => {
          if (question._id == _id) {
            updatedQuestionList.push({
              ...question,
              likeCount: likeCount.filter((like) => {
                return like != loggedInUser._id;
              }),
            });
          } else {
            updatedQuestionList.push(question);
          }
        });
        setQuestionList(updatedQuestionList);
      } else {
        let updatedPostList = [];
        questionList.map((post) => {
          if (post._id == _id) {
            updatedPostList.push({
              ...post,
              likeCount: [...post.likeCount, loggedInUser._id],
            });
          } else {
            updatedPostList.push(post);
          }
        });
        setQuestionList(updatedPostList);
      }
      try {
        let updatePostLikes = await axios.put(
          "/api/user/updatePostLikes",
          {
            id: _id,
            likeCount: likeCount,
            user_id: loggedInUser._id,
            isLiked: !liked,
          },
          { params: { currLocationPath: "answer" } }
        );
      } catch (err) {
        console.log("Error occured ", err);
      }
    } else {
      if (liked) {
        let updatedPost = [];
        postList.map((post) => {
          if (post._id == _id) {
            updatedPost.push({
              ...post,
              likeCount: likeCount.filter((like) => {
                return like != loggedInUser._id;
              }),
            });
          } else {
            updatedPost.push(post);
          }
        });
        setPostList(updatedPost);
      } else {
        let updatedPost = [];
        postList.map((post) => {
          if (post._id == _id) {
            updatedPost.push({
              ...post,
              likeCount: [...post.likeCount, loggedInUser._id],
            });
          } else {
            updatedPost.push(post);
          }
        });
        setPostList(updatedPost);
      }
      try {
        let updatePostLikes = await axios.put(
          "/api/user/updatePostLikes",
          {
            id: _id,
            likeCount: likeCount,
            user_id: loggedInUser._id,
            isLiked: !liked,
          },
          { params: { currLocationPath: "" } }
        );
      } catch (err) {
        console.log("Error occured ", err);
      }
    }

    setLiked(!liked);
  };

  const handleComment = async (e) => {
    if (e.key === "Enter") {
      try {
        let addComment = {};

        if (props.type == "/answer") {
          const updatedPost = [];
          questionList.map((post) => {
            if (post._id == _id) {
              updatedPost.push({
                ...post,
                commentList: [
                  {
                    comment: answer.current.value,
                    user_name: loggedInUser.name,
                    user_designation: loggedInUser.designation,
                  },
                  ...commentList,
                ],
              });
            } else {
              updatedPost.push(post);
            }
          });
          setQuestionList(updatedPost);
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
          const updatedPost = [];
          postList.map((post) => {
            if (post._id == _id) {
              updatedPost.push({
                ...post,
                commentList: [
                  {
                    comment: comment.current.value,
                    user_name: loggedInUser.name,
                    user_designation: loggedInUser.designation,
                  },
                  ...commentList,
                ],
              });
            } else {
              updatedPost.push(post);
            }
          });
          setPostList(updatedPost);

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
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  const sendNotification = (messageDetail) => {
    if (socket.id) {
      socket.emit("notify", messageDetail);
    }
  };
  const handleFollow = async () => {
    setFollowing(!following);
    try {
      if (!following) {
        sendNotification({
          message: loggedInUser.name + " started following you",
          user: user,
        });

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
        sendNotification({
          message: loggedInUser.name + " unfollowed you",
          user: user,
        });

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
      <Box className="postCard">
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
          {props.type === "/answer" ? (
            <QuestionAnswerIcon
              style={{ marginLeft: "25px" }}
              onClick={() => {
                setAnswerVisibility(!answerVisibility);
              }}
            />
          ) : (
            <CommentIcon
              style={{ marginLeft: "25px" }}
              onClick={() => {
                setCommentVisibility(!commentVisibility);
              }}
            />
          )}
        </Box>
      </Box>
      <Box>
        <Box className="commentSection">
          {props.type === "/answer" && answerVisibility ? (
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
              {commentList.map((item, index) => {
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
          {props.type == "/" && commentVisibility ? (
            <>
              <input
                type="text"
                className="commentBox"
                placeholder="Add Comment..."
                ref={comment}
                onKeyUpCapture={handleComment}
              />
              {commentList.map((item, index) => {
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
