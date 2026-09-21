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
function stopLocationWatch() {

  if (

    locationWatchId !== null &&

    navigator.geolocation

  ) {

    navigator.geolocation.clearWatch(locationWatchId);

    locationWatchId = null;

  }
}
function attemptPendingLocation() {

  if (!pendingLocationAction) {

    return;

  }

  const action = pendingLocationAction;

  getCurrentLocation(

    function (latitude, longitude) {

      const mapUrl =

        "https://www.google.com/maps?q=" +

        latitude +

        "," +

        longitude;

      if (action === "share") {

        pendingLocationAction = null;

        if (navigator.share) {

          navigator.share({

            title: "My Current Location",

            text: "My current location is:",

            url: mapUrl

          }).catch(function () {

            /* User cancelled sharing */

          });

        } else {

          window.location.href = mapUrl;

        }

        return;

      }

      if (

        typeof action === "object" &&

        action.type === "emergency"

      ) {

        const phone = action.phone;

        const app = action.app;

        let message;

        if (currentLanguage === "ta") {

          message =

            "நான் சர்வஜீத்தை கண்டுபிடித்துள்ளேன். " +

            "தயவுசெய்து அவரது குடும்பத்தினரை அவசரமாக தொடர்புகொள்ளவும். " +

            "எனது தற்போதைய இருப்பிடம்: " +

            mapUrl;

        } else if (currentLanguage === "hi") {

          message =

            "मुझे सर्वजीत मिल गए हैं। " +

            "कृपया उनके परिवार से तुरंत संपर्क करें। " +

            "मेरा वर्तमान स्थान: " +

            mapUrl;

        } else {

          message =

            "Hello, I have found Sarrvajeet. Please contact his family urgently. " +

            "My current location is: " +

            mapUrl;

        }

        pendingLocationAction = null;

        stopLocationWatch();

        if (app === "whatsapp") {

          window.location.href =

            "https://wa.me/" +

            phone +

            "?text=" +

            encodeURIComponent(message);

          return;

        }

        if (app === "sms") {

          window.location.href =

            "sms:" +

            phone +

            "?body=" +

            encodeURIComponent(message);

          return;

        }

      }

    },

    function (error) {

      console.log(

        "Unable to get location.",

        error.code,

        error.message

      );

      alert(

        "Location is currently unavailable.\n\n" +

        "Please turn ON Location Services and try again."

      );

    }

  );

}
