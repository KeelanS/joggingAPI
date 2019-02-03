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

// API GET METHODS

api.get('/races', (req, res) => {
   connection.query('SELECT * FROM race', (error, results) => {
       if (error) return res.json({error: error});

       res.json(results);
   })
});

api.get('/races/:id', (req, res) => {
    connection.query('SELECT * FROM runner WHERE race_id = ?', [req.params.id], (error, results) => {
        if (error) return res.json({error: error});

        res.json({results});
    })
})

api.post('/races/add', (req, res) => {
    console.log(req.body);

    //TODO
 });