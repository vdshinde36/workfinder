/**
 * @file Config.js
 */
if(process.env.NODE_ENV === 'development'){
    require('dotenv').config();
    console.log('dotenv config loaded');
}

 const config = {
     MONGO_URI : 'mongodb+srv://devloper:atc9dpfoxtrot@cluster0.xrbil.gcp.mongodb.net/workfinder?retryWrites=true&w=majority',
     PORT : 3000,
     SECRETE : 'atc9dpfoxtrot'
 }

 module.exports = config;


