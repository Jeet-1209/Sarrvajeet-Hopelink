/* =====================================

   Sarrvajeet's HopeLink

   JavaScript - Version 1

===================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("HopeLink loaded successfully.");

    const profilePhoto = document.querySelector(".profile-photo");

    if (profilePhoto) {

        profilePhoto.addEventListener("click", function () {

            alert("Thank you for helping Sarrvajeet. Please use the contact buttons below if assistance is needed.");

        });

    }

});
