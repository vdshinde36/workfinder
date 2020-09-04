/**
 * @file helper.js
 * It Cntains All Utility Functions
 */

 /**
  * It will generate 4 digit random number
  */
 const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
 }

 module.exports.generateOTP = generateOTP;