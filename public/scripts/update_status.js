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
                
            // Get access to the input feilds in the form.
            var modalInputStatusType = document.querySelector('#modal-update-status-type')

            // Populate the input fields with the previous data.
            modalInputStatusType.value = statusType

            // Bootstrap code to make the model appear.
            $("#updateStatusModal").modal("show")
        })
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