const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./src/routes/route");

const app = express();

dotenv.config()

const PORT = process.env.PORT;

app.use(cors())
app.use(bodyParser.json())

app.use("/api/students", routes)

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("MongoDB connected")
  app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
  })
}).catch(err => {
  console.error("Database connection failed: ", err)
})