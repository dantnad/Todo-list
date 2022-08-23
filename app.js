const express = require('express');
const app = express();
let ejs = require("ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set("view engine", "ejs");

let tasks = [];
let workTasks = [];

app.get("/", function(req, res){
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {
      listTitle: day,
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