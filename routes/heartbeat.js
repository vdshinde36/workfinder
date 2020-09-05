/**
 * @file heartbeat.routes.js
 */


const express = require("express");
const router=express.Router();

const os = require('os');
const mongoose = require('mongoose')

router.get('/check',(req, res)=>{
    return res.json({
        VM:{
            state:"UP",
            uptime:os.uptime(),
            platform:os.platform(),
            mem:os.freemem()
        },
        DB:{
            state:mongoose.STATES[mongoose.connection.readyState]
        }
    });
});


module.exports=router