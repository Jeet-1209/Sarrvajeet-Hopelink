/* =====================================

   Sarrvajeet's HopeLink

   JavaScript - Version 2

===================================== */

/* =====================================

   PROFILE PHOTO

===================================== */

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


/* =====================================

   LOCATION SYSTEM

===================================== */

let pendingLocationAction = null;

let locationRetryTimer = null;

let locationWatchId = null;

/* =====================================

   GET CURRENT LOCATION

===================================== */

function getCurrentLocation(successCallback, failureCallback) {

  if (!navigator.geolocation) {

    alert("Location sharing is not supported on this device.");

    return;

  }

  navigator.geolocation.getCurrentPosition(

    function (position) {

      const latitude = position.coords.latitude;

      const longitude = position.coords.longitude;

      successCallback(latitude, longitude);

    },

    function (error) {

      console.log("Location error:", error.code, error.message);

      failureCallback(error);

    },

    {

      enableHighAccuracy: true,

      timeout: 15000,

      maximumAge: 0

    }

  );

}

/* =====================================

   SHARE MY LOCATION

===================================== */

function shareLocation() {

  pendingLocationAction = "share";

  attemptPendingLocation();

}

/* =====================================

   EMERGENCY SMS / WHATSAPP

===================================== */

function sendEmergencyMessage(phone, app) {

  pendingLocationAction = {

    type: "emergency",

    phone: phone,

    app: app

  };

  attemptPendingLocation();

}

/* =====================================

   TRY LOCATION

===================================== */

