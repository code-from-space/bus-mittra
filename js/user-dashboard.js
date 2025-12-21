let map;
let busMarkers = {};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 26.9124, lng: 75.7873 },
    zoom: 12,
  });
}

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "../auth/login.html";
    return;
  }

  document.getElementById("welcome").innerText =
    "Welcome to BUS Mittra, " + user.email;

  loadBuses();
});

function loadBuses() {
  const select = document.getElementById("busSelect");
  select.innerHTML = `<option value="">Select a bus</option>`;

  db.collection("buses")
    .where("status", "==", "active")
    .onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const bus = doc.data();

        // Dropdown
        const option = document.createElement("option");
        option.value = doc.id;
        option.textContent = `Bus ${bus.busNumber} – ${bus.route}`;
        option.dataset.lat = bus.lat;
        option.dataset.lng = bus.lng;
        select.appendChild(option);

        // Marker
        const pos = {
          lat: parseFloat(bus.lat),
          lng: parseFloat(bus.lng),
        };

        if (!busMarkers[doc.id]) {
          busMarkers[doc.id] = new google.maps.Marker({
            position: pos,
            map,
            title: `Bus ${bus.busNumber}`,
          });
        } else {
          busMarkers[doc.id].setPosition(pos);
        }
      });
    });

  select.onchange = () => {
    const opt = select.selectedOptions[0];
    if (!opt.dataset.lat) return;

    map.panTo({
      lat: parseFloat(opt.dataset.lat),
      lng: parseFloat(opt.dataset.lng),
    });
    map.setZoom(15);
  };
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = "../auth/login.html";
  });
}
