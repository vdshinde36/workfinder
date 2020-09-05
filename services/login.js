/**
 * @file login.service.js
 * This File Contains Register Service It will Help User To Register
 */


const { UserRegistrationOTP, User, UserLoginOTP} = require('../models');
const { generateOTP } = require('../utils');
const sendOTP = require('../OTP/OTPSender');
const { generateToken } = require('../Auth/auth');



/**
 * This function will login user and send user to UserRegistrationOTP until verification
 * @param {Object} user contains user information mobileNumber
 */

 async function loginUser(user) {
     console.log(`[login.Service]`);
     console.log(user);
     try {
         let userPresent = await User.findOne({ mobileNumber:user.mobileNumber }).exec();
         if(userPresent) { // checking if user is available
            let userLoginPresent = await UserLoginOTP.findOne({mobileNumber:user.mobileNumber});
             if(userLoginPresent){
                 console.log('[login.Service][Inside UserLoginPrsent]');
                 sendOTP({ mobileNumber:userLoginPresent.mobileNumber,
                           otp:userLoginPresent.OTP },(err,status)=>{ 
                     if(err){
                         console.log(`[login.Service][error][IF]`);
                         console.log(err);
                         throw err;
                     }
                     console.log('[Login.Service][returning Old OTP]');
                     });
                 return true;
             }else{
                 // generate OTP send User
                 let randomOTP = generateOTP();
                 console.log('randomOTP');
                 console.log(randomOTP);
                 let saveUserLoginOTP = new UserLoginOTP({mobileNumber:user.mobileNumber,OTP: randomOTP});
                 await saveUserLoginOTP.save();
                 sendOTP({ mobileNumber:user.mobileNumber, otp:randomOTP },(err,status)=>{
                     if(err){
                        console.log(`[login.Service][error][ELSE]`);
                        console.log(err);
                        throw err;
                     }
                     console.log('[Login.Service][new OTP Login Service OTP Sent]')
                     
                 });
                 return true
             }
            
         }else{
             // user is not prsent in database so tell user to registerUser
             console.log(`[Login.Service][Error] User Is Not Present`);
             throw new Error('USR_NOT_EXIST');
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
 async function verifyLogin(user) {
    console.log(`[verifyLogin.Service]`);
    console.log(user);
    try {
    let userLogin = await UserLoginOTP.findOne({ mobileNumber:user.mobileNumber }).exec();
    if(verifyOtp(userLogin.OTP,user.otp)){
        console.log('[verifyLogin.Service][otp Verifed Successfully]');
        await UserLoginOTP.deleteOne({mobileNumber:user.mobileNumber}); // delete otp
        let userObj = await User.findOne({ mobileNumber:user.mobileNumber }); //get User
        let encryptedUser = generateToken(userObj);
        return {status:true, user:encryptedUser};

    }else{// otp verification failed
        console.log('[verifyLogin.service][OTP verification Failed]');
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


 module.exports.loginUser = loginUser;
 module.exports.verifyLogin = verifyLogin;
     
 