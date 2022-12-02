// we need mongoose package to create the collection of detabase
const mongoose = require("mongoose");
// blue print of collection
// macking schema
const Content_Model = mongoose.Schema({
    name: { type: String, require: true },
    email: String,
    category: String,
    headline:String,
    description:String
}) 
// mongoose.model() compile schema into model so that we can use CRUD operation
const savemodel = mongoose.model('content', Content_Model);
module.exports = savemodel;