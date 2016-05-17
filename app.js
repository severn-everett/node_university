var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

var students = require("./routes/students");
var universityClasses = require("./routes/university_classes");

app.use(express.static(path.join(__dirname,"public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/students", students);
app.use("/classes", universityClasses);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/main.html");
});

var server = app.listen(12021, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Registrar app listening at http://%s:%s", host, port);
});

