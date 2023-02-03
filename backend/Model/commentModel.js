let mongoose=require('mongoose');

const commentSchema=mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment:{type: String}

},{
    timestamps:true
})
const Comment=mongoose.model("Comment",commentSchema);

module.exports=Comment