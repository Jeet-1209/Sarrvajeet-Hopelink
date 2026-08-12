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
function shareLocation() {

  if (!navigator.geolocation) {

    alert("Location sharing is not supported on this device.");

    return;

  }

  navigator.geolocation.getCurrentPosition(

    function(position) {

      const latitude = position.coords.latitude;

      const longitude = position.coords.longitude;

      const mapUrl =

        "https://www.google.com/maps?q=" +

        latitude +

        "," +

        longitude;

      window.location.href = mapUrl;

    },

    function() {

      alert("Please allow location access so your location can be shared.");

    }

  );

}
