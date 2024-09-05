const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) =>{
    res.send("Bolo");
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server Started at ${process.env.PORT}`);
})