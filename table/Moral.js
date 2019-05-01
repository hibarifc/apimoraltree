
var database = require('../config')

exports.getMoral = function (req, res) {
    var sqlRequest = "SELECT * FROM Moral";
    database.db.all(sqlRequest, function (err, rows) {
        if (err) {
            res.json({ status: false, data: "Internal server error"});
        } else if (rows == null || rows.length == 0) {
            res.json({ status: false, data: "Entity not found" });
        } else {
            res.json({ status: true, data: rows });
        }
    })
}

exports.createMoral = function (req, res) {
    let sqlRequest = "INSERT into Moral (Moral_ID, Moral_Name, Moral_Description) VALUES ($Moral_ID, $Moral_Name, $Moral_Description)";
    let sqlParams = {
        $Moral_ID: req.body.Moral_ID,
        $Moral_Name: req.body.Moral_Name,
        $Moral_Description: req.body.Moral_Description
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

exports.updateMoralById = function (req, res) {
    let sqlRequest = "UPDATE Moral SET Moral_ID = $Moral_ID, Moral_Name =$Moral_Name, Moral_Description=$Moral_Description WHERE id = $id;";
    let sqlParams = {
        $id:req.body.id,
        $Moral_ID: req.body.Moral_ID,
        $Moral_Name: req.body.Moral_Name,
        $Moral_Description: req.body.Moral_Description
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

exports.deleteMoralById = function (req, res) {
    let sqlRequest = "DELETE FROM Moral WHERE id=$id;";
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