const express= require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const userRoutes = require("./Routes/userRoutes");
const connectDB = require("./config/db");
const app=express();
dotenv.config();

const port=process.env.PORT || 5000;
app.use(cors())
app.use(express.json())
connectDB()
app.get('/',(req,res)=>{
    res.send("Api is working");
})
app.use('/api/user',userRoutes)

app.listen(port,()=>{
    console.log("Server is up")
})