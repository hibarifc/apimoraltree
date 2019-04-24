
var database = require('../config')

exports.getInstitution = function (req, res) {
    var sqlRequest = "SELECT * FROM Institution";
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

exports.createInstitution = function (req, res) {
    let sqlRequest = "INSERT into Institution (Ins_ID, Ins_Name, Ins_Address, Ins_Tel) VALUES ($Ins_ID, $Ins_Name, $Ins_Address, $Ins_Tel)";
    let sqlParams = {
        $Ins_ID: req.body.Ins_ID,
        $Ins_Name: req.body.Ins_Name,
        $Ins_Address: req.body.Ins_Address,
        $Ins_Tel: req.body.Ins_Tel,
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

exports.updateInstitutionById = function (req, res) {
    let sqlRequest = "UPDATE Institution SET Ins_ID = $Ins_ID, Ins_Name =$Ins_Name, Ins_Address=$Ins_Address, Ins_Tel=$Ins_Tel WHERE id = $id;";
    let sqlParams = {
        $id:req.body.id,
        $Ins_ID: req.body.Ins_ID,
        $Ins_Name: req.body.Ins_Name,
        $Ins_Address: req.body.Ins_Address,
        $Ins_Tel: req.body.Ins_Tel,
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

exports.deleteInstitutionById = function (req, res) {
    let sqlRequest = "DELETE FROM Institution WHERE id=$id;";
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