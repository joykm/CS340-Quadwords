/*
Description: Enables the ability to submit added item from add forum.
*/

// Event listener on add button within modal form
document.getElementById("add_issue_assignment_form").addEventListener("submit", function(e){
    e.preventDefault()

    // Get access to the input feilds in the form.
    var modalInputIssueID = document.querySelector('#modal_add_issue_assignment_issueID')
    var modalInputDeveloperID = document.querySelector('#modal_add_issue_assignment_developer')


    // Ensure null values are submited for foriegn key fields, as opposed to empty strings.
    if (modalInputIssueID.value == "") {
        modalInputIssueID.value = null 
    }
    if (modalInputDeveloperID.value == "") {
        modalInputDeveloperID.value = null 
    }

    document.getElementById("add_issue_assignment_form").submit(); 
})