var express = require("express");
var router = express.Router();

//Require Mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  title: String,
  emoji: { type: String, default: "🆕" },
  creationDate: { type: Date, default: Date.now() },
  doneBy: String,
  doneDate: Date,
});

// Compile model from schema
var TaskModel = mongoose.model("TaskModel", TaskSchema);

/* GET all tasts */
router.get("/", function (req, res, next) {
  res.send("respond with all tasks");
});

/* Post a new task into the database */
router.get("/new", function (req, res, next) {
  // Create an instance of model SomeModel
  var newTask = new TaskModel({
    title: "test task",
  });

  // Save the new model instance, passing a callback
  newTask.save(function (err) {
    if (err) return handleError(err);
    // saved!
  });
  res.send(newTask);
});

/* Edit a task in the database */
router.put("/edit", function (req, res, next) {
  res.send("respond with the edited task");
});

/* Edit a task in the database */
router.put("/done", function (req, res, next) {
  console.log("req", req.ip);
  res.send("the task has been done by : " + JSON.stringify(req.params));
});

module.exports = router;

function verifyJson(req, res) {
  var jsonStr = req.query.params;
  try {
    var jsonObj = JSON.parse(jsonStr);
    res.send("Success");
  } catch (e) {
    res.status(400).send("Invalid JSON string");
  }
}

function handleError(error) {
  console.error("error", error);
}
