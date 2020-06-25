const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
// const date = require(__dirname + "/views/date.js");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


const grandSuite = 95;
const mediumSuite = 75;
const smallSuite = 60;



// var items = [];
// var workItems = [];

app.get("/", function(req, res){

  // var currentDay = date.getDate();
  // var daysList = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  //
  // let day = daysList[currentDay];

  // if (currentDay === 6 || (currentDay === 0))
  // {
  //   day = "weekend";
  //
  // }
  // else{
  //   day = "weekday";
  // }

  // it renders the file list.ejs inside views folder!:
  // res.render("list", {listTitle: day, newItems: items});

  res.render("index");
});
app.post("/", function(req, res){

  // let item = req.body.newItem;
  //
  // if (req.body.list === "work"){
  //   workItems.push(item);
  //   res.redirect("/work");
  // }
  // else{
  //
  //   items.push(item);
  //   res.redirect("/");
  //
  // }

  // item = req.body.newItem;
  // items.push(item);
  // res.redirect("/");
});




app.get("/pricing", function(req, res){

  res.render("pricing", {grandPrice: grandSuite, mediumPrice: mediumSuite, smallPrice: smallSuite});
});
app.post("/pricing", function(req, res){
  let suiteType = req.body.reserveButton;
  res.redirect("/checkout");
});






app.get("/checkout", function(req, res){

  res.render("checkout");
});
app.post("/checkout", function(req, res){

});





// app.get("/work", function(req, res){
//   res.render("list", {listTitle: "work list", newItems: workItems});
// })
// app.post("/work", function(req, res){
//   let item = req.body.newItems;
//   workItems.push(item);
//   res.redirect("/work");
// });
//
// app.get("/about", function(req, res){
//   res.render("about");
// });

app.listen(3000, function(){
  console.log("server started at 3000");
});
