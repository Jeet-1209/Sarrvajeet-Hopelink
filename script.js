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

      ) 
      {

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
function retryPendingLocation() {

  return;

}

document.addEventListener(

  "visibilitychange",

  function () {

    if (!document.hidden) {

      retryPendingLocation();

    }

  }

);

window.addEventListener(

  "focus",

  function () {

    retryPendingLocation();

  }

);

window.addEventListener(

  "pageshow",

  function () {

    retryPendingLocation();

  }

);
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

}
function setLanguage(language) {

  currentLanguage = language;

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
const HOPELINK_SUPABASE_URL =

  "https://vnlrsjgyugxfsrjuixjs.supabase.co";

const HOPELINK_SUPABASE_KEY =

  "sb_publishable_bMQ03djIyUNPEeGgKNrD9w_b1_nSwXb";

let hopeLinkSupabase = null;

if (window.supabase) {

  hopeLinkSupabase =

    window.supabase.createClient(

      HOPELINK_SUPABASE_URL,

      HOPELINK_SUPABASE_KEY

    );

} else {

  console.error("Supabase library is not available.");

}
