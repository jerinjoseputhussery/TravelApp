import mongoose from "mongoose";
const packageSchema = mongoose.Schema(
   {
    title:{
        type:String,
        required:true
        
    },
    description:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    noOfDays:{
        type:Number,
        required:true
    },
    images:[{
        type:String,
        required:true
    }],    
    location:{
        type:String,
        required:false
    },
    rate:{
        type:Number,
        required:true
    }
   });
export const Users = mongoose.model('Package', packageSchema);
