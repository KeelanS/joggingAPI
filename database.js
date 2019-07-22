var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "joggingDb.db"

//als joggingDb al bestaat zal hij dat db bestand openenen, anders maakt hij het zelf aan
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    }
    else {
        db.run(`CREATE TABLE race(
            raceId integer primary key autoincrement,
            raceName text not null);
            
            CREATE TABLE runner(
            startNumber integer not null,
            name text not null,
            gender text not null,
            finish text default null,
            race_id integer not null,
            ranking integer default null,
            primary key (startNumber, race_id),
            constraint fk_column foreign key (race_id) references race (raceId) on delete cascade);
            `, (err) => {
                if (err) {
                    //tabellen al gemaakt, aka de database bestaat al
                    console.log("Connected to existing database")
                } else {
                    //tabellen moeten nog gemaakt worden, aka de database is nieuw
                    console.log("Connected to new database")
                }
            }
        );
        //om er voor te zorgen dat de foreign keys verbonden zijn en dat cascaden werkt
        db.run(`PRAGMA foreign_keys=ON`, (err) => {
            if (err) console.log(err.message);
        })

    };
});

module.exports = db;