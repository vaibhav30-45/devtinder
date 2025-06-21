

//create a new instanc


const express = require("express");
const connectDB = require("./config/database");
const user = require("./models/user");
const app = express();
const{validateSignUpData} = require ("./utils/validation");
const bcrypt = require ("bcrypt");
const userModel = require("./models/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require ("./middlewares/auth"); 
const { error } = require("console");
// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

// POST route
app.post("/signup", async (req, res) => {

 try {

  //validation of data
validateSignUpData(req);
const {firstName,lastName,emailId,password} = req.body;

// ENCRYPT THE PASSWORD 
const passwordHash = await bcrypt.hash(password,10);
console.log (passwordHash);

//creaate new instance of the user model

    const newUser= new userModel({ 
      firstName,
      lastName,
      emailId,
      password :passwordHash,
    });

 
    
    await User.save();
    res.send("User added successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send("ERROR :" + err.message);
  }
});



app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      throw new Error("Email and password are required");
    }

    const existingUser = await userModel.findOne({ emailId });

    if (!existingUser) {
      throw new Error("Invalid credentials (user not found)");
    }

    console.log("Stored hash in DB:", existingUser.password);
    console.log("Plain password from input:", password);

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials (password mismatch)");
    }

    // ✅ Create a JWT Token
    const token = jwt.sign(
      { _id: existingUser._id, emailId: existingUser.emailId },
      "DEV@Tinder$790", // You should move this to .env in production
      { expiresIn: "1h" }
    );

    console.log("Generated JWT:", token);

    // ✅ Set the token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).send("Login successful");

  } catch (err) {
    console.error("Login error:", err);
    res.status(400).send("ERROR: " + err.message);
  }
});



app.get("/profile", userAuth, async (req, res) => {
  try{
    const user = req.user;
    res.send (user);

  }catch(err){
    res.status(400).send("ERROR :"+err.message);


  }

});



app.post("/sendConnectionRequest", userAuth,async (req, res) => {
  const user = req.user;
  console.log ("sending a connection request !");

  res.send (user.firstName + "send the connection request");
});




app.get("/user", async (req, res) => {

  const cookies = req.cookies;
  const {token } = req.cookies;
  //validate
  

  console.log(cookies);
  res.send ("reading cookie");

});




// GET user by email (using query param)
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    console.log (userEmail);
    const user = await user.findOne({ emailId: userEmail });
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
app.patch("/user/:userId",async (req,res) => {
  const userId =req.params?.userId;
  const data = req.body;

  try{

    
  const ALLOWED_UPDATES =[ "PhotoUrl","about","gender","age",
  ] ;
 const isUpdateAllowed = object .keys (data).every((k) => 
  ALLOWED_UPDATES.includes(k)
);
if (!isUpdateAllowed){
  throw new Error ("update not allowed");
} 


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
