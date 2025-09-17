/* ===============================
   Local Storage Helpers
================================ */
function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/* ===============================
   Transactions (Add Transaction Page)
================================ */
const transactionForm = document.getElementById("transaction-form");
if (transactionForm) {
  transactionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    const notes = document.getElementById("notes").value;

    const transaction = { amount, type, category, date, notes };

    const transactions = getData("transactions");
    transactions.push(transaction);
    saveData("transactions", transactions);

    alert("Transaction added successfully!");
    transactionForm.reset();
  });
}

/* ===============================
   Dashboard (index.html)
================================ */
function updateDashboard() {
  const transactions = getData("transactions");

  let income = 0, expenses = 0;
  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expenses += t.amount;
  });

  const balance = income - expenses;

  // Update DOM
  if (document.getElementById("total-income"))
    document.getElementById("total-income").textContent = `$${income.toFixed(2)}`;
  if (document.getElementById("total-expenses"))
    document.getElementById("total-expenses").textContent = `$${expenses.toFixed(2)}`;
  if (document.getElementById("balance"))
    document.getElementById("balance").textContent = `$${balance.toFixed(2)}`;
}
updateDashboard();

/* ===============================
   Budget (budget.html)
================================ */
const budgetForm = document.getElementById("budget-form");
if (budgetForm) {
  budgetForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const budget = parseFloat(document.getElementById("budget").value);

    let budgets = getData("budgets");
    const existing = budgets.find((b) => b.category === category);

    if (existing) {
      existing.amount = budget;
    } else {
      budgets.push({ category, amount: budget });
    }

    saveData("budgets", budgets);
    renderBudgetTable();
    budgetForm.reset();
  });

  function renderBudgetTable() {
    const budgets = getData("budgets");
    const transactions = getData("transactions");
    const tbody = document.getElementById("budget-table");
    tbody.innerHTML = "";

    if (budgets.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="text-muted">No budget set yet</td></tr>`;
      return;
    }

    budgets.forEach((b) => {
      const spent = transactions
        .filter((t) => t.category === b.category && t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      const remaining = b.amount - spent;

      tbody.innerHTML += `
        <tr>
          <td>${b.category}</td>
          <td>$${b.amount.toFixed(2)}</td>
          <td>$${spent.toFixed(2)}</td>
          <td class="${remaining < 0 ? "text-danger" : "text-success"}">
            $${remaining.toFixed(2)}
          </td>
        </tr>
      `;
    });
  }
  renderBudgetTable();
}

/* ===============================
   Groups (group.html)
================================ */
const memberForm = document.getElementById("member-form");
const groupExpenseForm = document.getElementById("group-expense-form");

if (memberForm) {
  memberForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const memberName = document.getElementById("memberName").value;
    let members = getData("members");

    if (members.includes(memberName)) {
      alert("Member already exists!");
      return;
    }

    members.push(memberName);
    saveData("members", members);
    updateMembersDropdown();
    renderBalances();

    memberForm.reset();
  });

  groupExpenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const payer = document.getElementById("payer").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const description = document.getElementById("description").value;

    const expense = { payer, amount, description };

    let expenses = getData("groupExpenses");
    expenses.push(expense);
    saveData("groupExpenses", expenses);

    renderGroupExpenses();
    renderBalances();

    groupExpenseForm.reset();
  });

  function updateMembersDropdown() {
    const members = getData("members");
    const payerSelect = document.getElementById("payer");
    payerSelect.innerHTML = `<option value="" disabled selected>Select member</option>`;
    members.forEach((m) => {
      payerSelect.innerHTML += `<option value="${m}">${m}</option>`;
    });
  }

  function renderGroupExpenses() {
    const expenses = getData("groupExpenses");
    const tbody = document.getElementById("group-expense-table");
    tbody.innerHTML = "";

    if (expenses.length === 0) {
      tbody.innerHTML = `<tr><td colspan="3" class="text-muted">No expenses added yet</td></tr>`;
      return;
    }

    expenses.forEach((e) => {
      tbody.innerHTML += `
        <tr>
          <td>${e.payer}</td>
          <td>$${e.amount.toFixed(2)}</td>
          <td>${e.description}</td>
        </tr>
      `;
    });
  }

  function renderBalances() {
    const members = getData("members");
    const expenses = getData("groupExpenses");
    const tbody = document.getElementById("balance-table");
    tbody.innerHTML = "";

    if (members.length === 0) {
      tbody.innerHTML = `<tr><td colspan="2" class="text-muted">No members added yet</td></tr>`;
      return;
    }

    let balances = {};
    members.forEach((m) => (balances[m] = 0));

    if (expenses.length > 0) {
      expenses.forEach((e) => {
        const split = e.amount / members.length;
        members.forEach((m) => {
          if (m === e.payer) balances[m] += e.amount - split;
          else balances[m] -= split;
        });
      });
    }

    members.forEach((m) => {
      const balance = balances[m].toFixed(2);
      tbody.innerHTML += `
        <tr>
          <td>${m}</td>
          <td class="${balance < 0 ? "text-danger" : "text-success"}">
            $${balance}
          </td>
        </tr>
      `;
    });
  }

  // Initialize
  updateMembersDropdown();
  renderGroupExpenses();
  renderBalances();
}
