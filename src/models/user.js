const mongoose = require('mongoose');
const validator = require("validator");
const userSchema = new mongoose.Schema({
  firstName: { type: String,
    required : true,
    minLength :4,
    maxLength :50,
  },
  lastName: { type: String },
  emailId: { type: String ,
    required : true,
    lowercase : true,
    unique : true,
    trim :true,
     validate(value){
      if(!validator.isEmail(value) ){
        throw new Error ("Invalid email address :" + value);
      }

    },
    

  },
  password: { type: String ,
    required :true ,
    validate(value){
      if(!validator.isStrongPassword(value) ){
        throw new Error ("enter a strong password  :" + value);
      }

  },
},
  gender: { type: String,
     validate(value){
      if (!["male","female","others"].includes (value)){
        throw new Error ("gender data is not valid");
      }
   

    }
    
   },
  age: { type: Number },
  photoUrln: {  
    type : String },
     
     about : {
      type : String,
      default : "this is default value",
     },

skills : {
  type :[String],
},
},
{
  timestamps :true,
}
);

//  Yeh line zaroori hai 
const user = mongoose.model("User", userSchema);

// Export the model
module.exports = user;
