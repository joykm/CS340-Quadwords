// Assigned User Buttons on Page
var assignedUsersButtons = document.getElementsByClassName('users-btn')

// Add an event listener to the users button
for (var i = 0; i < assignedUsersButtons.length; i++) {
    assignedUsersButtons[i].addEventListener("click", function(){
        // Bootstrap code to make the model appear
        $("#assignedUsersModal").modal("show")
    })
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
