const asyncHandler=require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../Model/userModel");
const registerUser=asyncHandler( async (req,res)=>{
   const {signUpName,signUpEmail,signUpPass}=req.body;
   if(!signUpEmail || !signUpPass || !signUpName){
    res.status(400);
          throw new Error("Please Enter all the fields")
   }
    const userExists=await User.findOne({email:signUpEmail})
    if(userExists){
        res.status(400)
       throw new Error("User already exists")

    }
        const user =await User.create({
            name:signUpName,
            email:signUpEmail,
            password:signUpPass
        })
        if(user){
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id)
            })
        }else{
            res.status(400)
                  throw new Error("Failed to create the User");
        }
    

    
}) 

const loginUser=asyncHandler(async (req,res)=>{
   const {signInEmail,signInPass}=req.body;
   if(!signInEmail || !signInPass){
    res.status(401)
    throw new Error("Please fill all the deatils");
   }
   const user=await User.findOne({email:signInEmail});
   if(user && (await user.matchPassword(signInPass) )){
       res.status(200).json({
        _id:user._id,
         name:user.name,
         email:user.email,
         token:generateToken(user._id)
       })
   }else{
    res.status(401)
    throw new Error("Invalid Email or password")
   }



})

module.exports={registerUser,loginUser}