/*
app.js

Created On: 7/12/2020
Last Updated On: 8/13/2020
Description: Entry point for "The Apple Cart" web app, Store Inventory Management System
*/

/*
Dependencies
*/

const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const session = require('express-session');
const { json } = require('express');


/*
Create Express Server
*/

const app = express()

/*
Configure Express Server
*/

app.engine('hbs', exphbs(
    {
        defaultLayout: 'main',
        extname: '.hbs'
    }
))
app.set('view engine', 'hbs')


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

/*
Environment Configuration
*/

try {
    var config = require('./config.js')
    var DATABASE_CREDENTIALS = config.LOCAL_DATABASE_CREDENTIALS
    process.env.PORT = 8080
} catch(err) {
    var DATABASE_CREDENTIALS = process.env.CLEARDB_DATABASE_URL
}

/*
Database Setup and Configuration
*/

const connection = mysql.createPool(DATABASE_CREDENTIALS)

/*
Routing
*/


// Home Route
app.get('/', (req, res) => {

    context = {}
    const dropTableQuery = 'DROP TABLE IF EXISTS diagnostic'
    const makeTableQuery = 'CREATE TABLE diagnostic(id INT PRIMARY KEY, text VARCHAR(255) NOT NULL)'
    const insertQuery = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working")'
    const getAllQuery = 'SELECT * FROM diagnostic;'

    // }

    connection.query(dropTableQuery, function(err){
        if (err) {
            console.log("Error droping table")
        } else {
            connection.query(makeTableQuery, function(err){
                if (err) {
                    console.log("Error creating table")
                } else {
                    connection.query(insertQuery, function(err){
                        if (err) {
                            console.log("Error inserting")
                        } else {
                            connection.query(getAllQuery, function(err, rows, fields){
                                if (err) {
                                    console.log("Error with select query")
                                } else {
                                    context.results = JSON.stringify(rows)
                                    res.render('home', context)
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});

// Developers, Projects, Issues Routing

app.get('/developers', (req, res) => {

    // Query to clear db
    const developerQueryString = 'SELECT * FROM developers'

    // Requesting the data from the database
    connection.query(developerQueryString, function(error, results, fields){
        if (error) {
            console.log('Error loading developers: ' + error)
            res.send('Error loading developers: ' + error)
        } else {
            // console.log({results: results, developers: 1})
            res.render('developers', {results: results, developers: 1})
        }
    })
});

app.post('/developers/new_developer', function(req, res) {

    // Grab the necessary data from the POST request body
    const firstName = req.body.modal_add_first_name;
    const lastName = req.body.modal_add_last_name;
    const title = req.body.modal_add_title;
    const email = req.body.modal_add_email;

    // Change this to change the query going to the DB
    /* If adding duplicate item, nothing will change
       If adding inactive item, active will change from false to true
       else insert as normal.
       If we ever want to change this function to add and update, we 
       can just add more columns after update*/

    const developerInsertQueryString =
        "INSERT INTO developers (firstName, lastName, title, email) VALUES (?, ?, ?, ?)"
    
    const newDeveloperValues = [firstName, lastName, title, email]

    // Send the query, if it fails, log to console, if it succeeds, update the screen.
    connection.query(developerInsertQueryString, newDeveloperValues, function(error, results, fields){
        if (error) {
            console.log('Error adding developer to developers table: ' + error)
            res.send('Error adding developer to developers table: ' + error)
        } else {
        	console.log("No error")
            res.redirect('/developers')
        }
    });
})

app.delete('/developers/delete_developer', function(req, res) {

        // Grab the necessary data from the POST request body
        const devId = req.body.modal_update_id;

        // DB Query Strings
        const developerDeleteQueryString =
            "DELETE FROM developers WHERE developerID=?"

        const deleteDeveloperValue = [devId]

        // Send the query, if it fails, log to console, if it succeeds, update the screen.
        connection.query(developerDeleteQueryString, deleteDeveloperValue, function(error, results, fields){
        if (error) {
            console.log('Error deleting developer to developers table: ' + error);
            res.send('Error deleting developer to developers table: ' + error);
        } else {
            console.log("No error");
            res.redirect(303, '/developers');
        }
    });


})



app.get('/projects', (req, res) => {
    res.render('projects')
});

app.get('/issues', (req, res) => {
    res.render('issues')
});

app.get('/statuses', (req, res) => {
    res.render('statuses')
});

app.get('/priorities', (req, res) => {
    res.render('priorities')
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


/*
Listener
*/

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));

