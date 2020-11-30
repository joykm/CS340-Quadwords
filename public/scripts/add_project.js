/*
Description: Enables the ability to submit added item from add forum.
*/

// Event listener on add button within modal form
document.getElementById("add_project_form").addEventListener("submit", function(e){
    e.preventDefault()

    // Get access to the input feilds in the form.
    var modalInputStatus = document.querySelector('#modal_add_project_status')
    var modalInputPriority = document.querySelector('#modal_add_project_priority')

    // Ensure null values are submited for foriegn key fields, as opposed to empty strings.
    if (modalInputStatus.value == "") {
        modalInputStatus.value = null 
    }
    if (modalInputPriority.value == "") {
        modalInputPriority.value = null 
    }

    document.getElementById("add_project_form").submit(); 
})