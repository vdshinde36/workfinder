/**
 * @file job.routes.js
 * @description file for handling routes posting jobs and viewing all jobs */


const express = require("express");
const router=express.Router();

const { postJobController, listJobs, acceptJob } = require('../controllers');

router.post('/post', postJobController); // post a job by workprovider
router.get('/listjobs',listJobs); // 
router.post('/acceptjob', acceptJob); // accept a job by user


module.exports=router;