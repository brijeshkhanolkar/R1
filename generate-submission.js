/**
 * generate-submission.js
 * Generates a polished submission.docx for the BIMSTEC Road Safety Hackathon 2026
 * Run: node generate-submission.js
 */

const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
        Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
        PageBreak, HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom,
        TableLayoutType, convertInchesToTwip } = require('docx');
const fs = require('fs');

// ── Colors ───────────────────────────────────────
const GREEN  = '00E896';
const DARK   = '0A1520';
const MID    = '0D1B2A';
const TEXT   = '1A2F45';
const WHITE  = 'FFFFFF';
const AMBER  = 'FFB800';
const RED    = 'FF4757';
const BLUE   = '0091FF';
const GREY   = '8BA4C0';

// ── Helper: styled paragraph ─────────────────────
function para(text, opts = {}) {
  return new Paragraph({
    alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
    spacing: { before: opts.before ?? 120, after: opts.after ?? 120 },
    children: [
      new TextRun({
        text,
        bold: opts.bold ?? false,
        italics: opts.italic ?? false,
        size: opts.size ?? 22,
        color: opts.color ?? TEXT,
        font: 'Calibri',
      })
    ]
  });
}

function heading(text, level = 1) {
  const sizes = { 1: 36, 2: 28, 3: 24 };
  const colors = { 1: GREEN, 2: DARK, 3: MID };
  return new Paragraph({
    spacing: { before: 240, after: 120 },
    children: [new TextRun({
      text, bold: true, size: sizes[level] ?? 22,
      color: colors[level] ?? DARK, font: 'Calibri',
    })]
  });
}

function bullet(text, sub = false) {
  return new Paragraph({
    bullet: { level: sub ? 1 : 0 },
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 20, color: TEXT, font: 'Calibri' })]
  });
}

function divider() {
  return new Paragraph({
    border: { bottom: { color: 'EEEEEE', space: 1, style: BorderStyle.SINGLE, size: 4 } },
    spacing: { before: 160, after: 160 },
    children: []
  });
}

// ── Table helper ─────────────────────────────────
function tableRow(cells, isHeader = false) {
  return new TableRow({
    tableHeader: isHeader,
    children: cells.map((text, i) => new TableCell({
      shading: isHeader ? { fill: DARK, type: ShadingType.SOLID } : (i === 0 ? { fill: 'F8FBFF', type: ShadingType.SOLID } : undefined),
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({
        children: [new TextRun({
          text: String(text),
          bold: isHeader,
          color: isHeader ? WHITE : TEXT,
          size: 18,
          font: 'Calibri',
        })]
      })]
    }))
  });
}

