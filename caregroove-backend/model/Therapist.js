const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    password:{
        type:String
    }
});

const therapistModel = mongoose.model("therapist", therapistSchema);
module.exports = therapistModel;