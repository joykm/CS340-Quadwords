/*
Description: Enables the ability to click a row and update the items in that row.
*/

// Find all the rows on the page.
var shelf_row = document.getElementsByClassName('table-developer')

// Add event listeners to all the rows so when clicked, the update modal opens.
for (var row of shelf_row) {
    (function (row){
        row.addEventListener('click', function(){

            // Get the current values from the table on the screen.
            var firstName = row.querySelector('.table-first-name').innerHTML
            var lastName = row.querySelector('.table-last-name').innerHTML
            var title = row.querySelector('.table-title').innerHTML
            var email = row.querySelector('.table-email').innerHTML
            
            // Populate the modal with the current values.
            var modalInputFirstName = document.querySelector('#modal-update-first-name')
            var modalInputLastName = document.querySelector('#modal-update-last-name')
            var modalInputTitle = document.querySelector('#modal-update-title')
            var modalInputEmail = document.querySelector('#modal-update-email')
            modalInputFirstName = firstName
            modalInputLastName = lastName
            modalInputTitle = title
            modalInputEmail = email

            // Bootstrap code to make the model appear
            $("#updateDeveloperModal").modal("show")
        })
    }(row))
}