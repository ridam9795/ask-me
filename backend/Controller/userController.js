const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const Post = require("../Model/postModel");
const User = require("../Model/userModel");
const Comment = require("../Model/commentModel");
const Question = require("../Model/questionModel");
const registerUser = asyncHandler(async (req, res) => {
  const { signUpName, signUpEmail, signUpPass, signUpConfPass, designation } =
    req.body;
  if (
    !signUpEmail ||
    !signUpPass ||
    !signUpName ||
    !signUpConfPass ||
    !designation
  ) {
    res.status(401).send("Please Enter all the fields");
    return;
  }
  if (signUpConfPass !== signUpPass) {
    res.status(401).send("Password and confirm password does not match");
    return;
  }
  const userExists = await User.findOne({ email: signUpEmail });
  if (userExists) {
    res.status(401).send("User already exists");
    return;
  }
  const user = await User.create({
    name: signUpName,
    email: signUpEmail,
    password: signUpPass,
    designation: designation,
    followers: [],
    following: [],
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      designation: designation,
    });
  } else {
    res.status(401).send("Failed to create the User");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { signInEmail, signInPass } = req.body;
  if (!signInEmail || !signInPass) {
    res.status(401).send("Please fill all the deatils");
  }
  const user = await User.findOne({ email: signInEmail });
  if (user && (await user.matchPassword(signInPass))) {
    res.status(200).json({
      name: user.name,
      email: user.email,
      designation: user.designation,
    });
  } else {
    res.status(401).send("Invalid Email or password");
  }
});
const createPost = asyncHandler(async (req, res) => {
  const { loggedInUser, tag, content, likeCount, commentList } = req.body;
  const { currLocationPath } = req.query;

  if (!loggedInUser) {
    res.status(401);
    throw new Error("Please login to create post");
  }
  if (!content) {
    res.status(401);
    throw new Error("Please add some content...");
  }
  let post = {};
  if (currLocationPath === "answer") {
    post = await Question.create({
      user: loggedInUser,
      userName: loggedInUser.name,
      content: content,
      likeCount: likeCount,
      commentList: commentList,
      tag: tag,
      designation: loggedInUser.designation,
    });
  } else {
    post = await Post.create({
      user: loggedInUser,
      userName: loggedInUser.name,
      content: content,
      likeCount: likeCount,
      commentList: commentList,
      tag: tag,
      designation: loggedInUser.designation,
    });
  }

  if (post) {
    res.status(200).json({
      user: loggedInUser._id,
      userName: loggedInUser.name,
      content: content,
      likeCount: likeCount,
      commentList: commentList,
      tag: tag,
      designation: loggedInUser.designation,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the Post");
  }
});

const fetchPostList = asyncHandler(async (req, res) => {
  const postList = await Post.find().populate("user").sort({ createdAt: -1 });
  if (postList) {
    res.status(201).send(postList);
  } else {
    res.status(400).send("Error occured in fetching post list");
  }
});
const fetchQuestionList = asyncHandler(async (req, res) => {
  const questionList = await Question.find()
    .populate("user")
    .sort({ createdAt: -1 });
  if (questionList) {
    res.status(201).send(questionList);
  } else {
    res.status(400).send("Error occured in fetching question list");
  }
});
const updateLikes = asyncHandler(async (req, res) => {
  let { id, likeCount, user_id, isLiked } = req.body;
  let lc = likeCount.includes(user_id);
  const { currLocationPath } = req.query;

  let post = "";
  if (isLiked) {
    if (!lc) {
      likeCount.push(user_id);
    }
  } else if (!isLiked) {
    likeCount = likeCount.filter((lid) => {
      return lid !== user_id;
    });
  }
  if (currLocationPath === "answer") {
    post = await Question.findOneAndUpdate(
      { _id: id },
      {
        likeCount: likeCount,
      }
    );
  } else {
    post = await Post.findOneAndUpdate(
      { _id: id },
      {
        likeCount: likeCount,
      }
    );
  }

  if (post) {
    res.status(200).send(post);
  } else {
    res.status(400).send("post not found");
  }
});
const addComment = asyncHandler(async (req, res) => {
  const { post_id, user_name, user_designation, comment } = req.body;
  const { currLocationPath } = req.query;

  if (!comment) {
    res.status(404).send("Please Enter some comment");
  }
  let post = {};
  if (currLocationPath === "answer") {
    post = await Question.find({ _id: post_id });
  } else {
    post = await Post.find({ _id: post_id });
  }
  if (post.length > 0) {
    post[0].commentList = [
      {
        comment: comment,
        user_name: user_name,
        user_designation: user_designation,
      },
      ...post[0].commentList,
    ];
    let updatePost = {};
    if (currLocationPath === "answer") {
      updatePost = await Question.findOneAndUpdate({ _id: post_id }, post[0]);
    } else {
      updatePost = await Post.findOneAndUpdate({ _id: post_id }, post[0]);
    }
    if (updatePost) {
      res.status(200).send(post[0]);
    } else {
      res.status(400).send("Some Error occured while updating post");
    }
  } else {
    res.status(404).send("Post Not Found");
  }
});

const followUser = asyncHandler(async (req, res) => {
  const { loggedInUser, followedUser } = req.body;

  const updateFollowingList = await User.findOneAndUpdate(
    { _id: loggedInUser },
    {
      $addToSet: {
        following: followedUser,
      },
    }
  );
  const updateFollowerList = await User.findOneAndUpdate(
    { _id: followedUser },
    {
      $addToSet: {
        followers: loggedInUser,
      },
    }
  );
  if (updateFollowerList) {
    res.status(200).send("Updated...");
  } else {
    res
      .status(400)
      .send("Some error occured while updating follower and following list");
  }
});
const unfollowUser = asyncHandler(async (req, res) => {
  const { loggedInUser, followedUser } = req.body;
  const updateFollowingList = await User.updateOne(
    {
      _id: loggedInUser,
    },
    {
      $pull: {
        following: req.body.followedUser,
      },
    }
  );
  const updateFollowerList = await User.updateOne(
    {
      _id: followedUser,
    },
    {
      $pull: {
        followers: req.body.loggedInUser,
      },
    }
  );
  if (updateFollowerList && updateFollowingList) {
    res.status(200).send("Updated..");
  } else {
    res.status(404).send("Some Error occurred");
  }
});

const fetchUsers = asyncHandler(async (req, res) => {
  let { loggedInUser } = req.query;
  const user = await User.find({ _id: loggedInUser });
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(400).send("Some Error occured while searching user");
  }
});
const fetchUserProfileData = asyncHandler(async (req, res) => {
  let { user_id } = req.query;
  const user = await User.findOne({ _id: user_id })
    .populate("followers")
    .populate("following")
    .select("-password");
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(400).send("Some error occured while finding user");
  }
});
const fetchUserDetail = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email: email }).select("-password");
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(400).send("Some error occured in fetching user");
  }
});

module.exports = {
  registerUser,
  loginUser,
  createPost,
  fetchPostList,
  fetchQuestionList,
  updateLikes,
  addComment,
  followUser,
  unfollowUser,
  fetchUsers,
  fetchUserProfileData,
  fetchUserDetail,
};
