const baseUrl = "https://my-application-tracker.onrender.com";
let applications = [];

const ITEMS_PER_PAGE = 5;
let currentPage = 1;
let filteredData = [...applications];

// ── SEARCH ──
const searchInput = document.querySelector(".search-box input");
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  filteredData = applications.filter(
    (app) =>
      (app.company || "").toLowerCase().includes(query) ||
      (app.position || "").toLowerCase().includes(query) ||
      (app.status || "").toLowerCase().includes(query),
  );
  currentPage = 1;
  renderTable();
  renderPagination();
});

// ── RENDER TABLE ──
function renderTable() {
  const tbody = document.querySelector("tbody");
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filteredData.slice(start, start + ITEMS_PER_PAGE);

  if (paginated.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:#6b7280;">No applications found.</td></tr>`;
    return;
  }

  tbody.innerHTML = paginated
    .map(
      (app, index) => `
    <tr data-id="${app.id || app._id}">
      <td><span class="row-num">${start + index + 1}.</span><span class="company-name"> ${app.company}</span></td>
      <td class="role-name">${app.position || "-"}</td>
      <td><span class="badge badge-${normalizeStatus(app.status)}">${capitalize(normalizeStatus(app.status))}</span></td>
      <td class="date-cell">${app.dateApplied || "-"}</td>
      <td class="date-cell">${app.followUpDate || "-"}</td>
      <td class="type-tag">${app.type || "-"}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn delete-btn" title="Delete" data-id="${app.id || app._id}">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
          <button class="action-btn edit-btn" title="Edit" data-id="${app.id || app._id}">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  `,
    )
    .join("");

  // Attach delete and edit listeners
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", handleDelete);
  });
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", handleEdit);
  });
}

// ── DELETE ──
function handleDelete(e) {
  const id = e.currentTarget.dataset.id;
  const confirmed = confirm(
    "Are you sure you want to delete this application?",
  );
  if (!confirmed) return;

  const index = applications.findIndex(
    (app) => String(app.id || app._id) === id,
  );
  if (index !== -1) applications.splice(index, 1);

  filteredData = [...applications];
  renderTable();
  renderPagination();
  updateStats();
}

// ── EDIT ──
function handleEdit(e) {
  const id = e.currentTarget.dataset.id;
  const app = applications.find((a) => String(a.id || a._id) === id);
  if (!app) return;

  const newStatus = prompt(
    `Edit status for ${app.company}:\n(pending / accepted / rejected)`,
    app.status,
  );
  if (
    newStatus &&
    ["pending", "accepted", "rejected"].includes(newStatus.toLowerCase())
  ) {
    app.status = normalizeStatus(newStatus);
    filteredData = [...applications];
    renderTable();
    updateStats();
  } else if (newStatus !== null) {
    alert("Invalid status! Use: pending, accepted, or rejected");
  }
}

// ── PAGINATION ──
function renderPagination() {
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const pagination = document.querySelector(".pagination");

  pagination.innerHTML = `
    <button class="page-btn-flat" id="prevBtn">&#171;</button>
    ${Array.from(
      { length: totalPages },
      (_, i) => `
      <button class="page-btn ${i + 1 === currentPage ? "active" : ""}" data-page="${i + 1}">${i + 1}</button>
    `,
    ).join("")}
    <button class="page-btn-flat" id="nextBtn">&#187;</button>
  `;

  pagination.querySelectorAll(".page-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      currentPage = parseInt(this.dataset.page);
      renderTable();
      renderPagination();
    });
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
      renderPagination();
    }
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderTable();
      renderPagination();
    }
  });
}

// ── ADD NEW APPLICATION ──
document.querySelector(".btn-add").addEventListener("click", () => {
  window.location.href = "editApplication.html";
});

// ── UPDATE STATS ──
function updateStats() {
  const pills = document.querySelectorAll(".stat-pill span");
  pills[0].textContent = applications.length;
  pills[1].textContent = applications.filter(
    (a) => normalizeStatus(a.status) === "pending",
  ).length;
  pills[2].textContent = applications.filter(
    (a) => normalizeStatus(a.status) === "accepted",
  ).length;
  pills[3].textContent = applications.filter(
    (a) => normalizeStatus(a.status) === "rejected",
  ).length;
}

// ── HELPERS ──
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function normalizeStatus(status) {
  const value = (status || "").toLowerCase();
  if (value === "pending") return "pending";
  if (value === "accepted") return "accepted";
  if (value === "rejected") return "rejected";
  return "pending";
}

function getAuthToken() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    window.location.href = "log-in.html";
    return null;
  }
  return token;
}

async function loadDashboardSummary(token) {
  try {
    const response = await fetch(`${baseUrl}/api/dashboard/summary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        window.location.href = "log-in.html";
        return;
      }
      throw new Error(result.message || "Unable to load dashboard summary.");
    }

    const breakdown = result.statusBreakdown || {};
    const pills = document.querySelectorAll(".stat-pill span");
    pills[0].textContent = result.totalApplications ?? applications.length;
    pills[1].textContent = breakdown.Pending ?? breakdown.pending ?? 0;
    pills[2].textContent = breakdown.Accepted ?? breakdown.accepted ?? 0;
    pills[3].textContent = breakdown.Rejected ?? breakdown.rejected ?? 0;
  } catch (error) {
    // Fallback to computed counts from loaded applications.
    updateStats();
  }
}

async function loadApplications(token) {
  if (!token) {
    return;
  }

  const tbody = document.querySelector("tbody");
  tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:#6b7280;">Loading applications...</td></tr>`;

  try {
    const response = await fetch(`${baseUrl}/api/applications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        window.location.href = "log-in.html";
        return;
      }
      throw new Error(result.message || "Unable to load applications.");
    }

    applications = Array.isArray(result.data) ? result.data : [];
    filteredData = [...applications];
    currentPage = 1;
    renderTable();
    renderPagination();
    updateStats();
  } catch (error) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:#e74c3c;">Failed to load applications. Please refresh and try again.</td></tr>`;
  }
}

// ── INIT ──
const authToken = getAuthToken();
if (authToken) {
  loadApplications(authToken);
  loadDashboardSummary(authToken);
}