function attemptPendingLocation() {

  if (!pendingLocationAction) {

    return;

  }

  getCurrentLocation(

    function (latitude, longitude) {

      const mapUrl =

        "https://www.google.com/maps?q=" +

        latitude +

        "," +

        longitude;

      /* --------------------------------

         SHARE MY LOCATION

      -------------------------------- */

      if (pendingLocationAction === "share") {

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

      /* --------------------------------

         EMERGENCY MESSAGE

      -------------------------------- */

      if (

        typeof pendingLocationAction === "object" &&

        pendingLocationAction.type === "emergency"

      ) {

        const phone = pendingLocationAction.phone;

        const app = pendingLocationAction.app;

        const message =

          "Hello, I have found Sarrvajeet. Please contact his family urgently. " +

          "My current location is: " +

          mapUrl;

        pendingLocationAction = null;

        /* --------------------------------

           WHATSAPP

        -------------------------------- */

        if (app === "whatsapp") {

          window.location.href =

            "https://wa.me/" +

            phone +

            "?text=" +

            encodeURIComponent(message);

          return;

        }

        /* --------------------------------

           SMS

        -------------------------------- */

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

      pendingLocationAction = null;

      clearTimeout(locationRetryTimer);

      stopLocationWatch();

      if (error && error.code === 1) {

        alert(

          "Please allow location access for this website. " +

          "Then turn ON Location Services and tap the button again."

        );

      } else {

        alert(

          "Please turn ON Location Services. " +

          "Then tap the button again."

        );

      }

    }

alert(

  "Location error code: " +

  error.code +

  "\n\n" +

  error.message

);

      /*

         IMPORTANT:

         Cancel the old action so Safari

         cannot keep repeating it.

      */

      pendingLocationAction = null;

      clearTimeout(locationRetryTimer);

      stopLocationWatch();

      if (error && error.code === 1) {

        alert(

          "Please allow location access for this website. " +

          "Then turn ON Location Services and tap the button again."

        );

      } else {

        alert(

          "Please turn ON Location Services. " +

          "Then tap the button again."

        );

      }

    }

  );

}

      



         

      



      



        

      

      
    

  


/* =====================================

   WATCH FOR LOCATION TO BECOME AVAILABLE

===================================== */
function startLocationWatch() {

  if (!navigator.geolocation) {

    return;

  }

  if (locationWatchId !== null) {

    return;

  }

  locationWatchId = navigator.geolocation.watchPosition(

    function (position) {

      console.log("Location became available.");

      stopLocationWatch();

      if (pendingLocationAction) {

        attemptPendingLocation();

      }

    },

    function (error) {

      console.log(

        "Waiting for location...",

        error.code,

        error.message

      );

    },

    {

      enableHighAccuracy: true,

      timeout: 15000,

      maximumAge: 0

    }

  );

}
/* =====================================

   STOP LOCATION WATCH

===================================== */

function stopLocationWatch() {

  if (

    locationWatchId !== null &&

    navigator.geolocation

  ) {

    navigator.geolocation.clearWatch(locationWatchId);

    locationWatchId = null;

  }

}

/* =====================================

   RETRY WHEN PAGE BECOMES ACTIVE

===================================== */

/*

   Automatic retry is disabled.

   On iPhone, Safari can fire multiple

   focus/visibility events when Location

   Services or permission dialogs appear.

   The user can simply turn Location ON

   and tap the button again.

*/

function retryPendingLocation() {

  return;

}
/* =====================================

   PAGE VISIBILITY

===================================== */

document.addEventListener(

  "visibilitychange",

  function () {

    if (!document.hidden) {

      retryPendingLocation();

    }

  }

);

/* =====================================

   WINDOW FOCUS

===================================== */

window.addEventListener(

  "focus",

  function () {

    retryPendingLocation();

  }

);

/* =====================================

   PAGE SHOW

===================================== */

window.addEventListener(

  "pageshow",

  function () {

    retryPendingLocation();

  }

);

/* =====================================

   TRANSLATIONS

===================================== */

const translations = {

  ta: {

    language: "மொழி",

    thankYou: "ஸ்கேன் செய்ததற்கு நன்றி",

    welcome: "உதவி தேவைப்படும் ஒருவரை நீங்கள் கண்டிருக்கலாம். தயவுசெய்து அமைதியாக இருந்து, குடும்பத்தினரைத் தொடர்புகொள்ள கீழே உள்ள பொத்தான்களைப் பயன்படுத்தவும்.",

    important: "இந்த நபருக்கு தொடர்புகொள்வதில் சிரமம் இருக்கலாம். அவர் வழிதவறி இருப்பது போல் தெரிந்தால் அல்லது உதவி தேவைப்பட்டால், உடனடியாக குடும்பத்தினரைத் தொடர்புகொள்ளவும்.",

    reward: "🌼 வெகுமதி",

    rewardText: "எங்கள் அன்புக்குரியவரை பாதுகாப்பாக மீண்டும் குடும்பத்துடன் சேர்க்க உதவியதற்காக நன்றியின் அடையாளமாக வெகுமதி வழங்கப்படலாம்.",

    scroll: "↓ மேலும் விவரங்களுக்கு கீழே ஸ்க்ரோல் செய்யவும்",

    emergency: "📞 அவசர தொடர்புகள்",

    name: "பெயர்",

    primary: "முதன்மை தொடர்பு",

    secondary: "இரண்டாம் நிலை தொடர்பு",

    phone: "தொலைபேசி",

    sms: "குறுஞ்செய்தி",

    whatsapp: "வாட்ஸ்அப்",

    smsDeepa: "தீபாவுக்கு அவசர குறுஞ்செய்தி அனுப்பவும்",

    whatsappDeepa: "வாட்ஸ்அப்பில் தீபாவைத் தொடர்புகொள்ளவும்",

    smsFather: "சர்வஜீத்தின் தந்தைக்கு அவசர குறுஞ்செய்தி அனுப்பவும்",

    whatsappFather: "வாட்ஸ்அப்பில் சர்வஜீத்தின் தந்தையைத் தொடர்புகொள்ளவும்",

    email: "மின்னஞ்சல்",

    location: "📍 இருப்பிடம்",

    shareLocation: "எனது இருப்பிடத்தைப் பகிரவும்"

  },

  hi: {

    language: "भाषा",

    thankYou: "स्कैन करने के लिए धन्यवाद",

    welcome: "हो सकता है आपको कोई ऐसा व्यक्ति मिला हो जिसे मदद की आवश्यकता है। कृपया शांत रहें और परिवार से संपर्क करने के लिए नीचे दिए गए बटन का उपयोग करें।",

    important: "इस व्यक्ति को संवाद करने में कठिनाई हो सकती है। यदि वह खोया हुआ दिखाई दे या उसे सहायता की आवश्यकता हो, तो कृपया तुरंत परिवार से संपर्क करें।",

    reward: "🌼 पुरस्कार",

    rewardText: "हमारे प्रियजन को सुरक्षित रूप से परिवार से मिलाने में सहायता करने के लिए आभार के रूप में पुरस्कार दिया जा सकता है।",

    scroll: "↓ अधिक जानकारी के लिए नीचे स्क्रॉल करें",

    emergency: "📞 आपातकालीन संपर्क",

    name: "नाम",

    primary: "प्राथमिक संपर्क",

    secondary: "द्वितीयक संपर्क",

    phone: "फ़ोन",

    sms: "SMS",

    whatsapp: "WhatsApp",

    smsDeepa: "दीपा को आपातकालीन SMS भेजें",

    whatsappDeepa: "WhatsApp पर दीपा से संपर्क करें",

    smsFather: "सर्वजीत के पिता को आपातकालीन SMS भेजें",

    whatsappFather: "WhatsApp पर सर्वजीत के पिता से संपर्क करें",

    email: "ईमेल",

    location: "📍 स्थान",

    shareLocation: "मेरा स्थान साझा करें"

  }

};

/* =====================================

   LANGUAGE SELECTION

===================================== */

function setLanguage(language) {

  if (language === "en") {

    location.reload();

    return;

  }

  const t = translations[language];

  if (!t) {

    return;

  }

  const elements =

    document.querySelectorAll("[data-translate]");

  elements.forEach(function (element) {

    const key =

      element.getAttribute("data-translate");

    if (t[key]) {

      element.textContent = t[key];

    }

  });

}

/* =====================================

   SUPABASE SCAN + LOCATION RECORDING

===================================== */

const HOPELINK_SUPABASE_URL =

  "https://vnlrsjgyugxfsrjuixjs.supabase.co";

const HOPELINK_SUPABASE_KEY =

  "sb_publishable_bMQ03djIyUNPEeGgKNrD9w_b1_nSwXb";

/* Create Supabase connection */

const hopeLinkSupabase =

  window.supabase.createClient(

    HOPELINK_SUPABASE_URL,

    HOPELINK_SUPABASE_KEY

  );

/* Get best available location */

function getScanLocation() {

  return new Promise(function (resolve) {

    if (!navigator.geolocation) {

      resolve(null);

      return;

    }

    navigator.geolocation.getCurrentPosition(

      function (position) {

        resolve({

          latitude: position.coords.latitude,

          longitude: position.coords.longitude,

          accuracy: position.coords.accuracy

        });

      },

      function (error) {

        console.log(

          "Scan location unavailable:",

          error.code,

          error.message

        );

        resolve(null);

      },

      {

        enableHighAccuracy: true,

        timeout: 15000,

        maximumAge: 0

      }

    );

  });

}

/* Record HopeLink scan */

async function recordHopeLinkScan() {

  try {

    const deviceType =

      /iPhone|iPad|iPod/i.test(navigator.userAgent)

        ? "Apple"

        : /Android/i.test(navigator.userAgent)

        ? "Android"

        : "Other";

    /* Try to obtain location */

    const location = await getScanLocation();

    /* Prepare scan information */

    const scanData = {

      scan_type: "page_scan",

      device_type: deviceType,

      user_agent: navigator.userAgent

    };

    /* Add location when available */

    if (location) {

      scanData.latitude = location.latitude;

      scanData.longitude = location.longitude;

      scanData.accuracy = location.accuracy;

    }

    /* Save scan */

    const { error } =

      await hopeLinkSupabase

        .from("scan_events")

        .insert(scanData);

    if (error) {

      console.error(

        "HopeLink scan recording error:",

        error

      );

      return;

    }

    console.log(

      "HopeLink scan and location recorded successfully."

    );

  } catch (error) {

    console.error(

      "HopeLink recording error:",

      error

    );

  }

}

/* Record scan when page loads */

document.addEventListener(

  "DOMContentLoaded",

  function () {

    recordHopeLinkScan();

  }

);
