const mongoose = require("mongoose");

async function connectToMongoDB(url) {
    return mongoose.connect(url);
}

module.exports = { connectToMongoDB };


// abinashparida2021_db_user
// isC9yIO8NfUXPG5w
