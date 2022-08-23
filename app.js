const express = require('express');
const app = express();
let ejs = require("ejs");
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set("view engine", "ejs");

let tasks = [];

app.get("/", function(req, res){
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {
      dayOfTheWeek: day,
      listOfTasks: tasks
    }); 
});

app.post("/", function(req, res){
    tasks.push(req.body.task);
    res.redirect("/")
})

app.listen(3000, function(){
    console.log("App is running on port 3000");
})