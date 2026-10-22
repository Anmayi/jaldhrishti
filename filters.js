/**
 * filters.js — Filter and sort logic for case studies
 *
 * Handles tag-based filtering of case study cards.
 * Does not touch DOM structure — only add/remove the `case-card--hidden` class.
 */

// ---------------------------------------------------------------------------
// Case Study Filter
// ---------------------------------------------------------------------------
export function initCaseStudyFilters(filterBarId, cardsContainerId) {
  const filterBar = document.getElementById(filterBarId);
  const container = document.getElementById(cardsContainerId);
  if (!filterBar || !container) return;

  let activeFilter = 'All';

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    activeFilter = btn.dataset.filter;

    // Update button states
    filterBar.querySelectorAll('.filter-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.filter === activeFilter);
    });

    // Show/hide cards
    container.querySelectorAll('.case-card').forEach((card) => {
      const tags = (card.dataset.tags || '').split(',').map((t) => t.trim());
      const matches =
        activeFilter === 'All' || tags.includes(activeFilter);
      card.classList.toggle('case-card--hidden', !matches);
    });

    // Show empty state if all cards are hidden
    const visible = container.querySelectorAll('.case-card:not(.case-card--hidden)').length;
    let empty = container.querySelector('.empty-state');
    if (visible === 0 && !empty) {
      empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.innerHTML = `
        <div class="empty-state__icon">🔍</div>
        <div class="empty-state__title">No case studies for this filter</div>
        <div class="empty-state__text">Try selecting a different category above.</div>
      `;
      container.appendChild(empty);
    } else if (visible > 0 && empty) {
      empty.remove();
    }
  });
}

// ---------------------------------------------------------------------------
// District Filter for Dashboard Charts
// If you later add district-specific stats, wire them through here.
// ---------------------------------------------------------------------------
export function initDistrictFilter(selectId, onDistrictChange) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.addEventListener('change', () => {
    onDistrictChange(sel.value);
  });
}
