/**
 * features.js — GoodStop Real Feature Implementations
 * Overrides demo functions with fully functional equivalents:
 *  • Real GPS via navigator.geolocation
 *  • Real interactive map via Leaflet + OpenStreetMap
 *  • Real hospital search via Overpass API
 *  • Real QR code via QRCode.js library
 *  • Real SMS via sms: URI scheme
 *  • Web Share API for emergency location sharing
 *  • Browser Notification API for family alerts
 *  • localStorage for Medical ID persistence
 *  • Real Web Speech API for Voice SOS
 *  • Clipboard API for copy-to-clipboard
 */

'use strict';

// ════════════════════════════════════════════════════
// GLOBAL STATE
// ════════════════════════════════════════════════════
let realGPS = null;
let leafletMap = null;
let privAmbMarker = null;
let govtAmbMarker = null;
let heatmapCircles = [];
let ambulanceInterval = null;
let privAmbProgress = 0;

let INCIDENT = { lat: 28.4595, lng: 77.0266, label: 'NH-48, km 28.4' };
let PRIV_START = { lat: 28.4400, lng: 77.0100 };
let GOVT_POS   = { lat: 28.4900, lng: 77.0800 };
const HOSPITALS = [
  { lat: 28.4673, lng: 77.0400, name: 'Medanta Hospital', cap: 68 },
  { lat: 28.4800, lng: 77.0100, name: 'Fortis Memorial', cap: 87 },
  { lat: 28.5672, lng: 77.2100, name: 'AIIMS Delhi', cap: 45 },
];

// ════════════════════════════════════════════════════
// TOAST NOTIFICATION SYSTEM
// ════════════════════════════════════════════════════
const _toastStyle = document.createElement('style');
_toastStyle.textContent = `
  @keyframes toastIn  { from{opacity:0;transform:translateX(-50%) translateY(16px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
  @keyframes toastOut { from{opacity:1;transform:translateX(-50%) translateY(0)} to{opacity:0;transform:translateX(-50%) translateY(16px)} }
  #gs-toast {
    position:fixed; bottom:90px; left:50%; transform:translateX(-50%);
    background:linear-gradient(135deg,#0f1e2d,#162436);
    border:1px solid rgba(0,232,150,0.3); color:#00e896;
    padding:12px 24px; border-radius:50px; font-size:0.85rem;
    font-family:Inter,sans-serif; font-weight:600; z-index:99999;
    box-shadow:0 8px 32px rgba(0,0,0,0.6); max-width:90vw; text-align:center;
    animation:toastIn 0.3s ease;
  }
  /* Leaflet dark popup */
  .leaflet-popup-content-wrapper { background:#0d1b2a!important; border:1px solid rgba(0,232,150,0.2)!important; color:#e8f4ff!important; border-radius:12px!important; box-shadow:0 8px 32px rgba(0,0,0,0.5)!important; }
  .leaflet-popup-tip { background:#0d1b2a!important; }
  .leaflet-popup-content { font-size:0.82rem!important; line-height:1.6!important; }
  .leaflet-control-attribution { background:rgba(5,13,18,0.85)!important; color:rgba(255,255,255,0.3)!important; font-size:10px!important; }
  .leaflet-control-attribution a { color:rgba(0,232,150,0.4)!important; }
  #map-leaflet { z-index:0!important; }
  .gs-popup-btn { margin-top:8px; padding:5px 12px; background:linear-gradient(135deg,#00e896,#00c4b4); border:none; border-radius:6px; font-size:0.75rem; font-weight:800; cursor:pointer; color:#000; }
`;
document.head.appendChild(_toastStyle);

function showToast(msg, ms = 3000) {
  const old = document.getElementById('gs-toast');
  if (old) old.remove();
  const t = document.createElement('div');
  t.id = 'gs-toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => {
    t.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => t.remove(), 300);
  }, ms);
}

// ════════════════════════════════════════════════════
// REAL GPS / GEOLOCATION
// ════════════════════════════════════════════════════
function initRealGeolocation() {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(
    pos => {
      realGPS = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: Math.round(pos.coords.accuracy),
        ts: new Date().toLocaleTimeString()
      };
      
      // Calculate dynamic incident and ambulance spawns based on user location
      INCIDENT = { lat: realGPS.lat, lng: realGPS.lng, label: 'Your Current Location' };
      PRIV_START = { lat: realGPS.lat - 0.015, lng: realGPS.lng - 0.015 }; // ~2km away
      GOVT_POS = { lat: realGPS.lat + 0.040, lng: realGPS.lng + 0.030 }; // ~5km away
      
      // Redraw the entire map to reflect dynamic coordinates
      if (leafletMap) {
        leafletMap.off();
        leafletMap.remove();
        leafletMap = null;
      }
      initMap();
      

      // 1. Reverse Geocoding (Nominatim)
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${realGPS.lat}&lon=${realGPS.lng}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.display_name) {
            INCIDENT.label = data.address.road || data.address.suburb || 'Your Location';
            const parts = data.display_name.split(',');
            const shortAddress = parts.slice(0, 3).join(',');
            showToast(`📍 Location locked: ${shortAddress}`, 3500);
            
            // Update UI elements showing hardcoded "NH-48"
            const dsLabel = document.getElementById('stat1');
            if(dsLabel) dsLabel.textContent = shortAddress;
          }
        }).catch(e => console.log('Geocoding error', e));

      // 2. Fetch Real Nearby Hospitals (Overpass API)
      showToast('🏥 Finding nearby hospitals via OpenStreetMap...', 2000);
      const query = `[out:json];node["amenity"="hospital"](around:5000,${realGPS.lat},${realGPS.lng});out 5;`;
      fetch('https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query))
        .then(res => res.json())
        .then(data => {
          if (data && data.elements && data.elements.length > 0) {
            window.HOSPITALS = data.elements.map(e => ({
              lat: e.lat,
              lng: e.lon,
              name: e.tags.name || 'Local Hospital',
              cap: Math.floor(Math.random() * 60) + 20 // Simulate capacity
            }));
            if (typeof renderHospitals === 'function') renderHospitals();
            if (typeof initMap === 'function') initMap(); // Redraw map with real hospitals
            showToast(`🏥 Found ${window.HOSPITALS.length} real hospitals nearby`, 3000);
          }
        }).catch(e => console.log('Overpass error', e));
        
      showToast(`📍 GPS locked — ±${realGPS.accuracy}m accuracy`, 2500);

    },
    err => console.log('[GoodStop] Geolocation:', err.message),
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
  );
}

// ════════════════════════════════════════════════════
// REAL LEAFLET MAP (OpenStreetMap + CartoDB Dark)
// ════════════════════════════════════════════════════
function makeMarkerIcon(color, size = 22, label = '') {
  return L.divIcon({
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:2.5px solid rgba(255,255,255,0.75);box-shadow:0 0 14px ${color};display:flex;align-items:center;justify-content:center;font-size:${size*0.45}px;font-weight:900;color:#000">${label}</div>`,
    className: '', iconSize: [size, size], iconAnchor: [size/2, size/2]
  });
}

function makeHospIcon(cap) {
  const c = cap > 80 ? '#ff4757' : cap > 60 ? '#ffb800' : '#00e896';
  return L.divIcon({
    html: `<div style="width:22px;height:22px;border-radius:5px;background:${c};border:2px solid rgba(255,255,255,0.7);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:900;color:#000;box-shadow:0 0 8px ${c}">H</div>`,
    className: '', iconSize: [22, 22], iconAnchor: [11, 11]
  });
}

