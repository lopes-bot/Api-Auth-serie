const express = require("express");
const morgan = require("morgan");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Apiauth");

const app = express();

//middlewares
app.use(morgan("dev"));
app.use(bodyParse.json());

//routes
app.use("/users", require("./routes/users"));

//start the server
const port = process.env.PORT || 4000;

app.listen(port);
console.log(`sevidor rodando na porta ${port}`);
