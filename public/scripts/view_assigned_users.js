// Assigned User Buttons on Page
var assignedUsersButtons = document.getElementsByClassName('users-btn')

// Add an event listener to the users button
for (var i = 0; i < assignedUsersButtons.length; i++) {
    assignedUsersButtons[i].addEventListener("click", function(){
        // Bootstrap code to make the model appear
        $("#assignedUsersModal").modal("show")
    })
}