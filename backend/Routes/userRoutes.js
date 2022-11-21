const express = require("express");
const {
  registerUser,
  loginUser,
  createPost,
  fetchPostList,
  updateLikes,
  addComment,
  searchPost,
  filterPostCategory,
  filterQuestionCategory,
  searchPostCategory,
  searchQuestionCategory,
  followUser,
  unfollowUser,
  fetchUsers,
  fetchUserProfileData,
  fetchQuestionList,
  fetchUserDetail,
} = require("../Controller/userController");
const protect = require("../Middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect);
router.route("/login").post(loginUser);
router.route("/createpost").post(createPost);
router.route("/postList").get(fetchPostList);
router.route("/questionList").get(fetchQuestionList);
router.route("/fetchUserDetail").get(fetchUserDetail);
router.route("/updatePostLikes").put(updateLikes);
router.route("/addComment").put(addComment);
router.route("/search").get(searchPost);
router.route("/filterPostCategory").get(filterPostCategory);
router.route("/filterQuestionCategory").get(filterQuestionCategory);
router.route("/searchPostCategory").get(searchPostCategory);
router.route("/searchQuestionCategory").get(searchQuestionCategory);
router.route("/follow").put(followUser);
router.route("/unfollow").put(unfollowUser);
router.route("/fetchUsers").get(fetchUsers);
router.route("/fetchUserProfileData").get(fetchUserProfileData);




module.exports = router;
