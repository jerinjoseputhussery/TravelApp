import mongoose from "mongoose";
const bookingSchema = mongoose.Schema(
   {
    packageId:{
        type:String,
        required:true
        
    },    
    noOfPeoples:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    bookedBy:{
        type:String,
        required:true
    }
   });
export const Booking = mongoose.model('Booking', bookingSchema);
