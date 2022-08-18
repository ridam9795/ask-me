const express=require("express");
const {registerUser,loginUser, createPost, fetchPostList, updateLikes,addComment}  = require("../Controller/userController");
const protect = require("../Middleware/authMiddleware");

const router=express.Router();

router.route("/").post(registerUser).get(protect) ;
router.route("/login").post(loginUser)
router.route("/createpost").post(createPost);
router.route('/postList').get(fetchPostList);
router.route('/updatePostLikes').put(updateLikes);
router.route('/addComment').put(addComment)

module.exports=router