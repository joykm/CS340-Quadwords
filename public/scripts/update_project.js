/*
Description: Enables the ability to click a row and update the items in that row.
*/

// Find all the rows on the page.
var shelf_row = document.getElementsByClassName('table-project')

// Add event listeners to all the rows so when clicked, the update modal opens.
for (var row of shelf_row) {
    (function (row){
        row.addEventListener('click', function(){
            
            // Get the current values from the table on the screen.
            var name = row.querySelector('.table-name').innerHTML
            var description = row.querySelector('.table-description').innerHTML
            var status = row.querySelector('.table-status').innerHTML
            var priority = row.querySelector('.table-priority').innerHTML
            var startDate = row.querySelector('.table-start-date').innerHTML
            var endDate = row.querySelector('.table-end-date').innerHTML
            
            // Populate the modal with the current values.
            var modalInputName = document.querySelector('#modal-update-project-name')
            var modalInputDescription = document.querySelector('#modal-update-project-description')
            var modalInputStatus = document.querySelector('#modal-update-project-status')
            var modalInputPriority = document.querySelector('#modal-update-project-priority')
            var modalInputStartDate = document.querySelector('#modal-update-project-start-date')
            var modalInputEndDate = document.querySelector('#modal-update-project-end-date')
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