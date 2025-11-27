const mongoose = require('mongoose');
require('dotenv').config();


const mongoURL = process.env.DB_URL;
// const mongoURLAtlas = process.env.DB_BASE_URL;

mongoose.connect(mongoURL , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
    console.log("MongoDB connected successfully");
});

db.on("error", (err) => {
    console.log("MongoDB connection error: ", err);
});

db.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

module.exports = db;