/*
Description: Enables the ability to click a row and update the items in that row.
*/

// Find all the rows on the page.
var table_rows = document.getElementsByClassName('table-projects')

// Add event listeners to all the rows so when clicked, the update modal opens.
for (var row of table_rows) {
    (function (row){
        row.addEventListener('click', function(){
            
            // Get the current values from the table on the screen.
            var name = row.querySelector('.table-name').innerHTML
            var description = row.querySelector('.table-description').innerHTML
            var status = row.querySelector('.table-status-id').innerHTML
            var priority = row.querySelector('.table-priority-id').innerHTML
            var startDate = row.querySelector('.table-start-date').innerHTML
            var endDate = row.querySelector('.table-end-date').innerHTML
            
            // Get access to the input feilds in the form.
            var modalInputName = document.querySelector('#modal-update-project-name')
            var modalInputDescription = document.querySelector('#modal-update-project-description')
            var modalInputStatus = document.querySelector('#modal-update-project-status')
            var modalInputPriority = document.querySelector('#modal-update-project-priority')
            var modalInputStartDate = document.querySelector('#modal-update-project-start-date')
            var modalInputEndDate = document.querySelector('#modal-update-project-end-date')

            // Populate the input fields with the previous data.
            modalInputName.value = name
            modalInputDescription.value = description
            modalInputStatus.value = status
            modalInputPriority.value = priority
            modalInputStartDate.value = startDate
            modalInputEndDate.value = endDate

            // Bootstrap code to make the model appear.
            $("#updateProjectModal").modal("show")
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