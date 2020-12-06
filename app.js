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



// ***
// issues Routes
// ***

// issues GET Request
app.get('/issues', (req, res) => {
    // We are running multiple statements here. 
    // Ensure "multipleStatements: true" is added to config.js
    var issuesQueryString = 
        // Query populates the table avoiding duplications
        `SELECT issues.issueID, issues.name, issues.description, 
        issues.projectID, projects.name AS projectName,
        issues.statusID, statuses.statusType, 
        issues.priorityID, priorities.priorityType,
        DATE_FORMAT(issues.dateRaised,'%m-%d-%Y') as dateRaised, 
        DATE_FORMAT(issues.dateClosed,'%m-%d-%Y') as dateClosed FROM issues 
        LEFT JOIN projects ON issues.projectID = projects.projectID
        LEFT JOIN statuses ON issues.statusID = statuses.statusID
        LEFT JOIN priorities ON issues.priorityID = priorities.priorityID;`

    issuesQueryString += 
        // Queries values from new table for selection even if not selected before
        `SELECT projects.projectID, projects.name FROM projects
        ORDER BY projects.projectID ASC;`

    issuesQueryString += 
        // Queries values from new table for selection even if not selected before 
        `SELECT statuses.statusID, statuses.statusType FROM statuses
        ORDER BY statuses.statusID ASC;`

    issuesQueryString += 
        // Queries values from new table for selection even if not selected before
        `SELECT priorities.priorityID, priorities.priorityType FROM priorities
        ORDER BY priorities.priorityID ASC;`

    issuesQueryString +=
        // Queries values from cross join table
        `SELECT issue_assignments.issueID, developers.firstName, 
        developers.lastName from issues, issue_assignments, developers
        WHERE issue_assignments.issueID = issues.issueID AND 
        issue_assignments.developerID = developers.developerID 
        ORDER BY issue_assignments.issueID ASC;`


    // Requesting the data from the database
    connection.query(issuesQueryString, function(error, results, fields){
        if (error) {
            console.log('Error loading issues: ' + error)
            res.send('Error loading issues: ' + error)
        } else {
            // console.log({issues: results[0]})
            //access multiple statements as an array.
            res.render('issues', {
                        issues: results[0], 
                        projects: results[1],
                        statuses: results[2],
                        priorities: results[3],
                        issue_assignments: results[4] 
                        })
        }
    })
});

//  issues INSERT Request
app.post('/issues/new_issue', function(req, res) {

    // Grab the necessary data from the POST request body.
    const name = req.body.modal_add_issue_name;
    const description = req.body.modal_add_issue_description;
    const project = req.body.modal_add_issue_project;
    const priority = req.body.modal_add_issue_priority;
    const status = req.body.modal_add_issue_status;
    const dateRaised = req.body.modal_add_issue_date_raised;
    const dateClosed = req.body.modal_add_issue_date_closed;

    // DB Query String. Designed with array below to prevent SQL injection.
    const issuesInsertQueryString =
        `INSERT INTO issues (name, description, projectID, priorityID, statusID, dateRaised, dateClosed)
        VALUES (?, ?, ?, ?, ?, ?, ?)`
    
    const newIssueValues = [name, description, project, priority, status, dateRaised, dateClosed]

    // Send the query, if it fails, log to console, if it succeeds, update the screen.
    connection.query(issuesInsertQueryString, newIssueValues, function(error){
        if (error) {
            console.log('Error adding issue to issues table: ' + error)
            res.send('Error adding issue to issues table: ' + error)
        } else {
            res.redirect('/issues')
        }
    });
});

// issues UPDATE Request
app.post('/issues/update_issue', function(req, res) {

    // Grab the necessary data from the POST request body.
    const issueID = req.body.modal_update_issueID;
    const name = req.body.modal_update_issue_name;
    const description = req.body.modal_update_issue_description;
    const projectID = req.body.modal_update_issue_project;
    const statusID = req.body.modal_update_issue_status;
    const priorityID = req.body.modal_update_issue_priority;
    const dateRaised = req.body.modal_update_issue_date_raised;
    const dateClosed = req.body.modal_update_issue_date_closed;

    // DB Query String. Designed with array below to prevent SQL injection.
    const issuesUpdateQueryString =
        `UPDATE issues SET name = ?, description = ?, projectID = ?,
        statusID = ?, priorityID = ?, dateRaised = ?, dateClosed = ? WHERE issueID = ?`
    
    const newIssueValues = 
    [name, description, projectID, statusID, priorityID, dateRaised, dateClosed, issueID]

    // Send the query, if it fails, log to console, if it succeeds, update the screen.
    connection.query(issuesUpdateQueryString, newIssueValues, function(error, results, fields){
        if (error) {
            console.log('Error updating issue on issues table: ' + error)
            res.send('Error updating issue on issues table: ' + error)
        } else {
            res.redirect('/issues')
        }
    });
})

