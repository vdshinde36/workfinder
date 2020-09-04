/**
 * auth file for all utility for authentication
 */



 const jwt = require('jsonwebtoken');
 const config = require('../Config/config');




 function generateToken(payload){
     console.log(payload);
    return jwt.sign(payload.toJSON(), 'atc9dpfoxtrot');
 }


 function verify(req,res,next) {
     
 }

 module.exports = {
     generateToken,
     verify
 }