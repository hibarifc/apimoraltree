
var database = require('../config')

exports.getParticipation = function (req, res) {
    var sqlRequest = "SELECT * FROM Participation_Activity";
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

exports.createParticipation = function (req, res) {
    let sqlRequest = "INSERT into Participation_Activity (Pa_ID, score, Act_ID, Member_ID,Tree_ID) VALUES ($Pa_ID, $score, $Act_ID, $Member_ID,$Tree_ID)";
    let sqlParams = {
        $Pa_ID: req.body.Pa_ID,
        $score: req.body.score,
        $Act_ID: req.body.Act_ID,
        $Member_ID: req.body.Member_ID,
        $Tree_ID: req.body.Tree_ID
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

exports.updateParticipationById = function (req, res) {
    let sqlRequest = "UPDATE Participation_Activity SET Pa_ID = $Pa_ID, score =$score, Act_ID=$Act_ID, Member_ID=$Member_ID, Tree_ID=$Tree_ID WHERE id = $id;";
    let sqlParams = {
        $id:req.body.id,
        $Pa_ID: req.body.Pa_ID,
        $score: req.body.score,
        $Act_ID: req.body.Act_ID,
        $Member_ID: req.body.Member_ID,
        $Tree_ID: req.body.Tree_ID
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

exports.deleteParticipationById = function (req, res) {
    let sqlRequest = "DELETE FROM Participation_Activity WHERE id=$id;";
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