import { Avatar } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { SiteState } from "../Context/AskMeProvider";
import "./css/CreatePost.css";
import ModalContent from "./js/ModalContent";
function CreatePost(props) {
  const {
    modalIsOpen,
    setIsOpen,
    isPost,
    setIsPost,
    openModal,
    closeModal,
    loggedInUser,
  } = SiteState();

  return (
    <div className="createPost">
      <div
        style={{
          height: "40px",
          display: "flex",
          width: "100%",
          backgroundColor: "#1d1d1d",
        }}
      >
        <Avatar
          name={loggedInUser ? loggedInUser.name : ""}
          src="https://bit.ly/broken-link"
          size={"sm"}
        />
        <div className="InputDiv">What do you want to ask or share?</div>
      </div>
      <div className="buttons">
        <Link to="/answer">
          <p className="button" onClick={() => openModal("ask")}>
            Ask
          </p>
        </Link>
        <Link to="/answer">
          <p className="button">Answer</p>
        </Link>

        <Link to="/">
          <p className="button" onClick={() => openModal("post")}>
            Post
          </p>
        </Link>

        <ModalContent />
      </div>
    </div>
  );
}

export default CreatePost;
