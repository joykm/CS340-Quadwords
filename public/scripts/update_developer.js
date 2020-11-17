/*
Description: Enables the ability to click a row and update the items in that row.
*/

// Find all the rows on the page.
var table_rows = document.getElementsByClassName('table-developer')

// Add event listeners to all the rows so when clicked, the update modal opens.
for (var row of table_rows) {
    (function (row){
        row.addEventListener('click', function(){

            // Get the current values from the table on the screen.
            var devId = row.querySelector('.table-id').innerHTML
            var firstName = row.querySelector('.table-first-name').innerHTML
            var lastName = row.querySelector('.table-last-name').innerHTML
            var title = row.querySelector('.table-title').innerHTML
            var email = row.querySelector('.table-email').innerHTML
            
            // Get access to the input feilds in the form.
            var modalDevId = document.querySelector('#modal-dev-id')
            var modalInputFirstName = document.querySelector('#modal-update-first-name')
            var modalInputLastName = document.querySelector('#modal-update-last-name')
            var modalInputTitle = document.querySelector('#modal-update-title')
            var modalInputEmail = document.querySelector('#modal-update-email')

            // Populate the input fields with the previous data.
            modalDevId = devId
            modalInputFirstName.value = firstName
            modalInputLastName.value = lastName
            modalInputTitle.value = title
            modalInputEmail.value = email

            // Bootstrap code to make the model appear.
            $("#updateDeveloperModal").modal("show")
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