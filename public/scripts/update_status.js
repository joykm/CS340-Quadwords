/*
Description: Enables the ability to click a row and update the items in that row.
*/

// Find all the rows on the page.
var shelf_row = document.getElementsByClassName('table-status')

// Add event listeners to all the rows so when clicked, the update modal opens.
for (var row of shelf_row) {
    (function (row){

        row.addEventListener('click', function(){
            // Get the current values from the table on the screen.
            var statusType = row.querySelector('.table-status-type').innerHTML
                
            // Populate the modal with the current values.
            var modalInputStatusType = document.querySelector('#modal-update-status-type')
            modalInputStatusType = statusType

            // Bootstrap code to make the model appear
            $("#updateStatusModal").modal("show")
        })
    }(row))
}