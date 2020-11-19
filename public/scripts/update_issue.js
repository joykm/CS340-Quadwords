/*
Description: Enables the ability to click a row and update the items in that row.
*/

// Find all the rows on the page.
var table_rows = document.getElementsByClassName('table-issues')

// Add event listeners to all the rows so when clicked, the update modal opens.
for (var row of table_rows) {
    (function (row){
        row.addEventListener('click', function(){
            
            // Get the current values from the table on the screen.
            var name = row.querySelector('.table-name').innerHTML
            var description = row.querySelector('.table-description').innerHTML
            var project = row.querySelector('.table-project-id').innerHTML
            var status = row.querySelector('.table-status-id').innerHTML
            var priority = row.querySelector('.table-priority-id').innerHTML
            var dateRaised = row.querySelector('.table-date-raised').innerHTML
            var dateClosed = row.querySelector('.table-date-closed').innerHTML
            
            // Get access to the input feilds in the form.
            var modalInputName = document.querySelector('#modal-update-issue-name')
            var modalInputDescription = document.querySelector('#modal-update-issue-description')
            var modalInputProject = document.querySelector('#modal-update-issue-project')
            var modalInputStatus = document.querySelector('#modal-update-issue-status')
            var modalInputPriority = document.querySelector('#modal-update-issue-priority')
            var modalInputDateRaised = document.querySelector('#modal-update-issue-date-raised')
            var modalInputDateClosed = document.querySelector('#modal-update-issue-date-closed')

            // Populate the input fields with the previous data.
            modalInputName.value = name
            modalInputDescription.value = description
            modalInputProject.value = project
            modalInputStatus.value = status
            modalInputPriority.value = priority
            modalInputDateRaised.value = dateRaised
            modalInputDateClosed.value = dateClosed
            
            // Bootstrap code to make the model appear.
            $("#updateIssueModal").modal("show")
        })
        // Get cell containing user assignment button and remove edit event
        var assignedUsersButton = row.getElementsByClassName('assigned-users')[0]
        assignedUsersButton.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }(row))
}

// Event listener on modal form submission button
var form = document.getElementsByClassName('update-form')[0]
form.addEventListener('submit', function(event) {
    // Update the data here when the database is created
})

// Event listener on delete button within modal form
var deleteBtn = document.getElementById("delete-btn")
deleteBtn.addEventListener("click", function() {
    // Add a delete confirmation here, as well as delete confirmation funcitonality
    alert("Are you sure you want to delete this row?")

})