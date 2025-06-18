

//create a new instanc


const express = require("express");
const connectDB = require("./config/database");
const user = require("./models/user");
const { Console } = require("console");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// POST route
app.post("/signup", async (req, res) => {
    const User = new user(req.body);

  try {
    
    await User.save();
    res.send("User added successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send("Error adding user");
  }
});

// GET user by email (using query param)
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    console.log (userEmail);
    const user = await userModel.findOne({ emailId: userEmail });
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// feed API
app.get("/feed", async (req, res) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (err) {
    res.status(500).send("Failed to fetch users");
  }
});

//update 
app.patch("/user",async (req,res) => {
  const userId =req.body.userId;
  const data = req.body;

  try{
    const user = await user.findByIdAndUpdate({_id : userId},data,);
    console.log (user);
res.send ("user update successfully");
  }
  catch (err){
    res.status(400).send ("something went wrong")
  }
});
  


// Connect DB and start server
connectDB()
  .then(() => {
    const PORT = 7000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });
