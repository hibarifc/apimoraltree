
var database = require('../config')

exports.getMoral_Activity = function (req, res) {
    var sqlRequest = "SELECT * FROM Moral_Activity LEFT JOIN Activity ON Activity.Act_ID = Moral_Activity.Act_ID LEFT JOIN Moral ON Moral.Moral_ID = Moral_Activity.Moral_ID";
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

exports.createMoral_Activity = function (req, res) {
    var sqlRequest = "SELECT count(*)as count FROM Activity";
    var Activityid ;
    database.db.all(sqlRequest, function (err, rows) {
        Activityid = "A"+(rows[0].count+1)
       
        var sqlRequest = "INSERT into Activity (Act_ID, Act_Name) VALUES ($Act_ID, $Act_Name)";
        let sqlParams = {
            $Act_ID: Activityid,
            $Act_Name: req.body.Act_Name
        };
        let stmt = database.db.prepare(sqlRequest);
        stmt.run(sqlParams, function (err) {

            var sqlRequest = "SELECT count(*)as count FROM Moral_Activity";
            var Moral_Activity_ID ;
            database.db.all(sqlRequest, function (err, rows) {
                Moral_Activity_ID = "Ma"+(rows[0].count+1)
            
                let sqlRequest = "INSERT into Moral_Activity (Ma_ID, Moral_ID, Act_ID) VALUES ($Ma_ID, $Moral_ID, $Act_ID)";
                let sqlParams = {
                    $Ma_ID: Moral_Activity_ID,
                    $Moral_ID: req.body.Moral_ID,
                    $Act_ID: Activityid
                };
                let stmt = database.db.prepare(sqlRequest);
                stmt.run(sqlParams, function (err) {
                    if (err) {
                        res.json({ status: false, data: "Internal server error" });
                    } else  {
                        res.json({ status: true, data:Activityid});
                    } 
                });
            })
        });
    })

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
    let stmt = database.db.prepare(sqlRequest);
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
    let stmt = database.db.prepare(sqlRequest);
    stmt.run(sqlParams, function (err) {
        if (err) {
            res.json({ status: false, data: "Internal server error" });
        } else  {
            res.json({ status: true});
        } 
    });
}