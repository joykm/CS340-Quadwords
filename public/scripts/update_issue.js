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
            var issueID = row.querySelector('.table-id').innerHTML
            var name = row.querySelector('.table-name').innerHTML
            var description = row.querySelector('.table-description').innerHTML
            var project = row.querySelector('.table-project-id').innerHTML
            var status = row.querySelector('.table-status-id').innerHTML
            var priority = row.querySelector('.table-priority-id').innerHTML
            var dateRaised = row.querySelector('.table-date-raised').innerHTML
            var dateClosed = row.querySelector('.table-date-closed').innerHTML

            // Clean up text inputs.
            project = project.replace("&nbsp;", "")
            status = status.replace("&nbsp;", "")
            priority = priority.replace("&nbsp;", "")
            
            // Remove all whitespace from string.
            project = project.replace(/\s/g,'')
            status = status.replace(/\s/g,'')
            priority = priority.replace(/\s/g,'')
            dateRaised = dateRaised.replace(/\s/g,'')
            dateClosed = dateClosed.replace(/\s/g,'')

            // Reverse date format for html form.
            dateRaised = dateRaised.split('-')
            dateRaised = dateRaised[2] + '-' + dateRaised[0] + '-' + dateRaised[1]
            dateClosed = dateClosed.split('-')
            dateClosed = dateClosed[2] + '-' + dateClosed[0] + '-' + dateClosed[1]
            
            // Get access to the input feilds in the form.
            var modalIssueID = document.querySelector('#modal_update_issueID')
            var modalInputName = document.querySelector('#modal_update_issue_name')
            var modalInputDescription = document.querySelector('#modal_update_issue_description')
            var modalInputProject = document.querySelector('#modal_update_issue_project')
            var modalInputStatus = document.querySelector('#modal_update_issue_status')
            var modalInputPriority = document.querySelector('#modal_update_issue_priority')


            // Populate text input fields with the previous data.
            modalIssueID.value = issueID
            modalInputName.value = name
            modalInputDescription.value = description

            // Populate date input fields with previousu data.
            document.getElementById('modal_update_issue_date_raised').value = dateRaised
            document.getElementById('modal_update_issue_date_closed').value = dateClosed


            // Populate dropdown menus with previous data.
            for(var i, j = 0; i = modalInputProject.options[j]; j++) {
                cleanTxt = i.value

                // Remove all whitespace from string
                cleanTxt = cleanTxt.replace(/\s/g,'')
                if(cleanTxt == project) {
                    modalInputProject.selectedIndex = j;
                    break;
                }
            }
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
            $("#updateIssueModal").modal("show")
        })
        // Get cell containing user assignment button and remove edit event
        // var assignedUsersButton = row.getElementsByClassName('assigned-users')[0]
        // assignedUsersButton.addEventListener('click', function(e) {
        //     e.stopPropagation();
        // });
    }(row))
}

// Event listener on modal form submission button
document.getElementById("update-issue-form").addEventListener("submit", function(e){
    e.preventDefault()

    // Get access to the input feilds in the form.
    var modalInputProject = document.querySelector('#modal_update_issue_project')
    var modalInputStatus = document.querySelector('#modal_update_issue_status')
    var modalInputPriority = document.querySelector('#modal_update_issue_priority')

    // Ensure null values are submited for foriegn key fields, as opposed to empty strings.
    if (modalInputProject.value == "") {
        modalInputProject.value = null 
    }
    if (modalInputStatus.value == "") {
        modalInputStatus.value = null 
    }
    if (modalInputPriority.value == "") {
        modalInputPriority.value = null 
    }

    // Update the data here when the database is created
    document.getElementById('update-issue-form').submit(); 
})

// Event listener on delete button within modal form
var deleteBtn = document.getElementById("delete-btn")
deleteBtn.addEventListener("click", function() {
    // Retrieve Current ID
    var issueID = document.querySelector('#modal_update_issueID').value
    console.log(issueID)

    // Create Request and Payload
    let request = new XMLHttpRequest();
    let payload = {issueID: issueID}
    console.log(payload)

    //Process Delete Request to Server
    request.open("delete", "/issues/delete_issue", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 400) {
            console.log("Record Deleted");
            location.reload();
        } else {
            console.log("There was an error deleting this issue.");
        }
    });
    request.send(JSON.stringify(payload));
    event.preventDefault();
});