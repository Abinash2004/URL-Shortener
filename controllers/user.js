const User = require("../models/user");

async function handleSignUp(req,res) {
    const {name, email, password} = req.body;
    
    await User.create({
        name: name,
        email: email,
        password: password
    })
    .then(() => res.status(200).json({message: "Successfully Signed Up"}))
    .catch((err) => res.status(400).json({error: err}));
}

async function handleSignIn(req,res) {
    const {email, password} = req.body;
    
    const user = await User.findOne({
        email: email,
        password: password
    });
    if(!user) return res.status(400).json({error: err});
    else return res.status(200).json({message: "Successfully Signed Up", user: user});

}
module.exports = {handleSignUp, handleSignIn};