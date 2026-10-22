/**
 * app.js — JalDrishti application bootstrap
 *
 * Orchestrates all sections:
 *  - Navigation and mobile sidebar
 *  - Home / hero
 *  - Dashboard (stat cards + charts)
 *  - Explore (district selector + map)
 *  - Water Loss (category cards)
 *  - Case Studies (with filters)
 *  - Research & Methodology
 *  - References
 *
 * Uses ES modules; data flows from data.js → builder functions → DOM.
 */

import {
  SITE,
  DISTRICTS,
  STATS,
  WATER_LOSS_CATEGORIES,
  CASE_STUDIES,
  RESEARCH,
  REFERENCES,
} from './data.js';

import {
  initRainfallLineChart,
  initDistrictRainfallChart,
  initWaterUseDonut,
} from './charts.js';

import { initDistrictMap } from './map.js';
import { initCaseStudyFilters } from './filters.js';

// ---------------------------------------------------------------------------
// DOM helpers
// ---------------------------------------------------------------------------
function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v;
    else node.setAttribute(k, v);
  }
  for (const child of children) {
    if (typeof child === 'string') node.appendChild(document.createTextNode(child));
    else if (child) node.appendChild(child);
  }
  return node;
}

function sourceLink(url, text) {
  if (!url) return text;
  return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
}

