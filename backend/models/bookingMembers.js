import mongoose from "mongoose";
const bookingMembersSchema = mongoose.Schema(
   {
    bookingId:{
        type:String,
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
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:false
    },
    phone:{
        type:Number,
        required:false
    }
   });
export const BookingMembers = mongoose.model('BookingMembers', bookingMembersSchema);

