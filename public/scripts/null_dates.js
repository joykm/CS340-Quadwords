/*
Description: Enables the ability to submit added item from add forum.
*/

const dates = document.querySelectorAll(".date-cell");
for (var i = 0; i < dates.length; i++) {    

    if (dates[i].innerHTML == "00-00-0000") {
        dates[i].innerHTML = ""
    }
}