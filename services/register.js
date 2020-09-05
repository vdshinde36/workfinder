/**
 * @file register.service.js
 * This File Contains Register Service It will Help User To Register
 */


const { UserRegistrationOTP, User} = require('../models');
const { generateOTP } = require('../utils');
const sendOTP = require('../OTP/OTPSender');
const { generateToken } = require('../Auth/auth');



/**
 * This function will register user to UserRegistrationOTP until verification
 * @param {Object} user contains user information 
 */

 async function registerUser(user) {
     console.log(`[Register.Service]`);
     console.log(user);
     try {
         let userRegistred = await User.findOne({ mobileNumber:user.mobileNumber});
         if(!userRegistred){
         let userRegistration = await UserRegistrationOTP.findOne({ mobileNumber:user.mobileNumber }).exec();
         if(userRegistration) { // checking if user is already present
            console.log(`User Is Already Registered Returing Same Object`);
            sendOTP(userRegistration,(err,status)=>{
                if(err){
                    throw err;
                }
                console.log(`[Register.Service][OtpSent][${status.toString()}]`);
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
                  
             });
             return userRegistrationOTP;
             
         }
        }else{ // user is already Present
            throw new Error('USR_EXIST');
        }

     }catch(err){
         throw err;
     }
     
 }

 /**
  * 
  * This function checks otp and save to user table
  * @param {Object} user 
  * @return {Object} Anonymus Object
  * 
  * @TODO you dumb vaibhav use Transaction for consistency across collections
  * @TODO after verifying record delete entry from UserRegistration OTP
  */
 async function verifyUser(user) {
    console.log(`[Register.Service]`);
    console.log(user);
    try {
    let userRegistration = await UserRegistrationOTP.findOne({ mobileNumber:user.mobileNumber }).exec();
    if(verifyOtp(userRegistration.otp,user.otp)){
        console.log('Otp verification successfull');
        let { name, mobileNumber, adharNumber, worktype } = userRegistration;
        let newUser =  new User({name, mobileNumber, adharNumber, worktype});
        await newUser.save(); //saving doc to User Collections
        await UserRegistrationOTP.deleteOne({mobileNumber:user.mobileNumber}); // delete 
        let encryptedUser = generateToken(newUser);
        return {status:true,user:encryptedUser};
    }else{
         return {status:false, user:null}
    }
   }catch(err){
       console.log(err);
       throw err;
   }


 }


 function verifyOtp(otp1,otp2){
     return otp2===otp1;
 }


 module.exports.registerUser = registerUser;
 module.exports.verifyUser = verifyUser;
     
 