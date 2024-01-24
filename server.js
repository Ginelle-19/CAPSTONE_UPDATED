const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const mysql = require("mysql");
const server = express();


// const bcrypt = require("bcrypt");


server.use(bodyParser.json());
const cors = require("cors");

server.use(cors());
// number of iterations or rounds for generating salt
// const saltRounds = 10;

// Established the database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "inventorydb",
});

db.connect(function (error) {
  if (error) console.log("Error Connecting to DB");
  else console.log("Successfully Connected to DB");
});


// Establish the Port
server.listen(8085, function check(error) {
  if (error) console.log("Error...");
  else console.log("Started... 8085");
});
//------------------------------------------- API FOR COURSES ------------------------------------------------
server.get("/api/courses", (req, res) =>{
    var sql = "SELECT * FROM tblCourses";
    db.query(sql, function (error, result){
        if (error){
            console.log("Error connecting to DB");
        } else{
            res.send ({status: true, data: result});
        }
    });
});
//ADD COURSES
server.post("/api/courses/add", (req, res) => {
    let details = {
        courseCode: req.body.CourseCode,
        courseName: req.body.CourseName,
    };
    let sql = "INSERT INTO tblCourses SET ?";
    db.query(sql, details, (error) => {
        if (error){
            res.send({status: false, message: "Course Created Failed!"});
        } else{
            res.send({status: true, message: "Course Created Successfully!"});
        }
    });
});
//SEARCH COURSES
server.get("/api/courses/:id", (req, res) =>{
    var CourseID = req.params.id;
    var sql = "SELECT * FROM tblCourses WHERE courseID=" + CourseID;
    db.query(sql, function(error, result){
        if (error){
            console.log("Error Connecting to DB")
        } else{
            res.send({ status: true, data: result});
        }
    });
});
//UPDATE COURSES
server.put("/api/courses/update/:id", (req, res) => {
    let sql = 
    "UPDATE tblCourses SET courseCode='" +
    req.body.CourseCode + 
    "', courseName='" +
    req.body.CourseName +
    "' WHERE courseID=" +
    req.params.id;

    let a = db.query(sql, (error, result) => {
        if (error) {
            console.error("Error updating course:", error);
            res.send({ status: false, message: "Course Update Failed!" });
        } else {
            res.send({ status: true, message: "Course Update Success!" });
        }        
    });
});
// DELETE A RECORD
server.delete("/api/courses/delete/:id", (req, res) => {
    let sql = "DELETE FROM tblCourses where CourseID=" + req.params.id + "";
    let query = db.query(sql, (error)=>{
        if (error) {
            res.send({status: false, message: "Record Delete Failed!"});
        } else {
            res.send({status: true, message: "Record Deleted Successfully!"})
        }
    });
});
//---------------------------------------------------------------------------------------
// -------------------------------- API FOR EQUIPMENTS ----------------------------------

server.get("/api/equipments", (req, res) =>{
    var sql = "SELECT * FROM tblEquipment";
    db.query(sql, function (error, result){
        if (error){
            console.log("Error connecting to DB");
        } else{
            res.send ({status: true, data: result});
        }
    });
});

//ADD EQUIPMENTS
server.post("/api/equipments/add", (req, res) => {
    let details = {
        EquipmentName: req.body.EquipmentName,
        Quantity: req.body.Quantity,
        CourseID: req.body.CourseID,
        CalibrationSchedule: req.body.CalibrationSchedule
    };
    let sql = "INSERT INTO tblEquipment SET ?";
    db.query(sql, details, (error) => {
        if (error){
            res.send({status: false, message: "Equipment Created Failed!"});
        } else{
            res.send({status: true, message: "Equipment Created Successfully!"});
        }
    });
});
//SEARCH EQUIPMENT BASED ON COURSE ID
server.get("/api/equipments/:id", (req, res) =>{
    var CourseID = req.params.id;
    var sql = "SELECT * FROM tblEquipment WHERE courseID=" + CourseID;
    db.query(sql, function(error, result){
        if (error){
            console.log("Error Connecting to DB")
        } else{
            res.send({ status: true, data: result});
        }
    });
});
// UPDATE EQUIPMENTS
server.put("/api/equipments/update/:id", (req, res) => {
    let sql = 
    "UPDATE tblEquipment SET EquipmentName='" +
    req.body.EquipmentName + 
    "', Quantity='" +
    req.body.Quantity +
    "', CourseID='" +
    req.body.CourseID +
    "', CalibrationSchedule='" +
    req.body.CalibrationSchedule +
    "' WHERE EquipmentID=" +
    req.params.id;

    let a = db.query(sql, (error, result) => {
        if (error) {
            console.error("Error updating course:", error);
            res.send({ status: false, message: "Course Update Failed!" });
        } else {
            res.send({ status: true, message: "Course Update Success!" });
        }        
    });
});
// DELETE A RECORD
server.delete("/api/equipments/delete/:id", (req, res) => {
    let sql = "DELETE FROM tblEquipment where EquipmentID=" + req.params.id + "";
    let query = db.query(sql, (error)=>{
        if (error) {
            res.send({status: false, message: "Record Delete Failed!"});
        } else {
            res.send({status: true, message: "Record Deleted Successfully!"})
        }
    });
});
//---------------------------------------------------------------------------------------
// -------------------------------- API FOR CONSUMABLES ----------------------------------