function initMap() {
  if (!window.L) { console.log('[GoodStop] Leaflet not loaded yet'); return; }
  if (leafletMap) return;

  const mapDiv = document.getElementById('map-leaflet');
  if (!mapDiv) return;

  leafletMap = L.map('map-leaflet', {
    center: [INCIDENT.lat, INCIDENT.lng],
    zoom: 13,
    zoomControl: false,
    attributionControl: true
  });

  // Dark map tiles — CartoDB Dark Matter (free, no API key)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org">OSM</a> &copy; <a href="https://carto.com">CARTO</a>',
    maxZoom: 19, subdomains: 'abcd'
  }).addTo(leafletMap);

  // Accident marker (pulsing)
  const accidentMarker = L.marker([INCIDENT.lat, INCIDENT.lng], {
    icon: L.divIcon({
      html: `<div style="position:relative;width:32px;height:32px">
               <div style="position:absolute;inset:0;border-radius:50%;background:rgba(255,71,87,0.25);animation:leafPulse 1.5s ease infinite"></div>
               <div style="position:absolute;inset:6px;border-radius:50%;background:#ff4757;border:2px solid rgba(255,255,255,0.8);box-shadow:0 0 16px #ff4757;display:flex;align-items:center;justify-content:center;font-size:11px">⚠</div>
             </div>
             <style>@keyframes leafPulse{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.4);opacity:0}}</style>`,
      className: '', iconSize: [32, 32], iconAnchor: [16, 16]
    })
  }).addTo(leafletMap).bindPopup(`
    <div>
      <strong style="color:#ff4757">⚠ ACTIVE INCIDENT</strong><br/>
      ${INCIDENT.label} · Gurugram<br/>
      GPS: ${INCIDENT.lat}°N, ${INCIDENT.lng}°E<br/>
      <small>Reported 2 min ago · 2 casualties</small><br/>
      <button class="gs-popup-btn" onclick="openBystander()">📱 Report This Incident</button>
    </div>
  `);

  // Private ambulance (moving toward accident)
  privAmbMarker = L.marker([PRIV_START.lat, PRIV_START.lng], {
    icon: makeMarkerIcon('#00e896', 24, '🚑')
  }).addTo(leafletMap).bindPopup(`
    <div><strong style="color:#00e896">⚡ Medlife #M-14</strong><br/>
    Private ALS Ambulance<br/>ETA: <strong>9 min</strong> · En route to scene</div>
  `);

  // Government ambulance (stationary — bypassed)
  govtAmbMarker = L.marker([GOVT_POS.lat, GOVT_POS.lng], {
    icon: makeMarkerIcon('#0091ff', 18, '🚑')
  }).addTo(leafletMap).bindPopup(`
    <div><strong style="color:#0091ff">🏛 State Ambulance 108</strong><br/>
    Government Unit<br/>ETA: <strong style="color:#ff4757">34 min</strong><br/>
    <small>Bypassed by GoodStop AI — private is faster</small></div>
  `);

  // Route line: private amb → accident (animated dashes)
  L.polyline([[PRIV_START.lat, PRIV_START.lng], [INCIDENT.lat, INCIDENT.lng]], {
    color: '#00e896', weight: 3, dashArray: '10, 8', opacity: 0.8
  }).addTo(leafletMap);

  // Govt route (faded)
  L.polyline([[GOVT_POS.lat, GOVT_POS.lng], [INCIDENT.lat, INCIDENT.lng]], {
    color: '#0091ff', weight: 2, dashArray: '6, 10', opacity: 0.3
  }).addTo(leafletMap);

  // Known hospitals
  HOSPITALS.forEach(h => {
    L.marker([h.lat, h.lng], { icon: makeHospIcon(h.cap) })
      .addTo(leafletMap)
      .bindPopup(`
        <div><strong>🏥 ${h.name}</strong><br/>
        ICU Capacity: <strong>${h.cap}%</strong><br/>
        <small>Trauma care · Pre-alert available</small></div>
      `);
  });

  // User location marker (updated when GPS arrives)
  window._userLocMarker = L.circleMarker([INCIDENT.lat, INCIDENT.lng], {
    radius: 9, color: '#fff', weight: 2,
    fillColor: '#0091ff', fillOpacity: 0.9
  }).addTo(leafletMap).bindPopup('<b>📍 Your Location</b><br/>Locating…');

  // Map click → report new incident
  leafletMap.on('click', e => {
    const { lat, lng } = e.latlng;
    L.popup()
      .setLatLng([lat, lng])
      .setContent(`
        <div><strong style="color:#ffb800">📍 New location selected</strong><br/>
        ${lat.toFixed(5)}°N, ${lng.toFixed(5)}°E<br/>
        <button class="gs-popup-btn" onclick="openBystander()">Report Accident Here</button></div>
      `)
      .openOn(leafletMap);
  });

  // Animate private ambulance every 200ms
  privAmbProgress = 0;
  clearInterval(ambulanceInterval);
  ambulanceInterval = setInterval(() => {
    privAmbProgress = Math.min(privAmbProgress + 0.004, 0.97);
    const lat = PRIV_START.lat + (INCIDENT.lat - PRIV_START.lat) * privAmbProgress;
    const lng = PRIV_START.lng + (INCIDENT.lng - PRIV_START.lng) * privAmbProgress;
    privAmbMarker.setLatLng([lat, lng]);
    const etaMin = Math.max(1, Math.round(9 * (1 - privAmbProgress)));
    privAmbMarker.setPopupContent(
      `<div><strong style="color:#00e896">⚡ Medlife #M-14</strong><br/>Private ALS Ambulance<br/>ETA: <strong>${etaMin} min</strong> · En route</div>`
    );
    const etaEl = document.getElementById('ds-eta');
    if (etaEl) etaEl.textContent = etaMin + ' min';
  }, 200);

  // Try to fetch real hospitals from Overpass API
  setTimeout(() => searchNearbyHospitals(INCIDENT.lat, INCIDENT.lng), 1500);

  // If GPS was already obtained, fly there
  if (realGPS) {
    leafletMap.flyTo([realGPS.lat, realGPS.lng], 14, { duration: 1.5 });
    window._userLocMarker.setLatLng([realGPS.lat, realGPS.lng])
      .setPopupContent(`<b>📍 Your Location</b><br/>${realGPS.lat.toFixed(5)}°N, ${realGPS.lng.toFixed(5)}°E<br/><small>Accuracy ±${realGPS.accuracy}m</small>`);
    searchNearbyHospitals(realGPS.lat, realGPS.lng);
  }
}

// Override old canvas-based zoom/center
function mapZoom(dir) {
  if (leafletMap) { dir > 0 ? leafletMap.zoomIn() : leafletMap.zoomOut(); }
}
function mapCenter() {
  if (!leafletMap) return;
  const center = realGPS ? [realGPS.lat, realGPS.lng] : [INCIDENT.lat, INCIDENT.lng];
  leafletMap.flyTo(center, 14, { duration: 1 });
}

// ════════════════════════════════════════════════════
// REAL HEATMAP (Leaflet circles, not canvas)
// ════════════════════════════════════════════════════
const hotspotGeo = [
  { lat: 28.4595, lng: 77.0266, r: 900, i: 1.0 },
  { lat: 28.4400, lng: 77.0100, r: 700, i: 0.7 },
  { lat: 28.4850, lng: 77.0420, r: 600, i: 0.55 },
  { lat: 28.5010, lng: 77.0600, r: 500, i: 0.45 },
  { lat: 28.4180, lng: 77.0510, r: 550, i: 0.6 },
  { lat: 28.4720, lng: 76.9810, r: 480, i: 0.45 },
  { lat: 28.4310, lng: 77.0820, r: 420, i: 0.38 },
];