// ═══════════════════════════════════════════════════
// BUILD DOCUMENT
// ═══════════════════════════════════════════════════
const doc = new Document({
  creator: 'Team Pearson Hardman',
  title: 'GoodStop — BIMSTEC Road Safety Hackathon 2026 Submission',
  description: 'Complete technical submission document for GoodStop, Track: RoadSOS',
  styles: {
    default: {
      document: { run: { font: 'Calibri', size: 22, color: TEXT } }
    }
  },
  sections: [{
    properties: {
      page: {
        margin: { top: convertInchesToTwip(1), bottom: convertInchesToTwip(1), left: convertInchesToTwip(1.2), right: convertInchesToTwip(1.2) }
      }
    },
    children: [

      // ── COVER PAGE ───────────────────────────────
      para('', { before: 600 }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [new TextRun({ text: '🛑 GOODSTOP', bold: true, size: 64, color: GREEN, font: 'Calibri' })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 160 },
        children: [new TextRun({ text: 'The app that makes bystanders stop at accidents — finally.', italics: true, size: 26, color: GREY, font: 'Calibri' })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 80 },
        children: [new TextRun({ text: 'BIMSTEC Road Safety Hackathon 2026', bold: true, size: 28, color: DARK, font: 'Calibri' })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 60 },
        children: [new TextRun({ text: 'Track: RoadSOS  ·  Platform: Progressive Web App', size: 22, color: GREY, font: 'Calibri' })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 60 },
        children: [new TextRun({ text: 'Team: Pearson Hardman', bold: true, size: 24, color: GREEN, font: 'Calibri' })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 60 },
        children: [new TextRun({ text: 'Repository: github.com/brijeshkhanolkar/R1', size: 20, color: BLUE, font: 'Calibri' })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 400 },
        children: [new TextRun({ text: 'Date: June 29, 2026', size: 20, color: GREY, font: 'Calibri' })]
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // ── 1. EXECUTIVE SUMMARY ─────────────────────
      heading('1. Executive Summary'),
      para('GoodStop is a Progressive Web App (PWA) that eliminates the #1 barrier to bystander intervention at road accidents across BIMSTEC nations: legal fear.'),
      para('73% of bystanders in the region do not stop to help accident victims — not from indifference, but because they fear police detention and legal harassment. Existing apps (112, 108) address logistics, not psychology. GoodStop addresses both.'),
      para('The app delivers:'),
      bullet('Instant anonymous reporting — no name, no login, no registration'),
      bullet('Real-time Good Samaritan law display for all 8 BIMSTEC nations'),
      bullet('AI-powered routing to the fastest ambulance (private or government)'),
      bullet('Live dispatch map with real GPS, real hospital search, and weather-adjusted ETAs'),
      bullet('Victim medical ID with QR code, readable offline by paramedics'),
      bullet('SMS fallback that works on 2G with no internet connection'),
      bullet('Multilingual support: English, Hindi, Bengali, Thai, Nepali, Sinhala'),
      bullet('Tele-medicine video link to trauma centre for bystander guidance'),
      divider(),

      // ── 2. PROBLEM STATEMENT ─────────────────────
      heading('2. Problem Statement'),
      heading('2.1 Scale of the Crisis', 2),
      para('BIMSTEC nations collectively record approximately 340,000 road fatalities annually (WHO Global Road Safety Report, 2023). India alone accounts for 153,972 deaths — the highest in the world. The golden hour — the first 60 minutes after trauma — is when intervention is most effective. Yet response times routinely exceed this window.'),

      heading('2.2 Root Cause: Legal Fear', 2),
      para('Studies across India, Bangladesh, and Thailand consistently show 70–80% of accident witnesses do not stop because of legal fear — fear of police detention, court summons, and being treated as a suspect. Good Samaritan laws exist in all 8 BIMSTEC nations, but public awareness is below 15%.'),

      heading('2.3 Routing Failure', 2),
      para('Emergency numbers (108, 112) exclusively dispatch government ambulances. In major BIMSTEC cities, average government ambulance response times are 22–60 minutes. Private ALS-equipped ambulances in the same cities can arrive in 7–14 minutes — but no system routes to them.'),
      divider(),

      // ── 3. SOLUTION ARCHITECTURE ─────────────────
      heading('3. Solution Architecture'),
      heading('3.1 How It Works', 2),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          tableRow(['Step', 'Action', 'Technology Used'], true),
          tableRow(['1', 'Bystander taps "I see an accident"', 'One-click PWA interface, no login']),
          tableRow(['2', 'GPS location captured', 'navigator.geolocation (real device GPS)']),
          tableRow(['3', 'Good Samaritan law displayed', 'Country-code from Nominatim → local law DB']),
          tableRow(['4', 'AI routes nearest ambulance', 'Overpass API hospital query + ETA matrix']),
          tableRow(['5', 'Weather-adjusted ETA shown', 'Open-Meteo real weather API']),
          tableRow(['6', 'First Aid instructions provided', 'On-device knowledge base (offline-first)']),
          tableRow(['7', 'Family notified', 'Web Share + SMS URI + Browser Notifications']),
          tableRow(['8', 'Medical ID transmitted to hospital', 'QR code (QRCode.js) + localStorage']),
        ]
      }),
      para(''),

      heading('3.2 Architecture Overview', 2),
      bullet('Frontend: Pure HTML5 + CSS3 + Vanilla JavaScript (zero build step, zero framework dependency)'),
      bullet('Maps: Leaflet.js with CartoDB Dark Matter tiles (OpenStreetMap data)'),
      bullet('AI Layer: OpenAI GPT-4o-mini for chatbot; TensorFlow.js COCO-SSD for severity scanner'),
      bullet('Offline: Service Worker (sw.js) with cache-first strategy for core assets'),
      bullet('No Backend: All logic runs client-side; API keys stored in browser localStorage only'),
      divider(),

      // ── 4. PACKAGES & DEPENDENCIES ───────────────
      heading('4. Packages & Dependencies'),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          tableRow(['Package / API', 'Version / Source', 'Purpose'], true),
          tableRow(['Leaflet.js', 'v1.9.4 (CDN)', 'Real interactive map with OpenStreetMap tiles']),
          tableRow(['TensorFlow.js', 'v4.x (CDN)', 'On-device ML framework for COCO-SSD severity scanner']),
          tableRow(['COCO-SSD Model', 'v2.2.2 (CDN)', 'Object detection — vehicles, persons, fire classification']),
          tableRow(['QRCode.js', 'v1.5.3 (CDN)', 'Client-side QR code generation for Medical ID']),
          tableRow(['Chart.js', 'v4.4.0 (CDN)', 'BIMSTEC road safety analytics charts (WHO 2023 data)']),
          tableRow(['OpenAI API', 'gpt-4o-mini', 'AI chatbot (ARIA) for multilingual emergency guidance']),
          tableRow(['Open-Meteo API', 'Free tier', 'Live weather fetched by GPS for ETA adjustment']),
          tableRow(['Overpass API', 'OSM standard', 'Real hospital query within 8km of incident GPS']),
          tableRow(['Nominatim API', 'OSM standard', 'Reverse geocoding GPS → country code → law lookup']),
          tableRow(['CartoDB Tiles', 'Free dark tiles', 'Dark map tile layer for real-time dispatch map']),
          tableRow(['Web Speech API', 'Browser built-in', 'Voice SOS — keyword detection without cloud']),
          tableRow(['Web Share API', 'Browser built-in', 'Native share sheet for emergency location']),
          tableRow(['WebRTC API', 'Browser built-in', 'Tele-medicine live video link to trauma centre']),
          tableRow(['Service Worker', 'Browser built-in', 'Offline caching — app works without internet']),
          tableRow(['Web Audio API', 'Browser built-in', 'Sonic feedback on simulator state transitions']),
          tableRow(['docx (npm)', 'v9.7.1', 'This document generator only — not bundled in app']),
        ]
      }),
      para(''),
      para('Note: The core application (index.html, app.js, features.js, style.css) has zero npm runtime dependencies. All external libraries are loaded from CDN at runtime and cached by the Service Worker for offline use.', { italic: true, color: GREY }),
      divider(),

      // ── 5. ASSUMPTIONS ───────────────────────────
      heading('5. Assumptions & Limitations'),
      heading('5.1 Assumptions', 2),
      bullet('All 8 BIMSTEC nations have Good Samaritan laws — verified and cited in the application'),
      bullet('Private ambulance services exist in major BIMSTEC cities (Medlife, LifeSign, Falck, etc.)'),
      bullet('Target users have a smartphone with GPS capability (feature phone fallback: 2G SMS)'),
      bullet('OpenAI API key is provided by the user or operator (app degrades to local KB without it)'),
      bullet('GPS accuracy is sufficient for city-level routing (±5m under open sky)'),
      bullet('Impact projection assumes 30% reduction in delayed-response fatalities (WHO golden hour model)'),

      heading('5.2 Known Limitations', 2),
      bullet('Ambulance ETAs are demonstrative in the prototype — production requires fleet API integration'),
      bullet('Hospital ICU capacity is illustrative — real deployment requires HMIS system integration'),
      bullet('Tele-medicine video shows a demo feed — production requires a WebRTC signalling server'),
      bullet('Hotspot heatmap uses pre-defined demo coordinates — production uses real crash database'),
      bullet('OpenAI API calls fail gracefully to a local knowledge base when no key is provided'),
      divider(),

      // ── 6. FEATURES SUMMARY ──────────────────────
      heading('6. Feature Inventory (17 Features)'),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          tableRow(['#', 'Feature', 'Status', 'API / Tech'], true),
          tableRow(['1', 'Anonymous one-tap reporting', '✅ Real', 'No backend']),
          tableRow(['2', 'Real GPS geolocation', '✅ Real', 'navigator.geolocation']),
          tableRow(['3', 'Reverse geocoding', '✅ Real', 'Nominatim (OSM)']),
          tableRow(['4', 'Good Samaritan law display', '✅ Real', 'Local law DB, 8 nations']),
          tableRow(['5', 'Live dispatch map', '✅ Real', 'Leaflet + OpenStreetMap']),
          tableRow(['6', 'Real hospital search', '✅ Real', 'Overpass API']),
          tableRow(['7', 'Ambulance routing', '⚡ Demo ETAs', 'Simulated for prototype']),
          tableRow(['8', 'Weather-adjusted ETA', '✅ Real', 'Open-Meteo API']),
          tableRow(['9', 'Accident heatmap', '⚡ Demo coords', 'Leaflet circles']),
          tableRow(['10', 'AI severity scanner', '✅ Real', 'TensorFlow.js COCO-SSD']),
          tableRow(['11', 'AI chatbot (ARIA)', '✅ Real', 'OpenAI GPT-4o-mini']),
          tableRow(['12', 'Medical ID + QR code', '✅ Real', 'QRCode.js + localStorage']),
          tableRow(['13', 'Voice SOS recognition', '✅ Real', 'Web Speech API']),
          tableRow(['14', 'SMS 2G fallback', '✅ Real', 'sms: URI scheme']),
          tableRow(['15', 'Tele-medicine video call', '⚡ Demo feed', 'WebRTC + demo video']),
          tableRow(['16', 'Road Risk Score', '✅ Real', 'Weather + time-of-day algo']),
          tableRow(['17', 'PWA offline mode', '✅ Real', 'Service Worker']),
        ]
      }),
      para(''),
      divider(),

      // ── 7. IMPACT PROJECTION ─────────────────────
      heading('7. Impact Projection'),
      para('If deployed across BIMSTEC and achieving a 30% reduction in delayed-response fatalities:'),
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          tableRow(['Country', 'Annual Deaths (WHO 2023)', 'GoodStop Target', 'Est. Lives Saved'], true),
          tableRow(['India',       '153,972', '30% of delay-related', '~46,191']),
          tableRow(['Bangladesh',  '24,954',  '30% of delay-related', '~7,486']),
          tableRow(['Thailand',    '22,491',  '30% of delay-related', '~6,747']),
          tableRow(['Myanmar',     '12,800',  '30% of delay-related', '~3,840']),
          tableRow(['Nepal',       '4,800',   '30% of delay-related', '~1,440']),
          tableRow(['Sri Lanka',   '3,200',   '30% of delay-related', '~960']),
          tableRow(['Bhutan',      '210',     '30% of delay-related', '~63']),
          tableRow(['Maldives',    '20',      '30% of delay-related', '~6']),
          tableRow(['TOTAL',       '222,447', '',                      '~66,733 lives/year'], ),
        ]
      }),
      para(''),
      para('Sources: WHO Global Status Report on Road Safety 2023; MoRTH Annual Report 2023; BIMSTEC Regional Transport Study.', { italic: true, color: GREY, size: 18 }),
      divider(),

      // ── 8. HOW TO RUN ────────────────────────────
      heading('8. How to Run / Deploy'),
      heading('Option A: Direct Browser (Recommended)', 2),
      para('No installation required. Open index.html in any modern browser (Chrome, Edge, Firefox, Safari).'),
      bullet('Allow GPS permission when prompted for real location features'),
      bullet('For AI chatbot: click the 🤖 button and enter your OpenAI API key when prompted'),
      bullet('All other features work immediately without any configuration'),

      heading('Option B: Local Dev Server', 2),
      bullet('Run: npx serve . (requires Node.js)'),
      bullet('Or use VS Code Live Server extension'),
      bullet('Navigate to http://localhost:3000'),

      heading('Option C: GitHub Pages (Live)', 2),
      bullet('Repository: https://github.com/brijeshkhanolkar/R1'),
      bullet('Enable GitHub Pages from Settings → Pages → main branch'),
      bullet('Live URL: https://brijeshkhanolkar.github.io/R1/'),

      divider(),

      // ── 9. PRESENTATION ──────────────────────────
      heading('9. Accompanying Presentation'),
      para('The file presentation.html contains a 7-slide interactive presentation:'),
      bullet('Slide 1: GoodStop — Title & Key Features'),
      bullet('Slide 2: The Problem — Legal Fear & Routing Failure'),
      bullet('Slide 3: The Solution — How GoodStop Works'),
      bullet('Slide 4: Tech Stack & Real APIs Used'),
      bullet('Slide 5: Live Demo Guide'),
      bullet('Slide 6: Impact & BIMSTEC Reach'),
      bullet('Slide 7: Thank You — Team Pearson Hardman'),
      para('Open presentation.html in any browser. Use arrow keys or click to navigate. Press F for fullscreen.'),
      divider(),

      // ── FOOTER ───────────────────────────────────
      para(''),
      para('Team Pearson Hardman · BIMSTEC Road Safety Hackathon 2026 · RoadSOS Track', { center: true, color: GREY, size: 18 }),
      para('github.com/brijeshkhanolkar/R1', { center: true, color: BLUE, size: 18 }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync('submission.docx', buf);
  console.log('✅ submission.docx generated successfully!');
}).catch(err => {
  console.error('❌ Error generating docx:', err.message);
});
