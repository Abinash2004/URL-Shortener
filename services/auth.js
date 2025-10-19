const jwt = require("jsonwebtoken");
const secret = "kisiko pata nahi chalega"

function setUser(user) {
    return jwt.sign(user, secret);
}

function getUser(token) {
    if(!token) return null;
    return jwt.verify(token, secret);
}

module.exports = {setUser, getUser};