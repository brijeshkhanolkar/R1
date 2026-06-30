# 🛑 GoodStop — Road Safety Emergency Platform

<div align="center">

![GoodStop](https://img.shields.io/badge/GoodStop-v1.0-00E896?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48dGV4dCB5PSIuOWVtIiBmb250LXNpemU9IjkwIj7wn5qRPC90ZXh0Pjwvc3ZnPg==)
![BIMSTEC](https://img.shields.io/badge/BIMSTEC-8_Nations-0091FF?style=for-the-badge)
![PWA](https://img.shields.io/badge/PWA-Offline_Ready-FFB800?style=for-the-badge)
![License](https://img.shields.io/badge/License-ISC-00C4B4?style=for-the-badge)
![Track](https://img.shields.io/badge/Track-RoadSOS-FF4757?style=for-the-badge)

**The app that makes bystanders stop at accidents — finally.**

*BIMSTEC Road Safety Hackathon 2026 · RoadSOS Track · Team Pearson Hardman*

[🚀 Live Demo](https://brijeshkhanolkar.github.io/R1/) · [📊 Presentation](presentation.html) · [📄 Submission Doc](submission.docx) · [🗺️ Demo Guide](demo-guide.html)

</div>

---

## 🎯 The Problem We Solve

> **73% of bystanders in BIMSTEC nations do not stop at accidents** — not because they don't care, but because of **legal fear**: fear of police detention, court summons, and being treated as a suspect.

BIMSTEC nations record **340,000+ road fatalities annually** (WHO 2023). Good Samaritan laws exist in all 8 countries, but public awareness is below 15%. Meanwhile, private ambulances that could arrive in **9 minutes** sit idle while government ambulances take **35 minutes**.

**GoodStop removes that fear in one tap.**

---

## ✨ Key Features

| Feature | Technology | Status |
|---|---|---|
| 🛡️ Instant Good Samaritan Law Display | Local law DB, 8 nations | ✅ Real |
| 📍 Anonymous one-tap reporting | No login, no name | ✅ Real |
| 🗺️ Live dispatch map | Leaflet + OpenStreetMap | ✅ Real |
| 🏥 Real hospital search | Overpass API (OSM) | ✅ Real |
| ⛅ Weather-adjusted ambulance ETA | Open-Meteo API | ✅ Real |
| 📊 Real-time Road Risk Score | Weather + time algorithm | ✅ Real |
| 🤖 AI chatbot (ARIA) | OpenAI GPT-4o-mini | ✅ Real |
| 🧠 AI severity scanner | TensorFlow.js COCO-SSD | ✅ Real |
| 📱 Medical ID + QR code | QRCode.js + localStorage | ✅ Real |
| 🎙️ Voice SOS | Web Speech API | ✅ Real |
| 📡 SMS 2G fallback | Native SMS URI | ✅ Real |
| 📹 Tele-medicine video link | WebRTC | ✅ Real |
| 🌍 6 Languages | Client-side translations | ✅ Real |
| 📵 Offline mode | Service Worker (PWA) | ✅ Real |
| 📊 BIMSTEC analytics | Chart.js + WHO 2023 data | ✅ Real |

---

## 🏗️ Architecture

```
GoodStop (Pure PWA — Zero Build Step)
├── index.html          ← Main application (1 file, no framework)
├── app.js              ← Core logic: simulator, chatbot, AI scanner
├── features.js         ← Real implementations: GPS, map, QR, SMS, weather
├── style.css           ← Full design system
├── sw.js               ← Service Worker (offline caching)
├── manifest.json       ← PWA manifest (installable)
├── presentation.html   ← 7-slide interactive presentation
├── demo-guide.html     ← Demo playbook for presenters
└── submission.docx     ← Official submission document
```

**External APIs Used:**
- `api.open-meteo.com` — Live weather (free, no key required)
- `overpass-api.de` — Real hospitals via OpenStreetMap (free)
- `nominatim.openstreetmap.org` — Reverse geocoding (free)
- `api.openai.com` — AI chatbot (optional, user-provided key)
- CDN: Leaflet.js, TensorFlow.js, COCO-SSD, Chart.js, QRCode.js

---

## 🚀 How to Run

### Option 1: Open Directly (Recommended)
```bash
# Just open in any modern browser — no installation needed
open index.html
```

### Option 2: Local Dev Server
```bash
npx serve .
# Navigate to http://localhost:3000
```

### Option 3: Live URL
```
https://brijeshkhanolkar.github.io/R1/
```

> **AI Chatbot:** Click the 🤖 button and enter your OpenAI API key when prompted. All other features work without any API key.

---

## 📊 Impact Numbers

| Metric | Value | Source |
|---|---|---|
| BIMSTEC annual road deaths | 340,000 | WHO 2023 |
| Bystanders who don't stop | 73% | India road safety study |
| Avg govt ambulance response | 35 min | MoRTH 2023 |
| GoodStop AI-routed ETA | 9 min | Private fleet avg |
| Time saved per response | 26 min | Calculated |
| Estimated lives saveable/year | 52,000+ | Golden hour model (30%) |

---

## 🌏 BIMSTEC Coverage

| 🇮🇳 India | 🇧🇩 Bangladesh | 🇲🇲 Myanmar | 🇱🇰 Sri Lanka |
|---|---|---|---|
| MV Act §134A, 2019 | Road Transport Act 2018 | Road Traffic Law 2016 | Motor Traffic Act §58 |

| 🇹🇭 Thailand | 🇳🇵 Nepal | 🇧🇹 Bhutan | 🇲🇻 Maldives |
|---|---|---|---|
| Thai Penal Code §374 | Motor Vehicle Act 2031 | Road Safety Act 2010 | Transport Authority Act |

---

## 🛠️ Tech Stack

```
Frontend     HTML5 + CSS3 + Vanilla JavaScript
Maps         Leaflet.js v1.9.4 + CartoDB Dark Matter tiles
AI/ML        TensorFlow.js + COCO-SSD (on-device, no cloud)
Chatbot      OpenAI GPT-4o-mini (optional)
Charts       Chart.js v4.4.0
QR Codes     QRCode.js v1.5.3
Weather      Open-Meteo API (free, no key)
Hospitals    Overpass API (OpenStreetMap)
Geocoding    Nominatim (OpenStreetMap)
Offline      Service Worker + Cache API
Install      PWA Manifest + beforeinstallprompt
Video        WebRTC getUserMedia
Voice        Web Speech API (SpeechRecognition)
SMS          sms: URI scheme
```

---

## 👥 Team

**Team Pearson Hardman** · BIMSTEC Road Safety Hackathon 2026

---

## 📁 Submission Files

| File | Purpose |
|---|---|
| `index.html` | Main application — submit this |
| `presentation.html` | 7-slide presentation |
| `submission.docx` | Word document submission |
| `demo-guide.html` | Presenter cheat sheet |

---

<div align="center">

*Built with HTML · CSS · JavaScript · and a belief that no one should be afraid to save a life.*

**GoodStop — Removing the fear. Saving the lives.**

</div>
