/**
 * @file register.js
 */

 const getResponseTemplate = require('./response');
 const { registerUser, verifyUser } = require('../services'); 


 /**
  * This function Hnadle all request response logic for user
  * @param {Object} req 
  * @param {Object} res 
  */
 const registerController = async function (req,res) {
     console.log(`[Register.Controller]`);
     console.log(req.body);
    let response = getResponseTemplate();
     try {
        let regUser = await registerUser(req.body);
        if(regUser){
            response.status = true
            response.payload = { _msg : 'OTP Sent Successfully'} 
            return res.status(200).json(response);
        }
     }catch(err){
         console.log(err);
         response.err={error:err, errorCode:'GN_ERR', errorMsg:'something went wrong try again'}
         return res.json(response);
     }
 }


/**
 * verify Otp and save document to user collection
 * @param {Object} req 
 * @param {Object} res 
 */

 const verifyUserController = async function (req,res) {
    console.log(`[verifyUser.Controller]`);
    console.log(req.body);
   let response = getResponseTemplate();
    try {
       let regUser = await verifyUser(req.body);
       if(regUser.status){
           response.status = true
           response.payload = { _token : regUser.user}
           response._msg="Registration successfull" 
           return res.status(200).json(response);
       }else{
           response.status = false;
           response.error = {errorCode:'INVALID_OTP',errorMsg:'invalid OTP try agagin'} //otpfailed
           return res.json(response);
       }
    }catch(err){
        console.log(err);
        response.error={error:err, errorCode:'GN_ERR',errorMsg:'something went wrong try again'}
        return res.json(response);
    }
}





 module.exports.registerController = registerController ;
 module.exports.verifyUserController = verifyUserController;