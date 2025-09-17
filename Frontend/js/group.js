/* =======================================
   group.js
   Frontend logic for Groups
======================================= */
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first!");
    window.location.href = "login.html";
    return;
  }

  const groupList = document.getElementById("group-list");
  const createGroupForm = document.getElementById("create-group-form");
  const groupDetails = document.getElementById("group-details");

  // Fetch all groups
  async function fetchGroups() {
    try {
      const res = await api.get("/groups", token);
      renderGroups(res);
    } catch (err) {
      console.error("Error fetching groups", err);
    }
  }

  // Render group list
  function renderGroups(groups) {
    groupList.innerHTML = "";
    groups.forEach((g) => {
      const li = document.createElement("li");
      li.textContent = g.name;
      li.style.cursor = "pointer";
      li.addEventListener("click", () => fetchGroupDetails(g._id));
      groupList.appendChild(li);
    });
  }

  // Fetch single group details
  async function fetchGroupDetails(id) {
    try {
      const res = await api.get(`/groups/${id}`, token);
      renderGroupDetails(res);
    } catch (err) {
      console.error("Error fetching group details", err);
    }
  }

  // Render group details
  function renderGroupDetails(group) {
    let membersHtml = "<h3>Members</h3><ul>";
    group.members.forEach((m) => {
      membersHtml += `<li>${m.user.name} (${m.user.email}) - Balance: ${m.balance}</li>`;
    });
    membersHtml += "</ul>";

    let txHtml = "<h3>Transactions</h3><ul>";
    group.transactions.forEach((t) => {
      txHtml += `<li>${t.description} - $${t.amount} (Paid by: ${t.paidBy})</li>`;
    });
    txHtml += "</ul>";

    // Expense form
    let expenseForm = `
      <h3>Add Expense</h3>
      <form id="add-expense-form">
        <input type="text" id="expense-desc" placeholder="Description" required />
        <input type="number" id="expense-amount" placeholder="Amount" required />
        <input type="text" id="expense-paidby" placeholder="Paid By (User ID)" required />
        <input type="text" id="expense-split" placeholder="Split Between (IDs comma-separated)" required />
        <button type="submit">Add Expense</button>
      </form>
    `;

    groupDetails.innerHTML = `<h2>${group.name}</h2>${membersHtml}${txHtml}${expenseForm}`;

    // Attach expense form handler
    const addExpenseForm = document.getElementById("add-expense-form");
    addExpenseForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const description = document.getElementById("expense-desc").value;
      const amount = parseFloat(document.getElementById("expense-amount").value);
      const paidBy = document.getElementById("expense-paidby").value.trim();
      const splitBetween = document.getElementById("expense-split").value.split(",").map((id) => id.trim());

      try {
        await api.post(`/groups/${group._id}/expenses`, { description, amount, paidBy, splitBetween }, token);
        fetchGroupDetails(group._id); // refresh group details
      } catch (err) {
        console.error("Error adding expense", err);
      }
    });
  }

  // Handle create group form
  createGroupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("group-name").value;
    const members = document.getElementById("group-members").value.split(",").map((id) => id.trim());

    try {
      await api.post("/groups", { name, members }, token);
      fetchGroups();
      createGroupForm.reset();
    } catch (err) {
      console.error("Error creating group", err);
    }
  });

  // Initial load
  fetchGroups();
});
