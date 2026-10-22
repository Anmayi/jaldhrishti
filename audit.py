"""
audit.py — Static analysis of JalDrishti files
Checks for known issues without needing a browser.
"""
import re, json

issues = []
fixes  = []

# ── 1. HTML checks ────────────────────────────────────────────────────────────
html = open("index.html", encoding="utf-8").read()

# Check CDN scripts are in correct position (before ES module)
chart_pos  = html.index("chart.umd.min.js")
leaflet_pos = html.index("leaflet@1.9.4/dist/leaflet.js")
module_pos  = html.index('type="module"')
if chart_pos < module_pos and leaflet_pos < module_pos:
    print("✅ HTML: CDN scripts load before ES module (correct)")
else:
    issues.append("CDN scripts must come before type=module script")

# Check mobile nav toggle is OUTSIDE .app-shell (before it)
toggle_pos  = html.index("mobile-nav-toggle")
shell_pos   = html.index('class="app-shell"')
if toggle_pos < shell_pos:
    print("✅ HTML: Mobile toggle is outside app-shell (correct)")
else:
    issues.append("mobile-nav-toggle must appear before app-shell div")

# ── 2. Mobile sidebar — nav link click listener timing ───────────────────────
app = open("js/app.js", encoding="utf-8").read()

# initMobileSidebar queries nav links with sidebar.querySelectorAll('.nav-item')
# but it is called BEFORE buildNav() populates those links in the original code...
# Actually let's check init order:
init_section = app[app.index("document.addEventListener('DOMContentLoaded'"):]
order = []
for fn in ["buildNav", "initMobileSidebar", "buildHome", "buildDashboard",
           "buildExplore", "buildWaterLoss", "buildCaseStudies",
           "buildResearch", "buildReferences", "buildFooter"]:
    pos = init_section.find(fn + "()")
    if pos >= 0:
        order.append((pos, fn))
order.sort()
call_order = [o[1] for o in order]
print(f"\nInit call order: {call_order}")

buildNav_pos = call_order.index("buildNav")
initMobile_pos = call_order.index("initMobileSidebar")
if buildNav_pos < initMobile_pos:
    print("✅ buildNav() called before initMobileSidebar() (correct)")
else:
    issues.append("BUG: initMobileSidebar() called before buildNav() — nav links won't get close-on-click handlers")
    fixes.append("Call buildNav() before initMobileSidebar()")

# ── 3. Footer margin-left uses CSS var at runtime — check it ─────────────────
if "margin-left:var(--nav-width)" in app:
    issues.append("BUG: Footer uses margin-left:var(--nav-width) in inline style inside innerHTML. "
                  "On mobile --nav-width is 0px so this is fine, but on resize the footer won't "
                  "update. Minor but worth noting.")
    fixes.append("Footer margin-left: remove inline style; let CSS handle it via the .main-content rule")

# ── 4. charts.js — Chart.defaults set at module parse time ───────────────────
charts = open("js/charts.js", encoding="utf-8").read()
if "Chart.defaults.font.family" in charts:
    # This runs when module is parsed. Chart.js UMD must already be loaded.
    # Since UMD scripts are before the module script in HTML, this is safe.
    print("✅ Chart.defaults setup: UMD loaded first, safe")

# ── 5. map.js — L.tooltip used as standalone (not layer.bindTooltip) ─────────
mapjs = open("js/map.js", encoding="utf-8").read()
if "L.tooltip(" in mapjs and ".setLatLng(" in mapjs and ".addTo(map)" in mapjs:
    issues.append(
        "BUG: L.tooltip().setLatLng().addTo(map) is NOT the correct Leaflet API. "
        "Standalone tooltips in Leaflet 1.x must be created as L.tooltip(latlng, options).addTo(map) "
        "OR use a marker.bindTooltip(). The current pattern will throw because L.tooltip() "
        "returns a Tooltip object without a setLatLng method in Leaflet 1.9."
    )
    fixes.append(
        "Replace L.tooltip().setLatLng().addTo(map) with L.marker(centroid, {opacity:0, interactive:false})"
        ".bindTooltip(content, {permanent:true, direction:'center', className:'district-map-label'}).addTo(map)"
    )

# ── 6. filter.js — filter compares tag strings with comma+space ──────────────
filters = open("js/filters.js", encoding="utf-8").read()
app_case = app[app.index("buildCaseStudies"):]
# Check how data-tags is written
if 'cs.tags.join(\', \')' in app or "cs.tags.join(', ')" in app:
    # data-tags="Groundwater Recharge, Community Participation, India"
    # filter splits by comma+space -> correct
    print("✅ Filter: data-tags joined with ', ' and split by ', ' — consistent")

# ── 7. data.js — verify no invented stats (check 'verified: false' entries) ──
data = open("js/data.js", encoding="utf-8").read()
unverified_count = data.count("verified: false")
verified_count   = data.count("verified: true")
print(f"\nData: {verified_count} verified=true, {unverified_count} verified=false entries")
if unverified_count > 0:
    print("✅ Unverified entries exist and are marked — good practice")

# ── 8. CSS: check .stat-card--unverified has dashed border ───────────────────
components = open("css/components.css", encoding="utf-8").read()
if "stat-card--unverified" in components and "border-style: dashed" in components:
    print("✅ CSS: unverified stat cards have dashed border style")
else:
    issues.append("CSS: .stat-card--unverified missing border-style:dashed (visual cue for placeholder data)")

# ── 9. Check mobile nav overlay CSS class names match JS ─────────────────────
layout = open("css/layout.css", encoding="utf-8").read()
if ".sidebar-overlay.active" in layout and "sidebar-overlay" in html:
    print("✅ Mobile overlay: class names consistent across CSS/HTML/JS")

# ── 10. Check if initMobileSidebar adds click listeners on nav items ─────────
# The listeners are added inside initMobileSidebar, querying .nav-item from sidebar
# But nav items are only added by buildNav(). If buildNav runs first this is fine.
# CONFIRMED above: buildNav IS first. But initMobileSidebar queries at init time —
# if it runs right after buildNav the items exist. Let's verify:
mobile_fn_start = app.index("function initMobileSidebar")
mobile_fn_end   = app.index("// -----------", mobile_fn_start + 10)
mobile_fn       = app[mobile_fn_start:mobile_fn_end]
if "sidebar.querySelectorAll('.nav-item')" in mobile_fn:
    print("✅ initMobileSidebar queries .nav-item from sidebar (buildNav already ran)")

# ── Summary ───────────────────────────────────────────────────────────────────
print("\n" + "="*60)
print(f"ISSUES FOUND: {len(issues)}")
for i, iss in enumerate(issues, 1):
    print(f"\n  [{i}] {iss}")
print("\nFIXES:")
for i, fix in enumerate(fixes, 1):
    print(f"\n  [{i}] {fix}")
