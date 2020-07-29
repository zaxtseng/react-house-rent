var express = require("express");
var app = express();
var router = require("./router");
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use("/api", router);

app.listen(5000, function() {
  console.log(5000);
});
