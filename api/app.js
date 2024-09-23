const express = require("express");
const user = require("./routes/user");
const app = express();
app.use(express.json());
require("dotenv").config();
require("./conn/conn");
const book = require("./routes/book");

app.use("/api/v1", user);
app.use("/api/v1", book);

app.listen(process.env.PORT, ()=>{
    console.log(`Server Started at ${process.env.PORT}`);
})