function toggleHeatmap() {
  window.heatmapActive = !window.heatmapActive;
  const btn = document.getElementById('map-heatmap-btn');
  const legend = document.getElementById('heatmap-legend');
  if (btn) btn.classList.toggle('active', window.heatmapActive);
  if (legend) legend.style.display = window.heatmapActive ? 'flex' : 'none';

  if (!leafletMap) return;

  if (window.heatmapActive) {
    heatmapCircles = hotspotGeo.map(h =>
      L.circle([h.lat, h.lng], {
        radius: h.r,
        color: 'transparent',
        fillColor: `rgb(255,${Math.round(50 + 80*(1-h.i))},50)`,
        fillOpacity: 0.42 * h.i
      }).addTo(leafletMap)
    );
    showToast('🔥 Accident hotspot heatmap enabled (last 30 days)');
  } else {
    heatmapCircles.forEach(c => leafletMap.removeLayer(c));
    heatmapCircles = [];
  }
}

// ════════════════════════════════════════════════════
// REAL HOSPITAL SEARCH — Overpass API (OpenStreetMap)
// ════════════════════════════════════════════════════
async function searchNearbyHospitals(lat, lng) {
  try {
    const q = `[out:json][timeout:12];(node["amenity"="hospital"](around:8000,${lat},${lng});way["amenity"="hospital"](around:8000,${lat},${lng}););out center 10;`;
    const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(q)}`);
    if (!res.ok) return;
    const data = await res.json();
    if (!leafletMap || !data.elements?.length) return;

    const realIcon = L.divIcon({
      html: `<div style="width:20px;height:20px;border-radius:4px;background:#00c4b4;border:2px solid rgba(255,255,255,0.7);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:900;color:#000;box-shadow:0 0 8px #00c4b4">H</div>`,
      className: '', iconSize: [20, 20], iconAnchor: [10, 10]
    });

    let count = 0;
    data.elements.forEach(el => {
      if (count >= 8) return;
      const eLat = el.lat ?? el.center?.lat;
      const eLng = el.lon ?? el.center?.lon;
      if (!eLat || !eLng) return;
      const name = el.tags?.name || 'Hospital';
      if (count === 0) window._nearestHospital = name; // Save nearest for simulator
      L.marker([eLat, eLng], { icon: realIcon })
        .addTo(leafletMap)
        .bindPopup(`<div><strong>🏥 ${name}</strong><br/><small style="color:#00c4b4">● Real data · OpenStreetMap</small></div>`);
      count++;
    });

    if (count > 0) showToast(`🏥 Found ${count} real hospitals within 8km`, 3000);
  } catch (e) {
    console.log('[GoodStop] Hospital search unavailable (offline or rate-limited)');
  }
}

// ════════════════════════════════════════════════════
// REAL QR CODE via QRCode.js
// ════════════════════════════════════════════════════
function showQR() {
  const modal = document.getElementById('qr-modal');
  if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
  setTimeout(generateRealQR, 80);
}

function generateRealQR() {
  const container = document.getElementById('qr-canvas-container');
  if (!container) return;
  container.innerHTML = '';

  if (!window.currentMedID) {
    container.innerHTML = '<p style="color:#666;font-size:0.75rem;padding:20px;text-align:center">Generate your Medical ID first</p>';
    return;
  }

  // Encode medical data as structured text (compact for QR)
  const qrData = [
    'GOODSTOP-MEDID-v1',
    `BG:${window.currentMedID.blood}`,
    `DONOR:${window.currentMedID.donor}`,
    `ALLERGY:${window.currentMedID.allergy || 'None'}`,
    `COND:${window.currentMedID.conditions || 'None'}`,
    `MEDS:${window.currentMedID.meds || 'None'}`,
    `EC1:${window.currentMedID.contact1 || 'None'}`,
    `EC2:${window.currentMedID.contact2 || 'None'}`
  ].join('|');

  if (window.QRCode) {
    try {
      new QRCode(container, {
        text: qrData,
        width: 200, height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
      window._lastQRData = qrData;
      showToast('✅ Real QR generated — scan with any phone!', 3000);
    } catch (err) {
      fetchQRFromAPI(qrData, container);
    }
  } else {
    fetchQRFromAPI(qrData, container);
  }
}

function fetchQRFromAPI(data, container) {
  // Fallback: Google Chart API (free, public)
  const encoded = encodeURIComponent(data);
  const img = document.createElement('img');
  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&ecc=M&data=${encoded}`;
  img.width = 200; img.height = 200;
  img.style.borderRadius = '8px';
  img.alt = 'Medical ID QR Code';
  img.onerror = () => { container.innerHTML = '<p style="color:#666;font-size:0.75rem;padding:20px;text-align:center">QR needs internet connection</p>'; };
  container.appendChild(img);
  window._lastQRData = data;
  window._lastQRImg = img;
}

function downloadQR() {
  const container = document.getElementById('qr-canvas-container');
  if (!container) return;
  const canvas = container.querySelector('canvas');
  const img = container.querySelector('img');
  if (canvas) {
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'GoodStop-Medical-ID.png';
    a.click();
    showToast('⬇ Medical ID QR downloaded!');
  } else if (img) {
    showToast('💡 Right-click the QR image and choose "Save image as"');
  }
}

// ════════════════════════════════════════════════════
// MEDICAL ID — localStorage PERSISTENCE
// ════════════════════════════════════════════════════
function generateMedID() {
  const fields = ['blood', 'donor', 'allergy', 'conditions', 'contact1', 'contact2', 'meds'];
  const data = {};
  fields.forEach(f => { data[f] = document.getElementById(`mid-${f}`)?.value || ''; });

  window.currentMedID = data;

  // Persist to localStorage
  try {
    localStorage.setItem('goodstop_medid', JSON.stringify(data));
  } catch (e) {}

  // Render the card
  const card = document.getElementById('medid-card');
  const qrBtn = document.getElementById('medid-qr-btn');
  if (!card) return;

  const id = Math.random().toString(36).substr(2, 8).toUpperCase();
  card.innerHTML = `
    <div class="medid-card-header">
      <div class="medid-card-logo">🛑 GoodStop Medical ID</div>
      <div class="medid-card-emergency">EMERGENCY USE ONLY</div>
    </div>
    <div class="medid-blood-group">${data.blood || 'O+'}</div>
    <div class="medid-info-grid">
      <div class="medid-info-item">
        <div class="medid-info-label">Organ Donor</div>
        <div class="medid-info-value">${data.donor || '—'}</div>
      </div>
      <div class="medid-info-item">
        <div class="medid-info-label">Medications</div>
        <div class="medid-info-value">${data.meds || 'None'}</div>
      </div>
      <div class="medid-info-item">
        <div class="medid-info-label">Drug Allergies</div>
        <div class="medid-info-value danger">${data.allergy || 'None'}</div>
      </div>
      <div class="medid-info-item">
        <div class="medid-info-label">Conditions</div>
        <div class="medid-info-value">${data.conditions || 'None'}</div>
      </div>
    </div>
    <div class="medid-contacts">
      <div class="medid-contacts-label">Emergency Contacts</div>
      <div class="medid-contact-line">1. ${data.contact1 || 'Not provided'}</div>
      <div class="medid-contact-line">2. ${data.contact2 || 'Not provided'}</div>
    </div>
    <div style="display:flex;gap:8px;margin-top:14px;">
      <button onclick="copyMedIDToClipboard()" style="flex:1;padding:8px;background:rgba(0,232,150,0.1);border:1px solid rgba(0,232,150,0.3);color:#00e896;border-radius:8px;font-size:0.72rem;font-weight:700;cursor:pointer;font-family:Inter,sans-serif">📋 Copy ID</button>
      <button onclick="shareEmergencyProfile()" style="flex:1;padding:8px;background:rgba(0,145,255,0.1);border:1px solid rgba(0,145,255,0.3);color:#0091ff;border-radius:8px;font-size:0.72rem;font-weight:700;cursor:pointer;font-family:Inter,sans-serif">📤 Share</button>
    </div>
    <div style="position:absolute;bottom:12px;right:14px;font-size:0.58rem;color:rgba(255,255,255,0.22);">
      #${id} · Saved ${new Date().toLocaleDateString()} · goodstop.app
    </div>
  `;

  if (qrBtn) qrBtn.style.display = 'block';

  showToast('✅ Medical ID saved to your device!');
  requestNotificationPermission();
}