// issues DELETE Request
app.delete('/issues/delete_issue', function(req, res) {

        // Grab the necessary data from the POST request body
        const issueID = req.body.issueID;

        // DB Query String. Designed with array below to prevent SQL injection.
        const issuesDeleteQueryString =
            `DELETE FROM issues WHERE issueID = ?`

        const deleteIssueValue = [issueID]

        // Send the query, if it fails, log to console, if it succeeds, update the screen.
        connection.query(issuesDeleteQueryString, deleteIssueValue, function(error, results, fields){
        if (error) {
            console.log('Error deleting issue from issues table: ' + error);
            res.send('Error deleting issue from issues table: ' + error);
        } else {
            res.redirect(303, '/issues');
        }
    });
})



// ***
// issue_assignments Routes
// ***

// issue_assignments GET Request
app.get('/issue_assignments', (req, res) => {
    // We are running multiple statements here. 
    // Ensure "multipleStatements: true" is added to config.js
    var issue_assignmentsQueryString =
        // Query populates the table avoiding duplications 
        `SELECT issue_assignments.issueID, issues.name,
        issue_assignments.developerID, developers.firstName FROM issue_assignments
        LEFT JOIN issues ON issue_assignments.issueID = issues.issueID
        LEFT JOIN developers ON issue_assignments.developerID = developers.developerID
        ORDER BY issue_assignments.issueID ASC;`

        issue_assignmentsQueryString += 
        // Queries values from new table for selection even if not selected before
        `SELECT issues.issueID, issues.name FROM issues
        ORDER BY issues.issueID ASC;`

        issue_assignmentsQueryString += 
        // Queries values from new table for selection even if not selected before
        `SELECT developers.developerID, developers.firstName FROM developers
        ORDER BY developers.developerID ASC;`

    // Requesting the data from the database
    connection.query(issue_assignmentsQueryString, function(error, results, fields){
        if (error) {
            console.log('Error loading issue_assignments table: ' + error)
            res.send('Error loading issue_assignments table: ' + error)
        } else {
            // console.log({issues: results[0]})
            //access multiple statements as an array.
            res.render('issue_assignments', {
                        issue_assignments: results[0],
                        issues: results[1],
                        developers: results[2]
                        })
        }
    })
});

//  issue_assignmnets INSERT Request
app.post('/issue_assignments/new_issue_assignment', function(req, res) {

    // Grab the necessary data from the POST request body.
    const issueID = req.body.modal_add_issue_assignment_issueID;
    const developerID = req.body.modal_add_issue_assignment_developerID;

    // DB Query String. Designed with array below to prevent SQL injection.
    const issue_assignmentsInsertQueryString =
        `INSERT INTO issue_assignments (issueID, developerID)
        VALUES (?, ?)`
    
    const newIssue_assignmentsValues = [issueID, developerID]

    // Send the query, if it fails, log to console, if it succeeds, update the screen.
    connection.query(issue_assignmentsInsertQueryString, newIssue_assignmentsValues, function(error){
        if (error) {
            console.log('Error adding issue assignment to issue_assignments table: ' + error)
            res.send('Error adding issue assignment to issue_assignments table: ' + error)
        } else {
            res.redirect('/issue_assignments')
        }
    });
});

// issue_assignmnets DELETE Request
app.delete('/issue_assignments/delete_issue_assignment', function(req, res) {

        // Grab the necessary data from the POST request body
        const issueID = req.body.issueID;
        const developerID = req.body.developerID;


        // DB Query String. Designed with array below to prevent SQL injection.
        const issueAssignmnetsDeleteQueryString =
            `DELETE FROM issue_assignments WHERE issueID = ? AND developerID = ?`

        const deleteIssueAssignmnetsValue = [issueID, developerID]

        // Send the query, if it fails, log to console, if it succeeds, update the screen.
        connection.query(issueAssignmnetsDeleteQueryString, deleteIssueAssignmnetsValue, function(error, results, fields){
        if (error) {
            console.log('Error deleting issue assignment from issue_assignments table: ' + error);
            res.send('Error deleting issue assignment from issue_assignments table: ' + error);
        } else {
            res.redirect(303, '/issue_assignments');
        }
    });
})



