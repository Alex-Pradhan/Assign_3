var express = require("express");
var app = express();
var path = require("path");
var data = require("./data-service.js");

var HTTP_PORT = process.env.PORT || 8080;
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}


app.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "/views/home.html"));
});


app.get("/about", function(req,res){
    res.sendFile(path.join(__dirname, "/views/about.html"));
});



app.get("/employees", function(req,res){
    data.getAllEmployees()
        .then((data) => {
            console.log ("getting AllEmployees");
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })
});

app.get("/managers", function(req,res){
    data.getManagers()
        .then((data) => {
            console.log ("getting Managers");
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })
});

app.get("/departments", function(req,res){
    data.getDepartments()
        .then((data) => {
            console.log ("getting Departments");
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })
});

app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname,"/views/error404.html"));
})
console.log ("Ready for initialization");
data.initialize()
    .then(() => {
        console.log ("Server has initialized");
        app.listen(HTTP_PORT, onHttpStart);  
    })
    .catch(err => {
        console.log(err);
    })