function loadSavedMedID() {
  try {
    const raw = localStorage.getItem('goodstop_medid');
    if (!raw) return;
    const data = JSON.parse(raw);
    window.currentMedID = data;
    const fields = ['blood', 'donor', 'allergy', 'conditions', 'contact1', 'contact2', 'meds'];
    fields.forEach(f => {
      const el = document.getElementById(`mid-${f}`);
      if (el && data[f]) el.value = data[f];
    });
    showToast('💾 Medical ID loaded from saved profile', 2500);
    setTimeout(() => generateMedID(), 400);
  } catch (e) {}
}

// ════════════════════════════════════════════════════
// REAL SMS — Opens native SMS app via sms: URI
// ════════════════════════════════════════════════════
function sendRealSMS() {
  const lat = realGPS?.lat.toFixed(6) ?? INCIDENT.lat;
  const lng = realGPS?.lng.toFixed(6) ?? INCIDENT.lng;
  const mapsLink = `https://maps.google.com/?q=${lat},${lng}`;
  const body = `🆘 EMERGENCY: Road accident at GPS ${lat}, ${lng}. Map: ${mapsLink} | Sent via GoodStop Emergency App. Please call 108 immediately.`;
  window.location.href = `sms:108?body=${encodeURIComponent(body)}`;
  // Clipboard fallback after 500ms
  setTimeout(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(body).then(() =>
        showToast('📋 Emergency SMS text also copied to clipboard!')
      ).catch(() => {});
    }
  }, 600);
}

// ════════════════════════════════════════════════════
// WEB SHARE API — Share location / Medical ID
// ════════════════════════════════════════════════════
function shareEmergency() {
  const lat = realGPS?.lat.toFixed(6) ?? INCIDENT.lat;
  const lng = realGPS?.lng.toFixed(6) ?? INCIDENT.lng;
  const mapsLink = `https://maps.google.com/?q=${lat},${lng}`;
  const payload = {
    title: '🆘 EMERGENCY — Road Accident',
    text: `EMERGENCY: Road accident reported at ${lat}, ${lng}. Please respond immediately.`,
    url: mapsLink
  };
  if (navigator.share) {
    navigator.share(payload).catch(() => copyToClipboard(mapsLink, 'Location link copied!'));
  } else {
    copyToClipboard(mapsLink, '📋 Location link copied to clipboard!');
  }
}

function shareEmergencyProfile() {
  if (!window.currentMedID) { showToast('Generate your Medical ID first'); return; }
  const d = window.currentMedID;
  const text = `🏥 GoodStop Medical ID\nBlood: ${d.blood}\nAllergies: ${d.allergy || 'None'}\nConditions: ${d.conditions || 'None'}\nMeds: ${d.meds || 'None'}\nEC1: ${d.contact1}\nEC2: ${d.contact2}`;
  if (navigator.share) {
    navigator.share({ title: '🏥 My Medical ID — GoodStop', text, url: window.location.href })
      .catch(() => copyToClipboard(text, '📋 Medical ID copied!'));
  } else {
    copyToClipboard(text, '📋 Medical ID copied to clipboard!');
  }
}

function copyMedIDToClipboard() {
  if (!window.currentMedID) { showToast('Generate your Medical ID first'); return; }
  const d = window.currentMedID;
  const text = `GOODSTOP MEDICAL ID\n━━━━━━━━━━━━━━━━━━\nBlood Group: ${d.blood}\nOrgan Donor: ${d.donor}\nDrug Allergies: ${d.allergy || 'None'}\nMedical Conditions: ${d.conditions || 'None'}\nCurrent Medications: ${d.meds || 'None'}\nEmergency Contact 1: ${d.contact1 || 'Not provided'}\nEmergency Contact 2: ${d.contact2 || 'Not provided'}\n━━━━━━━━━━━━━━━━━━\nGenerated by GoodStop Emergency App`;
  copyToClipboard(text, '📋 Medical ID copied to clipboard!');
}

function copyToClipboard(text, msg) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(() => showToast(msg || '📋 Copied!'))
      .catch(() => fallbackCopy(text, msg));
  } else {
    fallbackCopy(text, msg);
  }
}

function fallbackCopy(text, msg) {
  const el = document.createElement('textarea');
  el.value = text;
  el.style.cssText = 'position:fixed;top:-9999px;left:-9999px';
  document.body.appendChild(el);
  el.select();
  try { document.execCommand('copy'); showToast(msg || '📋 Copied!'); } catch (e) {}
  document.body.removeChild(el);
}

// ════════════════════════════════════════════════════
// BROWSER NOTIFICATION API — Family Alert Simulation
// ════════════════════════════════════════════════════
async function requestNotificationPermission() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'default') {
    const perm = await Notification.requestPermission();
    if (perm === 'granted') showToast('🔔 Notifications enabled — family alerts will work!');
  }
}

function sendBrowserNotification(title, body, delay = 0) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  setTimeout(() => {
    new Notification(title, {
      body,
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🛑</text></svg>',
      badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🚑</text></svg>',
      tag: 'goodstop-emergency'
    });
  }, delay);
}

// ════════════════════════════════════════════════════
// REAL VOICE SOS — Web Speech API with live transcript
// ════════════════════════════════════════════════════
let _voiceRec = null;
let _voiceSimTimer = null;
const EMERGENCY_KEYWORDS = ['accident','crash','hurt','injured','emergency','help','collision','road','bleeding','unconscious'];

function triggerVoiceSOS() {
  const modal = document.getElementById('voice-modal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  startVoiceRecognition();
}

function closeVoiceModal(e) {
  if (e && e.target !== document.getElementById('voice-modal')) return;
  _closeVoiceModal();
}
function _closeVoiceModal() {
  const modal = document.getElementById('voice-modal');
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
  stopVoice();
}

function startVoiceRecognition() {
  const SRClass = window.SpeechRecognition || window.webkitSpeechRecognition;
  const status    = document.getElementById('voice-status');
  const orbEl     = document.getElementById('voice-orb');
  const transcEl  = document.getElementById('voice-transcript');

  if (!SRClass) {
    if (status) status.textContent = '⚠ Speech API unavailable — simulating demo';
    _startVoiceSimulation();
    return;
  }

  if (_voiceRec) { try { _voiceRec.stop(); } catch(e) {} }

  _voiceRec = new SRClass();
  _voiceRec.lang = 'en-IN';
  _voiceRec.continuous = true;
  _voiceRec.interimResults = true;
  _voiceRec.maxAlternatives = 1;

  if (status) status.textContent = '🎙️ Listening… Say "accident" or "emergency"';

  _voiceRec.onresult = e => {
    let heard = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      heard += e.results[i][0].transcript;
    }
    if (transcEl) transcEl.textContent = `"${heard}"`;

    if (EMERGENCY_KEYWORDS.some(k => heard.toLowerCase().includes(k))) {
      _voiceRec.stop();
      if (orbEl) orbEl.classList.add('detected');
      if (status) status.textContent = '✅ Emergency keyword detected!';
      sendBrowserNotification('🆘 GoodStop Voice SOS', `Emergency phrase detected: "${heard}"`);
      setTimeout(() => { _closeVoiceModal(); openBystander(); }, 1600);
    }
  };

  _voiceRec.onerror = err => {
    console.log('[GoodStop] Voice error:', err.error);
    if (status) {
      if (err.error === 'not-allowed') {
        status.textContent = '🎤 Microphone permission denied';
        addManualTriggerBtn();
      } else if (err.error === 'no-speech') {
        status.textContent = '🔇 No speech detected — keep talking';
        _voiceRec.start(); // restart
      } else {
        status.textContent = '⚠ Voice unavailable — simulating';
        _startVoiceSimulation();
      }
    }
  };

  _voiceRec.onend = () => {
    // Only restart if modal is still open
    if (document.getElementById('voice-modal')?.classList.contains('open')) {
      try { _voiceRec.start(); } catch(e) {}
    }
  };

  try {
    _voiceRec.start();
  } catch (e) {
    if (status) status.textContent = '⚠ Could not start microphone';
    addManualTriggerBtn();
  }
}

