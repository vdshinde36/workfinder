/**
 * @file login.routes.js
 * @description file for handling authentivation routes
 */


const express = require("express");
const router=express.Router();

const { loginController, verifyLoginController } = require('../controllers');

router.post('/login', loginController);
router.post('/verifylogin',verifyLoginController)


module.exports=router;