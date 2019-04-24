
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./mydb.db');

exports.getMoral_Activity = function (req, res) {
    var sqlRequest = "SELECT * FROM Moral_Activity";
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

exports.createMoral_Activity = function (req, res) {
    let sqlRequest = "INSERT into Moral_Activity (Ma_ID, QR_Photo, Moral_ID, Act_ID) VALUES ($Ma_ID, $QR_Photo, $Moral_ID, $Act_ID)";
    let sqlParams = {
        $Ma_ID: req.body.Ma_ID,
        $QR_Photo: req.body.QR_Photo,
        $Moral_ID: req.body.Moral_ID,
        $Act_ID: req.body.Act_ID
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

exports.updateMoral_ActivityById = function (req, res) {
    let sqlRequest = "UPDATE Moral_Activity SET Ma_ID = $Ma_ID, QR_Photo =$QR_Photo, Moral_ID=$Moral_ID, Act_ID=$Act_ID WHERE id = $id;";
    let sqlParams = {
        $id:req.body.id,
        $Ma_ID: req.body.Ma_ID,
        $QR_Photo: req.body.QR_Photo,
        $Moral_ID: req.body.Moral_ID,
        $Act_ID: req.body.Act_ID
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

exports.deleteMoral_ActivityById = function (req, res) {
    let sqlRequest = "DELETE FROM Moral_Activity WHERE id=$id;";
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