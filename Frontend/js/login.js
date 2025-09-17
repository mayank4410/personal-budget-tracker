/* =======================================
   login.js
   Handles login frontend
======================================= */
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.token) {
        localStorage.setItem("token", res.token);
        alert("Login successful!");
        window.location.href = "index.html";
      }
    } catch (err) {
      console.error("Login failed", err);
      alert("Invalid credentials");
    }
  });
});
