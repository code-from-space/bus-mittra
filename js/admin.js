let map;
let busMarkers = {};

auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "../auth/login.html";
    return;
  }

  // Verify admin role
  const snap = await db.collection("users").doc(user.uid).get();
  if (!snap.exists || snap.data().role !== "admin") {
    alert("Access denied");
    auth.signOut();
    return;
  }

  document.getElementById("adminEmail").innerText =
    "Logged in as: " + user.email;

  initMap();
  listenToBuses();
});

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 26.9124, lng: 75.7873 },
    zoom: 12,
  });
}

db.collection("buses").onSnapshot(snapshot => {
  let total = 0, active = 0, inactive = 0;

  snapshot.forEach(doc => {
    total++;
    doc.data().status === "active" ? active++ : inactive++;
  });

  document.getElementById("totalBuses").innerText = total;
  document.getElementById("activeBuses").innerText = active;
  document.getElementById("inactiveBuses").innerText = inactive;
});

db.collection("complaints").onSnapshot(snapshot => {
  document.getElementById("totalComplaints").innerText = snapshot.size;
});


function listenToBuses() {
  db.collection("buses").onSnapshot((snapshot) => {
    snapshot.forEach((doc) => {
      const bus = doc.data();
      const id = doc.id;

      if (!bus.lat || !bus.lng) return;

      const position = {
        lat: Number(bus.lat),
        lng: Number(bus.lng),
      };

      if (busMarkers[id]) {
        busMarkers[id].setPosition(position);
      } else {
        const marker = new google.maps.Marker({
          position,
          map,
          title: `Bus ${bus.busNumber}`,
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/bus.png",
          },
        });

        const info = new google.maps.InfoWindow({
          content: `
            <strong>Bus:</strong> ${bus.busNumber}<br>
            <strong>Route:</strong> ${bus.route}<br>
            <strong>Status:</strong> ${bus.status}
          `,
        });

        marker.addListener("click", () => info.open(map, marker));

        busMarkers[id] = marker;
      }
    });
  });
}

function logout() {
  auth.signOut().then(() => {
    window.location.href = "../auth/login.html";
  });
}

db.collection("buses").onSnapshot(snapshot => {
  let total = 0, active = 0, inactive = 0;

  snapshot.forEach(doc => {
    total++;
    doc.data().status === "active" ? active++ : inactive++;
  });

  document.getElementById("totalBuses").innerText = total;
  document.getElementById("activeBuses").innerText = active;
  document.getElementById("inactiveBuses").innerText = inactive;
});

db.collection("complaints").onSnapshot(snapshot => {
  document.getElementById("totalComplaints").innerText = snapshot.size;
});

function createBus() {
  const busNumber = document.getElementById("busNumber").value;
  const route = document.getElementById("busRoute").value;
  const status = document.getElementById("busStatus").value;

  if (!busNumber || !route) {
    alert("Fill all fields");
    return;
  }

  db.collection("buses").add({
    busNumber,
    route,
    status,
    lat: 26.9124,
    lng: 75.7873,
    driverId: ""
  }).then(() => {
    alert("Bus added successfully");
  });
}

function assignBus() {
  const busId = document.getElementById("assignBusId").value;
  const driverId = document.getElementById("assignDriverId").value;

  if (!busId || !driverId) {
    alert("Missing fields");
    return;
  }

  db.collection("buses").doc(busId).update({
    driverId
  }).then(() => {
    alert("Driver assigned to bus");
  });
}

db.collection("complaints")
  .orderBy("timestamp", "desc")
  .onSnapshot(snapshot => {
    const list = document.getElementById("complaintList");
    list.innerHTML = "";

    snapshot.forEach(doc => {
      const c = doc.data();
      list.innerHTML += `
        <li>
          🚌 <b>${c.busNumber}</b> — ${c.message}
        </li>
      `;
    });
});

let heatmap;

db.collection("buses").onSnapshot(snapshot => {
  const points = [];

  snapshot.forEach(doc => {
    const bus = doc.data();
    if (bus.lat && bus.lng) {
      points.push(
        new google.maps.LatLng(bus.lat, bus.lng)
      );
    }
  });

  if (heatmap) heatmap.setMap(null);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: points,
    radius: 40
  });

  heatmap.setMap(map);
});

