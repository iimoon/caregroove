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
    }
});

const therapistModel = mongoose.model("therapist", therapistSchema);
module.exports = therapistModel;