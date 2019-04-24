/* Load modules */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");


/* Database configuration */
let sqlite3 = require('sqlite3').verbose();

const path = require('path');
const dbPath = path.resolve(__dirname, 'Mydb.db')

// const db = new sqlite3.Database(dbPath)
let db = new sqlite3.Database(dbPath,(err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.')

});


/* Init server listening */
var port = process.env.PORT || 7777;
//parse
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.set('view engine','ejs');

app.get('/', function (req, res) {
    res.render('home');
    console.log('homestart ');
});


app.listen(port, function () {
    console.log('Starting node.js on port ' + port);
});
// * LoadTable
var Institution = require('./table/Institution.js');
var Activity = require('./table/Activity.js');
var Department = require('./table/Department.js');

/* Express configuration */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//------------------------------------  Activity ------------------------------------------------------
app.get('/api/Activity/getActivity', function (req, res) {
    Activity.getActivity(req, res);
});
app.post('/api/Activity/createActivity', function (req, res) {
    Activity.createActivity(req, res);
});
app.post('/api/Activity/updateActivityById', function (req, res) {
    Activity.updateActivityById(req, res);
});
app.post('/api/Activity/deleteActivityById', function (req, res) {
    Activity.deleteActivityById(req, res);
});


//------------------------------------  Department ------------------------------------------------------
app.get('/api/Department/getDepartment', function (req, res) {
    Department.getDepartment(req, res);
});
app.post('/api/Department/createDepartment', function (req, res) {
    Department.createDepartment(req, res);
});
app.post('/api/Department/updateDepartmentById', function (req, res) {
    Department.updateDepartmentById(req, res);
});
app.post('/api/Department/deleteDepartmentById', function (req, res) {
    Department.deleteDepartmentById(req, res);
});

//------------------------------------  Faculty ------------------------------------------------------
app.get('/api/Faculty/getFaculty', function (req, res) {
    Faculty.getFaculty(req, res);
});
app.post('/api/Faculty/createFaculty', function (req, res) {
    Faculty.createFaculty(req, res);
});
app.post('/api/Faculty/updateFacultyById', function (req, res) {
    Faculty.updateFacultyById(req, res);
});
app.post('/api/Faculty/deleteFacultyById', function (req, res) {
    Faculty.deleteFacultyById(req, res);
});

//------------------------------------  Member ------------------------------------------------------
app.get('/api/Member/getMember', function (req, res) {
    Member.getMember(req, res);
});
app.post('/api/Member/createMember', function (req, res) {
    Member.createMember(req, res);
});
app.post('/api/Member/updateMemberById', function (req, res) {
    Member.updateMemberById(req, res);
});
app.post('/api/Member/deleteMemberById', function (req, res) {
    Member.deleteMemberById(req, res);
});


//------------------------------------  Moral_Activity ------------------------------------------------------
app.get('/api/Moral_Activity/getMoral_Activity', function (req, res) {
    Moral_Activity.getMoral_Activity(req, res);
});
app.post('/api/Moral_Activity/createMoral_Activity', function (req, res) {
    Moral_Activity.createMoral_Activity(req, res);
});
app.post('/api/Moral_Activity/updateMoral_ActivityById', function (req, res) {
    Moral_Activity.updateMoral_ActivityById(req, res);
});
app.post('/api/Moral_Activity/deleteMoral_ActivityById', function (req, res) {
    Moral_Activity.deleteMoral_ActivityById(req, res);
});


//------------------------------------  Moral_Tree  ------------------------------------------------------
app.get('/api/Moral_Tree/getMoral_Tree', function (req, res) {
    Moral_Tree.getMoral_Tree(req, res);
});
app.post('/api/Moral_Tree/createMoral_Tree', function (req, res) {
    Moral_Tree.createMoral_Tree(req, res);
});
app.post('/api/Moral_Tree/updateMoral_TreeById', function (req, res) {
    Moral_Tree.updateMoral_TreeById(req, res);
});
app.post('/api/Moral_Tree/deleteMoral_TreeById', function (req, res) {
    Moral_Tree.deleteMoral_TreeById(req, res);
});

//------------------------------------  Moral  ------------------------------------------------------
app.get('/api/Moral/getMoral', function (req, res) {
    Moral.getMoral(req, res);
});
app.post('/api/Moral/createMoral', function (req, res) {
    Moral.createMoral(req, res);
});
app.post('/api/Moral/updateMoralById', function (req, res) {
    Moral.updateMoralById(req, res);
});
app.post('/api/Moral/deleteMoralById', function (req, res) {
    Moral.deleteMoralById(req, res);
});

//------------------------------------  Participation  ------------------------------------------------------
app.get('/api/Participation/getParticipation', function (req, res) {
    Participation.getParticipation(req, res);
});
app.post('/api/Participation/createParticipation', function (req, res) {
    Participation.createParticipation(req, res);
});
app.post('/api/Participation/updatParticipationById', function (req, res) {
    Participation.updateParticipationById(req, res);
});
app.post('/api/Participation/deleteParticipationById', function (req, res) {
    Participation.deleteParticipationById(req, res);
});

//------------------------------------  Tree_Growth  ------------------------------------------------------
app.get('/api/Tree_Growth/getTree_Growth', function (req, res) {
    Tree_Growth.getTree_Growth(req, res);
});
app.post('/api/Tree_Growth/createTree_Growth', function (req, res) {
    Tree_Growth.createTree_Growth(req, res);
});
app.post('/api/Tree_Growth/updatTree_GrowthById', function (req, res) {
    Tree_Growth.updateTree_GrowthById(req, res);
});
app.post('/api/Tree_Growth/deleteTree_GrowthById', function (req, res) {
    Tree_Growth.deleteTree_GrowthById(req, res);
});

//----------------------------------- Institution -----------------------------------------------------
app.get('/api/institution/getInstitution', function (req, res) {
    Institution.getInstitution(req, res);
});
app.post('/api/institution/createInstitution', function (req, res) {
    Institution.createInstitution(req, res);
});
app.post('/api/institution/updateInstitutionById', function (req, res) {
    Institution.updateInstitutionById(req, res);
});
app.post('/api/institution/deleteInstitutionById', function (req, res) {
    Institution.deleteInstitutionById(req, res);
});

