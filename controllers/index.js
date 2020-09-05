

const registerController = require('./register').registerController;
const verifyUserController = require('./register').verifyUserController;
const loginController = require('./login').loginController;
const verifyLoginController = require('./login').verifyLoginController;

module.exports = {
    registerController,
    verifyUserController,
    loginController,
    verifyLoginController
}