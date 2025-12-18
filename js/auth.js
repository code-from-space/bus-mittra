function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log("Logged in UID:", user.uid);

      const docRef = db.collection("users").doc(user.uid);
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        alert("No role assigned. Contact admin.");
        return;
      }

      const role = docSnap.data().role;
      console.log("User role:", role);

      if (role === "admin") {
        window.location.href = "../admin/dashboard.html";
      } else if (role === "user") {
        window.location.href = "../user/dashboard.html";
      } else if (role === "driver") {
        window.location.href = "../driver/dashboard.html";
      } else {
        alert("Invalid role value in database");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}
