let mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content:{ type:String },
    userName:{type:String},
    likeCount:{type:Number},
    commentList:[{type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    tag:[{type:String}],
    designation:{type:String,required:true}

},{
    timestamps:true
})
const Post=mongoose.model("Post",postSchema);

module.exports=Post