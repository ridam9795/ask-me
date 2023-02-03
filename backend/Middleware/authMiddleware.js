const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const asyncHandler=require("express-async-handler");
const User = require("../Model/userModel");

const protect=asyncHandler( async (req,res,next)=>{
    let token;
    
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
                 try{
                    token=req.headers.authorization.split(" ")[1]
                    const decoded=jwt.verify(token,process.env.JWT_SECRET);
                    req.user=await User.findById(decoded.id).select("-password")
                    next();

                 }catch(error){
                res.status(401).send("Authentication failed, token failed")
                 }

            const decoded=jwt.verify()
        }
        if(!token){
            res.status(401).send("Not authorized,no token")
        }

    
} ) 

module.exports=protect