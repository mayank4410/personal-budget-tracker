/* =======================================
   logout.js
   Handles logout action
======================================= */
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("token"); // clear JWT
      alert("Logged out successfully!");
      window.location.href = "login.html"; // redirect to login
    });
  }
});
