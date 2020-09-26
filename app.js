/*
app.js

Created On: 7/12/2020
Last Updated On: 8/13/2020
Description: Entry point for "The Apple Cart" web app, Store Inventory Management System
*/

/*
Dependencies
*/

const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')
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
    res.render('home');
});


// app.get('/', function(req, res) {

//     if (req.session.loggedin) {
//         // Simple query to make sure the database is connected.
//         let data = 'ClearDB Connected.'
        
//         //Total items in catalog
//         connection.query('SELECT COUNT(*) as numItems, COUNT(DISTINCT type) AS numTypes FROM products WHERE active is True', function(error, results, fields){
//             if (error) {
//                 data = 'ClearDB is down!'
//                 console.log(error)
//                 res.render('home', {data: data})
//             } else {
//                 numItems = results[0].numItems;
//                 numTypes = results[0].numTypes;   
//                 res.render('home', {data: data, numItems:numItems, numTypes:numTypes, dashboard: 1})
//             }
//         })

          

//     } else {
//         res.redirect('/login')
//         // res.send('Please login to view this page!');
//     }
// })


/*
Listener
*/

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));