// ***
// Project Routes
// ***

// GET Project Request
app.get('/projects', (req, res) => {
    // DB Query String.
    var projectsQueryString = 
        // Query populates the table avoiding duplications
       `SELECT projects.projectID, projects.name, projects.description, 
       projects.statusID, statuses.statusType, projects.priorityID,
       priorities.priorityType, DATE_FORMAT(startDate,'%m-%d-%Y') AS startDate, 
       DATE_FORMAT(endDate,'%m-%d-%Y') AS endDate FROM projects
       LEFT JOIN statuses ON projects.statusID = statuses.statusID
       LEFT JOIN priorities ON projects.priorityID = priorities.priorityID
       ORDER BY projectID ASC;`

    projectsQueryString += 
        // Queries values from new table for selection even if not selected before 
        `SELECT statuses.statusID, statuses.statusType FROM statuses
        ORDER BY statuses.statusID ASC;`

    projectsQueryString += 
        // Queries values from new table for selection even if not selected before
        `SELECT priorities.priorityID, priorities.priorityType FROM priorities
        ORDER BY priorities.priorityID ASC;`

    projectsQueryString +=
        // Queries values from cross join table
        `SELECT project_assignments.projectID, developers.firstName, 
        developers.lastName from projects, project_assignments, developers
        WHERE project_assignments.projectID = projects.projectID AND 
        project_assignments.developerID = developers.developerID 
        ORDER BY project_assignments.projectID ASC;`


    // Requesting the data from the database
    connection.query(projectsQueryString, function(error, results, fields){
        if (error) {
            console.log('Error loading developers: ' + error)
            res.send('Error loading developers: ' + error)
        } else {
            // console.log({results: results[0]})
            res.render('projects', {
                projects: results[0],
                statuses: results[1],
                priorities: results[2],
                issue_assignments: results[3] 
                })
        }
    })
});

// INSERT Project Request
app.post('/projects/new_project', function(req, res) {

    // Grab the necessary data from the POST request body.
    const name = req.body.modal_add_project_name;
    const description = req.body.modal_add_project_description;
    const priority = req.body.modal_add_project_priority;
    const status = req.body.modal_add_project_status;
    const startDate = req.body.modal_add_project_start_date;
    const endDate = req.body.modal_add_project_end_date;

    // DB Query String. Designed with array below to prevent SQL injection.
    const projectsInsertQueryString =
        `INSERT INTO projects (name, description, priorityID, statusID, startDate, endDate)
        VALUES (?, ?, ?, ?, ?, ?)`
    
    const newProjectValues = [name, description, priority, status, startDate, endDate]

    // Send the query, if it fails, log to console, if it succeeds, update the screen.
    connection.query(projectsInsertQueryString, newProjectValues, function(error){
        if (error) {
            console.log('Error adding issue to issues table: ' + error)
            res.send('Error adding issue to issues table: ' + error)
        } else {
            res.redirect('/projects')
        }
    });
});

// UPDATE Project Request
app.post('/projects/update_project', function(req, res) {

    // Grab the necessary data from the POST request body.
    const projectID = req.body.modal_update_projectID;
    const name = req.body.modal_update_project_name;
    const description = req.body.modal_update_project_description;
    const statusID = req.body.modal_update_project_status;
    const priorityID = req.body.modal_update_project_priority;
    const startDate = req.body.modal_update_project_start_date;
    const endDate = req.body.modal_update_project_end_date;

    // DB Query String. Designed with array below to prevent SQL injection.
    const projectsUpdateQueryString =
        `UPDATE projects SET name = ?, description = ?, 
        statusID = ?, priorityID = ?, startDate = ?, endDate = ? WHERE projectID = ?`
    
    const newProjectValues = 
    [name, description, statusID, priorityID, startDate, endDate, projectID]

    // Send the query, if it fails, log to console, if it succeeds, update the screen.
    connection.query(projectsUpdateQueryString, newProjectValues, function(error, results, fields){
        if (error) {
            console.log('Error updating project on projects table: ' + error)
            res.send('Error updating project on projects table: ' + error)
        } else {
            res.redirect('/projects')
        }
    });
})

