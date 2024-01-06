const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  sname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String, // Assuming password should be a string
    required: true,
  },
  date: {
    type: String, // Assuming date of birth should be a string
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  usertype:{
    type:String,
    required:true,
    enum:['user']
  }
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
