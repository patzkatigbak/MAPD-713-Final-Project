let chai = require("chai");
let chaiHttp = require("chai-http");
var expect = require("chai").expect;
var request = require("request");
let shouuld = chai.should();
var serverURL = "https://patsurikukoserver.herokuapp.com";
var patientID = "638547589e42b988924fba0c";
var mongoose = require("mongoose");

chai.use(chaiHttp);

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
});

var Patient = mongoose.model("Patient", patientSchema);

/**Patient Use Case and Methods Testing */
/**Get All Patient */
describe("Get All Patient - https://patsurikukoserver.herokuapp.com/patients", () => {
  it("Using Correct Url - Response from server should be 200", function (done) {
    request(
      "https://patsurikukoserver.herokuapp.com/patients",
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });

  it("Response code should be 200", function (done) {
    chai
      .request("https://patsurikukoserver.herokuapp.com")
      .get("/patients")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Response body should be Json Object/Format", function (done) {
    chai
      .request(serverURL)
      .get("/patients")
      .end((err, res) => {
        res.body.should.be.a("array");
        done();
      });
  });

  it("Number of Result should be more than 1 Patient", function (done) {
    chai
      .request(serverURL)
      .get("/patients")
      .end((err, res) => {
        res.body.length.should.be.above(1);
        done();
      });
  });
});

/**Get Single Patient by ID */
describe("Get Single Patient by ID - https://patsurikukoserver.herokuapp.com/patients/:id", () => {
  it("Using Correct Url - Response from server should be 200", function (done) {
    request(
      serverURL + "/patients/" + patientID,
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });

  it("Response code should be 200", function (done) {
    chai
      .request(serverURL)
      .get("/patients/" + patientID)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Response body should be Json Object/Format", function (done) {
    chai
      .request(serverURL)
      .get("/patients/" + patientID)
      .end((err, res) => {
        res.body.should.be.a("array");
        done();
      });
  });

  it("Number of Result should be equal to 1 only", function (done) {
    chai
      .request(serverURL)
      .get("/patients/" + patientID)
      .end((err, res) => {
        res.body.length.should.be.equal(1);
        done();
      });
  });
});

/**Get Tests by Patient ID */
describe("Get Test by Patient ID - https://patsurikukoserver.herokuapp.com/patients/:id/tests", () => {
  it("Using Correct Url - Response from server should be 200", function (done) {
    request(
      serverURL + "/patients/" + patientID + "/tests",
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });

  it("Response code should be 200", function (done) {
    chai
      .request(serverURL)
      .get("/patients/" + patientID + "/tests")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Response body should be Json Object/Format", function (done) {
    chai
      .request(serverURL)
      .get("/patients/" + patientID + "/tests")
      .end((err, res) => {
        res.body.should.be.a("array");
        done();
      });
  });
});

/**Get Treatment by Patient ID */
describe("Get Treatment by Patient ID - https://patsurikukoserver.herokuapp.com/patients/:id/treatment", () => {
  it("Using Correct Url - Response from server should be 200", function (done) {
    request(
      serverURL + "/patients/" + patientID + "/treatments",
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done(); //git hub: treatment, that's why Test doens't pass
      }
    );
  });

  it("Response code should be 200", function (done) {
    chai
      .request(serverURL)
      .get("/patients/" + patientID + "/treatments") //git hub: treatment, that's why Test doens't pass
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("Response body should be Json Object/Format", function (done) {
    chai
      .request(serverURL)
      .get("/patients/" + patientID + "/treatments") //git hub: treatment, that's why Test doens't pass
      .end((err, res) => {
        res.body.should.be.a("array");
        done();
      });
  });
});
