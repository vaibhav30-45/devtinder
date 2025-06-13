const express = require("express");
const app = express();

/*

app.use("/hello",(req, res) => {
    res.end("hello from the server");
});



app.use((req, res) => {
    res.end("hello from the server");
});
*/

app.use(
    "/user",
    (req,res,next) => {
console.log("hello world");
//res.send ("handler1");

next();
    }
,

(req,res) => {
console.log("hello world");
res.send ("handler2")   }
);


app.listen(7000,()=>{
    console.log("successfully");
});
 