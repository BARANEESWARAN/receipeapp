const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const UsersSchema=new Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    savedRecipes:[{type:mongoose.Schema.Types.ObjectId,ref:"recipes"}]
})

const userModel=mongoose.model("users",UsersSchema)

module.exports=userModel