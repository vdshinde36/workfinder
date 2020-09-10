/**
 * @file Job.js
 */

const { postJob } = require('../services');
const { Response } = require('./response');
const logger = require('../Logger/logger');



// require models for constroller

const { Job, User } = require('../models');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */


const postJobController = async (req,res) => {
    logger.info(`[Job.Controller]`);
    console.log(req.body);
    try{
        let status = await postJob(req.body);
        if(status){
            res.status(201).json({status}); // resouce sucessfull created
        }else{
            logger.debug(`Failed To Create Post ${req.body}`);
            res.status(422).json({err:{errorCode:'FAILED_TO_POST'}});
        }
    }catch(err){
        console.log(err);
        logger.error(`[Job.Controller][error]`);
        res.status(422).json({err:{errorCode:'FAILED_TO_POST'}})
    }
}

/**
 * This function will list all jobs based on filter
 * sorting by timestamps with decending
 * @param {*} req 
 * @param {*} res 
 */
const listJobs = async (req,res) => {
    try{
        let jobs = await Job.find({status:'active'}).sort({createdAt:'-1'}).exec();
        res.status(200).json({jobs});
    }catch(err){
        console.log(err);
        res.status(200).json({error:{errorCode:"GEN_ERR"}});
    }
}

/**
 * This function will accept Job and post to user and job models
 * @param {Object} req 
 * @param {Object} res 
 */
const acceptJob = async (req,res) => {
    console.log('[Accept Job Controller]');
    let data = req.body;
    console.log(data);
    try{
        let job = await Job.findOne({_id:data.jobId}); // getting job by id
        let user = await User.findOne({ mobileNumber:data.mobileNumber});
        job.accepted.push(user._id);
         let savedJobStatus = await job.save();
         user.accepted.push(data.jobId);
         let savedUserstatus = await user.save();
         res.status(201).json({savedUserstatus});

    }catch(err){
        console.log(err);
        res.status(422).json({errorCode:'FAILED_TO_POST'}); // failed to accept job
    }
}


module.exports.postJobController = postJobController;
module.exports.listJobs = listJobs;
module.exports.acceptJob = acceptJob;