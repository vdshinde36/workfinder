/**
 * This will export all models to outer application
 */

 const User = require('./User');
 const UserLoginOTP = require('./UserLoginOTP');
 const UserRegistrationOTP = require('./UserRegistrationOTP');

 module.exports = {
     User,
     UserLoginOTP,
     UserRegistrationOTP
 }