/*
projects_add.js
Description: Enables the ability to click "Add Project" button, and be displayed with a popup form
using bootstraps "Modal" functionality.
*/

// Add an event listener to the "Add Project" button
document.getElementById("addProject").addEventListener("click", function(){

	// Bootstrap code to make the model appear
    $("#addProjectModal").modal("show")
})