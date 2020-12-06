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

            // Clean up text inputs.
            status = status.replace("&nbsp;", "")
            priority = priority.replace("&nbsp;", "")
            
            // Remove all whitespace from string.
            status = status.replace(/\s/g,'')
            priority = priority.replace(/\s/g,'')
            startDate = startDate.replace(/\s/g,'')
            endDate = endDate.replace(/\s/g,'')

            // Reverse date format for html form.
            startDate = startDate.split('-')
            startDate = startDate[2] + '-' + startDate[0] + '-' + startDate[1]
            endDate = endDate.split('-')
            endDate = endDate[2] + '-' + endDate[0] + '-' + endDate[1]
            
            // Get access to the input feilds in the form.
            var modalProjectID = document.querySelector('#modal_update_projectID')
            var modalInputName = document.querySelector('#modal_update_project_name')
            var modalInputDescription = document.querySelector('#modal_update_project_description')
            var modalInputStatus = document.querySelector('#modal_update_project_status')
            var modalInputPriority = document.querySelector('#modal_update_project_priority')

            // Populate text input fields with the previous data.
            modalProjectID.value = projectID
            modalInputName.value = name
            modalInputDescription.value = description

            // Populate date input fields with previousu data.
            document.getElementById('modal_update_project_start_date').value = startDate
            document.getElementById('modal_update_project_end_date').value = endDate

            // Populate dropdown menus with previous data.
            for(var i, j = 0; i = modalInputStatus.options[j]; j++) {
                cleanTxt = i.value

                // Remove all whitespace from string
                cleanTxt = cleanTxt.replace(/\s/g,'')
                if(cleanTxt == status) {
                    modalInputStatus.selectedIndex = j;
                    break;
                }
            }
            for(var i, j = 0; i = modalInputPriority.options[j]; j++) {
                cleanTxt = i.value

                // Remove all whitespace from string
                cleanTxt = cleanTxt.replace(/\s/g,'')
                if(cleanTxt == priority) {
                    modalInputPriority.selectedIndex = j;
                    break;
                }
            }

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
document.getElementById("update-project-form").addEventListener("submit", function(e){
    e.preventDefault()

    // Get access to the input feilds in the form.
    var modalInputStatus = document.querySelector('#modal_update_project_status')
    var modalInputPriority = document.querySelector('#modal_update_project_priority')

    // Ensure null values are submited for foriegn key fields, as opposed to empty strings.
    if (modalInputStatus.value == "") {
        modalInputStatus.value = null 
    }
    if (modalInputPriority.value == "") {
        modalInputPriority.value = null 
    }

    // Update the data here when the database is created
    document.getElementById('update-project-form').submit(); 
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