server.get("/api/consumables", (req, res) =>{
    var sql = "SELECT * FROM tblConsumable";
    db.query(sql, function (error, result){
        if (error){
            console.log("Error connecting to DB");
        } else{
            res.send ({status: true, data: result});
        }
    });
});

//ADD CONSUMABLES
server.post("/api/consumables/add", (req, res) => {
    let details = {
        ConsumableName: req.body.ConsumableName,
        Quantity: req.body.Quantity,
        CourseID: req.body.CourseID,
        // ConsumableStat: req.body.ConsumableStat,
        ExpirationDate: req.body.ExpirationDate
    };
    let sql = "INSERT INTO tblConsumable SET ?";
    db.query(sql, details, (error) => {
        if (error){
            res.send({status: false, message: "Consumable Created Failed!"});
        } else{
            res.send({status: true, message: "Consumable Created Successfully!"});
        }
    });
});
//SEARCH CONSUMABLES BASED ON COURSE ID
server.get("/api/consumables/:id", (req, res) =>{
    var CourseID = req.params.id;
    var sql = "SELECT * FROM tblConsumable WHERE courseID=" + CourseID;
    db.query(sql, function(error, result){
        if (error){
            console.log("Error Connecting to DB")
        } else{
            res.send({ status: true, data: result});
        }
    });
});
// UPDATE CONSUMABLES
server.put("/api/consumables/update/:id", (req, res) => {
    let sql = 
    "UPDATE tblConsumable SET ConsumableName='" +
    req.body.ConsumableName + 
    "', Quantity='" +
    req.body.Quantity +
    "', CourseID='" +
    req.body.CourseID +
    "', ExpirationDate='" +
    req.body.ExpirationDate +
    "' WHERE ConsumableID=" +
    req.params.id;

    let a = db.query(sql, (error, result) => {
        if (error) {
            console.error("Error updating course:", error);
            res.send({ status: false, message: "Consumable Update Failed!" });
        } else {
            res.send({ status: true, message: "Consumable Update Success!" });
        }        
    });
});
// DELETE A RECORD
server.delete("/api/consumables/delete/:id", (req, res) => {
    let sql = "DELETE FROM tblConsumable where ConsumableID=" + req.params.id + "";
    let query = db.query(sql, (error)=>{
        if (error) {
            res.send({status: false, message: "Record Delete Failed!"});
        } else {
            res.send({status: true, message: "Record Deleted Successfully!"})
        }
    });
});
//---------------------------------------------------------------------------------------
// -------------------------------- API FOR USERS ----------------------------------

server.get("/api/users", (req, res) =>{
    var sql = "SELECT * FROM tblAccount";
    db.query(sql, function (error, result){
        if (error){
            console.log("Error connecting to DB");
        } else{
            res.send ({status: true, data: result});
        }
    });
});

//ADD USERS
server.post("/api/users/add", (req, res) => {
    let details = {
        LastName: req.body.LastName,
        FirstName: req.body.FirstName,
        Birthdate: req.body.Birthdate,
        StudentNum: req.body.StudentNum,
    };
    let sql = "INSERT INTO tblAccount SET ?";
    db.query(sql, details, (error) => {
        if (error){
            res.send({status: false, message: "User Created Failed!"});
        } else{
            res.send({status: true, message: "User Created Successfully!"});
        }
    });
});
//SEARCH CONSUMABLES BASED ON COURSE ID
// server.get("/api/consumables/:id", (req, res) =>{
//     var CourseID = req.params.id;
//     var sql = "SELECT * FROM tblConsumable WHERE courseID=" + CourseID;
//     db.query(sql, function(error, result){
//         if (error){
//             console.log("Error Connecting to DB")
//         } else{
//             res.send({ status: true, data: result});
//         }
//     });
// });
// UPDATE USERS
server.put("/api/users/update/:id", (req, res) => {
    let sql = 
    "UPDATE tblUsers SET LastName='" +
    req.body.LastName + 
    "', Birthdate='" +
    req.body.Birthdate +
    // "', EquipmentID='" +
    // req.body.EquipmentID +
    "', StudentNum='" +
    req.body.StudentNum +
    "' WHERE AccountID=" +
    req.params.id;

    let a = db.query(sql, (error, result) => {
        if (error) {
            console.error("Error updating user:", error);
            res.send({ status: false, message: "User Update Failed!" });
        } else {
            res.send({ status: true, message: "User Update Success!" });
        }        
    });
});
// DELETE A RECORD
server.delete("/api/users/delete/:id", (req, res) => {
    let sql = "DELETE FROM tblAccount where AccountID=" + req.params.id + "";
    let query = db.query(sql, (error)=>{
        if (error) {
            res.send({status: false, message: "Record Delete Failed!"});
        } else {
            res.send({status: true, message: "Record Deleted Successfully!"})
        }
    });
});


