/**
 * @file register.routes.js
 * @description file for handling authentivation routes
 */


const express = require("express");
const router=express.Router();

const { registerController, verifyUserController } = require('../controllers');

router.post('/register', registerController);
router.post('/verify',verifyUserController);


module.exports=router;