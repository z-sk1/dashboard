let chart; // global so we can destroy and rebuild if needed

async function loadCategoryChart() {
    const res = await fetch(`${API_BASE}/expenses/categories`, {
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await res.json();
    const categories = data.categories;

    const labels = categories.map(c => c.category);
    const values = categories.map(c => c.total);

    const ctx = document.getElementById("categoryChart").getContext("2d");

    // destroy previous chart if reloading
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: labels,
            datasets: [{
                data: values,
                borderWidth: 2,
                hoverOffset: 6,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: getComputedStyle(document.body).getPropertyValue("--text")
                    }
                }
            }
        }
    });
}