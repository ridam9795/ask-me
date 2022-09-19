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
    // console.log(signUpEmail+" "+signUpPass+" "+signUpName+" "+designation)
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
      token: generateToken(user._id),
      designation: designation,
    });
  } else {
    res.status(401).send("Failed to create the User");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { signInEmail, signInPass } = req.body;
  console.log(signInEmail + " " + signInPass);
  if (!signInEmail || !signInPass) {
    res.status(401).send("Please fill all the deatils");
  }
  const user = await User.findOne({ email: signInEmail });
  if (user && (await user.matchPassword(signInPass))) {
    //  console.log("desig: "+  (user.designation))
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      designation: user.designation,
    });
  } else {
    res.status(401).send("Invalid Email or password");
  }
});
const createPost = asyncHandler(async (req, res) => {
  const { id, userName, tag, content, likeCount, commentList, designation } =
    req.body;
  const { currLocationPath } = req.query;

  if (!id) {
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
      user: id,
      userName: userName,
      content: content,
      likeCount: likeCount,
      commentList: commentList,
      tag: tag,
      designation: designation,
    });
  } else {
    post = await Post.create({
      user: id,
      userName: userName,
      content: content,
      likeCount: likeCount,
      commentList: commentList,
      tag: tag,
      designation: designation,
    });
  }

  if (post) {
    res.status(200).json({
      user: id,
      userName: userName,
      content: content,
      likeCount: likeCount,
      commentList: commentList,
      tag: tag,
      designation: designation,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the Post");
  }
});

const fetchPostList = asyncHandler(async (req, res) => {
  const { currLocationPath } = req.query;
  let postList = {};
  if (currLocationPath === "answer") {
    postList = await Question.find().populate("user").sort({ createdAt: -1 });
  } else {
    postList = await Post.find().populate("user").sort({ createdAt: -1 });
  }
  if (postList) {
    res.status(200).send(postList);
  } else {
    res.status(400).send("No post to show");
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
    //   post[0].commentList.push({comment:comment,user_name:user_name,user_designation:user_designation});
    post[0].commentList = [
      {
        comment: comment,
        user_name: user_name,
        user_designation: user_designation,
      },
      ...post[0].commentList,
    ];
    //  console.log("post: >>>>>>>>",post[0]," length:  ",post[0].commentList.length)
    let updatePost = {};
    if (currLocationPath === "answer") {
      updatePost = await Question.findOneAndUpdate({ _id: post_id }, post[0]);
    } else {
      updatePost = await Post.findOneAndUpdate({ _id: post_id }, post[0]);
    }
    if (updatePost) {
      //    console.log(updatePost);

      res.status(200).send(post[0]);
    } else {
      res.status(400).send("Some Error occured while updating post");
    }
  } else {
    res.status(404).send("Post Not Found");
  }
});
const searchPost = asyncHandler(async (req, res) => {
  const { search } = req.query;

  let post = [];
  if (req.query.currLocationPath === "answer") {
    post = await Question.find({
      content: { $regex: req.query.search, $options: "i" },
    }).sort({ createdAt: -1 });
  } else if (req.query.currLocationPath === "") {
    post = await Post.find({
      content: { $regex: req.query.search, $options: "i" },
    }).sort({ createdAt: -1 });
  }

  if (post) {
    res.status(200).send(post);
  } else {
    res.status(400).send("Some error occured");
  }
});
const filterPostCategory = asyncHandler(async (req, res) => {
  const { selectedCategory } = req.query;
  const post = await Post.find({
    tag: {
      $in: [selectedCategory],
    },
  });
  if (post) {
    res.status(200).send(post);
  } else {
    res.status(404).send("Some error occured while getting post");
  }
});
const filterQuestionCategory = asyncHandler(async (req, res) => {
  const { selectedCategory } = req.query;
  const question = await Question.find({
    tag: {
      $in: [selectedCategory],
    },
  });
  if (question) {
    res.status(200).send(question);
  } else {
    res.status(404).send("Some error occured while getting questions");
  }
});
const searchQuestionCategory = asyncHandler(async (req, res) => {
  const { selectedCategory, searchValue } = req.query;
  const question = await Question.find({
    $and: [
      {
        tag: {
          $in: [selectedCategory],
        },
      },
      { content: { $regex: req.query.searchValue, $options: "i" } },
    ],
  });
  if (question) {
    //console.log(question);
    res.status(200).send(question);
  } else {
    res.status(404).send("Some error occured while getting post");
  }
});
const searchPostCategory = asyncHandler(async (req, res) => {
  const { selectedCategory, searchValue } = req.query;
  // console.log(selectedCategory + " " + searchValue);
  const post = await Post.find({
    $and: [
      {
        tag: {
          $in: [selectedCategory],
        },
      },
      { content: { $regex: req.query.searchValue, $options: "i" } },
    ],
  });
  if (post) {
    //  console.log(post);
    res.status(200).send(post);
  } else {
    res.status(404).send("Some error occured while getting post");
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

module.exports = {
  registerUser,
  loginUser,
  createPost,
  fetchPostList,
  updateLikes,
  addComment,
  searchPost,
  filterPostCategory,
  filterQuestionCategory,
  searchQuestionCategory,
  searchPostCategory,
  followUser,
  unfollowUser,
  fetchUsers,
  fetchUserProfileData,
};
