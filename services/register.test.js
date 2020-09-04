const { registerUser } = require('../services');
const mongoose = require('mongoose');
const config = require('../Config/config');


async function connectDb(){
    try {
    return await mongoose
    .connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology: true
    });
    
  }catch(err){
      throw err;
  }
}



function registerUserFunctionTest(){
    let user = {
        name : 'Vaibhav Shinde',
        mobileNumber : '9657520015',
        profileImg : 'url'
    }

    registerUser(user);
}

connectDb()
     .then(result=>{
         console.log('then executing ');
         registerUserFunctionTest()})
     .catch(err=>{
             console.log('executing thenable catch');
             console.log(` Block${err}`)});


