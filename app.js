require("dotenv").config();
const express = require("express");
const app = express();

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
console.log("hello")
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api", reviewRoutes);

module.exports = app;
