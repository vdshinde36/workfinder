

const registerController = require('./register').registerController;
const verifyUserController = require('./register').verifyUserController;
const loginController = require('./login').loginController;
const verifyLoginController = require('./login').verifyLoginController;
const postJobController = require('./Job').postJobController;
const listJobs = require('./Job').listJobs;
const acceptJob = require('./Job').acceptJob;

module.exports = {
    registerController,
    verifyUserController,
    loginController,
    verifyLoginController,
    postJobController,
    listJobs,
    acceptJob
}