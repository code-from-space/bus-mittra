// Get role from URL
const params = new URLSearchParams(window.location.search);
const role = params.get("role");

// Show role on login page
if (document.getElementById("roleTitle")) {
  document.getElementById("roleTitle").innerText =
    "Login as " + role.toUpperCase();
}

// Simple login simulation
function login() {
  const mobile = document.getElementById("mobile").value;

  if (mobile.length < 10) {
    alert("Enter valid mobile number");
    return;
  }

  if (role === "user") {
    window.location.href = "user.html";
  } else if (role === "driver") {
    window.location.href = "driver.html";
  } else if (role === "admin") {
    window.location.href = "admin.html";
  }
}


const busSelect = document.getElementById("busSelect");

db.collection("buses")
  .where("status", "==", "active")
  .onSnapshot((snapshot) => {
    busSelect.innerHTML = `<option value="">Select a bus</option>`;

    snapshot.forEach((doc) => {
      const bus = doc.data();
      const option = document.createElement("option");

      option.value = doc.id;
      option.textContent = `Bus ${bus.busNumber} — ${bus.route}`;

      busSelect.appendChild(option);
    });
  });


  function submitComplaint() {
  const title = document.getElementById("complaintTitle").value;
  const message = document.getElementById("complaintMessage").value;

  const user = auth.currentUser;
  if (!user) return alert("Not logged in");

  db.collection("complaints").add({
    userId: user.uid,
    email: user.email,
    title: title,
    message: message,
    status: "pending",
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert("Complaint submitted");
    window.location.href = "dashboard.html";
  })
  .catch(err => alert(err.message));
}

function submitComplaint() {
  const title = document.getElementById("complaintTitle").value;
  const message = document.getElementById("complaintMessage").value;

  if (!title || !message) {
    alert("Please fill all fields");
    return;
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      alert("You must be logged in");
      return;
    }

    firebase.firestore().collection("complaints").add({
      userId: user.uid,
      email: user.email,
      title: title,
      message: message,
      status: "open",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      alert("Complaint submitted successfully");
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
  });
}
