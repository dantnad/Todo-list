const express = require('express');
const app = express();
const ejs = require("ejs");
const date = require(__dirname + '/date.js')
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set("view engine", "ejs");

const tasks = [];
const workTasks = [];

app.get("/", function(req, res){
    res.render("list", {
      listTitle: date.getDate(),
      listOfTasks: tasks
    }); 
});

app.get('/work', function(req, res){
    res.render("list", {
      listTitle: "Work List",
      listOfTasks: workTasks,
    }); 
})

app.post('/work', function(req, res){
    workTasks.push(req.body.task);
    res.redirect("/work");
})

app.post("/", function(req, res){
    if (req.body.list === "Work List") {
      workTasks.push(req.body.task);
      res.redirect("/work");
    } else {
      tasks.push(req.body.task);
      res.redirect("/");
    }
})

app.listen(3000, function(){
    console.log("App is running on port 3000");
})