// ---------------------------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------------------------
function buildNav() {
  const navLinks = [
    { href: '#home',         icon: '🏠', label: 'Overview' },
    { href: '#dashboard',    icon: '📊', label: 'Water Dashboard' },
    { href: '#explore',      icon: '🗺️', label: 'Explore Marathwada' },
    { href: '#water-loss',   icon: '💧', label: 'Sources of Water Loss' },
    { href: '#case-studies', icon: '🌍', label: 'Case Studies' },
    { href: '#research',     icon: '🔬', label: 'Research & Methodology' },
    { href: '#references',   icon: '📚', label: 'Sources & References' },
  ];

  const nav = document.querySelector('.sidebar__nav');
  if (!nav) return;

  const label = el('div', { class: 'sidebar__section-label' }, 'Sections');
  nav.appendChild(label);

  navLinks.forEach(({ href, icon, label: text }) => {
    const a = el('a', { href, class: 'nav-item' });
    a.innerHTML = `<span class="nav-item__icon">${icon}</span>${text}`;
    nav.appendChild(a);
  });

  // Active state on scroll
  const sections = navLinks.map((l) => document.querySelector(l.href));
  const navItems = nav.querySelectorAll('.nav-item');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((item) => {
            item.classList.toggle(
              'active',
              item.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach((s) => s && observer.observe(s));
}

// ---------------------------------------------------------------------------
// MOBILE SIDEBAR TOGGLE
// ---------------------------------------------------------------------------
function initMobileSidebar() {
  const toggle = document.getElementById('mobile-nav-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (!toggle || !sidebar || !overlay) return;

  function open() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function close() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () =>
    sidebar.classList.contains('open') ? close() : open()
  );
  overlay.addEventListener('click', close);

  // Close sidebar when a nav link is clicked on mobile
  sidebar.querySelectorAll('.nav-item').forEach((a) => {
    a.addEventListener('click', () => {
      if (window.innerWidth < 769) close();
    });
  });
}

// ---------------------------------------------------------------------------
// SECTION A: HOME
// ---------------------------------------------------------------------------
function buildHome() {
  const sec = document.getElementById('home');
  if (!sec) return;

  sec.innerHTML = `
    <div class="hero">
      <div class="hero__content">
        <div class="hero__eyebrow">💧 Community Water Conservation Research</div>
        <h1 class="hero__title">
          <em>JalDrishti</em> — Water Insights<br>for Marathwada
        </h1>
        <p class="hero__description">
          An independent research initiative examining water scarcity, rainfall variability,
          groundwater stress, and conservation approaches in Marathwada, Maharashtra —
          one of India's most drought-affected regions.
        </p>
        <div class="hero__nav-grid">
          <a href="#dashboard" class="hero-card">
            <div class="hero-card__icon">📊</div>
            <div class="hero-card__title">Water Dashboard</div>
            <div class="hero-card__desc">Rainfall, groundwater and resource indicators</div>
          </a>
          <a href="#explore" class="hero-card">
            <div class="hero-card__icon">🗺️</div>
            <div class="hero-card__title">Explore Districts</div>
            <div class="hero-card__desc">Eight districts, their water contexts</div>
          </a>
          <a href="#water-loss" class="hero-card">
            <div class="hero-card__icon">💧</div>
            <div class="hero-card__title">Sources of Water Loss</div>
            <div class="hero-card__desc">Leakage, inefficiency, over-extraction</div>
          </a>
          <a href="#case-studies" class="hero-card">
            <div class="hero-card__icon">🌍</div>
            <div class="hero-card__title">Global Case Studies</div>
            <div class="hero-card__desc">What has worked, and where</div>
          </a>
          <a href="#research" class="hero-card">
            <div class="hero-card__icon">🔬</div>
            <div class="hero-card__title">Research & Method</div>
            <div class="hero-card__desc">Questions, approach and limitations</div>
          </a>
          <a href="#references" class="hero-card">
            <div class="hero-card__icon">📚</div>
            <div class="hero-card__title">Sources</div>
            <div class="hero-card__desc">All references with links</div>
          </a>
        </div>
      </div>
    </div>

    <div class="disclaimer-banner">
      <div class="disclaimer-banner__icon">⚠️</div>
      <div class="disclaimer-banner__text">
        <strong>Research notice:</strong> ${SITE.disclaimer}
        Statistics are drawn from publicly available sources; each figure displays its source and reporting period.
        Unverified or indicative figures are clearly marked. <strong>Last updated: ${SITE.lastUpdated}.</strong>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-label">The Challenge</div>
        <h2 class="section-title">Water Scarcity in Marathwada</h2>
        <p class="section-intro">
          Marathwada is a semi-arid plateau region of eight districts in eastern Maharashtra.
          With average annual rainfall well below the national mean, a geology that limits groundwater
          recharge, and an agricultural economy heavily dependent on water, the region faces
          compounding water stress that is simultaneously a hydrological, agricultural and
          governance challenge.
        </p>
      </div>

      <div class="grid-3" style="gap:var(--space-5);">
        <div style="padding:var(--space-5);background:var(--bg-card);border-radius:var(--radius-lg);border:var(--border-light);">
          <div style="font-size:1.5rem;margin-bottom:var(--space-3);">🌧️</div>
          <h3 style="font-size:var(--text-base);margin-bottom:var(--space-2);">Rainfall Variability</h3>
          <p style="font-size:var(--text-sm);color:var(--text-secondary);">
            Marathwada's rainfall averages around 750 mm — roughly 60% of the national mean —
            and fluctuates sharply from year to year. Multiple consecutive drought years have
            been recorded since 2000.
          </p>
        </div>
        <div style="padding:var(--space-5);background:var(--bg-card);border-radius:var(--radius-lg);border:var(--border-light);">
          <div style="font-size:1.5rem;margin-bottom:var(--space-3);">⛏️</div>
          <h3 style="font-size:var(--text-base);margin-bottom:var(--space-2);">Groundwater Pressure</h3>
          <p style="font-size:var(--text-sm);color:var(--text-secondary);">
            Unregulated borewell expansion has drawn down aquifer levels across many talukas.
            Deccan basalt geology limits natural recharge, making recovery after drought slow.
          </p>
        </div>
        <div style="padding:var(--space-5);background:var(--bg-card);border-radius:var(--radius-lg);border:var(--border-light);">
          <div style="font-size:1.5rem;margin-bottom:var(--space-3);">🌾</div>
          <h3 style="font-size:var(--text-base);margin-bottom:var(--space-2);">Agriculture vs. Equity</h3>
          <p style="font-size:var(--text-sm);color:var(--text-secondary);">
            Agriculture uses an estimated 80% of India's freshwater. In Marathwada,
            water-intensive crops like sugarcane grown by some farmers coexist with
            acute domestic scarcity for rural communities.
          </p>
        </div>
      </div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// SECTION B: DASHBOARD
// ---------------------------------------------------------------------------
function buildDashboard() {
  const sec = document.getElementById('dashboard');
  if (!sec) return;

  // Stat cards
  const statCardsHtml = STATS.regional.map((s) => `
    <div class="stat-card ${!s.verified ? 'stat-card--unverified' : ''} ${
      s.id === 'irrigation_efficiency' ? 'stat-card--teal' :
      s.id === 'drought_years' ? 'stat-card--amber' : ''
    }">
      <div class="stat-card__label">${s.label}</div>
      <div class="stat-card__value">
        ${s.value}<span class="stat-card__unit">${s.unit}</span>
      </div>
      <div class="stat-card__context">${s.context}</div>
      <div class="stat-card__source">
        📅 ${s.period} &nbsp;|&nbsp;
        ${s.sourceUrl
          ? `<a href="${s.sourceUrl}" target="_blank" rel="noopener noreferrer">${s.source}</a>`
          : s.source}
        &nbsp;
        ${s.verified
          ? '<span class="badge badge--verified">Verified</span>'
          : '<span class="badge badge--unverified">⚠ Unverified</span>'}
      </div>
      ${s.note ? `<div class="stat-card__note">ℹ️ ${s.note}</div>` : ''}
    </div>
  `).join('');

  sec.innerHTML = `
    <div class="section">
      <div class="section-header">
        <div class="section-label">Water Dashboard</div>
        <h2 class="section-title">Regional Water Indicators</h2>
        <p class="section-intro">
          Key statistics for Marathwada. Every figure shows its source, reporting period and
          verification status. Figures marked <strong>Unverified</strong> are approximate or
          drawn from secondary sources; treat them as indicative only.
        </p>
      </div>

      <!-- Stat cards -->
      <div class="grid-3" style="margin-bottom:var(--space-10);">${statCardsHtml}</div>

      <!-- Charts row -->
      <div class="grid-2" style="margin-bottom:var(--space-8);">
        <div class="chart-card">
          <div class="chart-card__header">
            <div>
              <div class="chart-card__title">Marathwada Annual Rainfall — Indicative Trend</div>
              <div class="chart-card__meta">
                2005–2022 &nbsp;|&nbsp; Source: Compiled from IMD reports and drought literature
              </div>
            </div>
            <span class="badge badge--unverified">⚠ Indicative</span>
          </div>
          <div class="chart-card__canvas-wrap">
            <canvas id="rainfall-line-chart"></canvas>
          </div>
          <div class="chart-card__footnote">
            🔴 Red points = years reported as drought years in literature.
            These figures are <strong>indicative</strong> and compiled from published reports,
            not official IMD station records. Obtain precise annual data from IMD directly for analysis.
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-card__header">
            <div>
              <div class="chart-card__title">District Annual Rainfall Normals</div>
              <div class="chart-card__meta">
                30-year IMD normal &nbsp;|&nbsp;
                <a href="https://www.imd.gov.in/pages/rainfall_normal_data.php"
                   target="_blank" rel="noopener noreferrer">India Meteorological Department</a>
              </div>
            </div>
            <span class="badge badge--verified">Verified</span>
          </div>
          <div class="chart-card__canvas-wrap">
            <canvas id="district-rainfall-chart"></canvas>
          </div>
          <div class="chart-card__footnote">
            Colour: <span style="color:#F9A825">■</span> &lt;680 mm &nbsp;
            <span style="color:#1E88E5">■</span> 680–780 mm &nbsp;
            <span style="color:#00897B">■</span> &gt;780 mm.
            These are long-period normals; actual annual rainfall varies considerably.
          </div>
        </div>
      </div>

      <!-- Water use donut -->
      <div class="chart-card" style="max-width:600px;">
        <div class="chart-card__header">
          <div>
            <div class="chart-card__title">India's Freshwater Use by Sector</div>
            <div class="chart-card__meta">
              National estimate (2010s) &nbsp;|&nbsp; Ministry of Jal Shakti / World Bank
            </div>
          </div>
          <span class="badge badge--unverified">National estimate</span>
        </div>
        <div class="chart-card__canvas-wrap" style="height:240px;">
          <canvas id="water-use-donut"></canvas>
        </div>
        <div class="chart-card__footnote">
          This is a national-level estimate. Marathwada's sectoral breakdown is not separately
          quantified in this project; agriculture's share is likely similarly dominant.
        </div>
      </div>
    </div>
  `;

  // Init charts
  initRainfallLineChart('rainfall-line-chart', STATS.rainfallTimeSeries);
  initDistrictRainfallChart('district-rainfall-chart', STATS.districtRainfallNormals);
  initWaterUseDonut('water-use-donut');
}

// ---------------------------------------------------------------------------
// SECTION C: EXPLORE (District selector + Map)
// ---------------------------------------------------------------------------
let mapInstance = null;

function buildExplore() {
  const sec = document.getElementById('explore');
  if (!sec) return;

  // District selector buttons HTML
  const districtBtns = DISTRICTS.map((d) => `
    <button
      class="district-btn"
      data-id="${d.id}"
      aria-label="Select ${d.name}"
    >${d.name}</button>
  `).join('');

  sec.innerHTML = `
    <div class="section">
      <div class="section-header">
        <div class="section-label">Explore Marathwada</div>
        <h2 class="section-title">Eight Districts, One Region</h2>
        <p class="section-intro">
          Select a district from the map or the buttons below to view its water context.
          The map uses approximate district boundaries for orientation — not for precise cartographic use.
        </p>
      </div>

      <!-- Leaflet map -->
      <div id="district-map" role="img" aria-label="Map of Marathwada districts colour-coded by annual rainfall normal"></div>
      <div class="map-note">
        🗺️ Map source: Approximate boundaries derived from Datameet India Maps (CC BY 4.0).
        Base tiles: OpenStreetMap / CARTO. Colours indicate 30-year IMD annual rainfall normals.
        Click a district on the map or use the buttons below.
      </div>

      <!-- District selector buttons -->
      <div class="district-selector" style="margin-top:var(--space-6);" id="district-selector">
        ${districtBtns}
      </div>

      <!-- District detail panel -->
      <div id="district-detail-panel">
        <div class="district-empty">
          <div class="district-empty__icon">🗺️</div>
          <div class="district-empty__text">Select a district above to explore its water context.</div>
        </div>
      </div>
    </div>
  `;

  // Init Leaflet map
  requestAnimationFrame(() => {
    mapInstance = initDistrictMap('district-map', DISTRICTS, (district) => {
      renderDistrictDetail(district);
      // sync button state
      document.querySelectorAll('.district-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.id === district.id);
      });
    });
  });

  // District button clicks
  document.getElementById('district-selector').addEventListener('click', (e) => {
    const btn = e.target.closest('.district-btn');
    if (!btn) return;
    const id = btn.dataset.id;
    const district = DISTRICTS.find((d) => d.id === id);
    if (!district) return;

    document.querySelectorAll('.district-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.id === id);
    });

    if (mapInstance) mapInstance.selectDistrict(id);
    renderDistrictDetail(district);
  });
}

function renderDistrictDetail(d) {
  const panel = document.getElementById('district-detail-panel');
  if (!panel) return;

  const rainfallVerified = d.annualRainfall_mm.verified
    ? '<span class="badge badge--verified">Verified</span>'
    : '<span class="badge badge--unverified">Indicative</span>';

  const gwNote = d.groundwaterLevel.verified
    ? `<div class="stat-card__field-value">${d.groundwaterLevel.value}</div>`
    : `<div class="data-warning">⚠ ${d.groundwaterLevel.note}</div>`;

  const issues = d.keyIssues.map((i) => `<span class="district-issue-tag">${i}</span>`).join('');

  panel.innerHTML = `
    <div class="district-detail">
      <div class="district-detail__header">
        <div class="district-detail__district-label">District</div>
        <div class="district-detail__name">${d.name}</div>
        ${d.altName ? `<div style="font-size:var(--text-sm);color:rgba(255,255,255,0.5);margin-top:var(--space-1);">Also known as: ${d.altName}</div>` : ''}
      </div>
      <div class="district-detail__body">
        <div class="district-detail__col">
          <div class="district-detail__field">
            <div class="district-detail__field-label">Overview</div>
            <div class="district-detail__field-value" style="font-weight:var(--weight-regular);font-size:var(--text-sm);line-height:1.6;">
              ${d.description}
            </div>
          </div>
          <div class="district-detail__field">
            <div class="district-detail__field-label">Key Water Issues</div>
            <div class="district-detail__tag-list">${issues}</div>
          </div>
          <div class="district-detail__field">
            <div class="district-detail__field-label">Main Rivers</div>
            <div class="district-detail__field-value" style="font-weight:var(--weight-regular);">${d.mainRiver}</div>
          </div>
        </div>
        <div class="district-detail__col">
          <div class="district-detail__field">
            <div class="district-detail__field-label">Annual Rainfall Normal</div>
            <div class="district-detail__field-value">
              ${d.annualRainfall_mm.value} mm &nbsp; ${rainfallVerified}
            </div>
            <div style="font-size:var(--text-xs);color:var(--text-muted);margin-top:var(--space-1);">
              ${d.annualRainfall_mm.period} &nbsp;|&nbsp; ${d.annualRainfall_mm.source}
            </div>
          </div>
          <div class="district-detail__field">
            <div class="district-detail__field-label">Groundwater Level Data</div>
            ${gwNote}
          </div>
          <div class="district-detail__field">
            <div class="district-detail__field-label">Area</div>
            <div class="district-detail__field-value">${d.area_km2.toLocaleString()} km²</div>
          </div>
          <div class="district-detail__field">
            <div class="district-detail__field-label">Population (approx.)</div>
            <div class="district-detail__field-value">${d.population_approx}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// SECTION D: WATER LOSS
// ---------------------------------------------------------------------------
function buildWaterLoss() {
  const sec = document.getElementById('water-loss');
  if (!sec) return;

  const cards = WATER_LOSS_CATEGORIES.map((cat) => {
    const examples = cat.examples.map((ex) => `<li>${ex}</li>`).join('');
    return `
      <div class="loss-card">
        <div class="loss-card__header">
          <div class="loss-card__icon">${cat.icon}</div>
          <div class="loss-card__header-text">
            <div class="loss-card__title">${cat.title}</div>
            <span class="badge badge--${cat.typeBadge}">${cat.type}</span>
          </div>
        </div>
        <div class="loss-card__body">
          <p class="loss-card__description">${cat.description}</p>
          <div class="loss-card__examples-label">Examples</div>
          <ul class="loss-card__examples">${examples}</ul>
          <div class="loss-card__data-note">
            📋 <strong>Data note:</strong> ${cat.dataNote}
          </div>
          <div class="loss-card__source">
            Source: ${cat.sourceUrl
              ? `<a href="${cat.sourceUrl}" target="_blank" rel="noopener noreferrer">${cat.source}</a>`
              : cat.source}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Badge type legend
  const legend = `
    <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);margin-bottom:var(--space-6);">
      <span class="badge badge--loss">Physical Loss</span>
      <span class="badge badge--inefficiency">Inefficient Use</span>
      <span class="badge badge--capacity">Capacity Loss</span>
      <span class="badge badge--quality">Quality Loss</span>
      <span class="badge badge--over-exploitation">Over-Exploitation</span>
    </div>
  `;

  sec.innerHTML = `
    <div class="section">
      <div class="section-header">
        <div class="section-label">Sources of Water Loss</div>
        <h2 class="section-title">Where Water Is Lost, Wasted or Degraded</h2>
        <p class="section-intro">
          Water scarcity in Marathwada is not only about low rainfall — it is also about how
          water is managed, distributed and lost before it can be used. The categories below
          distinguish physical losses, inefficient use, capacity degradation, quality issues
          and over-extraction. No invented percentages are presented; data notes explain what
          is and is not known quantitatively.
        </p>
      </div>
      ${legend}
      <div class="grid-2">${cards}</div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// SECTION E: CASE STUDIES
// ---------------------------------------------------------------------------
function buildCaseStudies() {
  const sec = document.getElementById('case-studies');
  if (!sec) return;

  // Collect unique tags
  const allTags = ['All', ...new Set(CASE_STUDIES.flatMap((c) => c.tags))];
  const filterBtns = allTags.map((tag) => `
    <button class="filter-btn ${tag === 'All' ? 'active' : ''}" data-filter="${tag}">${tag}</button>
  `).join('');

  const cards = CASE_STUDIES.map((cs) => {
    const tagBadges = cs.tags.map((t) => {
      const cls = t === 'India' || t === 'Maharashtra'
        ? `badge--${t.toLowerCase()}`
        : t === 'Global' ? 'badge--global' : 'badge--verified';
      return `<span class="badge ${cls}">${t}</span>`;
    }).join('');

    return `
      <div class="case-card" data-tags="${cs.tags.join(', ')}">
        <div class="case-card__header">
          <div class="case-card__region">${cs.region}</div>
          <div class="case-card__title">${cs.title}</div>
          <div class="case-card__tags">${tagBadges}</div>
        </div>
        <div class="case-card__body">
          <div class="case-card__section">
            <div class="case-card__section-label">Problem</div>
            <div class="case-card__section-text">${cs.problem}</div>
          </div>
          <div class="case-card__section">
            <div class="case-card__section-label">Intervention</div>
            <div class="case-card__section-text">${cs.intervention}</div>
          </div>
          <div class="case-card__section">
            <div class="case-card__section-label">Reported Result</div>
            <div class="case-card__section-text">${cs.reportedResult}</div>
          </div>
          <div class="case-card__section">
            <div class="case-card__section-label">Limitations</div>
            <div class="case-card__limitations">${cs.limitations}</div>
          </div>
          <div class="case-card__section" style="margin-top:var(--space-3);">
            <div class="case-card__section-label">Relevance to Marathwada</div>
            <div class="case-card__section-text">${cs.relevanceToMarathwada}</div>
          </div>
        </div>
        <div class="case-card__footer">
          <span class="case-card__source">
            Source: ${cs.sourceUrl
              ? `<a href="${cs.sourceUrl}" target="_blank" rel="noopener noreferrer">${cs.source}</a>`
              : cs.source}
          </span>
          <span class="case-card__period">📅 ${cs.period}</span>
        </div>
      </div>
    `;
  }).join('');

  sec.innerHTML = `
    <div class="section">
      <div class="section-header">
        <div class="section-label">Case Studies</div>
        <h2 class="section-title">Global and Indian Examples</h2>
        <p class="section-intro">
          These case studies are selected because they illustrate intervention types relevant to
          Marathwada's challenges. For each case, limitations and transferability considerations
          are included alongside reported results. Measured outcomes are distinguished from
          programme targets where data permits.
        </p>
      </div>

      <div class="filter-bar" id="case-study-filter-bar">
        <span class="filter-bar__label">Filter by:</span>
        ${filterBtns}
      </div>

      <div class="grid-auto" id="case-study-cards">${cards}</div>
    </div>
  `;

  initCaseStudyFilters('case-study-filter-bar', 'case-study-cards');
}

// ---------------------------------------------------------------------------
// SECTION F: RESEARCH & METHODOLOGY
// ---------------------------------------------------------------------------
function buildResearch() {
  const sec = document.getElementById('research');
  if (!sec) return;

  const questions = RESEARCH.questions.map((q, i) => `
    <div class="research-question">
      <div class="research-question__number">${String(i + 1).padStart(2, '0')}</div>
      <div class="research-question__text">${q}</div>
    </div>
  `).join('');

  const methodSteps = RESEARCH.methodology.map((m, i) => `
    <div class="methodology-step">
      <div class="methodology-step__number">${i + 1}</div>
      <div>
        <div class="methodology-step__title">${m.step}</div>
        <div class="methodology-step__desc">${m.description}</div>
      </div>
    </div>
  `).join('');

  const limitations = RESEARCH.limitations.map((l) => `
    <li style="padding:var(--space-3) 0;border-bottom:var(--border-light);font-size:var(--text-sm);
               color:var(--text-secondary);line-height:var(--leading-normal);">
      ⚠️ ${l}
    </li>
  `).join('');

  const future = RESEARCH.futureDirections.map((f) => `
    <li style="padding:var(--space-2) 0;font-size:var(--text-sm);color:var(--text-secondary);">
      → ${f}
    </li>
  `).join('');

  sec.innerHTML = `
    <div class="section">
      <div class="section-header">
        <div class="section-label">Research & Methodology</div>
        <h2 class="section-title">Questions, Method and Limitations</h2>
        <p class="section-intro">
          This section explains what the research is trying to find out, how evidence is
          collected and evaluated, and — critically — what the project cannot claim or has
          not yet established.
        </p>
      </div>

      <div class="two-col-layout">
        <div>
          <h3 style="font-size:var(--text-xl);margin-bottom:var(--space-5);">Research Questions</h3>
          ${questions}
        </div>
        <div>
          <h3 style="font-size:var(--text-xl);margin-bottom:var(--space-5);">Methodology</h3>
          ${methodSteps}
        </div>
      </div>

      <hr class="divider">

      <div class="two-col-layout" style="margin-top:var(--space-8);">
        <div>
          <h3 style="font-size:var(--text-xl);margin-bottom:var(--space-5);">Limitations</h3>
          <ul style="list-style:none;">${limitations}</ul>
        </div>
        <div>
          <h3 style="font-size:var(--text-xl);margin-bottom:var(--space-5);">Future Research Directions</h3>
          <ul style="list-style:none;">${future}</ul>
        </div>
      </div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// SECTION G: REFERENCES
// ---------------------------------------------------------------------------
function buildReferences() {
  const sec = document.getElementById('references');
  if (!sec) return;

  const refs = REFERENCES.map((r) => `
    <div class="ref-card">
      <div class="ref-card__category">${r.category}</div>
      <div>
        <div class="ref-card__title">
          ${r.url
            ? `<a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.title}</a>`
            : r.title}
        </div>
        <div class="ref-card__publisher">${r.publisher}</div>
        <div class="ref-card__notes">${r.notes}</div>
      </div>
    </div>
  `).join('');

  sec.innerHTML = `
    <div class="section">
      <div class="section-header">
        <div class="section-label">Sources & References</div>
        <h2 class="section-title">Where the Data Comes From</h2>
        <p class="section-intro">
          All factual content on this site is drawn from or should be verified against the
          sources listed below. Each statistic shown in the dashboard and case study cards
          carries its own inline source citation. This page aggregates the primary references.
        </p>
      </div>
      <div style="display:flex;flex-direction:column;gap:var(--space-3);">${refs}</div>

      <div style="margin-top:var(--space-10);padding:var(--space-6);background:var(--bg-card-alt);
                  border-radius:var(--radius-lg);border:var(--border-light);">
        <h3 style="font-size:var(--text-base);margin-bottom:var(--space-3);">About this project</h3>
        <p style="font-size:var(--text-sm);color:var(--text-secondary);line-height:1.7;">
          <strong>JalDrishti</strong> is a community water conservation research initiative.
          It is not an operational monitoring system and does not claim to have solved
          Marathwada's water challenges. The goal is to compile, contextualise and present
          publicly available evidence in an accessible format to support informed local
          discussion and further research.
        </p>
        <p style="font-size:var(--text-sm);color:var(--text-secondary);line-height:1.7;margin-top:var(--space-3);">
          Corrections and additional data sources are welcome. Please raise issues through
          the project's research channels.
        </p>
        <p style="font-size:var(--text-xs);color:var(--text-muted);margin-top:var(--space-4);">
          Last updated: ${SITE.lastUpdated}
        </p>
      </div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
function buildFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div style="background:var(--color-navy);color:rgba(255,255,255,0.45);
                padding:var(--space-8) var(--space-8);font-size:var(--text-xs);
                line-height:1.7;">
      <strong style="color:rgba(255,255,255,0.7);">JalDrishti — Water Insights for Marathwada</strong><br>
      Community water conservation research project. All statistics cite primary sources.
      Unverified figures are clearly labelled. This website does not deploy live data services.<br>
      Map tiles: OpenStreetMap / CARTO (© contributors). District boundaries approximate,
      derived from Datameet India Maps (CC BY 4.0).
      Last updated: ${SITE.lastUpdated}.
    </div>
  `;
}

// ---------------------------------------------------------------------------
// INIT
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  initMobileSidebar();
  buildHome();
  buildDashboard();
  buildExplore();
  buildWaterLoss();
  buildCaseStudies();
  buildResearch();
  buildReferences();
  buildFooter();

  // After all content rendered, invalidate map size
  // (Leaflet needs a moment to know its container dimensions)
  setTimeout(() => {
    if (mapInstance && mapInstance.map) {
      mapInstance.map.invalidateSize();
    }
  }, 200);
});
