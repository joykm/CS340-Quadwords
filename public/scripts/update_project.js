/*
shelves_edit.js
Author: George Kochera, Quinn Wilkins (warehouse parts)
Description: Enables the ability to click on a row in the inventory page and edit the shelves capacity. Data validation
is enforced in the modal. The only rule is that the maximum must be greater than or equal to the minimum value.
*/

// Find all the product rows on the page.
var shelf_row = document.getElementsByClassName('get_project')

// Add event listeners to all the rows so when we click on them, they open a modal.
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

            // Make the modal appear.
            $("#updateProjectModal").modal("show")
        })
    }(row))
}

