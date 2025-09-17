/* ===============================
   Charts.js - Dashboard Charts
================================ */
function getTransactions() {
  return JSON.parse(localStorage.getItem("transactions")) || [];
}

/* ===============================
   Expenses by Category (Pie Chart)
================================ */
function renderCategoryChart() {
  const ctx = document.getElementById("categoryChart");
  if (!ctx) return; // Only run on index.html

  const transactions = getTransactions();
  const expenses = transactions.filter((t) => t.type === "expense");

  const categoryTotals = {};
  expenses.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: categories.length ? categories : ["No Data"],
      datasets: [
        {
          data: amounts.length ? amounts : [1],
          backgroundColor: [
            "#FF6384", // red
            "#36A2EB", // blue
            "#FFCE56", // yellow
            "#4BC0C0", // teal
            "#9966FF", // purple
            "#FF9F40", // orange
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
      },
    },
  });
}

/* ===============================
   Income vs Expenses (Bar Chart)
================================ */
function renderTrendChart() {
  const ctx = document.getElementById("trendChart");
  if (!ctx) return;

  const transactions = getTransactions();

  // Group by month
  const monthlyData = {};
  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", { month: "short", year: "numeric" });
    if (!monthlyData[month]) {
      monthlyData[month] = { income: 0, expense: 0 };
    }
    if (t.type === "income") {
      monthlyData[month].income += t.amount;
    } else {
      monthlyData[month].expense += t.amount;
    }
  });

  const months = Object.keys(monthlyData);
  const incomeData = months.map((m) => monthlyData[m].income);
  const expenseData = months.map((m) => monthlyData[m].expense);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: months.length ? months : ["No Data"],
      datasets: [
        {
          label: "Income",
          data: incomeData.length ? incomeData : [0],
          backgroundColor: "rgba(75, 192, 192, 0.7)",
        },
        {
          label: "Expenses",
          data: expenseData.length ? expenseData : [0],
          backgroundColor: "rgba(255, 99, 132, 0.7)",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}

/* ===============================
   Init Charts (only on index.html)
================================ */
renderCategoryChart();
renderTrendChart();
