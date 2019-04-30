
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

    var sqlRequest = "SELECT count(*)as count FROM Participation_Activity";
    var Pa_ID ;
    database.db.all(sqlRequest, function (err, rows) {
   
        Pa_ID = "Pa"+(rows[0].count+1)
      
        var sqlRequest = "INSERT into Participation_Activity (Pa_ID,score, Act_ID, Member_ID,Tree_ID) VALUES ($Pa_ID,$score, $Act_ID, $Member_ID,$Tree_ID)";
        let sqlParams = {
            $Pa_ID: Pa_ID,
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
    })
    
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
    var sqlRequest = "DELETE FROM Participation_Activity WHERE id=$id;";
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

exports.getParticipationById = function (req, res) {
    var sqlRequest = "SELECT SUM(Participation_Activity.score)as score FROM Participation_Activity LEFT JOIN Activity ON Activity.Act_ID = Participation_Activity.Act_ID  WHERE Member_ID = $Member_ID";
    let sqlParams = {
        $Member_ID:req.body.Member_ID,
    };
    let stmt = database.db.prepare(sqlRequest);
    stmt.all(sqlParams, function (err,rows) {
    
        if (err) {
            res.json({ status: false, data: "Internal server error"});
        } else if (rows == null || rows.length == 0) {
            res.json({ status: false, data: "Entity not found" });
        } else {
            res.json({ status: true, data: rows });
        }
    });
}


exports.getMypointById = function (req, res) {
    var sqlRequest = `SELECT Moral_Activity.Moral_ID,Moral.Moral_Name,SUM(Participation_Activity.score) as score FROM Participation_Activity 
    LEFT JOIN Moral_Activity ON Moral_Activity.Act_ID = Participation_Activity.Act_ID  
    LEFT JOIN Moral ON Moral.Moral_ID = Moral_Activity.Moral_ID  
    WHERE Participation_Activity.Member_ID = $Member_ID GROUP BY Moral_Activity.Moral_ID `;
    let sqlParams = {
        $Member_ID:req.body.Member_ID,
    };
    let stmt = database.db.prepare(sqlRequest);
    stmt.all(sqlParams, function (err,rows) {
        
        if (err) {
            res.json({ status: false, data: "Internal server error"});
        } else if (rows == null || rows.length == 0) {
            res.json({ status: false, data: "Entity not found" });
        } else {
            res.json({ status: true, data: rows });
        }
    });
}


exports.getRanking = function (req, res) {

    var sqlRequest = `SELECT Faculty.Fac_ID,Faculty.Fac_Name,SUM(Participation_Activity.score) as score FROM Participation_Activity 
    LEFT JOIN Member ON Member.Member_ID = Participation_Activity.Member_ID  
    LEFT JOIN Department ON Department.Dept_ID = Member.Dept_ID  
    LEFT JOIN Faculty ON Faculty.Fac_ID = Department.Fac_ID  
    GROUP BY Faculty.Fac_ID `;
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