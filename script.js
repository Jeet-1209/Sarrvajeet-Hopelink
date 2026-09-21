alert("HopeLink script.js test is working.");

document.addEventListener("DOMContentLoaded", function () {

  console.log("HopeLink loaded successfully.");

  const profilePhoto = document.querySelector(".profile-photo");

  if (profilePhoto) {

    profilePhoto.addEventListener("click", function () {

      alert(

        "Thank you for helping Sarrvajeet. Please use the contact buttons below if assistance is needed."

      );

    });

  }

});

let pendingLocationAction = null;

let locationRetryTimer = null;

let locationWatchId = null;

function getCurrentLocation(successCallback, failureCallback) {

  if (!navigator.geolocation) {

    alert("Location sharing is not supported on this device.");

    return;

  }

  let completed = false;

  function success(position) {

    if (completed) {

      return;

    }

    completed = true;

    const latitude = position.coords.latitude;

    const longitude = position.coords.longitude;

    successCallback(latitude, longitude);

  }

  function failure(error) {

    if (completed) {

      return;

    }

    console.log(

      "Location error:",

      error.code,

      error.message

    );

    completed = true;

    failureCallback(error);

  }

  navigator.geolocation.getCurrentPosition(

    success,

    failure,

    {

      enableHighAccuracy: true,

      timeout: 15000,

      maximumAge: 0

    }

  );

}

function shareLocation() {

  pendingLocationAction = "share";

}

function sendEmergencyMessage(phone, app) {

  pendingLocationAction = {

    type: "emergency",

    phone: phone,

    app: app

  };

}

function stopLocationWatch() {

  if (

    locationWatchId !== null &&

    navigator.geolocation

  ) {

    navigator.geolocation.clearWatch(locationWatchId);

    locationWatchId = null;

  }

}
