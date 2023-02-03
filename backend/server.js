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
// app.get('/',(req,res)=>{
//     res.send("Api is working");
// })
app.use('/api/user',userRoutes)
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  //   const path = require("path");

  //   app.get("*", (req, res) => {
  //     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  //   });
}
let server = app.listen(port, () => {
  console.log("Server is up");
});
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console.log(`Connected to socket.io with id: ${socket.id}`);
  socket.on("notify", (message) => {
    console.log(message);
    io.emit("notification", message);
  });
});

