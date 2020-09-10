/**
 * @file User.js
 * @author Vaibhav
 * @description This file create Model for User
 */

const mongoose = require("mongoose");


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true, // remove space from end & an begining if have
        required:true,
        maxlength:35
    },
    mobileNumber:{
        type:String,
        trim:true, // remove space from end & an begining if have
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
    accepted : [ // it collected all job
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Job'
        }
    ]

},{timestamps:true});
// virtual field



module.exports= mongoose.model("User",userSchema);