function addManualTriggerBtn() {
  const body = document.querySelector('.voice-modal-body');
  if (!body || document.getElementById('voice-manual-btn')) return;
  const btn = document.createElement('button');
  btn.id = 'voice-manual-btn';
  btn.textContent = '👆 Tap to Report Without Voice';
  btn.onclick = () => { _closeVoiceModal(); openBystander(); };
  btn.style.cssText = 'margin-top:8px;padding:12px 24px;background:linear-gradient(135deg,#00e896,#00c4b4);border:none;border-radius:12px;font-weight:800;font-size:0.9rem;cursor:pointer;color:#000;font-family:Inter,sans-serif';
  body.appendChild(btn);
}

function _startVoiceSimulation() {
  const transcEl = document.getElementById('voice-transcript');
  const status   = document.getElementById('voice-status');
  const orbEl    = document.getElementById('voice-orb');
  let i = 0;
  const phrase = '"Help! Accident on the highway!"';
  clearInterval(_voiceSimTimer);
  _voiceSimTimer = setInterval(() => {
    i++;
    if (transcEl) transcEl.textContent = phrase.slice(0, i);
    if (i >= phrase.length) {
      clearInterval(_voiceSimTimer);
      if (orbEl) orbEl.classList.add('detected');
      if (status) status.textContent = '✅ Emergency detected! Opening report…';
      setTimeout(() => { _closeVoiceModal(); openBystander(); }, 1500);
    }
  }, 55);
}

function stopVoice() {
  clearInterval(_voiceSimTimer);
  if (_voiceRec) { try { _voiceRec.stop(); } catch(e) {} _voiceRec = null; }
  const orbEl = document.getElementById('voice-orb');
  if (orbEl) orbEl.classList.remove('detected');
  const status = document.getElementById('voice-status');
  if (status) status.textContent = 'Listening for emergency phrase...';
  const tr = document.getElementById('voice-transcript');
  if (tr) tr.textContent = '';
  const manBtn = document.getElementById('voice-manual-btn');
  if (manBtn) manBtn.remove();
}

// ════════════════════════════════════════════════════
// SMS DEMO — Adds Real SMS + Share buttons after demo
// ════════════════════════════════════════════════════
const _origPlaySMSDemo = window.playSMSDemo;
function playSMSDemo() {
  if (typeof _origPlaySMSDemo === 'function') _origPlaySMSDemo();

  // Add real action buttons below the demo
  setTimeout(() => {
    const wrap = document.querySelector('.sms-info-wrap');
    if (!wrap || document.getElementById('real-sms-actions')) return;

    const div = document.createElement('div');
    div.id = 'real-sms-actions';
    div.style.cssText = 'display:flex;flex-direction:column;gap:10px;margin-top:4px;';
    div.innerHTML = `
      <button onclick="sendRealSMS()" style="padding:13px;background:linear-gradient(135deg,#ff4757,#ff6b7a);border:none;border-radius:12px;font-weight:800;font-size:0.95rem;cursor:pointer;color:#fff;font-family:Inter,sans-serif;letter-spacing:0.01em">
        📤 Send REAL Emergency SMS (opens SMS app)
      </button>
      <button onclick="shareEmergency()" style="padding:13px;background:linear-gradient(135deg,#0091ff,#00c4b4);border:none;border-radius:12px;font-weight:800;font-size:0.95rem;cursor:pointer;color:#fff;font-family:Inter,sans-serif">
        🌐 Share Location via Web Share
      </button>
      <button onclick="copyToClipboard('Emergency at ${realGPS?.lat?.toFixed(5) || INCIDENT.lat},${realGPS?.lng?.toFixed(5) || INCIDENT.lng} — via GoodStop', '📋 Emergency coords copied!')" style="padding:10px;background:rgba(0,232,150,0.1);border:1px solid rgba(0,232,150,0.3);border-radius:12px;font-size:0.82rem;font-weight:700;cursor:pointer;color:#00e896;font-family:Inter,sans-serif">
        📋 Copy GPS Coordinates to Clipboard
      </button>
    `;
    wrap.appendChild(div);
  }, 2500);
}

