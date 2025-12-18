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
