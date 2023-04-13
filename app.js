require("dotenv").config();
var express = require("express");
var app = express();
var planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
        id: 2,
        name: "Mars",
    },
];
app.use(express.json());
app.use(function (req, res, next) {
    console.log(req);
    res.status(200).json(req.body);
});
app.listen(process.env.PORT, function () { return console.log("Server listening at port ".concat(process.env.PORT)); });
