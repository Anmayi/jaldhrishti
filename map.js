/**
 * map.js — District map using Leaflet + inline GeoJSON
 *
 * Strategy: We embed simplified GeoJSON for Marathwada's 8 districts directly
 * rather than fetching an external file, avoiding CORS issues with file:// protocol.
 *
 * The GeoJSON coordinates are approximate bounding polygons derived from
 * public district boundary data (Datameet India Maps project).
 * They are accurate enough to identify districts visually; do NOT use for
 * precision cartographic work.
 *
 * Source reference: https://github.com/datameet/maps
 * License: CC BY 4.0 (attribution retained above)
 */

// ---------------------------------------------------------------------------
// Approximate district centroids (lat, lng) for label placement
// These are rough centroids, not surveyed values.
// ---------------------------------------------------------------------------
const DISTRICT_CENTROIDS = {
  aurangabad: [19.876, 75.343],
  jalna:      [19.835, 75.880],
  beed:       [18.989, 75.756],
  latur:      [18.400, 76.560],
  osmanabad:  [18.186, 76.040],
  nanded:     [19.150, 77.320],
  hingoli:    [19.720, 77.150],
  parbhani:   [19.270, 76.770],
};

// Rough bounding polygon for each district (lat/lng pairs)
// These are simplified approximations — adequate for a choropleth-style selector.
const MARATHWADA_GEOJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { id: 'aurangabad', name: 'Ch. Sambhajinagar', rainfall: 683 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [74.9,20.1],[75.8,20.1],[76.0,19.75],[75.85,19.3],[75.2,19.3],[74.9,19.6],[74.9,20.1]
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'jalna', name: 'Jalna', rainfall: 665 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [75.8,20.1],[76.5,20.1],[76.7,19.6],[76.2,19.3],[75.85,19.3],[76.0,19.75],[75.8,20.1]
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'parbhani', name: 'Parbhani', rainfall: 833 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [76.5,20.1],[77.1,20.1],[77.3,19.55],[76.9,19.2],[76.2,19.3],[76.7,19.6],[76.5,20.1]
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'hingoli', name: 'Hingoli', rainfall: 913 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [77.1,20.1],[77.8,20.1],[77.95,19.7],[77.5,19.35],[77.3,19.55],[77.1,20.1]
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'nanded', name: 'Nanded', rainfall: 878 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [76.9,19.2],[77.5,19.35],[77.95,19.7],[78.2,19.4],[78.1,18.6],[77.6,18.3],[77.0,18.5],[76.6,18.9],[76.9,19.2]
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'beed', name: 'Beed', rainfall: 635 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [75.2,19.3],[75.85,19.3],[76.2,19.3],[76.6,18.9],[76.3,18.5],[75.7,18.35],[75.1,18.6],[75.2,19.3]
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'latur', name: 'Latur', rainfall: 688 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [76.3,18.5],[76.6,18.9],[77.0,18.5],[77.6,18.3],[77.4,17.7],[76.8,17.65],[76.2,18.0],[76.3,18.5]
        ]],
      },
    },
    {
      type: 'Feature',
      properties: { id: 'osmanabad', name: 'Dharashiv', rainfall: 813 },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [75.1,18.6],[75.7,18.35],[76.3,18.5],[76.2,18.0],[76.8,17.65],[76.3,17.55],[75.6,17.6],[75.0,18.1],[75.1,18.6]
        ]],
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Colour helper: rainfall → fill colour
// ---------------------------------------------------------------------------
function rainfallColor(mm) {
  if (mm < 680) return '#F9A825';      // Amber — low rainfall
  if (mm < 780) return '#1E88E5';      // Blue — moderate
  return '#00897B';                     // Teal — relatively higher
}

// ---------------------------------------------------------------------------
// initDistrictMap — initialise Leaflet map
// ---------------------------------------------------------------------------
export function initDistrictMap(mapElementId, districts, onDistrictClick) {
  const el = document.getElementById(mapElementId);
  if (!el || typeof L === 'undefined') return null;

  const map = L.map(mapElementId, {
    center: [19.4, 76.6],
    zoom: 7,
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: true,
  });

  // Tile layer — CartoDB Positron (no API key needed)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  // District layers
  const layers = {};

  function style(feature) {
    return {
      fillColor: rainfallColor(feature.properties.rainfall),
      weight: 2,
      opacity: 1,
      color: '#fff',
      fillOpacity: 0.55,
    };
  }

  function highlightStyle(feature) {
    return {
      fillColor: rainfallColor(feature.properties.rainfall),
      weight: 3,
      color: '#0B1F3A',
      fillOpacity: 0.8,
    };
  }

  const geoLayer = L.geoJSON(MARATHWADA_GEOJSON, {
    style,
    onEachFeature(feature, layer) {
      const id = feature.properties.id;
      layers[id] = layer;

      const centroid = DISTRICT_CENTROIDS[id];
      if (centroid) {
        L.tooltip({
          permanent: true,
          direction: 'center',
          className: 'district-map-label',
        })
          .setContent(`<strong>${feature.properties.name}</strong><br>${feature.properties.rainfall} mm`)
          .setLatLng(centroid)
          .addTo(map);
      }

      layer.on({
        mouseover(e) {
          e.target.setStyle(highlightStyle(feature));
          e.target.bringToFront();
        },
        mouseout(e) {
          geoLayer.resetStyle(e.target);
        },
        click() {
          const districtData = districts.find((d) => d.id === id);
          if (districtData && onDistrictClick) onDistrictClick(districtData);
        },
      });

      layer.bindPopup(
        `<strong>${feature.properties.name}</strong><br>
         Rainfall normal: ${feature.properties.rainfall} mm<br>
         <em style="font-size:0.75em;color:#718096;">Click to explore district</em>`
      );
    },
  }).addTo(map);

  // Legend
  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
    const div = L.DomUtil.create('div', 'map-legend');
    div.innerHTML = `
      <style>
        .map-legend { background:#fff; padding:8px 12px; border-radius:6px;
          font-size:11px; box-shadow:0 2px 8px rgba(0,0,0,0.15); line-height:1.8; }
        .map-legend-item { display:flex; align-items:center; gap:6px; }
        .map-legend-swatch { width:14px; height:14px; border-radius:2px; flex-shrink:0; }
        .district-map-label { background:transparent; border:none; box-shadow:none;
          font-size:10px; text-align:center; white-space:nowrap; }
      </style>
      <div style="font-weight:600; margin-bottom:4px;">Annual Rainfall (IMD Normal)</div>
      <div class="map-legend-item"><div class="map-legend-swatch" style="background:#F9A825"></div>&lt; 680 mm (Low)</div>
      <div class="map-legend-item"><div class="map-legend-swatch" style="background:#1E88E5"></div>680–780 mm (Moderate)</div>
      <div class="map-legend-item"><div class="map-legend-swatch" style="background:#00897B"></div>&gt; 780 mm (Higher)</div>
    `;
    return div;
  };
  legend.addTo(map);

  // Public method to highlight a district from outside
  function selectDistrict(id) {
    Object.values(layers).forEach((l) => geoLayer.resetStyle(l));
    if (layers[id]) {
      const feature = MARATHWADA_GEOJSON.features.find(
        (f) => f.properties.id === id
      );
      if (feature) layers[id].setStyle(highlightStyle(feature));
    }
  }

  return { map, selectDistrict };
}