// DELETE Project Request
app.delete('/projects/delete_project', function(req, res) {

        // Grab the necessary data from the POST request body
        const projectID = req.body.projectID;

        // DB Query String. Designed with array below to prevent SQL injection.
        const projectsDeleteQueryString =
            `DELETE FROM projects WHERE projectID = ?`

        const deleteProjectValue = [projectID]

        // Send the query, if it fails, log to console, if it succeeds, update the screen.
        connection.query(projectsDeleteQueryString, deleteProjectValue, function(error, results, fields){
        if (error) {
            console.log('Error deleting project from projects table: ' + error);
            res.send('Error deleting project from projects table: ' + error);
        } else {
            res.redirect(303, '/projects');
        }
    });
})



// ***
// project_assignments Routes
// ***

// project_assignments GET Request
app.get('/project_assignments', (req, res) => {
    // We are running multiple statements here. 
    // Ensure "multipleStatements: true" is added to config.js
    var project_assignmentsQueryString =
        // Query populates the table avoiding duplications 
        `SELECT project_assignments.projectID, projects.name,
        project_assignments.developerID, developers.firstName
        FROM project_assignments
        LEFT JOIN projects ON project_assignments.projectID = projects.projectID
        LEFT JOIN developers ON project_assignments.developerID = developers.developerID
        ORDER BY project_assignments.projectID ASC;`

        project_assignmentsQueryString += 
        // Queries values from new table for selection even if not selected before
        `SELECT projects.projectID, projects.name FROM projects
        ORDER BY projects.projectID ASC;`

        project_assignmentsQueryString += 
        // Queries values from new table for selection even if not selected before
        `SELECT developers.developerID, developers.firstName FROM developers
        ORDER BY developers.developerID ASC;`

    // Requesting the data from the database
    connection.query(project_assignmentsQueryString, function(error, results, fields){
        if (error) {
            console.log('Error loading project_assignments table: ' + error)
            res.send('Error loading project_assignments table: ' + error)
        } else {
            // console.log({project_assignments: results})
            //access multiple statements as an array.
            res.render('project_assignments', {
                        project_assignments: results[0],
                        projects: results[1],
                        developers: results[2] 
                        })
        }
    })
});

//  project_assignments INSERT Request
app.post('/project_assignments/new_project_assignment', function(req, res) {

    // Grab the necessary data from the POST request body.
    const projectID = req.body.modal_add_project_assignment_projectID;
    const developerID = req.body.modal_add_project_assignment_developerID;

    // DB Query String. Designed with array below to prevent SQL injection.
    const project_assignmentsInsertQueryString =
        `INSERT INTO project_assignments (projectID, developerID)
        VALUES (?, ?)`
    
    const newProject_assignmentsValues = [projectID, developerID]

    // Send the query, if it fails, log to console, if it succeeds, update the screen.
    connection.query(project_assignmentsInsertQueryString, newProject_assignmentsValues, function(error){
        if (error) {
            console.log('Error adding project assignment to project_assignments table: ' + error)
            res.send('Error adding project assignment to project_assignments table: ' + error)
        } else {
            res.redirect('/project_assignments')
        }
    });
});

// project_assignmnets DELETE Request
app.delete('/project_assignments/delete_project_assignment', function(req, res) {

        // Grab the necessary data from the POST request body
        const projectID = req.body.projectID;
        const developerID = req.body.developerID;


        // DB Query String. Designed with array below to prevent SQL injection.
        const projectAssignmnetsDeleteQueryString =
            `DELETE FROM project_assignments WHERE projectID = ? AND developerID = ?`

        const deleteProjectAssignmnetsValue = [projectID, developerID]

        // Send the query, if it fails, log to console, if it succeeds, update the screen.
        connection.query(projectAssignmnetsDeleteQueryString, deleteProjectAssignmnetsValue, function(error, results, fields){
        if (error) {
            console.log('Error deleting project assignment from project_assignments table: ' + error);
            res.send('Error deleting project assignment from project_assignments table: ' + error);
        } else {
            res.redirect(303, '/project_assignments');
        }
    });
})



// ***
// Developer Routes
// ***

