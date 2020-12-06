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
            var projectID = row.querySelector('.table-id').innerHTML
            var name = row.querySelector('.table-name').innerHTML
            var description = row.querySelector('.table-description').innerHTML
            var status = row.querySelector('.table-status-id').innerHTML
            var priority = row.querySelector('.table-priority-id').innerHTML
            var startDate = row.querySelector('.table-start-date').innerHTML
            var endDate = row.querySelector('.table-end-date').innerHTML
            
            // Get access to the input feilds in the form.
            var modalProjectID = document.querySelector('#modal_update_projectID')
            var modalInputName = document.querySelector('#modal_update_project_name')
            var modalInputDescription = document.querySelector('#modal_update_project_description')
            var modalInputStatus = document.querySelector('#modal_update_project_status')
            var modalInputPriority = document.querySelector('#modal_update_project_priority')
            var modalInputStartDate = document.querySelector('#modal_update_project_start_date')
            var modalInputEndDate = document.querySelector('#modal_update_project_end_date')

            // Populate the input fields with the previous data.
            modalProjectID.value = projectID
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
        // var assignedUsersButton = row.getElementsByClassName('assigned-users')[0]
        // assignedUsersButton.addEventListener('click', function(e) {
        //     e.stopPropagation();
        // });
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
    // Retrieve Current ID
    var projectID = document.querySelector('#modal_update_projectID').value
    console.log(projectID)

    // Create Request and Payload
    let request = new XMLHttpRequest();
    let payload = {projectID: projectID}
    console.log(payload)

    //Process Delete Request to Server
    request.open("delete", "/projects/delete_project", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 400) {
            console.log("Record Deleted");
            location.reload();
        } else {
            console.log("There was an error deleting this project.");
        }
    });
    request.send(JSON.stringify(payload));
    event.preventDefault();
});