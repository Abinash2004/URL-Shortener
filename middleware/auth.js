const {getUser} = require("../services/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies.uid;
    
    if(!userUid) return res.status(401).json({error: "Only logged in users are allowed"});
    const user = getUser(userUid);

    if(!user) return res.status(401).json({error: "Only logged in users are allowed"});
    req.user = user;
    
    next();
}

module.exports = {restrictToLoggedInUserOnly};