

//create a new instance

 


const express = require("express");
const connectDB = require("./config/database");
const userModel = require("./models/user"); 


const app = express();

connectDB();

app.post("/signup", async (req, res) => {
  try {
    const newUser = new userModel({
      firstName: "Rohit",
      lastName: "Sharma",
      emailId: "rohit3045@gmail.com",
      password: "rohit@3045",
      gender: "male",
      age: 34
    });

    await newUser.save();
    res.send("User added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding user");
  }
});




connectDB();


app.listen(7000,()=>{
    console.log("successfully");
});
 