const { registerUser, verifyUser } = require('./register');
const { loginUser, verifyLogin } = require('./login');


module.exports = {
    registerUser,
    verifyUser,
    loginUser,
    verifyLogin
}