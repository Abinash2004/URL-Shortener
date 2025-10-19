const express = require("express");
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const {restrictToLoggedInUserOnly} = require("./middleware/auth");
const { connectToMongoDB } = require("./connection");

const app = express();
const PORT = 5000;

connectToMongoDB("mongodb+srv://abinashparida2021_db_user:isC9yIO8NfUXPG5w@cluster0.hic6y03.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("MongoDB Atlas connected successfully"))
.catch((err) => console.error("MongoDB connection failed:", err));

app.use(express.json());
app.use(cookieParser());
app.use("/url",restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server is started on port: ${PORT}`));