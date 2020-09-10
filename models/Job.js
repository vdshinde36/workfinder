/**
 * @file Job.js
 * @author Vaibhav
 * @description This file create Model for Job Schema
 */

const mongoose = require("mongoose");


const jobSchema=new mongoose.Schema({
    jobName:{
        type:String,
        trim:true, // remove space from end & an begining if have
        required:true,
        maxlength:35
    },
    jobCategory:{
        type:String,
        trim:true, // remove space from end & an begining if have
        required:true
    },
    jobImg:{
        type:String,
        default:"defaultwork.jpg"
    },
    description:{
        type:String,
        trim:true, // remove space from end & an begining if have
    },
    workProvider : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    price : {
        type:Number
    },
    status : {
        type:String,
        default:"active"
    },
    workerNeeded : {
        type : Number
    },
    
    accepted : [ // it collected all userId
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],

},{timestamps:true});



module.exports= mongoose.model("Job",jobSchema);