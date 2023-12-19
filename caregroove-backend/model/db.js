const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://user:jerinwillgetcommittedin2023@cluster0.uqswoyk.mongodb.net/?retryWrites=true&w=majority");
    console.log("Database connection successful! :D");
  } catch (error) {
    console.error("Oh no, an error occurred:", error);
  }
};

module.exports = connectDB;
