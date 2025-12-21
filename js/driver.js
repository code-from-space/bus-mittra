let map, marker, watchId;
let currentUser;
let busDocId = "HRYiSDU9ZFH4AdJBuKKq"; // YOUR BUS DOCUMENT ID

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "../auth/login.html";
    return;
  }

  currentUser = user;
  document.getElementById("driverEmail").innerText =
    "Logged in as: " + user.email;

  initMap();
});

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 26.9124, lng: 75.7873 },
    zoom: 14,
  });

  marker = new google.maps.Marker({
    map: map,
    position: { lat: 26.9124, lng: 75.7873 },
    title: "Bus Location",
  });
}

function startSharing() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  watchId = navigator.geolocation.watchPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      marker.setPosition({ lat, lng });
      map.setCenter({ lat, lng });

      // 🔥 Update Firestore
      await db.collection("buses").doc(busDocId).update({
        lat: lat,
        lng: lng,
        status: "active",
        driverId: currentUser.uid,
      });
    },
    (err) => alert(err.message),
    { enableHighAccuracy: true }
  );
}

function stopSharing() {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
    alert("Location sharing stopped");
  }
}
