
var database = require('../config')

exports.getDepartment = function (req, res) {
    var sqlRequest = "SELECT * FROM Department";
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

exports.createDepartment = function (req, res) {
    let sqlRequest = "INSERT into Department (Dept_ID, Dept_Name, Fac_ID) VALUES ($Dept_ID, $Dept_Name, $Fac_ID)";
    let sqlParams = {
        $Dept_ID: req.body.Act_ID,
        $Dept_Name: req.body.Act_Name,
        $Fac_ID: req.body.Act_Photo,
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

exports.updateDepartmentById = function (req, res) {
    let sqlRequest = "UPDATE Department SET Dept_ID = $Dept_ID, Dept_Name =$Dept_Name, Fac_ID=$Fac_ID WHERE id = $id;";
    let sqlParams = {
        $id:req.body.id,
        $Dept_ID: req.body.Act_ID,
        $Dept_Name: req.body.Act_Name,
        $Fac_ID: req.body.Act_Photo,
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

exports.deleteDepartmentById = function (req, res) {
    let sqlRequest = "DELETE FROM Department WHERE id=$id;";
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