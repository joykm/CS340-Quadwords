/*
update_projects.js
Description: Enables the ability to click a row and update the items in that row.
*/

// Find all the rows on the page.
var shelf_row = document.getElementsByClassName('get-issue')

// Add event listeners to all the rows so when clicked, the update modal opens.
// NOTE: most of this functionality won't be helpful until we connect the databases.
for (var row of shelf_row) {
    (function (row){
        row.addEventListener('click', function(){
            
            // Get the current values from the table on the screen.
            var name = row.querySelector('.get-name').innerHTML
            var description = row.querySelector('.get-description').innerHTML
            var project = row.querySelector('.get-project').innerHTML
            var status = row.querySelector('.get-status').innerHTML
            var priority = row.querySelector('.get-priority').innerHTML
            var dateRaised = row.querySelector('.get-date-raised').innerHTML
            var dateClosed = row.querySelector('.get-date-closed').innerHTML
            
            // Populate the modal with the current values.
            var modalInputName = document.querySelector('#get-name')
            var modalInputDescription = document.querySelector('#get-description')
            var modalInputProject = document.querySelector('#get-project')
            var modalInputStatus = document.querySelector('#get-status')
            var modalInputPriority = document.querySelector('#get-priority')
            var modalInputDateRaised = document.querySelector('#get-date-raised')
            var modalInputDateClosed = document.querySelector('#get-date-closed')
            modalInputName = name
            modalInputDescription = description
            modalInputProject = project
            modalInputStatus = status
            modalInputPriority = priority
            modalInputDateRaised = dateRaised
            modalInputDateClosed= dateClosed
            
            // Bootstrap code to make the model appear
            $("#updateIssueModal").modal("show")
        })
    }(row))
}