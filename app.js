const express = require('express');
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/images"))
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50,
    message: "To Many Request, Please Try Again In 15 Minutes."
});
app.use("/", apiLimiter);
  
app.get("/", (req, res) => {
    res.render(__dirname + "/views/index");
;})

app.use(function(a, b) {
    b.status(404).render(__dirname + "/views/404.ejs");
});

app.listen(3000, () => {
    console.log("server started");
})