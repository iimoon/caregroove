const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
    word : {
        type:String,
        required:true
    },
    definition : {
        type: String,
        required:true
    },
    partOfSpeech:{type:String},
    example:{type:String}
});

const wordModel = mongoose.model("word",wordSchema);
module.exports = wordModel;
