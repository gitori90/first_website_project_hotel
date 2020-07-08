const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require('fs')
// const fullDaysData = require(__dirname + "/public/data/fullDays.txt");
// const date = require(__dirname + "/views/date.js");
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



const grandSuite = 95;
const mediumSuite = 75;
const smallSuite = 60;
var chosenSuite = 'grand';
var chosenDays = [];
var confirmedDays = [];



// WRITING JSON TO FILE, LOADING THAT FILE'S TEXT AND PARSING THE JSON BACK:
// NOTE!!: THE OUTER QUOTES IN JSON ARE ALWAYS '' AND INNER QUOTES ARE ALWAYS ""
/*
const testtext = '{"grand": ["2020-06-15", "2021-07-25"]}'

fs.writeFile(__dirname + "/public/data/fullDays.txt", testtext, (err) => {
    // In case of a error throw err.
    if (err) throw err;
});

fs.readFile(__dirname + "/public/data/fullDays.txt", 'utf8', (err, data) => {
  var test1 = JSON.parse(data);
  dates = test1.grand;
  console.log(dates);
  var day = new Date(dates[0]);
  console.log(dates[0]);
  console.log(day);
});
*/




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
  chosenSuite = req.body.reserveButton;

  res.redirect("/reservationPage");
});


app.get("/reservationPage", function(req, res){
  fs.readFile(__dirname + "/public/data/fullDays.txt", 'utf8', (err, data) =>
  {
    chosenDaysAllSuites = JSON.parse(data);
    chosenDays = chosenDaysAllSuites.chosenSuite


  });

  res.render("reservationPage", {chosenSuite: chosenSuite, chosenDays: chosenDays});
});
app.post("/reservationPage", function(req, res){

   var daysString = req.body.daysChosen;
   confirmedDays = daysString.split(",");



  // const testtext = '{"grand": ["2020-06-15", "2021-07-25"]}'
  //
  // fs.writeFile(__dirname + "/public/data/fullDays.txt", testtext, (err) => {
  //     // In case of a error throw err.
  //     if (err) throw err;
  // });

  res.redirect("/checkout")
});


app.get("/checkout", function(req, res){
  // console.log(confirmedDays);
  var confirmedDaysString = "";
  for(let i = 0; i < confirmedDays.length; i++)
  {
    confirmedDaysString = confirmedDaysString + "<li>" + confirmedDays[i] + "</li>";
    // if(i < confirmedDays.length - 1)
    // {
    //   confirmedDaysString = confirmedDaysString + ",";
    // }
  }

  console.log(confirmedDaysString);
  console.log(typeof confirmedDaysString);
  //numberOfDays = confirmedDays.length;

  res.render("checkout", {confirmedDaysString: confirmedDays.toString()});
  /*umberOfDays = confirmedDays.length;
  res.render("checkout", {confirmedDays: confirmedDays, numberOfDays: numberOfDays});*/
});
app.post("/checkout", function(req, res){
  // WRITE THE CHOSEN DAYS INTO THE JSON FILE ONLY HERE!
  // chosenDays.push(confirmedDays)

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
