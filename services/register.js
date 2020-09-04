/**
 * @file register.service.js
 * This File Contains Register Service It will Help User To Register
 */


const { UserRegistrationOTP } = require('../models');
const { generateOTP } = require('../utils');
const sendOTP = require('../OTP/OTPSender');



/**
 * This function will register user to UserRegistrationOTP until verification
 * @param {Object} user contains user information 
 */

 async function registerUser(user) {
     console.log(`[Register.Service]`);
     console.log(user);
     try {
         let userRegistration = await UserRegistrationOTP.findOne({ mobileNumber:user.mobileNumber }).exec();
         if(userRegistration) { // checking if user is already present
            console.log(`User Is Already Registered Returing Same Object`);
            sendOTP(userRegistration,(err,status)=>{
                if(err){
                    throw err;
                }
                console.log(`[Register.Service][OtpSent][${status.toString()}]`)
                return userRegistration
            })
             return userRegistration; // returning user
         }else{
             let userRegistrationOTP = new UserRegistrationOTP({ ...user, otp:generateOTP() });
             console.log('saving user and sending Otp');
             userRegistrationOTP = await userRegistrationOTP.save();
             sendOTP(userRegistrationOTP,(err,status)=>{
                  if(err){
                      throw err;
                  }
                  console.log(`[Register.Service][OtpSent][${status}]`)
                  return userRegistrationOTP;
             });
             
         }

     }catch(err){
         throw err;
     }
     
 }

 async function verifyUser(user) {
    console.log(`[Register.Service]`);
    console.log(user);
    let userRegistration = await UserRegistrationOTP.findOne({ mobileNumber:user.mobileNumber }).exec();
    if(verifyOtp(userRegistration.otp,user.otp)){
        delete userRegistration.otp;
        let user = await new User(userRegistration).save();
        return true;
    }else{
        false
    }


 }


 function verifyOtp(otp1,otp2){
     return otp2===otp1;
 }


 module.exports.registerUser = registerUser;
 module.exports.verifyUser = verifyUser;
     
 