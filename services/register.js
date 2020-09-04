/**
 * @file register.service.js
 * This File Contains Register Service It will Help User To Register
 */


const { UserRegistrationOTP } = require('../models');
const { generateOTP } = require('../utils');



/**
 * This function will register user to UserRegistrationOTP until verification
 * @param {Object} user contains user information 
 */

 async function registerUser(user) {
     console.log(user)
     try {
         let userRegistration = await UserRegistrationOTP.findOne({ mobileNumber:user.mobileNumber }).exec();
         if(userRegistration) {
             console.log('User Alreday Exist')
             console.log(userRegistration)
         }else{
             let userRegistrationOTP = new UserRegistrationOTP({ ...user, otp:generateOTP() });
             userRegistrationOTP = await userRegistrationOTP.save();
         }

     }catch(err){
         console.log(err);
     }
     
 }

 async function verifyUser(user) {

 }


 module.exports.registerUser = registerUser;
 module.exports.verifyUser = verifyUser;
     
 