/**
 * File   : OTPSENDER.js
 * Author :Vaibhav Shinde
 * 
 * This file handle all message sending task
 * 
 */


const springedge = require("springedge");



    function sendOTP(user,callback){

       let params = {
           'sender': 'APECTO',
           'apikey': '6647cih414vw90018k8j82335t09p96n0d',
           'to': [user.mobileNumber],
           'message': `Verification Code for Workfinder ${user.otp}`,
           'format': 'json'
         }; 
         springedge.messages.send(params, 5000, function (err, response) {
           if (err) {
               console.log(`OTP Sender ${err}`);
             return callback(err,null);
           }
           console.log('[OTPSender][Returning Response]');
           console.log(response);
           return callback(null,response);
         });
       }


module.exports=sendOTP;

