/*
Description: Enables the ability to click a row and update the items in that row.
*/

// Find all the rows on the page.
var shelf_row = document.getElementsByClassName('table-priority')

// Add event listeners to all the rows so when clicked, the update modal opens.
for (var row of shelf_row) {
    (function (row){

        row.addEventListener('click', function(){
            // Get the current values from the table on the screen.
            var priorityType = row.querySelector('.table-priority-type').innerHTML
            
            // Populate the modal with the current values.
            var modalInputPriorityType = document.querySelector('#modal-update-priority-type')
            modalInputPriorityType = priorityType

            // Bootstrap code to make the model appear
            $("#updatePriorityModal").modal("show")
        })
    }(row))
}