let sqlite3 = require('sqlite3').verbose();

const path = require('path');
const dbPath = path.resolve(__dirname, 'Mydb.db')

// const db = new sqlite3.Database(dbPath)
let db = new sqlite3.Database(dbPath,(err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.')

});


module.exports = {
    db: db
};