
var database = require('../config')

exports.getMember = function (req, res) {
    var sqlRequest = "SELECT * FROM Member";
    database.db.all(sqlRequest, function (err, rows) {
        if (err) {
            res.json({ status: false, data: "Internal server error"});
        } else if (rows === null || rows.length === 0) {
            res.json({ status: false, data: "Entity not found" });
        } else {
            res.json({ status: true, data: rows });
        }
    })
}

exports.createMember = function (req, res) {
    let sqlRequest = "INSERT into Member (Member_ID, Member_Name, Member_Status, username,password,Dept_ID) VALUES ($Member_ID, $Member_Name, $Member_Status, $username,$password,$Dept_ID)";
    let sqlParams = {
        $Member_ID: req.body.Member_ID,
        $Member_Name: req.body.Member_Name,
        $Member_Status: req.body.Member_Status,
        $username: req.body.username,
        $password: req.body.password,
        $Dept_ID: req.body.Dept_ID,
    };
    let stmt = database.db.prepare(sqlRequest);
    stmt.run(sqlParams, function (err) {
        if (err) {
            res.json({ status: false, data: "Entity not found" });
        } else  {
            res.json({ status: true});
        } 
    });
}

exports.updateMemberById = function (req, res) {
    let sqlRequest = "UPDATE Member SET Member_ID = $Member_ID, Member_Name =$Member_Name, Member_Status=$Member_Status, Dept_ID=$Dept_ID WHERE id = $id;";
    let sqlParams = {
        $id:req.body.id,
        $Member_ID: req.body.Member_ID,
        $Member_Name: req.body.Member_Name,
        $Member_Status: req.body.Member_Status,
        $Dept_ID: req.body.Dept_ID,
    };
    let stmt = database.db.prepare(sqlRequest);
    stmt.run(sqlParams, function (err) {
        if (err) {
            res.json({ status: false, data: "Internal server error" });
        } else  {
            res.json({ status: true});
        } 
    });
}

exports.deleteMemberById = function (req, res) {
    let sqlRequest = "DELETE FROM Member WHERE id=$id;";
    let sqlParams = {
        $id:req.body.id,
    };
    let stmt = database.db.prepare(sqlRequest);
    stmt.run(sqlParams, function (err) {
        if (err) {
            res.json({ status: false, data: "Internal server error" });
        } else  {
            res.json({ status: true});
        } 
    });
}