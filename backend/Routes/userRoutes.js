const express=require("express");
const {registerUser,loginUser}  = require("../Controller/userController");
const protect = require("../Middleware/authMiddleware");

const router=express.Router();

router.route("/").post(registerUser).get(protect) ;
router.route("/login").post(loginUser)

module.exports=router