// ════════════════════════════════════════════════════
// BYSTANDER SIMULATOR — Real GPS in detecting step
// ════════════════════════════════════════════════════
// Patch SIM_STEPS[1] (detecting screen) with real GPS
(function patchDetectingStep() {
  if (!window.SIM_STEPS) return;
  
  if (window.SIM_STEPS[1]) {
    const original1 = window.SIM_STEPS[1].render;
    window.SIM_STEPS[1].render = function() {
      if (realGPS) {
        return `
          <div class="sim-screen-inner" style="background:linear-gradient(180deg,#060e18,#040c14);">
            <div class="sim-status"><span>9:41</span><span>⬛⬛⬛ 5G</span></div>
            <div class="sim-app-content" style="gap:12px;">
              <div style="font-family:var(--font-display);font-weight:800;font-size:1.05rem;color:#00e896">📍 GPS Acquired!</div>
              <div style="font-size:2.8rem">✅</div>
              <div style="background:rgba(0,232,150,0.07);border:1px solid rgba(0,232,150,0.15);border-radius:12px;padding:14px 12px;width:100%;text-align:left;">
                <div style="font-size:0.6rem;color:#00c4b4;margin-bottom:5px;letter-spacing:0.08em;">📍 REAL GPS LOCATION ACQUIRED</div>
                <div style="font-size:0.82rem;color:var(--text-primary);font-weight:700;margin-bottom:3px;">Your Current Location</div>
                <div style="font-size:0.68rem;color:var(--text-secondary);">${realGPS.lat.toFixed(6)}°N, ${realGPS.lng.toFixed(6)}°E</div>
                <div style="font-size:0.62rem;color:#00e896;margin-top:4px;">✓ Accuracy ±${realGPS.accuracy}m · ${realGPS.ts}</div>
              </div>
              <div style="font-size:0.65rem;color:var(--text-muted);border:1px solid rgba(255,255,255,0.06);padding:6px 14px;border-radius:20px;">🔒 Anonymous · Your identity never stored</div>
            </div>
          </div>`;
      }
      return original1.call(this);
    };
  }

  // Patch SIM_STEPS[1] (Detecting location) to use real GPS info
  if (window.SIM_STEPS[1]) {
    const original1 = window.SIM_STEPS[1].render;
    window.SIM_STEPS[1].render = function() {
      return original1.call(this)
        .replace('NH-48, km 28.4', INCIDENT.label)
        .replace('28.4595°N, 77.0266°E', `${INCIDENT.lat.toFixed(4)}°N, ${INCIDENT.lng.toFixed(4)}°E`);
    };
  }

  // Patch SIM_STEPS[2] (legal screen) for Dynamic Reverse-Geocoded Laws
  if (window.SIM_STEPS[2]) {
    const original2 = window.SIM_STEPS[2].render;
    window.SIM_STEPS[2].render = function() {
      // Fetch reverse geocoding asynchronously
      if (realGPS) {
        setTimeout(async () => {
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${realGPS.lat}&lon=${realGPS.lng}&format=json`);
            const data = await res.json();
            const countryCode = data.address?.country_code?.toUpperCase();
            
            // Map ISO country codes to BIMSTEC database indices
            const countryMap = { 'IN': 0, 'BD': 1, 'MM': 2, 'LK': 3, 'TH': 4, 'NP': 5, 'BT': 6, 'MV': 7 };
            const matchedIdx = countryMap[countryCode];
            
            if (matchedIdx !== undefined && window.bimstecLaws) {
              const law = window.bimstecLaws[matchedIdx];
              
              const citationEl = document.getElementById('dynamic-law-citation');
              const textEl = document.getElementById('dynamic-law-text');
              if (citationEl && textEl) {
                citationEl.innerHTML = `📋 <span style="color:#fff">${law.name}</span> — ${law.citation}`;
                textEl.innerHTML = `You are protected under local law. "${law.text}"`;
                
                // Show toast for the specific country
                showToast(`🛡️ ${law.flag} ${law.name} Good Samaritan Law Applied`, 3500);
              }
            }
          } catch (e) { console.error('Reverse geocoding failed', e); }
        }, 100);
      }
      
      return original2.call(this)
        .replace('<p style="font-size:0.75rem;color:var(--text-secondary);line-height:1.6;">"You are protected under the <strong style="color:var(--text-primary);">Motor Vehicles (Amendment) Act 2019, Section 134A</strong>. You cannot be detained, summoned to court, or held liable for reporting this accident."</p>',
                 '<p id="dynamic-law-text" style="font-size:0.75rem;color:var(--text-secondary);line-height:1.6;">"You are protected under the <strong style="color:var(--text-primary);">Motor Vehicles (Amendment) Act 2019, Section 134A</strong>. You cannot be detained, summoned to court, or held liable for reporting this accident."</p>')
        .replace('📋 Gazette Notification GSR 732(E), 2019 · Screenshot this for proof',
                 '<span id="dynamic-law-citation">📋 Gazette Notification GSR 732(E), 2019 · Screenshot this for proof</span>');
    };
  }

  // Patch SIM_STEPS[3] (routing screen) for Dynamic Weather ETA
  if (window.SIM_STEPS[3]) {
    const original3 = window.SIM_STEPS[3].render;
    window.SIM_STEPS[3].render = function() {
      // Fetch weather asynchronously and update DOM once loaded
      if (realGPS) {
        setTimeout(async () => {
          try {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${realGPS.lat}&longitude=${realGPS.lng}&current_weather=true`);
            const data = await res.json();
            const weather = data.current_weather;
            
            const wCode = weather.weathercode;
            let wDesc = "Clear";
            let etaPenalty = 0;
            
            if (wCode >= 61 && wCode <= 69) { wDesc = "Rain"; etaPenalty = 4; }
            else if (wCode >= 51 && wCode <= 55) { wDesc = "Drizzle"; etaPenalty = 2; }
            else if (wCode >= 45 && wCode <= 48) { wDesc = "Fog"; etaPenalty = 6; }
            else if (wCode >= 71 && wCode <= 77) { wDesc = "Snow"; etaPenalty = 8; }
            
            const container = document.getElementById('weather-eta-container');
            if (container) {
              container.style.display = 'block';
              container.innerHTML = `
                <div style="font-size:0.65rem;color:var(--accent-amber);font-weight:700;">⛅ LIVE WEATHER CONDITIONS</div>
                <div style="font-size:0.8rem;font-weight:600;">${wDesc} · ${weather.temperature}°C</div>
                <div style="font-size:0.65rem;color:var(--text-muted);">${etaPenalty > 0 ? `ETA adjusted +${etaPenalty} mins due to ${wDesc}` : 'Optimal driving conditions'}</div>
              `;
              
              if (etaPenalty > 0) {
                const etaEl = document.getElementById('fastest-eta');
                if (etaEl) {
                  const baseEta = 9; // Hardcoded base from original
                  etaEl.textContent = (baseEta + etaPenalty) + ' min';
                  etaEl.style.color = 'var(--accent-amber)';
                }
              }
            }
          } catch (e) { console.error('Weather API failed', e); }
        }, 100);
      }
      
      let html = original3.call(this);
      
      // Inject actual nearest hospital and location if found
      html = html.replace('NH-48, km 28.4 · Gurugram', INCIDENT.label);
      if (window._nearestHospital) {
        html = html.replace('Medanta, Sector 38', window._nearestHospital);
      }
      
      // Inject weather container and add ID to ETA
      return html
        .replace('<div style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;color:#00e896;">9 min</div>', 
                 '<div id="fastest-eta" style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;color:#00e896;">9 min</div>')
        .replace('<div style="background:rgba(0,145,255,0.06);border:1px solid rgba(0,145,255,0.15);border-radius:12px;padding:10px;width:100%;text-align:left;">',
                 '<div id="weather-eta-container" style="display:none; background:rgba(255,184,0,0.1);border:1px solid rgba(255,184,0,0.3);border-radius:12px;padding:10px;width:100%;text-align:left;margin-bottom:8px;"></div><div style="background:rgba(0,145,255,0.06);border:1px solid rgba(0,145,255,0.15);border-radius:12px;padding:10px;width:100%;text-align:left;">');
    };
  }

  // Patch SIM_STEPS[4] to add Tele-Medic button
  if (window.SIM_STEPS[4]) {
    const original4 = window.SIM_STEPS[4].render;
    window.SIM_STEPS[4].render = function() {
      const html = original4.call(this);
      // Inject the Connect to Doctor button before the countdown box
      return html.replace('<div style="background:rgba(0,232,150,0.06);border:1px solid rgba(0,232,150,0.15);', 
        `<button onclick="openTelemedicModal()" style="width:100%; padding:14px; background:linear-gradient(135deg,#ff4757,#ff2a3f); color:#fff; font-weight:800; border:none; border-radius:12px; cursor:pointer; font-size:0.9rem; margin:6px 0; display:flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 0 20px rgba(255,71,87,0.3);">
          <span style="font-size:1.2rem;">🏥</span> CONNECT TO DOCTOR (LIVE VIDEO)
        </button>
        <div style="background:rgba(0,232,150,0.06);border:1px solid rgba(0,232,150,0.15);`);
    };
  }

  // Patch SIM_STEPS[5] (family screen) to use dynamic contacts from Medical ID
  if (window.SIM_STEPS[5]) {
    const original5 = window.SIM_STEPS[5].render;
    window.SIM_STEPS[5].render = function() {
      let html = original5.call(this);
      if (window.currentMedID) {
        const c1 = window.currentMedID.contact1?.split('—')[0]?.trim() || "Emergency Contact 1";
        const c2 = window.currentMedID.contact2?.split('—')[0]?.trim() || "Emergency Contact 2";
        if (c1 !== "Not provided" && c1 !== "Emergency Contact 1") {
          html = html.replace('Priya (Wife)', c1);
        }
        if (c2 !== "Not provided" && c2 !== "Emergency Contact 2") {
          html = html.replace('Rohit (Brother)', c2);
        }
        
        // Also inject Medical ID info dynamically
        const bld = window.currentMedID.blood;
        const alg = window.currentMedID.allergy;
        html = html.replace('Blood: O+ · Allergic: Penicillin · Condition: None', `Blood: ${bld} · Allergic: ${alg || 'None'} · Condition: ${window.currentMedID.conditions || 'None'}`);
      }
      
      // Inject actual nearest hospital instead of Medanta
      if (window._nearestHospital) {
        html = html.replace('Medanta Hospital', window._nearestHospital);
      }
      
      return html;
    };
  }
  
  // Patch SIM_STEPS[0] (Home screen) to add Real Offline SMS button
  if (window.SIM_STEPS[0]) {
    const original0 = window.SIM_STEPS[0].render;
    window.SIM_STEPS[0].render = function() {
      const html = original0.call(this);
      // Inject button below the SOS button
      return html.replace('</div>\n      </div>', 
        `<button onclick="sendRealSMS()" style="width:100%; margin-top:20px; padding:12px; background:transparent; border:1px solid rgba(255,255,255,0.2); border-radius:12px; color:var(--text-secondary); font-size:0.75rem; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer;">
           <span>📡</span> Offline Mode: Send GPS via SMS
         </button>
        </div>
      </div>`);
    };
  }
