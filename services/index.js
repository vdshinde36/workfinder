const { registerUser, verifyUser } = require('./register');
const { loginUser, verifyLogin } = require('./login');
const { postJob } = require('./Job');


module.exports = {
    registerUser,
    verifyUser,
    loginUser,
    verifyLogin,
    postJob
}