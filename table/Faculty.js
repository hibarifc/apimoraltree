let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./mydb.db');

exports.getFaculty = function (req, res) {
    var sqlRequest = "SELECT * FROM Faculty";
    db.all(sqlRequest, function (err, rows) {
        if (err) {
            res.json({ status: false, data: "Internal server error"});
        } else if (rows === null || rows.length === 0) {
            res.json({ status: false, data: "Entity not found" });
        } else {
            res.json({ status: true, data: rows });
        }
    })
}

exports.createFaculty = function (req, res) {
    let sqlRequest = "INSERT into Faculty (Fac_ID, Fac_Name) VALUES ($Fac_ID, $Fac_Name)";
    let sqlParams = {
        $Fac_ID: req.body.Fac_ID,
        $Fac_Name: req.body.Fac_Name
    };
    let stmt = db.prepare(sqlRequest);
    stmt.run(sqlParams, function (err) {
        if (err) {
            res.json({ status: false, data: "Entity not found" });
        } else  {
            res.json({ status: true});
        } 
    });
}

exports.updateFacultyById = function (req, res) {
    let sqlRequest = "UPDATE Faculty SET Fac_ID = $Fac_ID, Fac_Name =$Fac_Name WHERE id = $id;";
    let sqlParams = {
        $id:req.body.id,
        $Fac_ID: req.body.Fac_ID,
        $Fac_Name: req.body.Fac_Name
    };
    let stmt = db.prepare(sqlRequest);
    stmt.run(sqlParams, function (err) {
        if (err) {
            res.json({ status: false, data: "Internal server error" });
        } else  {
            res.json({ status: true});
        } 
    });
}

exports.deleteFacultyById = function (req, res) {
    let sqlRequest = "DELETE FROM Faculty WHERE id=$id;";
    let sqlParams = {
        $id:req.body.id,
    };
    let stmt = db.prepare(sqlRequest);
    stmt.run(sqlParams, function (err) {
        if (err) {
            res.json({ status: false, data: "Internal server error" });
        } else  {
            res.json({ status: true});
        } 
    });
}