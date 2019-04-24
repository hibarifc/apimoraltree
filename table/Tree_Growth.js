
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./mydb.db');

exports.getTree_Growth = function (req, res) {
    var sqlRequest = "SELECT * FROM Tree_Growth";
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

exports.createTree_Growth = function (req, res) {
    let sqlRequest = "INSERT into Tree_Growth (Level_ID, Level_Score, Tree_Photo, Tree_ID) VALUES ($Level_ID, $Level_Score, $Tree_Photo, $Tree_ID)";
    let sqlParams = {
        $Level_ID: req.body.Level_ID,
        $Level_Score: req.body.Level_Score,
        $Tree_Photo: req.body.Tree_Photo,
        $Tree_ID: req.body.Tree_ID
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

exports.updateTree_GrowthById = function (req, res) {
    let sqlRequest = "UPDATE Tree_Growth SET Level_ID = $Level_ID, Level_Score =$Level_Score, Tree_Photo=$Tree_Photo, Tree_ID=$Tree_ID WHERE id = $id;";
    let sqlParams = {
        $id:req.body.id,
        $Level_ID: req.body.Level_ID,
        $Level_Score: req.body.Level_Score,
        $Tree_Photo: req.body.Tree_Photo,
        $Tree_ID: req.body.Tree_ID
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

exports.deleteTree_GrowthById = function (req, res) {
    let sqlRequest = "DELETE FROM Tree_Growth WHERE id=$id;";
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