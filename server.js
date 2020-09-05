/**
 * @file server.js
 * @author Vaibhav D Shinde
 * @description This file initilize all and load all dependency and start Http Server
 * @TODO later on do sperate server and express app file 
 * for and use loaders for initialize
 * 
 */


 /**
 * @file server.js
 * @description i mind is blank right now i will do it later
 * @note remove all console.log and try to use advance logging like winston with http tarnspoert for prod
 */



const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser=require('cookie-parser');
const config = require('./Config/config');
const heartbeat = require('./routes/heartbeat')

const logger = require('./Logger/logger');


// Routes
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');


// app
const app = express();

// db
mongoose
    .connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology: true
    })
    .then(() => console.log(`[DB][DB Connected.........]`));


// middlewares 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(cors());


// routes
app.use('/api',registerRoute);
app.use('/api',loginRoute);
app.use('/heartbeat', heartbeat);






const port = config.PORT || 7000;

console.log(`[process.env][${process.env.toString()}]`);
logger.info('Server Started');
  
app.listen(port, () => console.log(`[Server][Server running on port ${port}]`));
  



