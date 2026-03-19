// ── APPLICATION DATA ──
const applications = [
  { id: 1, company: "Julius Berger", role: "Designer", status: "applied", dateApplied: "Jan 10, 2026", deadline: "Jan 12, 2026", type: "Internship" },
  { id: 2, company: "Whatsapp", role: "Developer", status: "interview", dateApplied: "Jan 5, 2026", deadline: "Jan 20, 2026", type: "Job" },
  { id: 3, company: "Google", role: "UX Designer", status: "offer", dateApplied: "Jan 1, 2026", deadline: "Jan 14, 2026", type: "Job" },
  { id: 4, company: "Opay", role: "Analyst", status: "rejected", dateApplied: "Feb 2, 2026", deadline: "Feb 2, 2026", type: "Job" },
  { id: 5, company: "Adobe", role: "Frontend Dev", status: "applied", dateApplied: "Mar 1, 2026", deadline: "Mar 10, 2026", type: "Internship" },
];

const ITEMS_PER_PAGE = 5;
let currentPage = 1;
let filteredData = [...applications];

// ── SEARCH ──
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  filteredData = applications.filter(app =>
    app.company.toLowerCase().includes(query) ||
    app.role.toLowerCase().includes(query) ||
    app.status.toLowerCase().includes(query) ||
    app.type.toLowerCase().includes(query)
  );
  currentPage = 1;
  renderTable();
  renderPagination();
});

// ── RENDER TABLE ──
function renderTable() {
  const tbody = document.querySelector('tbody');
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filteredData.slice(start, start + ITEMS_PER_PAGE);

  if (paginated.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:#6b7280;">No applications found.</td></tr>`;
    return;
  }

  tbody.innerHTML = paginated.map((app, index) => `
    <tr data-id="${app.id}">
      <td><span class="row-num">${start + index + 1}.</span><span class="company-name"> ${app.company}</span></td>
      <td class="role-name">${app.role}</td>
      <td><span class="badge badge-${app.status}">${capitalize(app.status)}</span></td>
      <td class="date-cell">${app.dateApplied}</td>
      <td class="date-cell">${app.deadline}</td>
      <td class="type-tag">${app.type}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn delete-btn" title="Delete" data-id="${app.id}">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6"/><path d="M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
          <button class="action-btn edit-btn" title="Edit" data-id="${app.id}">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  // Attach delete and edit listeners
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', handleDelete);
  });
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', handleEdit);
  });
}

// ── DELETE ──
function handleDelete(e) {
  const id = parseInt(e.currentTarget.dataset.id);
  const confirmed = confirm('Are you sure you want to delete this application?');
  if (!confirmed) return;

  const index = applications.findIndex(app => app.id === id);
  if (index !== -1) applications.splice(index, 1);

  filteredData = [...applications];
  renderTable();
  renderPagination();
  updateStats();
}

// ── EDIT ──
function handleEdit(e) {
  const id = parseInt(e.currentTarget.dataset.id);
  const app = applications.find(a => a.id === id);
  if (!app) return;

  const newStatus = prompt(`Edit status for ${app.company}:\n(applied / interview / offer / rejected)`, app.status);
  if (newStatus && ['applied', 'interview', 'offer', 'rejected'].includes(newStatus.toLowerCase())) {
    app.status = newStatus.toLowerCase();
    filteredData = [...applications];
    renderTable();
    updateStats();
  } else if (newStatus !== null) {
    alert('Invalid status! Use: applied, interview, offer, or rejected');
  }
}

// ── PAGINATION ──
function renderPagination() {
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const pagination = document.querySelector('.pagination');

  pagination.innerHTML = `
    <button class="page-btn-flat" id="prevBtn">&#171;</button>
    ${Array.from({ length: totalPages }, (_, i) => `
      <button class="page-btn ${i + 1 === currentPage ? 'active' : ''}" data-page="${i + 1}">${i + 1}</button>
    `).join('')}
    <button class="page-btn-flat" id="nextBtn">&#187;</button>
  `;

  pagination.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      currentPage = parseInt(this.dataset.page);
      renderTable();
      renderPagination();
    });
  });

  document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) { currentPage--; renderTable(); renderPagination(); }
  });

  document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentPage < totalPages) { currentPage++; renderTable(); renderPagination(); }
  });
}

// ── ADD NEW APPLICATION ──
document.querySelector('.btn-add').addEventListener('click', () => {
  const company = prompt('Company name:');
  if (!company) return;
  const role = prompt('Role:');
  if (!role) return;
  const type = prompt('Type (Job / Internship):');
  if (!type) return;

  const newApp = {
    id: applications.length + 1,
    company,
    role,
    status: 'applied',
    dateApplied: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    deadline: 'N/A',
    type,
  };

  applications.push(newApp);
  filteredData = [...applications];
  renderTable();
  renderPagination();
  updateStats();
});

// ── UPDATE STATS ──
function updateStats() {
  const pills = document.querySelectorAll('.stat-pill span');
  pills[0].textContent = applications.length;
  pills[1].textContent = applications.filter(a => a.status === 'interview').length;
  pills[2].textContent = applications.filter(a => a.status === 'applied').length;
  pills[3].textContent = applications.filter(a => a.status === 'offer').length;
}

// ── HELPERS ──
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── INIT ──
renderTable();
renderPagination();
updateStats();