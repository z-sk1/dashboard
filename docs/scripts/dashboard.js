const token = localStorage.getItem("token");
const username = localStorage.getItem("username");
const totalSpent = localStorage.getItem("totalSpent");

const themeToggle = document.getElementById("themeToggle");

// load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.toggle("dark", savedTheme === "dark");

// update button icon
themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

// toggle theme
themeToggle.addEventListener("click", () => {
    const newTheme = document.body.classList.toggle("dark") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

function updateButtons() {
    const token = localStorage.getItem("token");

    document.getElementById("logoutBtn").style.display = token ? "block" : "none";
    document.getElementById("signUpBtn").style.display = token ? "none" : "block";
    document.getElementById("loginBtn").style.display = token ? "none" : "block";
}

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    document.getElementById("username").innerHTML = "";
    updateButtons();
});

document.addEventListener("DOMContentLoaded", () => {
    updateButtons();
    if (!username) return;
    document.getElementById("username").innerHTML = username;
    if (!totalSpent) return;
    document.getElementById("totalSpent").innerHTML = totalSpent;
});