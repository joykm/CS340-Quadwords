/*
Description: Enables the ability to delete a composit entity row.
*/

// // Event listener on delete button within modal form
var deleteBtn = document.getElementById("delete-btn")
deleteBtn.addEventListener("click", function() {
    // Retrieve Current ID
    var issueAssignment = document.querySelector('#modal_delete_issue_assignment').value
    var parsed = issueAssignment.split('(');

    // Loop through split array collecting info
    matches=[]
    for (var i = 1; i < parsed.length; i++) {
        matches.push(parsed[i].split(')')[0]);
    }

    // Set variables for payload
    issueID = matches[0]
    developerID = matches[1]

    // Create Request and Payload
    let request = new XMLHttpRequest();
    let payload = {issueID: issueID, developerID: developerID}
    console.log(payload)

    //Process Delete Request to Server
    request.open("delete", "/issue_assignments/delete_issue_assignment", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 400) {
            console.log("Record Deleted");
            location.reload();
        } else {
            console.log("There was an error deleting this issue assignment.");
        }
    });
    request.send(JSON.stringify(payload));
    event.preventDefault();
});