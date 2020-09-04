/**
 * @file Config.js
 */
if(process.env.NODE_ENV === 'development'){
    require('dotenv').config();
    console.log('dotenv config loaded');
}

 const config = {
     MONGO_URI : 'mongodb+srv://devloper:atc9dpfoxtrot@cluster0.xrbil.gcp.mongodb.net/workfinder?retryWrites=true&w=majority',
     PORT : process.env.PORT
 }

 module.exports = config;

