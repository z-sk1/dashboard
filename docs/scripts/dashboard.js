const token = localStorage.getItem("token");

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
    updateChartColors();
});

function updateChartColors() {
    if (!chart) return;

    chart.options.plugins.legend.labels.color = 
        getComputedStyle(document.body).getPropertyValue("--text");

    chart.update();
}

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

async function loadUser() {
    if (!token) return;

    const res = await fetch(`${API_BASE}/me`, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) {
        // invalid token or expired
        localStorage.removeItem("token");
        return;
    }

    const data = await res.json();
    document.getElementById("username").textContent = data.username;
}

async function loadExpenseTotal() {
    if (!token) return;

    const res = await fetch(`${API_BASE}/expenses/total`, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await res.json();
    document.getElementById("totalSpent").textContent = data.total.toFixed(2);
}

async function loadNoteTotal() {
    if (!token) return;

    const res = await fetch(`${API_BASE}/notes/total`, {
        headers: {"Authorization": `Bearer ${token}`}
    });

    const data = await res.json();
    document.getElementById("totalNotes").textContent = data.total;
}

async function loadReminderTotal() {
    if (!token) return;

    const res = await fetch(`${API_BASE}/reminders/total`, {
        headers: {"Authorization": `Bearer ${token}`}
    });

    const data = await res.json();
    document.getElementById("totalReminders").textContent = data.total;
}

document.addEventListener("DOMContentLoaded", () => {
    updateButtons();
    loadUser();
    loadNoteTotal();
    loadExpenseTotal();
    loadReminderTotal();
    loadCategoryChart();
});