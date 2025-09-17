/* ===============================
   API Helper
   - Handles GET, POST, PUT, DELETE
   - Uses fetch()
================================ */
const API_BASE = "http://localhost:5000/api"; // update when deployed

async function apiRequest(endpoint, method = "GET", body = null) {
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
    };

    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`${API_BASE}${endpoint}`, options);

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("API request failed:", err.message);
    return null;
  }
}

/* ===============================
   Transactions
================================ */
async function getTransactions() {
  return await apiRequest("/transactions");
}

async function addTransaction(data) {
  return await apiRequest("/transactions", "POST", data);
}

/* ===============================
   Budgets
================================ */
async function getBudgets() {
  return await apiRequest("/budgets");
}

async function setBudget(data) {
  return await apiRequest("/budgets", "POST", data);
}

/* ===============================
   Groups
================================ */
async function getGroupExpenses() {
  return await apiRequest("/groups/expenses");
}

async function addGroupExpense(data) {
  return await apiRequest("/groups/expenses", "POST", data);
}

async function getGroupMembers() {
  return await apiRequest("/groups/members");
}

async function addGroupMember(data) {
  return await apiRequest("/groups/members", "POST", data);
}

/* ===============================
   Auth (Optional for later)
================================ */
async function login(credentials) {
  return await apiRequest("/auth/login", "POST", credentials);
}

async function register(userData) {
  return await apiRequest("/auth/register", "POST", userData);
}
