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

  function getLocation() {

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

        alert("Please turn ON Location Services and allow location access. Then return to this page.");

      },

      {

        enableHighAccuracy: true,

        timeout: 10000,

        maximumAge: 0

      }

    );

  }

  getLocation();

  // Retry when the person returns to the page

  document.addEventListener("visibilitychange", function retryLocation() {

    if (!document.hidden) {

      document.removeEventListener("visibilitychange", retryLocation);

      setTimeout(function() {

        getLocation();

      }, 1000);

    }

  });

}
function sendEmergencyMessage(phone, app) {

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

      const message =

        "Hello, I have found Sarrvajeet. Please contact his family urgently. " +

        "My current location is: " +

        mapUrl;

      if (app === "whatsapp") {

        window.location.href =

          "https://wa.me/" +

          phone +

          "?text=" +

          encodeURIComponent(message);

      } else if (app === "sms") {

        window.location.href =

          "sms:" +

          phone +

          "?&body=" +

          encodeURIComponent(message);

      }

    },

    function() {

      alert(

        "Please turn ON Location Services and allow location access. Then try again."

      );

    },

    {

      enableHighAccuracy: true,

      timeout: 10000,

      maximumAge: 0

    }

  );

}
