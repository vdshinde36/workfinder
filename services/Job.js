/**
 * @file Job.service.js
 * This file contains all service related job category like posting job geting all jobs
 * @author Vaibhav D.Shinde
 * 
 */

const { Job, User} = require('../models');
const logger = require('../Logger/logger');




/**
 * This service function will take care of Posting a job 
 * @param {Object} user | contains user who is posting data 
 * @param {Object} job | contsins job data 
 */
 async function postJob(job) {
     logger.info(`[PostJob.Server]`);
     console.log(job);
     try{
         let savedUser = await User.findOne({ mobileNumber:job.mobileNumber });
         let savedJob = new Job({...job, workProvider:savedUser._id}); // destructure into object
         savedJob = await savedJob.save();
         if(savedJob){
             console.log(`[PostJob][returning true]`);
             return true;
         }else{
            console.log(`[PostJob][returning false]`);
             return false;
         }

     }catch(err){
         logger.log(`[PostJoob.Service]  ${err}`);
         throw err;
     }

 }


 module.exports.postJob = postJob;