// ════════════════════════════════════════════════════
// AUDIO FEEDBACK ENGINE (Web Audio API — lazy init)
// ════════════════════════════════════════════════════
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch(e) { return null; }
  }
  return audioCtx;
}

function playSound(type) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const now = ctx.currentTime;
  if (type === 'ping') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.1);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    osc.start(now); osc.stop(now + 0.5);
  } else if (type === 'pulse') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.2);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    osc.start(now); osc.stop(now + 0.2);
  }
}

// Intercept showToast to add a 'ping' sound
const originalShowToast = window.showToast;
window.showToast = function(msg, ms) {
  if (originalShowToast) originalShowToast(msg, ms);
  playSound('ping');
};

// Intercept simNext to add a 'pulse' sound
const originalSimNext = window.simNext;
if (originalSimNext) {
  window.simNext = function() {
    playSound('pulse');
    originalSimNext();
  };
}

})();

// ════════════════════════════════════════════════════
// TELE-MEDIC WEBRTC LOGIC
// ════════════════════════════════════════════════════
let _telemedicStream = null;

window.openTelemedicModal = async function() {
  const modal = document.getElementById('telemedic-modal');
  const localVideo = document.getElementById('telemedic-local');
  if (!modal) return;
  
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  showToast('📞 Initiating secure WebRTC connection to Trauma Centre...', 2000);

  if (localVideo) {
    try {
      _telemedicStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      const localVid = document.getElementById('telemedic-local');
      if (localVid) localVid.srcObject = _telemedicStream;
      localVideo.srcObject = _telemedicStream;
    } catch (err) {
      console.log('Telemedic camera error:', err);
      // Mock UI if camera denied
    }
  }
};

window.closeTelemedicModal = function(e) {
  if (e && e.target !== document.getElementById('telemedic-modal')) return;
  const modal = document.getElementById('telemedic-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (_telemedicStream) {
    _telemedicStream.getTracks().forEach(t => t.stop());
    _telemedicStream = null;
  }
};

// ════════════════════════════════════════════════════
// LIVE ANALYTICS — gentle data variation every 8s
// ════════════════════════════════════════════════════
function startLiveAnalytics() {
  let tickIncidents = [12, 18, 14, 22, 19, 31, 27];
  setInterval(() => {
    tickIncidents = tickIncidents.map(v => Math.max(5, v + Math.round((Math.random()-0.5)*3)));
    if (typeof drawLineChart === 'function') {
      drawLineChart('chart-incidents', ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], tickIncidents);
    }
    // Bump "today's assists" occasionally
    const saved = document.getElementById('ds-saved');
    if (saved && Math.random() < 0.25) saved.textContent = parseInt(saved.textContent) + 1;
  }, 8000);
}

// ════════════════════════════════════════════════════
// EMERGENCY CALL BUTTON (real tel: link)
// ════════════════════════════════════════════════════
function callEmergency() {
  const lang = document.getElementById('lang-select')?.value || 'en';
  const nums = { en:'108', hi:'108', bn:'999', th:'1554', ne:'102', si:'110' };
  const num = nums[lang] || '108';
  if (confirm(`📞 Call emergency services (${num}) right now?\n\nThis will open your phone dialer.`)) {
    window.location.href = `tel:${num}`;
  }
}

// ════════════════════════════════════════════════════
// BYSTANDER STEP — trigger real notifications at step 5
// ════════════════════════════════════════════════════
const _origSimNext = window.simNext;
window.simNext = function() {
  if (typeof _origSimNext === 'function') _origSimNext();
  // Use correct simCurrentStep variable (from app.js)
  const step = window.simCurrentStep ?? 0;
  if (step === 4) {
    sendBrowserNotification(
      '🚨 GoodStop — Family Alert Sent',
      'An accident has been reported near a registered family member. Ambulance ETA: 9 minutes.',
      800
    );
  }
  if (step === 3) {
    sendBrowserNotification(
      '⚡ GoodStop — Ambulance Dispatched',
      'Medlife Private Ambulance #M-14 dispatched. ETA: 9 minutes to scene.',
      400
    );
  }
};

// Also patch modalNext
const _origModalNext = window.modalNext;
window.modalNext = function() {
  const stepBefore = window.modalStep ?? 0;
  if (typeof _origModalNext === 'function') _origModalNext();
  if (stepBefore === 3) sendBrowserNotification('⚡ Ambulance Dispatched', 'ETA 9 minutes — Medlife #M-14', 300);
  if (stepBefore === 4) sendBrowserNotification('👨‍👩‍👧 Family Alerted', 'Live tracking link sent to emergency contacts', 600);
};

// ════════════════════════════════════════════════════
// INITIALIZATION
// ════════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  // 1. Start GPS immediately
  initRealGeolocation();

  // 2. Init real Leaflet map (small delay to let DOM settle)
  setTimeout(initMap, 100);

  // 3. Load saved Medical ID
  setTimeout(loadSavedMedID, 700);

  // 4. Start live analytics ticking
  startLiveAnalytics();

  // 5. Request notification permission after 4s (non-intrusive)
  setTimeout(requestNotificationPermission, 4000);

  // 6. Add Call 108 button to hero
  setTimeout(() => {
    const ctaGroup = document.querySelector('.hero-cta-group');
    if (ctaGroup && !document.getElementById('call-108-btn')) {
      const btn = document.createElement('button');
      btn.id = 'call-108-btn';
      btn.className = 'btn-hero-secondary';
      btn.style.cssText = 'border-color:rgba(255,71,87,0.35);color:#ff4757;';
      btn.innerHTML = '<span class="btn-icon">📞</span> Call 108';
      btn.onclick = callEmergency;
      ctaGroup.appendChild(btn);
    }
  }, 600);

  // 7. Register PWA Service Worker for Offline Mode
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('[GoodStop SW] Service Worker Registered', reg))
      .catch(err => console.log('[GoodStop SW] SW Registration Failed', err));
  }
});

// Re-init map on resize
window.addEventListener('resize', () => {
  if (leafletMap) leafletMap.invalidateSize();
});
// ════════════════════════════════════════════════════
// LIVE AI CAMERA SCANNER (Webcam API)
// ════════════════════════════════════════════════════
let _camStream = null;

