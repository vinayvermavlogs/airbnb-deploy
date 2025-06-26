// user submit input details , database take these inputs

import mongoose from "mongoose";

// mongoose takeinput in form of schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true // we need user already
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    listing:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing" // we make model of listing and booking
    }],
    booking:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    }]
    // user can list, book the pg,flat.


},{timestamps:true})

const User = mongoose.model("User",userSchema)

export default User

