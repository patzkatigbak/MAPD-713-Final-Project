//express_demo.js 文件
var express = require("express");
var fs = require("fs");
var multer = require("multer");
const url = require("url");

var upload = multer({ dest: "resources/userImage/" });
var app = express();
app.set("port", process.env.PORT || 3000);
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

// var DEFAULT_PORT = 5000
var DEFAULT_HOST = "127.0.0.1";
var SERVER_NAME = "patientApp";

// var http = require('http');
var mongoose = require("mongoose");

var port = process.env.PORT;
var ipaddress = process.env.IP;

var uristring =
  process.env.MONGODB_URI ||
  //'mongodb://127.0.0.1:27017/patientCareApp';
  "mongodb+srv://MAPD712PatientApp:AYEZGNZeFw9cclQk@cluster0.uzxamyj.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uristring, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("!!!! Connected to db: " + uristring);
});

const loginSchema = new mongoose.Schema({
  username: String,
  password: String
});

const patientSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  address: String,
  date_of_birth: String,
  department: String,
  doctor: String,
  sex: String,
  phone_number: String,
  emergency_contact_first_name: String,
  emergency_contact_last_name: String,
  emergency_contact_phone_number: String,
  date_of_admission: String,
  bed_number: String,
  photo: String,
})

var Login = mongoose.model("Login", loginSchema);
var Patient = mongoose.model("Patient", patientSchema);

if (typeof ipaddress === "undefined") {
  //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
  //  allows us to run/test the app locally.
  console.warn("No process.env.IP var, using default: " + DEFAULT_HOST);
  ipaddress = DEFAULT_HOST;
}

// if (typeof port === "undefined") {
//   console.warn('No process.env.PORT var, using default port: ' + DEFAULT_PORT);
//   port = DEFAULT_PORT;
// };

var server = app.listen(app.get("port"), function () {
  //port 5000

  var host = server.address().address;
  var port = server.address().port;
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

//Create Patient
app.post("/patients", function (req, res) {
  //changed from createPatient
  // console.log("_dirnamee is:"+__dirname)
  // console.log("filename is:"+__filename)
  console.log("POST request: login params=>" + JSON.stringify(req.params));
  console.log("POST request: login body=>" + JSON.stringify(req.body));
  // Make sure name is defined
  if (req.body.first_name === undefined) {
    // If there are any errors, pass them to next in the correct format
    throw new Error("first name cannot be empty");
  }

  // Creating new Patient.
  var newPatient = new Patient({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address: req.body.address,
    date_of_birth: req.body.date_of_birth,
    department: req.body.department,
    doctor: req.body.doctor,
    sex: req.body.sex,
    phone_number: req.body.phone_number,
    emergency_contact_first_name: req.body.emergency_contact_first_name,
    emergency_contact_last_name: req.body.emergency_contact_last_name,
    emergency_contact_phone_number: req.body.emergency_contact_phone_number,
    date_of_admission: req.body.date_of_admission,
    bed_number: req.body.bed_number,
    photo: req.body.photo,
  });
  // Create the new user and saving to db
  newPatient.save(function (error, result) {
    // If there are any errors, pass them to next in the correct format
    if (error) {
      console.log(error);
    }
    // Send the login if no issues
    res.send(201, result);
  });
});

//User Login
app.get("/login", function (req, res, next) {
  var collection = db.collection("users");
  collection.findOne(
    { username: req.query.username, password: req.query.password },
    function (err, user) {
      if (err) throw err;
      if (user) {
        console.log(user);
        // res.send(user)
        res.json(200, user);
      } else res.send(404);
    }
  );
});

//find all patients
app.get("/patients", function (req, res, next) {
  var collection = db.collection("patients");
  collection
    .find({ })
    .toArray(function (err, patients) {
      if (patients) {
        res.json(200, patients);
      } else {
        res.send(404);
      }
    });
});

app.get("/patients/:id", function (req, res, next) {

  var ObjectId = require('mongodb').ObjectId; 
  var collection = db.collection("patients");

  collection.find({_id: new ObjectId(req.params.id)}).toArray(function (err, patients) {
      if (patients) {
        console.log("FETCH OK for patient " + req.params.id);
        res.json(200, patients);
      } else {
        res.send(404);
      }
    });
});