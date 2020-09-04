/**
 * @file UserOTP.js
 * @author Vaibhav
 * @description This file create Model for User
 */

const mongoose = require("mongoose");


const userLoginOTPSchema=new mongoose.Schema({
    mobileNumber:{
        type:String,
        trim:true, // remove space from end & an begining if have
        required:true,
        unique:10
    },
    OTP:{
        type:Number,
        requireed:true
    },
    verification_role:{
        type:String,
        default:"sign"
    }
},{timestamps:true});





module.exports= mongoose.model("UserLoginOTP",userLoginOTPSchema);