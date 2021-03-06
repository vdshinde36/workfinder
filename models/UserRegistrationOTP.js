/**
 * @file UserRegistartionOTP.js
 * @author Vaibhav
 * @description This file create Model for User
 */

const mongoose = require("mongoose");


const userRegistrationOTPSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true, // remove space from end & an begining if have
        required:true,
        maxlength:35
    },
    mobileNumber:{
        type:String,
        required:true,
        unique:10
    },
    profileImg:{
        type:String,
        default:"default.jpg"
    },
    about:{
        type:String,
        trim:true, // remove space from end & an begining if have
    },
    role:{
        type: Number, // 0 == worker
        default:0
    },
    adharNumber:{
        type:String,
        required:true,
    },
    worktype:{
        type:String,
        required:true,
    },
    otp:{
        type:Number,
        required:true
    }

},{timestamps:true});
// virtual field



module.exports= mongoose.model("UserRegistrationOTP",userRegistrationOTPSchema);