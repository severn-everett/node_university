var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.send("Students Homepage");
});

router.post("/addStudent", function(req, res) {
  res.json({
    response: "Student Added"
  });
});

router.delete("/deleteStudent", function(req,res) {
  res.json({
    response: "Student Removed"
  });
});

module.exports = router;
