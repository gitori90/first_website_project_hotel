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
var reservationDetails = {chosenSuite: "", confirmedDays: [], totalCost: ""};



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

  res.render("index");
});
app.post("/", function(req, res){

});

app.get("/contact", function(req, res){

  res.render("contact");
});
app.post("/contact", function(req, res){

});


app.get("/pricing", function(req, res){

  res.render("pricing", {grandPrice: grandSuite, mediumPrice: mediumSuite, smallPrice: smallSuite});
});
app.post("/pricing", function(req, res){
  chosenSuite = req.body.reserveButton;

  res.redirect("/reservationPage");
});

// this yet doesnt work cause there's no such file
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

   // reservationDetails = {chosenSuite: "", confirmedDays: []};
   reservationDetails.confirmedDays = confirmedDays;
   reservationDetails.chosenSuite = chosenSuite;



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
  // for(let i = 0; i < confirmedDays.length; i++)
  // {
  //   confirmedDaysString = confirmedDaysString + "<li>" + reservationDetails.confirmedDays[i] + "</li>";
  // }
  // THE NEXT SNIPPET IS INSTEAD OF THE FOR LOOP:
  reservationDetails.confirmedDays.forEach(function(dayString)
  {
    confirmedDaysString = confirmedDaysString + "<li>" + dayString + "</li>";
  });


  if (reservationDetails.chosenSuite == "Grand")
  {
    totalCost = confirmedDays.length * grandSuite;
    reservationDetails.totalCost = totalCost.toString();
  }
  else if (reservationDetails.chosenSuite == "Medium")
  {
    totalCost = confirmedDays.length * mediumSuite;
    reservationDetails.totalCost = totalCost.toString();
  }
  else if (reservationDetails.chosenSuite == "Small")
  {
    totalCost = confirmedDays.length * smallSuite;
    reservationDetails.totalCost = totalCost.toString();
  }

  res.render("checkout",
  {confirmedDaysString: reservationDetails.confirmedDays,
  chosenSuite: reservationDetails.chosenSuite,
  totalCost: reservationDetails.totalCost});
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
