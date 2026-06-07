const fs = require('fs');
const app = fs.readFileSync('app.js','utf8');
const feat = fs.readFileSync('features.js','utf8');
const html = fs.readFileSync('index.html','utf8');
const both = app + feat;

const checks = [
  // Core simulator
  { label: 'SIM_STEPS defined (6 steps)', pass: (app.match(/id:\s*'/g) || []).length >= 5 },
  { label: 'simNext / simBack defined', pass: both.includes('function simNext') && both.includes('function simBack') },
  { label: 'renderSimStep defined', pass: both.includes('function renderSimStep') },
  { label: 'sim-screen element in HTML', pass: html.includes('id="sim-screen"') },
  { label: 'sim-dots element in HTML', pass: html.includes('id="sim-dots"') },
  
  // Bystander modal
  { label: 'openBystander/closeBystander defined', pass: both.includes('function openBystander') && both.includes('function closeBystander') },
  { label: 'bystander-modal in HTML', pass: html.includes('id="bystander-modal"') },
  { label: 'modal-screen in HTML', pass: html.includes('id="modal-screen"') },
  
  // Map
  { label: 'Leaflet CSS loaded', pass: html.includes('leaflet.css') },
  { label: 'Leaflet JS loaded', pass: html.includes('leaflet.js') },
  { label: 'map-leaflet div in HTML', pass: html.includes('id="map-leaflet"') },
  { label: 'initMap called in features.js', pass: feat.includes('initMap') },
  { label: 'initRealGeolocation defined', pass: feat.includes('function initRealGeolocation') },
  { label: 'searchNearbyHospitals defined', pass: feat.includes('function searchNearbyHospitals') },
  { label: 'mapZoom/mapCenter defined', pass: feat.includes('function mapZoom') && feat.includes('function mapCenter') },
  { label: 'toggleHeatmap with Leaflet circles', pass: feat.includes('L.circle') && feat.includes('toggleHeatmap') },
  
  // AI Scanner
  { label: 'TensorFlow.js loaded', pass: html.includes('tf.min.js') },
  { label: 'COCO-SSD loaded', pass: html.includes('coco-ssd') },
  { label: 'startAICamera defined', pass: feat.includes('startAICamera') },
  { label: 'runSeverityScan defined', pass: both.includes('function runSeverityScan') },
  { label: 'severity gauge canvas in HTML', pass: html.includes('id="severity-gauge"') },
  
  // AI Chatbot
  { label: 'toggleChat defined', pass: both.includes('function toggleChat') },
  { label: 'sendChat / sendChatMessage defined', pass: both.includes('function sendChat') && both.includes('sendChatMessage') },
  { label: 'chat-messages in HTML', pass: html.includes('id="chat-messages"') },
  { label: 'getLocalChatResponse defined', pass: both.includes('function getLocalChatResponse') },
  { label: 'NO OpenAI key prompt alert', pass: !feat.includes('Please enter your OpenAI') },
  
  // Medical ID + QR
  { label: 'generateMedID defined (features.js)', pass: feat.includes('function generateMedID') },
  { label: 'showQR defined (features.js)', pass: feat.includes('function showQR') },
  { label: 'QRCode.js loaded', pass: html.includes('qrcode.min.js') },
  { label: 'qr-canvas-container in HTML', pass: html.includes('qr-canvas-container') },
  
  // Voice SOS
  { label: 'triggerVoiceSOS defined (features.js)', pass: feat.includes('function triggerVoiceSOS') },
  { label: 'voice-modal in HTML', pass: html.includes('id="voice-modal"') },
  { label: 'Web Speech API integration', pass: feat.includes('SpeechRecognition') },
  
  // SMS Fallback
  { label: 'playSMSDemo defined', pass: both.includes('function playSMSDemo') },
  { label: 'sendRealSMS defined', pass: feat.includes('function sendRealSMS') },
  { label: 'sms-thread in HTML', pass: html.includes('id="sms-thread"') },
  
  // Panic Mode
  { label: 'initPanicMode defined', pass: both.includes('function initPanicMode') },
  { label: 'panic-btn in HTML', pass: html.includes('id="panic-btn"') },
  { label: 'Hold-to-activate panic', pass: both.includes('mousedown') && both.includes('PANIC_HOLD_MS') },
  
  // Law Database
  { label: 'renderLawDatabase defined', pass: both.includes('function renderLawDatabase') },
  { label: 'All 8 BIMSTEC countries in data', pass: both.includes("flag: '🇮🇳'") && both.includes("flag: '🇲🇻'") },
  { label: 'laws section in HTML', pass: html.includes('id="laws"') },
  
  // Timeline + Charts
  { label: 'replayTimeline defined', pass: both.includes('function replayTimeline') },
  { label: 'downloadTimeline defined', pass: both.includes('function downloadTimeline') },
  { label: 'Analytics charts defined', pass: both.includes('function drawBarChart') && both.includes('function drawDonutChart') },
  
  // Guide  
  { label: 'showGuide defined', pass: both.includes('function showGuide') },
  { label: 'GUIDE_DATA defined (6 topics)', pass: both.includes('GUIDE_DATA') },
  
  // Tele-medic
  { label: 'openTelemedicModal defined', pass: feat.includes('openTelemedicModal') },
  { label: 'telemedic-modal in HTML', pass: html.includes('id="telemedic-modal"') },
  
  // PWA
  { label: 'manifest.json linked', pass: html.includes('manifest.json') },
  { label: 'Service Worker registered', pass: feat.includes('serviceWorker') },
  
  // Broadcast FAB
  { label: 'addBroadcastFAB defined', pass: both.includes('function addBroadcastFAB') },
  { label: 'broadcastEmergency with WhatsApp', pass: both.includes('whatsapp.com') },
  
  // Language switcher
  { label: 'Language switcher (6 languages)', pass: html.includes('Hindi') && html.includes('Bengali') && html.includes('Thai') },
  
  // No debug alerts
  { label: 'No alert() error handler in HTML', pass: !html.includes('window.onerror') },
  { label: 'No OpenAI key prompt in features.js', pass: !feat.includes('Please enter your OpenAI') },
  
  // Conflict checks
  { label: 'features.js has real initMap (not stub)', pass: feat.includes('L.map(') },
  { label: 'features.js has real toggleHeatmap (Leaflet)', pass: feat.includes('L.circle(') },
  { label: 'app.js initMap is a stub', pass: app.includes('function initMap() {}') },
  { label: 'app.js toggleHeatmap is a stub', pass: app.includes('function toggleHeatmap() {}') },
];

let pass = 0; let fail = 0;
checks.forEach(c => {
  if (c.pass) { pass++; process.stdout.write('.'); } 
  else { fail++; console.log('\n  FAIL: ' + c.label); }
});
console.log('\n');
console.log('=================================');
console.log('PASS: ' + pass + '/' + checks.length);
console.log('FAIL: ' + fail + '/' + checks.length);
console.log(fail === 0 ? 'ALL CHECKS PASSED!' : 'Items need attention: ' + fail);
process.exit(fail > 0 ? 1 : 0);
