const express = require("express");
const morgan = require("morgan");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost/Apiauth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("conexão com o mongoDB realizada com sucesso");
  })
  .catch((err) => {
    console.log(err + "falha na conexão com o mongoDB");
  });

const app = express();
app.use(express.json());

//middlewares
app.use(morgan("dev"));
app.use(bodyParse.json());

//routes
app.use("/users", require("./routes/users"));

//start the server
const port = process.env.PORT || 4000;

app.listen(port);
console.log(`sevidor rodando na porta ${port}`);
