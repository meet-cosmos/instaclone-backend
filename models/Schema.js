const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    file:{
        type: String,
        require: true
    },
    desc:{
        type: String,
        require: true
    },
    likes : Number,
    date : String
}, {timestamps : true});

const Postmodel = new mongoose.model('PostInsta', PostSchema);

module.exports = Postmodel;