// GET Developer Request
app.get('/developers', (req, res) => {

    // DB Query String.
    const developersQueryString = 
        `SELECT * FROM developers ORDER BY developerID ASC`

    // Requesting the data from the database
    connection.query(developersQueryString, function(error, results, fields){
        if (error) {
            console.log('Error loading developers: ' + error)
            res.send('Error loading developers: ' + error)
        } else {
            // console.log({results: results, developers: 1})
            res.render('developers', {results: results, developers: 1})
        }
    })
});

// INSERT Developer Request
app.post('/developers/new_developer', function(req, res) {

    // Grab the necessary data from the POST request body.
    const firstName = req.body.modal_add_first_name;
    const lastName = req.body.modal_add_last_name;
    const title = req.body.modal_add_title;
    const email = req.body.modal_add_email;

    // DB Query String. Designed with array below to prevent SQL injection.
    const developersInsertQueryString =
        `INSERT INTO developers (firstName, lastName, title, email) 
        VALUES (?, ?, ?, ?)`
    
    const newDeveloperValues = [firstName, lastName, title, email]

    // Send the query, if it fails, log to console, if it succeeds, update the screen.
    connection.query(developersInsertQueryString, newDeveloperValues, function(error, results, fields){
        if (error) {
            console.log('Error adding developer to developers table: ' + error)
            res.send('Error adding developer to developers table: ' + error)
        } else {
            res.redirect('/developers')
        }
    });
});

// UPDATE Developer Request
app.post('/developers/update_developer', function(req, res) {

    // Grab the necessary data from the POST request body.
    const developerID = req.body.modal_update_developerID;
    const firstName = req.body.modal_update_first_name;
    const lastName = req.body.modal_update_last_name;
    const title = req.body.modal_update_title;
    const email = req.body.modal_update_email;

    // DB Query String. Designed with array below to prevent SQL injection.
    const developersUpdateQueryString =
        `UPDATE developers SET firstName = ?, lastName = ?, 
        title = ?, email = ? WHERE developerID = ?`
    
    const newDeveloperValues = [firstName, lastName, title, email, developerID]

    // Send the query, if it fails, log to console, if it succeeds, update the screen.
    connection.query(developersUpdateQueryString, newDeveloperValues, function(error, results, fields){
        if (error) {
            console.log('Error updating developer on developers table: ' + error)
            res.send('Error updating developer on developers table: ' + error)
        } else {
            res.redirect('/developers')
        }
    });
})

// DELETE Developer Request
app.delete('/developers/delete_developer', function(req, res) {

        // Grab the necessary data from the POST request body
        const developerID = req.body.developerID;

        // DB Query String. Designed with array below to prevent SQL injection.
        const developersDeleteQueryString =
            `DELETE FROM developers WHERE developerID = ?`

        const deleteDeveloperValue = [developerID]

        // Send the query, if it fails, log to console, if it succeeds, update the screen.
        connection.query(developersDeleteQueryString, deleteDeveloperValue, function(error, results, fields){
        if (error) {
            console.log('Error deleting developer from developers table: ' + error);
            res.send('Error deleting developer from developers table: ' + error);
        } else {
            res.redirect(303, '/developers');
        }
    });
})



// ***
// Statuses Routes
// ***

// GET Statuses Request
app.get('/statuses', (req, res) => {

    const statusesQueryString = 
    	`SELECT * FROM statuses ORDER BY statusID ASC`

    // Requesting the data from the database
    connection.query(statusesQueryString, function(error, results, fields){
        if (error) {
            console.log('Error loading developers: ' + error)
            res.send('Error loading developers: ' + error)
        } else {
            // console.log({results: results, projects: 1})
            res.render('statuses', {results: results, statuses: 1})
        }
    })
});

// INSERT Status Request
app.post('/statuses/add_status', (req, res) => {
    // Grab the necessary data from the POST request body
    console.log(req.body)
    const statusType = req.body.modal_add_status_type;


    // DB Query String
    const statusAddQueryString =
        "INSERT INTO statuses (statusType) VALUES (?)"
    
    const addStatusValues = [statusType]

    // Send the query, if it fails, log to console, if it succeeds, update the screen.
    connection.query(statusAddQueryString, addStatusValues, function(error){
        if (error) {
            console.log('Error adding status to statuses table: ' + error)
            res.send('Error adding status to statuses table: ' + error)
        } else {
            console.log("No error")
            res.redirect('/statuses')
        }
    });
});

