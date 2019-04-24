let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./mydb.db');

exports.getActivity = function (req, res) {
    var sqlRequest = "SELECT * FROM Activity";
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

exports.createActivity = function (req, res) {
    let sqlRequest = "INSERT into Activity (Act_ID, Act_Name, Act_Photo, Ins_ID) VALUES ($Act_ID, $Act_Name, $Act_Photo, $Ins_ID)";
    let sqlParams = {
        $Act_ID: req.body.Act_ID,
        $Act_Name: req.body.Act_Name,
        $Act_Photo: req.body.Act_Photo,
        $Ins_ID: req.body.Ins_ID,
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

exports.updateActivityById = function (req, res) {
    let sqlRequest = "UPDATE Activity SET Act_ID = $Act_ID, Act_Name =$Act_Name, Act_Photo=$Act_Photo, Ins_ID=$Ins_ID WHERE id = $id;";
    let sqlParams = {
        $id:req.body.id,
        $Act_ID: req.body.Act_ID,
        $Act_Name: req.body.Act_Name,
        $Act_Photo: req.body.Act_Photo,
        $Ins_ID: req.body.Ins_ID,
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

exports.deleteActivityById = function (req, res) {
    let sqlRequest = "DELETE FROM Activity WHERE id=$id;";
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