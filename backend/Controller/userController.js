const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const Post = require("../Model/postModel");
const User = require("../Model/userModel");
const Comment = require("../Model/commentModel");
const registerUser = asyncHandler(async (req, res) => {
  const { signUpName, signUpEmail, signUpPass, designation } = req.body;
  if (!signUpEmail || !signUpPass || !signUpName || !designation) {
    // console.log(signUpEmail+" "+signUpPass+" "+signUpName+" "+designation)
    res.status(400);
    throw new Error("Please Enter all the fields");
  }
  const userExists = await User.findOne({ email: signUpEmail });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name: signUpName,
    email: signUpEmail,
    password: signUpPass,
    designation: designation,
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
    res.status(400);
    throw new Error("Failed to create the User");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { signInEmail, signInPass } = req.body;
  //  console.log(signInEmail+" "+signInPass)
  if (!signInEmail || !signInPass) {
    res.status(401);
    throw new Error("Please fill all the deatils");
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
    res.status(401);
    throw new Error("Invalid Email or password");
  }
});
const createPost = asyncHandler(async (req, res) => {
  const { id, userName, tag, content, likeCount, commentList, designation } =
    req.body;

  if (!id) {
    res.status(401);
    throw new Error("Please login to add post");
  }
  if (!content) {
    res.status(401);
    throw new Error("Please add some content...");
  }
  const post = await Post.create({
    user: id,
    userName: userName,
    content: content,
    likeCount: likeCount,
    commentList: commentList,
    tag: tag,
    designation: designation,
  });
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
  const postList = await Post.find().sort({ createdAt: -1 });
  if (postList) {
    res.status(200).send(postList);
  } else {
    res.status(400).send("No post to show");
  }
});
const updateLikes = asyncHandler(async (req, res) => {
  let { id, likeCount, user_id, isLiked } = req.body;
  let lc = likeCount.includes(user_id);
  // console.log("lc>>>>>>"+lc+" isLiked >>>> "+isLiked );
  let post = "";
  if (isLiked) {
    //  console.log("--------------liked--------------")
    if (!lc) {
      likeCount.push(user_id);
    }
  } else if (!isLiked) {
    // console.log("-------------------unliked---------------------")
    likeCount = likeCount.filter((lid) => {
      return lid !== user_id;
    });
  }
  // console.log("curr List: "+likeCount+" post: "+id);

  post = await Post.findOneAndUpdate(
    { _id: id },
    {
      likeCount: likeCount,
    }
  );

  if (post) {
    res.status(200).send(post);
  } else {
    res.status(400).send("post not found");
  }
});
const addComment = asyncHandler(async (req, res) => {
  const { post_id, user_name, user_designation, comment } = req.body;
  if (!comment) {
    res.status(404).send("Please Enter some comment");
  }

  const post = await Post.find({ _id: post_id });
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
    const updatePost = await Post.findOneAndUpdate({ _id: post_id }, post[0]);
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

module.exports = {
  registerUser,
  loginUser,
  createPost,
  fetchPostList,
  updateLikes,
  addComment,
};
