import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
   //host-owner
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
       },
       // guest - ther person which is booking
       guest:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User",
          required:true
       },
       // the user book the list from the combine listing
       listing:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Listing",
          required:true
       },
       // status- booked,cancel
       status:{
          type:String,
          enum:["booked" , "cancel"],
          default:"booked"
       },
       // at which date check in, checkout,total rent
       checkIn:{
          type:Date,
          required:true
       },
       checkOut:{
          type:Date,
          required:true
       },
       totalRent:{
          type:Number,
          required:true
       }
      },{timestamps:true})

      const Booking = mongoose.model("Booking" , bookingSchema)

      export default Booking
