/*
projects_add.js
Description: Enables the ability to click "Add" button and be displayed with a popup form to add an item
using bootstraps "Modal" functionality.
*/

// Add an event listener to the add button
document.getElementById("addStatusBtn").addEventListener("click", function(){

	// Bootstrap code to make the model appear
    $("#addStatusModal").modal("show")
})