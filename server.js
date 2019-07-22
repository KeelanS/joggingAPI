var express = require("express")
var api = express()
var db = require("./database.js")
var cors = require('cors');
var bodyParser = require('body-parser');

//API SETUP

api.use(cors());
api.use(bodyParser.json());

var HTTP_PORT = 3000
api.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
})

//RACES

// Gives back all races without their runners
api.get("/races", (req, res, next) => {
    var sql = "select * from race";
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return
        }

        res.json(rows)
    })
})

/** Insert a race into the database
 *  Only gets a string 'name'
*/
api.post('/races', (req, res) => {
    //toevoegen race met naam
    var sql = `INSERT into race (raceName) values ('${req.body.name}')`;
    var params = []
    db.run(sql, (err) => {
        if (err) {
            res.json({error: err});
        }
    })

    //ophalen automatisch gegenereerd raceId van net toegevoegde race
    var laatsteSql = 'select * from race where raceId = (select max(raceId) from race)';
    db.get(laatsteSql, params, (err, row) => {
        if (err) {
            res.json({error: err});
        }

        res.json(row)
    })
 });

  // Gives back the runners of a race given his id
api.get('/races/:id', (req, res) => {
    var sql = `SELECT * FROM runner WHERE race_id = ${req.params.id}`;
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.json({error: err});
        }

        res.json(rows);
    })
});

// Delete a race given his id
api.delete('/races/:id', (req, res) => {
    var sql = `DELETE FROM race WHERE raceId = ${req.params.id}`;
    var params = [];
    db.run(sql, (err) => {
        if (err) return res.json({error: err})

        res.json({message: `Race met id = ${req.params.id} verwijderd`});
    })
})

//Runners

/** Add a runner to the database with the correct values
 *  Every runner has a finish time of null when added to the database
 */ 
api.post('/runners', (req, res) => {
    var sql = `insert into runner (startNumber, name, gender, race_id) values (
        '${req.body.startNumber}', 
        '${req.body.name}', 
        '${req.body.gender}', 
        '${req.body.race_id}')`;
    var params = [];
    db.run(sql, (err) => {
        if (err) return res.json({error: err})

        return res.json({
            startNumber: req.body.startNumber,
            name: req.body.name,
            gender: req.body.gender,
            finish: null,
            race_id: req.body.race_id,
            ranking: null
        })
    })
})

// Deletes a runner on given runner object
api.delete('/runners/:number/:race', (req, res) => {
    var getSQL = `SELECT * from runner WHERE startNumber = ${req.params.number} and race_id= ${req.params.race}`;
    var deleteSQL = `DELETE FROM runner WHERE startNumber = ${req.params.number} and race_id= ${req.params.race}`;
    var params = [];

    let runner;
    db.get(getSQL, params, (err, row) => {
        if (err) return res.json({error: err})
        
        runner = row;
    })

    db.run(deleteSQL, params, (err) => {
        if (err) return res.json({error: err})

        res.json(runner);
    })    
})

// Updates a runners name, gender finish and ranking on give runner object
api.put('/runners/:id', (req, res) => {
    var sql = `UPDATE runner SET name= '${req.body.name}', 
        gender='${req.body.gender}'  
        WHERE startNumber='${req.body.startNumber}' AND race_id='${req.body.race_id}'`;
    var params = [];

    db.run(sql, params, (err) => {
        if (err) return res.json({error: err.message});

        res.json({
            startNumber: req.body.startNumber,
            name: req.body.name,
            gender: req.body.gender,
            finish: req.body.finish,
            race_id: req.body.race_id,
            ranking: req.body.ranking
        })
    })
})

// updates a list of runners finish and ranking
api.put('/runners', (req, res) => {
    var sql = "";
    for (let i = 0; i < req.body.length; i++) {
        let runner = req.body[i];
        sql = `UPDATE runner SET finish=${runner.finish}, ranking=${runner.ranking} WHERE startNumber=${runner.startNumber} AND race_id=${runner.race_id}`;
        db.run(sql, (err) => {
            if (err) return res.json({error: err});

        });
    }
    setTimeout(function() {
        sql = `SELECT * FROM runner WHERE race_id = ${req.body[0].race_id}`;
        db.all(sql, (err, rows) => {
            if (err) return res.json({error: err});
            return res.json(rows);
        })
    }, 50);
        
})

//When request doesn't exist return 404

api.use(function(req, res) {
    res.status(404);
})