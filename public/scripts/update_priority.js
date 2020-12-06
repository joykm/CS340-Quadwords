/*
Description: Enables the ability to click a row and update the items in that row.
*/

// Find all the rows on the page.
var table_rows = document.getElementsByClassName('table-priorities')

// Add event listeners to all the rows so when clicked, the update modal opens.
for (var row of table_rows) {
    (function (row){

        row.addEventListener('click', function(){
            // Get the current values from the table on the screen.
            var priorityID = row.querySelector('.table-id').innerHTML
            var priorityType = row.querySelector('.table-priority-type').innerHTML
            
            // Get access to the input feilds in the form.
            var modalPriorityID = document.querySelector('#modal_update_priorityID')
            var modalInputPriorityType = document.querySelector('#modal_update_priority_type')

            // Populate the input fields with the previous data.
            modalPriorityID.value = priorityID
            modalInputPriorityType.value = priorityType

            // Bootstrap code to make the model appear.
            $("#updatePriorityModal").modal("show")
        })
    }(row))
}

// Event listener on delete button within modal form
var deleteBtn = document.getElementById("delete-btn")
deleteBtn.addEventListener("click", function() {
    // Retrieve Current ID
    var priorityID = document.querySelector('#modal_update_priorityID').value
    console.log(priorityID)

    // Create Request and Payload
    let request = new XMLHttpRequest();
    let payload = {priorityID: priorityID}
    console.log(payload)

    //Process Delete Request to Server
    request.open("delete", "/priorities/delete_priority", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 400) {
            console.log("Record Deleted");
            location.reload();
        } else {
            console.log("There was an error deleting this priority.");
        }
    });
    request.send(JSON.stringify(payload));
    event.preventDefault();
});