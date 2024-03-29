const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    designation: { type: String, required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
userSchema.methods.matchPassword=async function(password){
    return await bcrypt.compare(password,this.password);
}
userSchema.pre('save',async function(next){
   if(!this.isModified){
      next();
   }
   const salt=await bcrypt.genSalt(10);
   this.password=await bcrypt.hash(this.password,salt)
})
const User=mongoose.model("User",userSchema);
module.exports=User