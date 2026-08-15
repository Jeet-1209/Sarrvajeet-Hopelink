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

/* Get the person's current location */

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

    function () {

      failureCallback();

    },

    {

      enableHighAccuracy: true,

      timeout: 10000,

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

      /* -----------------------------

         SHARE LOCATION

      ----------------------------- */

      if (pendingLocationAction === "share") {

        pendingLocationAction = null;

        window.location.href = mapUrl;

        return;

      }

      /* -----------------------------

         EMERGENCY MESSAGE

      ----------------------------- */

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

        /* Clear pending action BEFORE opening WhatsApp/SMS */

        pendingLocationAction = null;

        /* -----------------------------

           WHATSAPP

        ----------------------------- */

        if (app === "whatsapp") {

          window.location.href =

            "https://wa.me/" +

            phone +

            "?text=" +

            encodeURIComponent(message);

          return;

        }

        /* -----------------------------

           SMS

        ----------------------------- */

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

    function () {

      /*

         Location is not currently available.

         Keep the action pending so that when

         the person turns Location ON and returns

         to HopeLink, we can try again.

      */

      if (pendingLocationAction) {

        alert(

          "Please turn ON Location Services and allow location access. Then return to this page."

        );

      }

    }

  );

}

/* =====================================

   AUTOMATIC LOCATION RETRY

===================================== */

function retryPendingLocation() {

  if (!pendingLocationAction) {

    return;

  }

  clearTimeout(locationRetryTimer);

  locationRetryTimer = setTimeout(function () {

    attemptPendingLocation();

  }, 700);

}

/*

   When the person returns to HopeLink

   after changing Location settings,

   automatically try again.

*/

document.addEventListener("visibilitychange", function () {

  if (!document.hidden) {

    retryPendingLocation();

  }

});

/*

   Additional support for iPhone/iPad

*/

window.addEventListener("focus", function () {

  retryPendingLocation();

});

window.addEventListener("pageshow", function () {

  retryPendingLocation();

});

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
