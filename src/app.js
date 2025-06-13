const express = require("express");
const app = express();



app.use("/hello",(req, res) => {
    res.end("hello from the server");
});



app.use((req, res) => {
    res.end("hello from the server");
});


app.listen(7000,()=>{
    console.log("successfully");
});
 