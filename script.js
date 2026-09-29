let currentLanguage = "en";

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
attemptPendingLocation();
}

function sendEmergencyMessage(phone, app) {

  pendingLocationAction = {

    type: "emergency",

    phone: phone,

    app: app

  };
attemptPendingLocation();
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
    "Please turn ON Location Services and refresh the page, then try again."
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

    shareLocation: "எனது இருப்பிடத்தைப் பகிரவும்",

helpingSarrvajeet: "💛 சார்வஜீத்திற்கு உதவுதல்",

stayCalm: "தயவுசெய்து அமைதியாக இருந்து மென்மையாகப் பேசுங்கள்",
calmEnvironment: "அமைதியான மற்றும் நிம்மதியான சூழல் சார்வஜீத் பாதுகாப்பாகவும் வசதியாகவும் உணர உதவும்.",

gentleTone: "தயவுசெய்து அமைதியான மற்றும் மென்மையான குரலில் பேசுங்கள்.",

avoidNegativeSpeech: "அவரைச் சுற்றி கத்துவதையும், வாக்குவாதம் செய்வதையும் அல்லது கடுமையாகப் பேசுவதையும் தவிர்க்கவும்.",

anxietySpeech: "திடீரான அல்லது எதிர்மறையான பேச்சு அவருக்கு பதற்றத்தை ஏற்படுத்தக்கூடும்.",

ifAnxious: "அவர் பதற்றமாக இருந்தால், தயவுசெய்து அமைதியாக இருந்து நிலைமையை மேலும் மோசமாக்காதீர்கள்.",

giveSpace: "அவர் அமைதியாகும் வரை சிறிது நேரமும் இடமும் கொடுங்கள்.",
comfortTitle: "தயவுசெய்து சார்வஜீத் வசதியாக இருப்பதை உறுதி செய்யுங்கள்",

comfortStanding: "சார்வஜீத்தால் நீண்ட நேரம் வசதியாக நிற்கவோ உட்காரவோ முடியாது.",

comfortRest: "அவர் சோர்வாகவோ அல்லது அசௌகரியமாகவோ இருந்தால், பாதுகாப்பான மற்றும் வசதியான இடத்தில் ஓய்வெடுக்க அனுமதிக்கவும்.",

comfortForce: "அவரை நீண்ட நேரம் உட்காரவோ நிற்கவோ கட்டாயப்படுத்த வேண்டாம்.",
helpfulWordsTitle: "சார்வஜீத்திற்கு உதவும் வார்த்தைகள்",

positiveResponse: "சார்வஜீத் நேர்மறையான மற்றும் நம்பிக்கையூட்டும் வார்த்தைகளுக்கு நன்றாகப் பதிலளிப்பார்.",

reassuringWords: "“நல்ல பையன்” மற்றும் “எல்லாம் சரியாகிவிடும்” போன்ற மென்மையான நம்பிக்கையூட்டும் வார்த்தைகள் அவர் அமைதியாகவும் பாதுகாப்பாகவும் உணர உதவும்.",

positiveTone: "தயவுசெய்து அவரிடம் நேர்மறையான மற்றும் நம்பிக்கையூட்டும் குரலில் பேசுங்கள்.",

negativeWords: "எதிர்மறையான, பயமுறுத்தும் அல்லது கடுமையான வார்த்தைகள் அவருக்கு பதற்றத்தை ஏற்படுத்தக்கூடும்.",

whenAnxious: "அவர் பதற்றமடைவது தெரிந்தால், எதிர்மறையான கருத்துகளைத் தவிர்த்து, அமைதியாகவும் நம்பிக்கையூட்டும் விதத்திலும் தொடர்ந்து பேசுங்கள்.",

calmVoice: "அமைதியான குரலும் நம்பிக்கையூட்டும் வார்த்தைகளும் அவருக்கு மிகவும் உதவியாக இருக்கும்.",
overwhelmedTitle: "சார்வஜீத் மிகவும் பதற்றமடைந்தால்",

defensiveReaction: "சார்வஜீத் அச்சுறுத்தப்படுவதாக உணர்ந்தாலோ, காயமடைந்தாலோ அல்லது மிகவும் பதற்றமடைந்தாலோ, தன்னைப் பாதுகாத்துக் கொள்ளும் விதமாக தற்காப்பாகச் செயல்படக்கூடும்.",

doNotConfront: "தயவுசெய்து அவரைக் கத்தவோ, மிரட்டவோ, காயப்படுத்தவோ அல்லது உடல்ரீதியாக எதிர்கொள்ளவோ வேண்டாம்.",

stayCalmSpace: "அமைதியாக இருந்து அவருக்கு சிறிது இடம் கொடுங்கள்.",

gentleVoice: "உங்கள் குரலை மென்மையாகவும் நம்பிக்கையூட்டும் விதத்திலும் வைத்துக்கொள்ளுங்கள்.",

calmExpression: "எல்லாம் சரியாக இருப்பது போல அமைதியான மற்றும் நம்பிக்கையூட்டும் முகபாவனையுடன் நடந்து கொள்ள முயற்சி செய்யுங்கள்.",

sayReassuring: "“நல்ல பையன்” அல்லது “எல்லாம் சரியாகிவிடும்” என்று மென்மையாகச் சொல்லலாம்.",

avoidAngryWords: "எதிர்மறையான, பயமுறுத்தும் அல்லது கோபமான வார்த்தைகளைத் தவிர்க்கவும்.",

settleQuickly: "அமைதியான மற்றும் நம்பிக்கையூட்டும் அணுகுமுறை அவர் விரைவாக அமைதியடைந்து தனது இயல்பான நிலைக்குத் திரும்ப உதவும்.",

rememberCalm: "தயவுசெய்து நினைவில் கொள்ளுங்கள்: அமைதி, பொறுமை மற்றும் அன்பான அணுகுமுறை அவர் பாதுகாப்பாக உணர உதவும்.",

languages: "மொழிகள்",

understands: "சார்வஜீத் புரிந்துகொள்ளக்கூடிய மொழிகள்: ஆங்கிலம் • தமிழ் • இந்தி"
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
async function recordHopeLinkScan() {

  if (!hopeLinkSupabase) {

    return;

  }

  try {

    const isAppleDevice =

      /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent) &&

      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const deviceType =

      isAppleDevice

        ? "Apple"

        : /Android/i.test(navigator.userAgent)

        ? "Android"

        : "Other";

    const location = await getScanLocation();

    const scanData = {

      scan_type: "page_scan",

      device_type: deviceType,

      user_agent: navigator.userAgent

    };

    if (location) {

      scanData.latitude = location.latitude;

      scanData.longtitude = location.longitude;

      scanData.accuracy = location.accuracy;
const approximateLocation =

    await getApproximateLocation(

      location.latitude,

      location.longitude

    );

  if (approximateLocation) {

    scanData.city = approximateLocation.city;

    scanData.region = approximateLocation.region;

    scanData.country = approximateLocation.country;

  }

}
    

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
document.addEventListener(

  "DOMContentLoaded",

  function () {

    recordHopeLinkScan();

  }

);
async function getApproximateLocation(latitude, longitude) {

  try {

    const url =

      "https://api.bigdatacloud.net/data/reverse-geocode-client" +

      "?latitude=" + latitude +

      "&longitude=" + longitude +

      "&localityLanguage=en";

    const response = await fetch(url);

    if (!response.ok) {

      console.log(

        "Approximate location lookup failed:",

        response.status

      );

      return null;

    }

    const data = await response.json();

    return {

      city: data.city || data.locality || "",

      region: data.principalSubdivision || "",

      country: data.countryName || ""

    };

  } catch (error) {

    console.log(

      "Approximate location lookup error:",

      error

    );

    return null;

  }

}
