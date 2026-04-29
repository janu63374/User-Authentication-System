
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.onclick = () => {
    document.body.classList.toggle("dark");
  };
}

function togglePassword(id) {
  const field = document.getElementById(id);
  field.type = field.type === "password" ? "text" : "password";
}

/***************************
  REGISTER PAGE LOGIC
***************************/
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const strength = document.getElementById("strength");

    let valid = true;

    // Username
    if (username.value.trim() === "") {
      setError(username, "Username is required");
      valid = false;
    } else setSuccess(username);

    // Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      setError(email, "Enter valid email");
      valid = false;
    } else setSuccess(email);

    // Phone (India)
    if (!/^[6-9]\d{9}$/.test(phone.value)) {
      setError(phone, "Enter valid phone number");
      valid = false;
    } else setSuccess(phone);

    // Password
    if (password.value.length < 8) {
      setError(password, "Minimum 8 characters");
      valid = false;
    } else setSuccess(password);

    // Confirm password
    if (confirmPassword.value !== password.value) {
      setError(confirmPassword, "Passwords do not match");
      valid = false;
    } else setSuccess(confirmPassword);

    if (valid) {
      const userData = {
        username: username.value,
        email: email.value,
        phone: phone.value,
        password: password.value
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      alert("Registration Successful!");
      window.location.href = "login.html";
    }
  });
}

/***************************
  PASSWORD STRENGTH
***************************/
const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strength");

if (passwordInput && strengthBar) {
  passwordInput.addEventListener("input", () => {
    let level = 0;
    const val = passwordInput.value;

    if (val.length >= 8) level++;
    if (/[A-Z]/.test(val)) level++;
    if (/[0-9]/.test(val)) level++;
    if (/[@$!%*?&]/.test(val)) level++;

    strengthBar.style.width = level * 25 + "%";
    strengthBar.style.background =
      level < 2 ? "red" : level < 4 ? "orange" : "green";
  });
}

/***************************
  LOGIN PAGE LOGIC
***************************/
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const user = JSON.parse(localStorage.getItem("userData"));

    if (!user) {
      alert("No user found. Please register first.");
      return;
    }

    if (user.email === email && user.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password");
    }
  });
}

/***************************
  DASHBOARD PROTECTION
***************************/
if (window.location.pathname.includes("dashboard.html")) {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
  } else {
    const user = JSON.parse(localStorage.getItem("userData"));
    document.getElementById("userInfo").innerText =
      `Username: ${user.username}\nEmail: ${user.email}\nPhone: ${user.phone}`;
  }
}

/***************************
  LOGOUT
***************************/
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

/***************************
  ERROR & SUCCESS FUNCTIONS
***************************/
function setError(input, message) {
  const parent = input.parentElement;
  parent.classList.add("error");
  parent.querySelector("small").innerText = message;
}

function setSuccess(input) {
  const parent = input.parentElement;
  parent.classList.remove("error");
}
