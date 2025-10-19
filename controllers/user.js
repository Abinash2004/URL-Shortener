const User = require("../models/user");
const bcrypt = require("bcrypt");
const { setUser } = require("../services/auth");
const { v4: uuidv4 } = require('uuid');

async function handleSignUp(req, res) {
    try {
        const { name, email, password } = req.body;
        const existing = await User.findOne({ email });

        if (existing) {
            return res.status(409).json({ error: "User already exists." });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name,
            email: email,
            password: hashed
        })

        const sessionId = uuidv4();

        setUser(sessionId, { user_id: user._id, email: user.email });
        res.cookie("uid", sessionId);
        res.status(200).json({ message: "Successfully Signed Up", user: {user_id:user._id, email: user.email}});

    } catch (err) {
        res.status(500).json({ error: err.message});
    } 
}

async function handleSignIn(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: "Invalid credentials" });
        
        const sessionId = uuidv4();
        setUser(sessionId, { user_id: user._id, email: user.email });
        res.cookie("uid", sessionId);
        res.status(200).json({ message: "Successfully Signed In", user: {user_id:user._id, email: user.email}});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
    
}
module.exports = { handleSignUp, handleSignIn };