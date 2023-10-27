import mongoose from "mongoose";
const userSchema = mongoose.Schema(
   {
    userName:{
        type:String,
        unique:true,
        required:true
        
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
   },
   {
    timestamps:true
   } 
);
export const Users = mongoose.model('User', userSchema);
