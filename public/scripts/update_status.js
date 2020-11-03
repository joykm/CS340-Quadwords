/*
update_projects.js
Description: Enables the ability to click a row and update the items in that row.
*/

// Find all the rows on the page.
var shelf_row = document.getElementsByClassName('get-status')

// Add event listeners to all the rows so when clicked, the update modal opens.
// NOTE: most of this functionality won't be helpful until we connect the databases.
for (var row of shelf_row) {
    (function (row){

        // UPDATE LATER - this is copied from project page, but wont work until database is integrated

        row.addEventListener('click', function(){
            // Get the current values from the table on the screen.
            var priority = row.querySelector('.get-status').innerHTML
            
                
            // Populate the modal with the current values.
            var modalInputPriority = document.querySelector('#get-status')
            modalInputPriority = priority
     

            // Bootstrap code to make the model appear
            $("#updateStatusModal").modal("show")
        })
    }(row))
}