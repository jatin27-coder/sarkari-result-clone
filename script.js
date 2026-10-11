const notices = [
  { category: 'Result', title: 'State Police Constable — Written Examination Result', organization: 'State Police Recruitment Board', date: '11 Oct 2026', summary: 'Example result update with a sample shortlist and next-stage information.', deadline: 'Next stage: To be announced', eligibility: 'Check the official board notice', status: 'Result update' },
  { category: 'Result', title: 'State Teacher Recruitment — Merit List', organization: 'State Education Recruitment Board', date: '10 Oct 2026', summary: 'Sample merit list announcement for a state-level teacher recruitment examination.', deadline: 'Document verification: To be announced', eligibility: 'Check the official board notice', status: 'Result update' },
  { category: 'Admit Card', title: 'SSC Combined Graduate Level — Tier I Exam', organization: 'Staff Selection Commission (SSC)', date: '10 Oct 2026', summary: 'Sample admit card update for candidates appearing in a graduate-level examination.', deadline: 'Demo exam window: Nov 2026', eligibility: 'Check the official regional portal', status: 'Admit card update' },
  { category: 'Admit Card', title: 'Railway Recruitment Board — Technician CBT', organization: 'Railway Recruitment Board (RRB)', date: '09 Oct 2026', summary: 'Example computer-based test admit card notice with sample city-intimation details.', deadline: 'Demo exam window: Nov 2026', eligibility: 'Check the official RRB portal', status: 'Admit card update' },
  { category: 'Latest Job', title: 'Railway Recruitment Board — Assistant Loco Pilot', organization: 'Railway Recruitment Board (RRB)', date: '11 Oct 2026', summary: 'Illustrative recruitment notice for assistant loco pilot vacancies across railway zones.', deadline: 'Demo deadline: 30 Nov 2026', eligibility: 'See official notification for eligibility', status: 'Applications open' },
  { category: 'Latest Job', title: 'Public Sector Bank — Probationary Officer', organization: 'Public Sector Bank (sample)', date: '08 Oct 2026', summary: 'Sample bank recruitment listing for graduates interested in officer roles.', deadline: 'Demo deadline: 18 Nov 2026', eligibility: 'Graduate degree (illustrative)', status: 'Applications open' },
  { category: 'Latest Job', title: 'Central Government — Multi-Tasking Staff', organization: 'Staff Selection Commission (SSC)', date: '06 Oct 2026', summary: 'Illustrative multi-tasking staff recruitment update with a sample timeline.', deadline: 'Demo deadline: 21 Nov 2026', eligibility: 'See official notification for eligibility', status: 'Applications open' },
  { category: 'Admission', title: 'National Entrance Examination — Online Admission Form', organization: 'National Testing Agency (NTA)', date: '07 Oct 2026', summary: 'Illustrative admission form listing with sample registration and examination details.', deadline: 'Demo deadline: 15 Nov 2026', eligibility: 'See the official information bulletin', status: 'Sample form available' },
  { category: 'Answer Key', title: 'National Eligibility Test — Provisional Answer Key', organization: 'National Testing Agency (NTA)', date: '07 Oct 2026', summary: 'Example answer key and objection window notice for a national-level eligibility test.', deadline: 'Demo objection window: 12 Oct 2026', eligibility: 'Candidates who appeared in the exam', status: 'Objection window open' },
  { category: 'Answer Key', title: 'State Eligibility Test — Final Answer Key', organization: 'State Examination Board', date: '05 Oct 2026', summary: 'Sample final answer key notice for a state eligibility examination.', deadline: 'No further objections in this sample', eligibility: 'Candidates who appeared in the exam', status: 'Final key available' },
  { category: 'Syllabus', title: 'Teacher Eligibility Test — Exam Pattern & Syllabus', organization: 'Central Teacher Eligibility Test (CTET)', date: '04 Oct 2026', summary: 'Sample syllabus update covering the exam structure and candidate preparation topics.', deadline: 'Exam date: To be announced', eligibility: 'Refer to the official information bulletin', status: 'Syllabus available' }
];

const list = document.querySelector('#notice-list');
const searchInput = document.querySelector('#search-input');
const emptyState = document.querySelector('#empty-state');
const count = document.querySelector('#result-count');
const filterButtons = [...document.querySelectorAll('.filter-button')];
const navLinks = [...document.querySelectorAll('.nav-links a[data-filter]')];
const dialog = document.querySelector('#notice-dialog');
let activeFilter = 'All';

function renderNotices() {
  const query = searchInput.value.trim().toLowerCase();
  const matches = notices.filter((notice) => {
    const categoryMatches = activeFilter === 'All' || notice.category === activeFilter;
    const queryMatches = `${notice.title} ${notice.organization} ${notice.category} ${notice.summary}`.toLowerCase().includes(query);
    return categoryMatches && queryMatches;
  });
  const categoryOrder = ['Result', 'Admit Card', 'Latest Job', 'Admission', 'Answer Key', 'Syllabus'];
  const panels = categoryOrder.map((category) => {
    const grouped = matches.filter((notice) => notice.category === category);
    if (!grouped.length) return null;
    const panel = document.createElement('section');
    panel.className = 'category-panel';
    panel.dataset.category = category;
    const heading = document.createElement('h3');
    heading.textContent = category === 'Result' ? 'Results' : category;
    const links = document.createElement('ul');
    links.className = 'notice-links';
    grouped.forEach((notice) => {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.className = 'notice-link';
      button.type = 'button';
      button.textContent = notice.title;
      button.setAttribute('aria-label', `View details: ${notice.title}`);
      button.addEventListener('click', () => openNotice(notice));
      item.append(button);
      links.append(item);
    });
    panel.append(heading, links);
    return panel;
  }).filter(Boolean);
  list.replaceChildren(...panels);
  emptyState.hidden = matches.length > 0;
  count.textContent = `${matches.length} ${matches.length === 1 ? 'notice' : 'notices'}`;
}

function setFilter(filter) {
  activeFilter = filter;
  filterButtons.forEach((button) => {
    const selected = button.dataset.filter === filter;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  navLinks.forEach((link) => link.classList.toggle('active', link.dataset.filter === filter));
  renderNotices();
}

function openNotice(notice) {
  document.querySelector('#dialog-category').textContent = notice.category;
  document.querySelector('#dialog-title').textContent = notice.title;
  document.querySelector('#dialog-org').textContent = notice.organization;
  const rows = [['Notice date', notice.date], ['Status', notice.status], ['Important date', notice.deadline], ['Eligibility', notice.eligibility]];
  document.querySelector('#dialog-details').replaceChildren(...rows.map(([label, value]) => {
    const row = document.createElement('div');
    row.className = 'dialog-detail';
    const name = document.createElement('span');
    name.textContent = label;
    const detail = document.createElement('strong');
    detail.textContent = value;
    row.append(name, detail);
    return row;
  }));
  dialog.showModal();
}

filterButtons.forEach((button) => button.addEventListener('click', () => setFilter(button.dataset.filter)));
navLinks.forEach((link) => link.addEventListener('click', () => setFilter(link.dataset.filter)));
document.querySelectorAll('.quick-link').forEach((link) => link.addEventListener('click', () => setFilter(link.dataset.category)));
searchInput.addEventListener('input', renderNotices);
document.querySelector('#clear-filters').addEventListener('click', () => {
  searchInput.value = '';
  setFilter('All');
});
document.querySelectorAll('.dialog-close, .dialog-done').forEach((button) => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
document.addEventListener('keydown', (event) => {
  if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});
document.querySelector('#today-date').textContent = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date());
renderNotices();