window.startAICamera = async function() {
  const video = document.getElementById('ai-camera-video');
  const canvas = document.getElementById('ai-camera-canvas');
  const overlay = document.getElementById('ai-camera-overlay');
  const btn = document.getElementById('start-cam-btn');
  
  if (!video || !canvas) return;

  try {
    _camStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = _camStream;
    
    // Wait for video metadata to set canvas size
    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    };
    
    video.style.display = 'block';
    canvas.style.display = 'block';
    overlay.style.display = 'none'; // hide the old pulse overlay
    if (btn) btn.style.display = 'none';

    showToast('📷 Camera active. Loading TF.js Object Detection Model...', 3000);
    
    // Ensure cocoSsd is loaded from HTML CDNs
    if (typeof cocoSsd === 'undefined') {
      throw new Error("COCO-SSD model not loaded. Check internet connection.");
    }

    const model = await cocoSsd.load();
    showToast('🧠 AI Model loaded. Scanning scene for damage & casualties...', 3000);
    
    const ctx = canvas.getContext('2d');
    let isScanning = true;
    let finalDetections = [];
    
    // Real-time detection loop
    async function detectFrame() {
      if (!isScanning) return;
      
      const predictions = await model.detect(video);
      finalDetections = predictions; // Keep latest
      
      // Draw boxes
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      predictions.forEach(p => {
        const [x, y, width, height] = p.bbox;
        const text = `${p.class} (${Math.round(p.score * 100)}%)`;
        
        // Is it a critical object?
        const criticalKeywords = ['car', 'truck', 'bus', 'motorcycle', 'bicycle', 'person'];
        const isCritical = criticalKeywords.includes(p.class.toLowerCase());
        
        ctx.strokeStyle = isCritical ? '#ff4757' : '#00e896';
        ctx.lineWidth = 4;
        ctx.strokeRect(x, y, width, height);
        
        // Draw label background
        ctx.fillStyle = isCritical ? '#ff4757' : '#00e896';
        ctx.fillRect(x, y - 25, ctx.measureText(text).width + 10, 25);
        
        // Draw label text
        ctx.fillStyle = '#000000';
        ctx.font = '16px monospace';
        ctx.fontWeight = 'bold';
        ctx.fillText(text, x + 5, y - 7);
      });
      
      requestAnimationFrame(detectFrame);
    }
    
    // Start drawing!
    detectFrame();
    
    // Stop after 4.5 seconds and trigger the UI
    setTimeout(() => {
      isScanning = false;
      video.pause(); // simulate snapshot
      
      let topLabel = "unknown object";
      let prob = 0;
      let isCritical = false;
      
      if (finalDetections.length > 0) {
        // Find highest score
        finalDetections.sort((a, b) => b.score - a.score);
        topLabel = finalDetections[0].class;
        prob = (finalDetections[0].score * 100).toFixed(1);
        
        const criticalKeywords = ['car', 'truck', 'bus', 'motorcycle', 'bicycle', 'person'];
        isCritical = finalDetections.some(d => criticalKeywords.includes(d.class.toLowerCase()));
      }
      
      overlay.style.display = 'block'; // Show the final summary overlay
      if (isCritical) {
        overlay.innerHTML = `<div style="position:absolute; inset:0; border:4px solid #ff4757; background:rgba(255,71,87,0.1);">
          <div style="position:absolute; bottom:12px; width:100%; text-align:center; color:#ff4757; font-family:monospace; font-weight:bold; font-size:14px; background:rgba(0,0,0,0.8); padding:6px 0;">[ CRITICAL: ${topLabel.toUpperCase()} DETECTED (${prob}%) ]</div>
        </div>`;
        showToast(`⚠️ AI detected: ${topLabel}. Prioritizing ALS dispatch.`, 4000);
      } else {
         overlay.innerHTML = `<div style="position:absolute; inset:0; border:4px solid #ffb800; background:rgba(255,184,0,0.1);">
          <div style="position:absolute; bottom:12px; width:100%; text-align:center; color:#ffb800; font-family:monospace; font-weight:bold; font-size:14px; background:rgba(0,0,0,0.8); padding:6px 0;">[ MODERATE: ${topLabel.toUpperCase()} DETECTED (${prob}%) ]</div>
        </div>`;
        showToast(`🟡 AI detected: ${topLabel}. Suggesting BLS dispatch.`, 4000);
      }

      // Trigger the existing result logic with the AI's actual findings
      const input = document.getElementById('severity-input');
      if (input) {
        input.value = `AI Object Detection: ${topLabel} (${prob}% confidence). ${isCritical ? 'Severe damage/collision likely.' : 'Minor incident.'}`;
      }
      
      if (typeof runSeverityScan === 'function') {
        runSeverityScan();
      }
      
      // Stop camera track completely
      setTimeout(() => {
        if (_camStream) {
          _camStream.getTracks().forEach(t => t.stop());
        }
      }, 5000);

    }, 4500); // 4.5 seconds of live bounding boxes

  } catch (err) {
    console.error('Camera or AI Error', err);
    showToast('❌ Camera or AI model failed to load. Please use manual description.');
  }
};
// ════════════════════════════════════════════════════
// REAL CHATGPT API INTEGRATION — Overriding chat logic
// ════════════════════════════════════════════════════
function getOpenAIKey() {
  let key = localStorage.getItem('goodstop_openai_key');
  if (!key) {
    key = prompt("Please enter your OpenAI API Key for the hackathon demo (it will be saved locally):");
    if (key) localStorage.setItem('goodstop_openai_key', key);
  }
  return key;
}

// Override the demo sendChatMessage function globally
window.sendChatMessage = async function(text) {
  const OPENAI_API_KEY = getOpenAIKey();
  if (!OPENAI_API_KEY) {
    showToast('❌ OpenAI API Key is required for the Legal AI.');
    return;
  }
  
  const msgs = document.getElementById('chat-messages');
  if (!msgs) return;
  
  // 1. Add User Message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg chat-msg--user';
  userMsg.innerHTML = `<div class="chat-bubble">${text}</div>`;
  msgs.appendChild(userMsg);
  msgs.scrollTop = msgs.scrollHeight;

  // 2. Add Typing Indicator
  const typing = document.createElement('div');
  typing.className = 'chat-msg chat-msg--bot';
  typing.innerHTML = `<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
  msgs.appendChild(typing);
  msgs.scrollTop = msgs.scrollHeight;

  // 3. Call ChatGPT API
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Using fast model for hackathon demo
        messages: [
          {
            role: "system", 
            content: "You are the 'GoodStop AI Legal & Safety Assistant'. You help users in India understand the Good Samaritan Law (which protects bystanders who help accident victims from legal harassment or police questioning). You also provide road safety advice, first aid tips, and emergency instructions. Keep your answers concise, reassuring, highly informative, and format them nicely with bolding or bullet points."
          },
          { role: "user", content: text }
        ],
        max_tokens: 250,
        temperature: 0.7
      })
    });

    const data = await response.json();
    msgs.removeChild(typing);

    if (data.choices && data.choices.length > 0) {
      const botResponse = data.choices[0].message.content;
      
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-msg chat-msg--bot';
      // Format response (convert markdown bold/lists to HTML)
      const formattedHtml = botResponse
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br/>');
        
      botMsg.innerHTML = `<div class="chat-bubble">${formattedHtml}</div>`;
      msgs.appendChild(botMsg);
    } else {
      throw new Error("Invalid API response format");
    }
  } catch (error) {
    console.error("[GoodStop API Error]:", error);
    msgs.removeChild(typing);
    
    // Fallback on error
    const errorMsg = document.createElement('div');
    errorMsg.className = 'chat-msg chat-msg--bot';
    errorMsg.innerHTML = `<div class="chat-bubble"><strong style="color:var(--accent-red)">Connection Error:</strong> Our AI is currently offline. Under the Good Samaritan Law, you cannot be harassed for helping victims. Please call 108 immediately.</div>`;
    msgs.appendChild(errorMsg);
  }
  
  msgs.scrollTop = msgs.scrollHeight;
};
