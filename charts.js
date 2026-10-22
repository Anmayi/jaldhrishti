/**
 * charts.js — JalDrishti Chart.js initialisers
 *
 * All charts receive their data from data.js (passed as arguments).
 * Colour palette matches the CSS design tokens.
 * Each function returns the Chart instance so callers can update/destroy if needed.
 */

// Shared Chart.js defaults
const PALETTE = {
  blue:        '#1565C0',
  blueLight:   '#1E88E5',
  teal:        '#00897B',
  tealLight:   '#26A69A',
  amber:       '#F9A825',
  redSoft:     '#E53935',
  navy:        '#0B1F3A',
  navyMid:     '#1A3558',
  gridLine:    'rgba(0,0,0,0.06)',
  tickColor:   '#718096',
};

const FONT = "'Inter', 'Segoe UI', system-ui, sans-serif";

Chart.defaults.font.family = FONT;
Chart.defaults.color = PALETTE.tickColor;

// ---------------------------------------------------------------------------
// Rainfall Time Series — line chart
// ---------------------------------------------------------------------------
export function initRainfallLineChart(canvasId, data) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  // Highlight drought years with point colours
  const pointColors = data.years.map((y) =>
    data.droughtYears.includes(y) ? PALETTE.redSoft : PALETTE.blue
  );
  const pointRadii = data.years.map((y) =>
    data.droughtYears.includes(y) ? 6 : 4
  );

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.years,
      datasets: [
        {
          label: 'Annual Rainfall (mm)',
          data: data.values,
          borderColor: PALETTE.blueLight,
          backgroundColor: 'rgba(30,136,229,0.08)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: pointColors,
          pointBorderColor: pointColors,
          pointRadius: pointRadii,
          pointHoverRadius: 7,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label(ctx) {
              const val = ctx.parsed.y;
              const year = data.years[ctx.dataIndex];
              const isDrought = data.droughtYears.includes(year);
              return `Rainfall: ${val} mm${isDrought ? ' ⚠ Drought year (indicative)' : ''}`;
            },
            afterBody() {
              return ['⚠ Indicative values — not official IMD station data'];
            },
          },
        },
        annotation: undefined, // not loaded; handled via point colours
      },
      scales: {
        x: {
          grid: { color: PALETTE.gridLine },
          ticks: { maxRotation: 45, font: { size: 11 } },
        },
        y: {
          beginAtZero: false,
          min: 300,
          grid: { color: PALETTE.gridLine },
          ticks: { font: { size: 11 } },
          title: {
            display: true,
            text: 'Rainfall (mm)',
            font: { size: 11 },
            color: PALETTE.tickColor,
          },
        },
      },
    },
  });
}

// ---------------------------------------------------------------------------
// District Rainfall Normals — horizontal bar chart
// ---------------------------------------------------------------------------
export function initDistrictRainfallChart(canvasId, data) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const labels = data.districts.map((d) => d.name);
  const values = data.districts.map((d) => d.value);

  // Colour: below 700 = amber, 700-800 = blue, above 800 = teal
  const bgColors = values.map((v) =>
    v < 700 ? PALETTE.amber : v < 800 ? PALETTE.blueLight : PALETTE.teal
  );

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: '30-year Normal (mm)',
          data: values,
          backgroundColor: bgColors,
          borderRadius: 4,
          borderSkipped: false,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label(ctx) {
              return `${ctx.parsed.x} mm (IMD 30-yr normal)`;
            },
          },
        },
      },
      scales: {
        x: {
          beginAtZero: false,
          min: 500,
          max: 1050,
          grid: { color: PALETTE.gridLine },
          title: {
            display: true,
            text: 'Rainfall (mm)',
            font: { size: 11 },
          },
          ticks: { font: { size: 11 } },
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 11 } },
        },
      },
    },
  });
}

// ---------------------------------------------------------------------------
// Water Use Categories — doughnut (national illustrative breakdown)
// ---------------------------------------------------------------------------
export function initWaterUseDonut(canvasId) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Agriculture (~80%)', 'Domestic (~8%)', 'Industry (~5%)', 'Other (~7%)'],
      datasets: [
        {
          data: [80, 8, 5, 7],
          backgroundColor: [PALETTE.teal, PALETTE.blue, PALETTE.navy, '#90A4AE'],
          borderWidth: 2,
          borderColor: '#fff',
          hoverOffset: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { font: { size: 12 }, padding: 16, boxWidth: 14 },
        },
        tooltip: {
          callbacks: {
            afterLabel() {
              return 'Source: Ministry of Jal Shakti / World Bank\nNote: National estimate — not Marathwada-specific';
            },
          },
        },
      },
    },
  });
}