// UPDATE Status Request
app.post('/statuses/update_status', function(req, res) {

    // Grab the necessary data from the POST request body.
    const statusID = req.body.modal_update_statusID;
    const statusType = req.body.modal_update_status_type;

    // DB Query String. Designed with array below to prevent SQL injection.
    const statusesUpdateQueryString =
        `UPDATE statuses SET statusType = ? WHERE statusID = ?`
    
    const newStatusValues = 
    [statusType, statusID]

    // Send the query, if it fails, log to console, if it succeeds, update the screen.
    connection.query(statusesUpdateQueryString, newStatusValues, function(error, results, fields){
        if (error) {
            console.log('Error updating status on statuses table: ' + error)
            res.send('Error updating status on statuses table: ' + error)
        } else {
            res.redirect('/statuses')
        }
    });
})

// DELETE Status Request
app.delete('/statuses/delete_status', function(req, res) {

        // Grab the necessary data from the POST request body
        const statusID = req.body.statusID;

        // DB Query String. Designed with array below to prevent SQL injection.
        const statusesDeleteQueryString =
            `DELETE FROM statuses WHERE statusID = ?`

        const deleteStatusValue = [statusID]

        // Send the query, if it fails, log to console, if it succeeds, update the screen.
        connection.query(statusesDeleteQueryString, deleteStatusValue, function(error, results, fields){
        if (error) {
            console.log('Error deleting status from statuses table: ' + error);
            res.send('Error deleting status from statuses table: ' + error);
        } else {
            res.redirect(303, '/statuses');
        }
    });
})

// ***
// Priorities Routes
// ***

// GET Priorities Request
app.get('/priorities', (req, res) => {
    const prioritiesQueryString = 
    	`SELECT * FROM priorities ORDER BY priorityID ASC`

    // Requesting the data from the database
    connection.query(prioritiesQueryString, function(error, results){
        if (error) {
            console.log('Error loading priorities table: ' + error)
            res.send('Error loading priorities table: ' + error)
        } else {
            // console.log({results: results, projects: 1})
            res.render('priorities', {results: results, priorities: 1})
        }
    })
});

// INSERT Priority Request
app.post('/priorities/add_priority', (req, res) => {
    // Grab the necessary data from the POST request body
    const priorityType = req.body.modal_add_priority_type;
    console.log(`inserting ${priorityType}`)

    // DB Query String
    const priorityAddQueryString =
        "INSERT INTO priorities (priorityType) VALUES (?)"
    
    const addPriorityValues = [priorityType]

    // Send the query, if it fails, log to console, if it succeeds, update the screen.
    connection.query(priorityAddQueryString, addPriorityValues, function(error){
        if (error) {
            console.log('Error adding priority to priorities table: ' + error)
            res.send('Error adding priority to priorities table: ' + error)
        } else {
            console.log("No error")
            res.redirect('/priorities')
        }
    });
});

// UPDATE Priority Request
app.post('/priorities/update_priority', function(req, res) {

    // Grab the necessary data from the POST request body.
    const priorityID = req.body.modal_update_priorityID;
    const priorityType = req.body.modal_update_priority_type;

    // DB Query String. Designed with array below to prevent SQL injection.
    const prioritiesUpdateQueryString =
        `UPDATE priorities SET priorityType = ? WHERE priorityID = ?`
    
    const newPriorityValues = 
    [priorityType, priorityID]

    // Send the query, if it fails, log to console, if it succeeds, update the screen.
    connection.query(prioritiesUpdateQueryString, newPriorityValues, function(error, results, fields){
        if (error) {
            console.log('Error updating priority on priorities table: ' + error)
            res.send('Error updating priority on priorities table: ' + error)
        } else {
            res.redirect('/priorities')
        }
    });
})

// DELETE Priority Request
app.delete('/priorities/delete_priority', function(req, res) {

        // Grab the necessary data from the POST request body
        const priorityID = req.body.priorityID;

        // DB Query String. Designed with array below to prevent SQL injection.
        const prioritiesDeleteQueryString =
            `DELETE FROM priorities WHERE priorityID = ?`

        const deletePriorityValue = [priorityID]

        // Send the query, if it fails, log to console, if it succeeds, update the screen.
        connection.query(prioritiesDeleteQueryString, deletePriorityValue, function(error, results, fields){
        if (error) {
            console.log('Error deleting priority from priority table: ' + error);
            res.send('Error deleting priority from priority table: ' + error);
        } else {
            res.redirect(303, '/priorities');
        }
    });
})

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

