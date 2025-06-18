const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  emailId: { type: String },
  password: { type: String },
  gender: { type: String },
  age: { type: Number }
});

//  Yeh line zaroori hai 
const userModel = mongoose.model("User", userSchema);

// Export the model
module.exports = userModel;
