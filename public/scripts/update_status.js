/*
Description: Enables the ability to click a row and update the items in that row.
*/

// Find all the rows on the page.
var table_rows = document.getElementsByClassName('table-statuses')

// Add event listeners to all the rows so when clicked, the update modal opens.
for (var row of table_rows) {
    (function (row){

        row.addEventListener('click', function(){
            // Get the current values from the table on the screen.
            var statusID = row.querySelector('.table-id').innerHTML
            var statusType = row.querySelector('.table-status-type').innerHTML
                
            // Get access to the input feilds in the form.
            var modalStatusID = document.querySelector('#modal_update_statusID')
            var modalInputStatusType = document.querySelector('#modal_update_status_type')

            // Populate the input fields with the previous data.
            modalStatusID.value = statusID
            modalInputStatusType.value = statusType

            // Bootstrap code to make the model appear.
            $("#updateStatusModal").modal("show")
        })
    }(row))
}

// Event listener on delete button within modal form
var deleteBtn = document.getElementById("delete-btn")
deleteBtn.addEventListener("click", function() {
    // Retrieve Current Developer ID
    var statusID = document.querySelector('#modal_update_statusID').value
    console.log(statusID)

    // Create Request and Payload
    let request = new XMLHttpRequest();
    let payload = {statusID: statusID}
    console.log(payload)

    //Process Delete Request to Server
    request.open("delete", "/statuses/delete_status", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 400) {
            console.log("Record Deleted");
            location.reload();
        } else {
            console.log("There was an error deleting this status.");
        }
    });
    request.send(JSON.stringify(payload));
    event.preventDefault();
});