/* =======================================
   register.js
   Handles registration frontend
======================================= */
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
      const res = await api.post("/auth/register", { name, email, password });
      if (res.token) {
        localStorage.setItem("token", res.token);
        alert("Registration successful!");
        window.location.href = "index.html";
      }
    } catch (err) {
      console.error("Registration failed", err);
      alert("Could not register user");
    }
  });
});
