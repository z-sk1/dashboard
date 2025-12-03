const API_BASE = "http://192.168.1.179:8080";

async function signup() {
    const username = document.getElementById("signUpUsername").value.trim();
    const password = document.getElementById("signUpPassword").value.trim();
    if (!username || !password) {
        alert("Please enter username and password");
        return;
    }

    const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json()
    if (res.ok) {
        alert("Signup succesful! You can login now.");
    } else {
        alert(data.error || "Signup failed");
    }
}

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
    localStorage.setItem("username", data.username);
}

async function loadExpenseTotal() {
    const res = await fetch(`${API_BASE}/expenses/total`, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await res.json();
    localStorage.setItem("totalSpent", data.total.toFixed(2));
}

async function loadNoteTotal() {
    const res = await fetch(`${API_BASE}/notes/total`, {
        headers: { "Autho" }
    });
}

async function login() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    if (!username || !password) {
        alert("Please enter username and password");
        return;
    }

    const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        loadUser();
        loadTotal();
        alert("Login successful!");
    } else {
        alert(data.error || "Login failed");
    }
}