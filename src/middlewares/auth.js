const { read } = require("fs");
const jwt = require ("jsonwebtoken");
const userModel= require("../models/user");

const adminAuth = (req,res,next) => {
console.log("admin auth is getting checked!!");
const token = "xyz";
const isAdminAuthorized = token === "xyz";
if (!isAdminAuthorized) 
{
    res.status(401).send("unauthorized request");
}
else{
    next();
}

};
//const userAuth = (req,res,next) => {
/*console.log("user auth is getting checked!!");
const token = "xyz";
const isAdminAuthorized = token === "xyz";
if (!isAdminAuthorized) 
{
    res.status(401).send("unauthorized request");
}
else{
    next();
}

};
*/


const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token not provided");
    }

    console.log("Token from cookie:", token);
    //  verify the actual token
    const decodedObj = jwt.verify(token, "DEV@Tinder$790");
console.log("Decoded JWT payload:", decodedObj);
    const { _id } = decodedObj;

 
    const foundUser = await userModel.findById(_id);

    if (!foundUser) {
      throw new Error("User not found");
    }

    // Optional: Attach user info to request for use in routes
    req.user = foundUser;

    next();
  } catch (err) {
    res.status(401).send("ERROR: " + err.message);
  }
};







module.exports = {
    adminAuth,
    userAuth
};






