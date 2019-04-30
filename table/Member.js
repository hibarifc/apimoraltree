
var database = require('../config')

exports.getMember = function (req, res) {
    var sqlRequest = "SELECT * FROM Member";
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

exports.createMember = function (req, res) {

    var sqlRequest = "SELECT count(*)as count FROM Member";
    var memberid ;
    database.db.all(sqlRequest, function (err, rows) {
        if (rows[0].count+1<10) {
            memberid = "M000"+(rows[0].count+1)
        }else if(rows[0].count+1>=10&&rows[0].count<100){
            memberid = "M00"+(rows[0].count+1)
        }else if(rows[0].count+1>=100&&rows[0].count<1000){
            memberid = "M0"+(rows[0].count+1)
        }else if(rows[0].count+1>=1000&&rows[0].count<10000){
            memberid = "M"+(rows[0].count+1)
        }
        var sqlRequest = "INSERT into Member (Member_ID, Member_Name, Member_Status, username,password,Dept_ID) VALUES ($Member_ID,$Member_Name,$Member_Status,$username,$password,$Dept_ID)";
        let sqlParams = {
            $Member_ID: memberid,
            $Member_Name: req.body.Member_Name,
            $Member_Status: req.body.Member_Status,
            $username: req.body.username,
            $password: req.body.password,
            $Dept_ID: req.body.Dept_ID,
        };
        let stmt = database.db.prepare(sqlRequest);
        stmt.run(sqlParams, function (err) {
            if (err) {
                res.json({ status: false, data: err });
            } else  {
                res.json({ status: true});
            } 
        });
    })

   
}

exports.updateMemberById = function (req, res) {
    let sqlRequest = "UPDATE Member SET Member_Name = $Member_Name, Member_Status=$Member_Status, Dept_ID=$Dept_ID WHERE Member_ID = $Member_ID;";
    let sqlParams = {
        $Member_ID: req.body.Member_ID,
        $Member_Name: req.body.Member_Name,
        $Member_Status: req.body.Member_Status,
        $Dept_ID: req.body.Dept_ID,
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

exports.deleteMemberById = function (req, res) {
    let sqlRequest = "DELETE FROM Member WHERE id=$id;";
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



exports.login = function (req, res) {
    let sqlRequest = "SELECT Member_ID, Member_Name, Member_Status,Dept_ID FROM Member WHERE username = $username AND password = $password";
    let sqlParams = {
        $username: req.body.username,
        $password: req.body.password,
    };
    let stmt = database.db.prepare(sqlRequest);
    stmt.run(sqlParams, function (err, rows) {
        if (err) {
            res.json({ status: false, data: "Internal server error"});
        } else if (rows === null || rows.length === 0) {
            res.json({ status: false, data: "Entity not found" });
        } else {
            res.json({ status: true, data: rows });
        }
    });
}


exports.getMemberById = function (req, res) {
    let sqlRequest = `SELECT Member.Member_ID, Member.Member_Name, Member.Member_Status,Member.Dept_ID,Department.*,Faculty.* FROM Member 
    LEFT JOIN Department ON Department.Dept_ID = Member.Dept_ID 
    LEFT JOIN Faculty ON Faculty.Fac_ID = Department.Fac_ID
    WHERE Member.Member_ID=$Member_ID;`;
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