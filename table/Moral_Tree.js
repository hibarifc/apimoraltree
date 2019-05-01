
var database = require('../config')

exports.getMoral_Tree = function (req, res) {
    var sqlRequest = "SELECT * FROM Moral_Tree";
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

exports.createMoral_Tree = function (req, res) {
    let sqlRequest = "INSERT into Moral_Tree (Tree_ID, Tree_Name) VALUES ($Tree_ID, $Tree_Name)";
    let sqlParams = {
        $Tree_ID: req.body.Tree_ID,
        $Tree_Name: req.body.Tree_Name,
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

exports.updateMoral_TreeById = function (req, res) {
    let sqlRequest = "UPDATE Moral_Tree SET Tree_ID = $Tree_ID, Tree_Name =$Tree_Name WHERE id = $id;";
    let sqlParams = {
        $id:req.body.id,
        $Tree_ID: req.body.Tree_ID,
        $Tree_Name: req.body.Tree_Name,
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

exports.deleteMoral_TreeById = function (req, res) {
    let sqlRequest = "DELETE FROM Moral_Tree WHERE id=$id;";
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