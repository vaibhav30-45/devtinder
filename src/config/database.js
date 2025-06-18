
   const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vshrivastava0730:xZ5FnuA1YDC6YYHw@vaibhav.nclcods.mongodb.net/devTinder");
  
    console.log("Database connection established.");
  } catch (err) {
    console.error(" Database cannot be connected.");
    console.error(err.message); // <-- very important for debugging
  }
};

module.exports = connectDB;
