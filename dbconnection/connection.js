// code for connection detabase
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({path:'./config.env'});
const detabaseconnection = async () => {
    try {
        // "mongodb://localhost:27017/myfirstdatabase"
       // console.log(process.env.MONGODB_URL)
        await mongoose.connect(`${process.env.MONGODB_URL}`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("detabase is connected");
    }
    catch (e) {
        console.log(e.message);
    }
};
module.exports = detabaseconnection;
