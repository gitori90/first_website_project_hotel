const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
mongoose.connect('mongodb+srv://armage:armage1990@cluster0.8id6c.mongodb.net/roomsDB', {
  useNewUrlParser: true
});

//mongodb://localhost:27017/roomsDB

const grandSuite = 95;
const mediumSuite = 75;
const smallSuite = 60;
var errorMessage = "";
var chosenSuite = 'grand';
var confirmedDays = [];
var reservationDetails = {
  chosenSuite: "",
  confirmedDays: [],
  totalCost: ""
};

const roomsSchema = {
  type: String,
  reservedDays: confirmedDays
};
const Room = mongoose.model("Room", roomsSchema);

app.route("/")
.get(function(req, res)
{
  res.render("index");
})
.post(function(req, res)
{

});

app.route("/contact")
.get(function(req, res)
{
  res.render("contact");
})
.post(function(req, res) {

});

app.route("/pricing")
.get(function(req, res)
{
  res.render("pricing", {
    grandPrice: grandSuite,
    mediumPrice: mediumSuite,
    smallPrice: smallSuite
  });
})
.post(function(req, res)
{
  chosenSuite = req.body.reserveButton;

  res.redirect("/reservationPage");
});

app.route("/reservationPage")
.get(function(req, res)
{
  var chosenDays = [];
  Room.find({
      type: chosenSuite
    },
    function(err, items)
    {
      if (err)
      {
        console.log(err);
      }
      else
      {
        if (items.length === 0)
        {
          var newRoom = new Room({
            type: chosenSuite
          });
          newRoom.save();
        }
        else
        {
          chosenDays = items[0].reservedDays;
        }
      }
      res.render("reservationPage", {
        chosenSuite: chosenSuite,
        chosenDays: chosenDays
      });
    });
})
.post(function(req, res)
{
  var daysString = req.body.daysChosen;
  confirmedDays = daysString.split(",");

  // reservationDetails = {chosenSuite: "", confirmedDays: []};
  reservationDetails.confirmedDays = confirmedDays;
  reservationDetails.chosenSuite = chosenSuite;

  res.redirect("/checkout");
});


app.route("/checkout")
.get(function(req, res)
{
  var confirmedDaysString = "";

  reservationDetails.confirmedDays.forEach(function(dayString) {
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

  res.render("checkout", {
    confirmedDaysString: reservationDetails.confirmedDays,
    chosenSuite: reservationDetails.chosenSuite,
    totalCost: reservationDetails.totalCost
  });
})
.post(function(req, res)
{
  errorMessage = "";
  Room.find({type: reservationDetails.chosenSuite},
    function(err, items)
    {
      if (err)
      {
        errorMessage = err;
        console.log(err);
      }
      else
      {
        items[0].reservedDays.forEach(date =>
        {

          if (reservationDetails.confirmedDays.includes(date))
          {
            errorMessage = "Requested day is already taken!"
          }
        });
      };
      if (errorMessage === "")
      {
        items[0].reservedDays = items[0].reservedDays.concat(reservationDetails.confirmedDays);
        items[0].save();
        res.redirect("/confirmation");
      }
      else
      {
        res.redirect("/errorPage");
      }
    });
});

app.route("/confirmation")
.get(function(req, res)
{
  res.render("confirmation");
});

app.route("/errorPage")
.get(function(req, res)
{
  res.render("errorPage", {
    errorMessage: errorMessage
  });
});

app.listen(process.env.PORT || 3000, function() {});
