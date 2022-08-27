import { Avatar, Box, Button, Textarea } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import "../css/PostCard.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import CommentBoxCard from "./CommentBoxCard";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { SiteState } from "../../Context/AskMeProvider";
import axios from "axios";
function Postcard({ postValue }) {
  const { _id, user, userName, content, designation } = postValue;
  const { postList, questionList, signedIn, currLocationPath } = SiteState();
  const [liked, setLiked] = useState(false);
  const [answerVisibility, setAnswerVisibility] = useState(false);
  const [commentVisibility, setCommentVisibility] = useState(false);

  const comment = useRef(null);
  const answer = useRef(null);
  let { likeCount, commentList } = postValue;
  let [currCommentList, setCommentList] = useState([]);
  let lc = false;
  let loggedInUserId = "";
  let loggedInUserName = "";
  let user_designation = "";
  if (localStorage.getItem("userInfo")) {
    let currUser = JSON.parse(localStorage.getItem("userInfo"));
    loggedInUserName = currUser.name;
    loggedInUserId = currUser._id;
    user_designation = currUser.designation;
    lc = likeCount.includes(loggedInUserId.toString());
  }
  //const {user}=SiteState();
  useEffect(() => {
    setLiked(lc);
    setCommentList(commentList);
  }, [
    JSON.stringify(postList),
    JSON.stringify(questionList),
    commentList,
    signedIn,
    lc,
  ]);

  const handleLike = async () => {
    if (currLocationPath === "answer") {
      let updatePostLikes = await axios
        .put(
          "/api/user/updatePostLikes",
          {
            id: _id,
            likeCount: likeCount,
            user_id: loggedInUserId.toString(),
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
            user_id: loggedInUserId.toString(),
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

        if (currLocationPath === "answer" && answer.current.value.length > 1) {
          addComment = await axios.put(
            "/api/user/addComment",
            {
              post_id: _id,
              user_name: loggedInUserName,
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
              user_name: loggedInUserName,
              user_designation: user_designation,
              comment: comment.current.value,
            },
            { params: { currLocationPath: "" } }
          );
          comment.current.value = "";
        }

        if (addComment) {
          setCommentList(addComment.data.commentList);
        }
      } catch (err) {
        console.log("Some Error occurred", err);
      }
    }
  };
  return (
    <div>
      <div className="postCard">
        <div className="postCardHeader">
          <div style={{ width: "10%" }}>
            <Avatar
              name={user ? userName : ""}
              src="https://bit.ly/broken-link"
              size={"sm"}
            />
          </div>
          <div style={{ width: "90%" }}>
            <p style={{ fontWeight: "750" }}>
              {user ? userName : "Anonymous"}{" "}
              <Button
                colorScheme={"#1d1d1d"}
                color="#4fa8db"
                fontSize={"15px"}
                height="5"
                mb={"1"}
              >
                Follow
              </Button>
            </p>
            <p style={{ fontSize: "12px" }}>{user ? designation : ""}</p>
          </div>
        </div>
        <div
          className="postCardBody"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
        <div className="postCardFooter">
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
            <CommentIcon
              style={{ marginLeft: "25px" }}
              onClick={() => {
                setCommentVisibility(!commentVisibility);
              }}
            />
          )}
        </div>
      </div>
      <div>
        <div className="commentSection">
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
        </div>
      </div>
    </div>
  );
}

export default Postcard;
