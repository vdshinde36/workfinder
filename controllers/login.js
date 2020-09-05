/**
 * @file login.js
 */

const getResponseTemplate = require('./response');
const { loginUser, verifyLogin } = require('../services'); 


/**
 * This function Hnadle all request response logic for user for /api/login/
 * @param {Object} req 
 * @param {Object} res 
 */
const loginController = async function (req,res) {
    console.log(`[login.Controller]`);
    console.log(req.body);
   let response = getResponseTemplate();
    try {
       let loginUserObj = await loginUser(req.body);
       console.log(loginUserObj);
       if(loginUserObj){
           console.log('[login.controlller][sending otp]')
           response.status = true
           response.payload = { _msg : 'OTP Sent Successfully'} 
           return res.status(200).json(response);
       }
    }catch(err){
        if(err.message === 'USR_NOT_EXIST'){
            console.log(`[Login.Controller][sending User Not EXIST]`);
            response.status=false;
            response.error ={errorCode:err.message,errorMsg:'User Is Not registered First Register'}
            return res.json(response);
        }else{
            console.log(`[Login.Controller][Throwing Genering Error]`);
            response.error={error:err, errorCode:'GN_ERR', errorMsg:'something went wrong try again'}
            return res.json(response);
        }
        
    }
}


/**
* verify Otp and save document to user collection
* @param {Object} req 
* @param {Object} res 
*/

const verifyLoginController = async function (req,res) {
   console.log(`[verifylogin.Controller]`);
   console.log(req.body);
  let response = getResponseTemplate();
   try {
      let loginUser = await verifyLogin(req.body);
      if(loginUser.status){
          response.status = true
          response.payload = { _token : loginUser.user}
          response._msg="Login successfull" 
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





module.exports.loginController = loginController ;
module.exports.verifyLoginController = verifyLoginController;