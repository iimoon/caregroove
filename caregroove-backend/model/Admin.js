const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  sname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  usertype: {
    type: String,
    enum: ['user']
  }
});

const AdminModel = mongoose.model("admin", adminSchema);
module.exports = AdminModel;


