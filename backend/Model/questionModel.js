let mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String },
    userName: { type: String },
    likeCount: [{ type: String }],
    commentList: {},
    tag: [{ type: String }],
    designation: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
