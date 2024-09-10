const express = require("express");
const user = require("./routes/user");
const app = express();
app.use(express.json());
require("dotenv").config();
require("./conn/conn");

app.use("/api/v1", user);

app.listen(process.env.PORT, ()=>{
    console.log(`Server Started at ${process.env.PORT}`);
})
