const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

//DATABASE

/**
 * Connection to the database running on localhost
 * Database script can be found in data.sql
 */
const connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'root',
    database: 'joggingdb'
});

/**
 * connecting to the local mysql database
 */
try {
    connection.connect();
} catch (e) {
    console.log('Kon niet connecten met databank!')
    console.log(e);
}

//API SETUP

/**
 * this sets the api up on port 3000
 */

const api = express();
api.use(cors())
api.use(bodyParser.json());

api.listen(3000, () => {
    console.log('API up and running on port 3000!');
});

// RACES

api.get('/races', (req, res) => {
   connection.query('SELECT * FROM race', (error, results) => {
       if (error) return res.json({error: error});

       res.json(results);
   })
});

api.post('/races', (req, res) => {
    connection.query('INSERT INTO race (raceName) VALUES (?)', [req.body.name], (error, results) => {
        if (error) return res.json({error: error});

        //Finds out what id the database gave the new race and returns that race
        connection.query('SELECT LAST_INSERT_ID() FROM race LIMIT 1', (error, results) => {
            if (error) return res.json({error: error});

            return res.json({
                raceName: req.body.name,
                raceId: results[0]['LAST_INSERT_ID()'],
            });
        })
    })
 });

// RUNNERS
api.get('/runners/:id', (req, res) => {
    connection.query('SELECT * FROM runner WHERE race_id = ?', [req.params.id], (error, results) => {
        if (error) return res.json({error: error});

        res.json(results);
    })
});

api.post('/runners', (req, res) => {
    connection.query('INSERT INTO runner (startNumber, name, gender, race_id) VALUES (?, ?, ?, ?)', 
        [req.body.startNumber, req.body.name, req.body.gender, req.body.race_id],
        (error, results) => {
            if (error) return res.json({error: error});

            return res.json({
                startNumber: req.body.startNumber,
                name: req.body.name,
                gender: req.body.gender,
                finish: null,
                race_id: req.body.race_id
            })
        })
})