/*
update_projects.js
Description: Enables the ability to click a row and update the items in that row.
*/

// Find all the rows on the page.
var shelf_row = document.getElementsByClassName('get-project')

// Add event listeners to all the rows so when clicked, the update modal opens.
// NOTE: most of this functionality won't be helpful until we connect the databases.
for (var row of shelf_row) {
    (function (row){
        row.addEventListener('click', function(){
            
            // Get the current values from the table on the screen.
            var name = row.querySelector('.get-name').innerHTML
            var description = row.querySelector('.get-description').innerHTML
            var status = row.querySelector('.get-status').innerHTML
            var priority = row.querySelector('.get-priority').innerHTML
            var startDate = row.querySelector('.get-start-date').innerHTML
            var endDate = row.querySelector('.get-end-date').innerHTML
            
            // Populate the modal with the current values.
            var modalInputName = document.querySelector('#get-name')
            var modalInputDescription = document.querySelector('#get-description')
            var modalInputStatus = document.querySelector('#get-status')
            var modalInputPriority = document.querySelector('#get-priority')
            var modalInputStartDate = document.querySelector('#get-start-date')
            var modalInputEndDate = document.querySelector('#get-end-date')
            modalInputName = name
            modalInputDescription = description
            modalInputStatus = status
            modalInputPriority = priority
            modalInputStartDate = startDate
            modalInputEndDate = endDate

            // Bootstrap code to make the model appear
            $("#updateProjectModal").modal("show")
        })
        // Get cell containing user assignment button and remove edit event
        var assignedUsersButton = row.getElementsByClassName('assigned-users')[0]
        assignedUsersButton.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }(row))
}