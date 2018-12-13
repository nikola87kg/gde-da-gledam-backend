const express = require("express");
const path = require("path");
const authRoute = require("./routes/authRoute");
const linkRoute = require("./routes/linkRoute");

/* CREATE EXPRESS APP */
const app = express();

/* PARSE REQUEST BODY */
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* CORS */
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","POST, GET, PATCH, PUT, DELETE, OPTIONS" );
    next();
});

/* ROUTING */
app.use("/api/auth", authRoute);
app.use("/api/link", linkRoute);

/* EXPORT EXPRESS APP */
module.exports = app;
