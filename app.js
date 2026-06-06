/* =============================================
   GOODSTOP — APP.JS
   Interactive Logic, Simulator, Dashboard, Map
   ============================================= */

// ============ LANGUAGE TRANSLATIONS ============
const translations = {
  en: {
    heroTitle: "The app that makes<br/>bystanders stop<br/>at accidents — finally.",
    heroSub: "GoodStop eliminates the #1 reason people drive past accident victims: <strong>legal fear.</strong><br/>Anonymous reporting · Instant legal protection · AI emergency routing · Works on 2G",
    stat1: "Bystanders who don't stop due to legal fear",
    stat2: "Avg ambulance response in BIMSTEC cities",
    stat3: "GoodStop AI-routed private ambulance ETA",
    stat4: "Window before injuries become fatal",
    btnCta: "Try Simulator",
  },
  hi: {
    heroTitle: "वो ऐप जो आखिरकार<br/>लोगों को दुर्घटना पर<br/>रुकने पर मजबूर करता है।",
    heroSub: "GoodStop उस #1 कारण को खत्म करता है जिसकी वजह से लोग पीड़ितों को छोड़कर चले जाते हैं: <strong>कानूनी डर।</strong><br/>गुमनाम रिपोर्टिंग · तत्काल कानूनी सुरक्षा · AI आपातकालीन रूटिंग · 2G पर काम करता है",
    stat1: "वे बाइस्टेंडर जो कानूनी डर से नहीं रुकते",
    stat2: "BIMSTEC शहरों में औसत एम्बुलेंस प्रतिक्रिया",
    stat3: "GoodStop AI-रूटेड प्राइवेट एम्बुलेंस ETA",
    stat4: "चोटें घातक होने से पहले की खिड़की",
    btnCta: "सिमुलेटर आज़माएं",
  },
  bn: {
    heroTitle: "যে অ্যাপটি অবশেষে<br/>মানুষকে দুর্ঘটনায়<br/>থামতে বাধ্য করে।",
    heroSub: "GoodStop সেই #1 কারণটি দূর করে যেজন্য মানুষ দুর্ঘটনার শিকারদের পাশে না থামে: <strong>আইনি ভয়।</strong>",
    stat1: "বাইস্ট্যান্ডার যারা আইনি ভয়ে থামে না",
    stat2: "BIMSTEC শহরে গড় অ্যাম্বুলেন্স প্রতিক্রিয়া",
    stat3: "GoodStop AI-রুটেড প্রাইভেট অ্যাম্বুলেন্স ETA",
    stat4: "আঘাত মারাত্মক হওয়ার আগের উইন্ডো",
    btnCta: "সিমুলেটর চেষ্টা করুন",
  },
  th: {
    heroTitle: "แอปที่ทำให้<br/>คนหยุดช่วยเหลือ<br/>ที่เกิดเหตุ — ในที่สุด",
    heroSub: "GoodStop กำจัด #1 เหตุผลที่คนขับรถผ่านเหยื่ออุบัติเหตุ: <strong>ความกลัวทางกฎหมาย</strong><br/>รายงานแบบนิรนาม · การคุ้มครองทางกฎหมายทันที · AI นำทางฉุกเฉิน",
    stat1: "ผู้เห็นเหตุการณ์ที่ไม่หยุดเพราะกลัวกฎหมาย",
    stat2: "เวลาตอบสนองเฉลี่ยของรถพยาบาลในเมือง BIMSTEC",
    stat3: "ETA รถพยาบาลเอกชนที่ AI นำทางของ GoodStop",
    stat4: "ช่วงเวลาก่อนบาดเจ็บจะถึงแก่ชีวิต",
    btnCta: "ลองใช้ตัวจำลอง",
  },
  ne: {
    heroTitle: "त्यो app जसले अन्ततः<br/>मानिसहरूलाई दुर्घटनामा<br/>रोक्न बाध्य गर्छ।",
    heroSub: "GoodStop त्यो #1 कारण हटाउँछ जसले मानिसहरूलाई पीडितहरूलाई छोडेर जान बाध्य गर्छ: <strong>कानुनी डर।</strong>",
    stat1: "बाइस्ट्यान्डरहरू जो कानुनी डरले रोक्दैनन्",
    stat2: "BIMSTEC सहरहरूमा औसत एम्बुलेन्स प्रतिक्रिया",
    stat3: "GoodStop AI-रूटेड प्राइभेट एम्बुलेन्स ETA",
    stat4: "चोटहरू घातक हुनु अघिको विन्डो",
    btnCta: "सिमुलेटर प्रयास गर्नुहोस्",
  },
  si: {
    heroTitle: "යෙදුම අවසානයේ<br/>අනතුරු ස්ථානවල<br/>නොකා සිටීම නැවැත්වීම.",
    heroSub: "GoodStop #1 හේතුව ඉවත් කරයි: <strong>නෛතික බිය.</strong><br/>නිර්නාමික වාර්තා කිරීම · ක්ෂණික නෛතික ආරක්ෂාව · AI හදිසි යොමු කිරීම",
    stat1: "නෛතික බිය නිසා නොනවතින ප්‍රේක්ෂකයන්",
    stat2: "BIMSTEC නගරවල සාමාන්‍ය ගිලන් රථ ප්‍රතිචාරය",
    stat3: "GoodStop AI-මාර්ගගත පෞද්ගලික ගිලන් රථ ETA",
    stat4: "තුවාල ජීවිතාන්තය වීමට කාල රාමුව",
    btnCta: "සිමියුලේටරය උත්සාහ කරන්න",
  }
};

// ============ LANGUAGE SWITCHER ============
document.getElementById('lang-select').addEventListener('change', function () {
  const lang = this.value;
  const t = translations[lang] || translations.en;
  const el = (id) => document.getElementById(id);
  if (el('hero-title')) el('hero-title').innerHTML = t.heroTitle;
  if (el('hero-subtitle')) el('hero-subtitle').innerHTML = t.heroSub;
  if (el('stat1')) el('stat1').textContent = t.stat1;
  if (el('stat2')) el('stat2').textContent = t.stat2;
  if (el('stat3')) el('stat3').textContent = t.stat3;
  if (el('stat4')) el('stat4').textContent = t.stat4;
  if (el('btn-cta')) el('btn-cta').textContent = t.btnCta;
});

// ============ NAV SCROLL ============
window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if (window.scrollY > 40) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ============ PARTICLES ============
function createParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (6 + Math.random() * 12) + 's';
    p.style.animationDelay = (Math.random() * 12) + 's';
    p.style.width = p.style.height = (1 + Math.random() * 3) + 'px';
    const colors = ['#00e896', '#00c4b4', '#0091ff', '#ffb800'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(p);
  }
}
createParticles();

// ============ INTERSECTION OBSERVER ============
const fadeEls = document.querySelectorAll('.problem-card, .flow-step, .tech-card, .diff-item, .impact-counter, .stat-card');
fadeEls.forEach(el => el.classList.add('fade-in'));
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
fadeEls.forEach(el => obs.observe(el));

// ============ SCROLL HELPER ============
function scrollToDash() {
  document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
}

// ============ COUNTER ANIMATION ============
function animateCounters() {
  document.querySelectorAll('.ic-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = target > 10000 ? Math.round(current).toLocaleString() : Math.round(current);
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}
const impactObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); impactObs.disconnect(); } });
}, { threshold: 0.3 });
const impactSection = document.getElementById('impact');
if (impactSection) impactObs.observe(impactSection);

// ============ BYSTANDER SIMULATOR (INLINE) ============
let simCurrentStep = 0;
const SIM_STEPS = [
  {
    id: 'home',
    render: () => `
      <div class="sim-screen-inner">
        <div class="sim-status"><span>9:41</span><span>⬛⬛⬛ 5G</span></div>
        <div class="sim-app-content">
          <div style="font-family:var(--font-display);font-weight:700;font-size:1rem;">🛑 GoodStop</div>
          <div style="font-size:0.72rem;color:var(--text-muted);padding:4px 12px;border:1px solid var(--glass-border);border-radius:20px;">
            Anonymous · No login · No data collected
          </div>
          <div style="position:relative;width:130px;height:130px;border-radius:50%;background:linear-gradient(135deg,#00e896,#00c4b4);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.85rem;color:#000;cursor:pointer;animation:pulse-green 2.5s ease infinite;line-height:1.4;text-align:center;" onclick="simNext()">
            I SEE AN<br/>ACCIDENT
            <div style="position:absolute;inset:-14px;border-radius:50%;border:2px solid rgba(0,232,150,0.25);animation:ring-pulse 2s ease infinite;"></div>
          </div>
          <div style="font-size:0.7rem;color:var(--text-muted);">Tap the button to report</div>
          <div style="display:flex;gap:10px;margin-top:8px;">
            <div style="text-align:center;padding:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:12px;flex:1;">
              <div style="font-size:0.65rem;color:var(--text-muted);">MEDICAL ID</div>
              <div style="font-size:0.8rem;font-weight:600;margin-top:3px;">Set Up</div>
            </div>
            <div style="text-align:center;padding:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:12px;flex:1;">
              <div style="font-size:0.65rem;color:var(--text-muted);">FAMILY</div>
              <div style="font-size:0.8rem;font-weight:600;margin-top:3px;">3 Contacts</div>
            </div>
          </div>
        </div>
      </div>
    `,
    logEntry: null
  },
  {
    id: 'detecting',
    render: () => `
      <div class="sim-screen-inner" style="background:linear-gradient(180deg,#080d14,#050d12);">
        <div class="sim-status"><span>9:41</span><span>⬛⬛⬛ 5G</span></div>
        <div class="sim-app-content" style="gap:14px;">
          <div style="font-family:var(--font-display);font-weight:800;font-size:1rem;color:#00e896;">📍 Locating...</div>
          <div style="width:80px;height:80px;border-radius:50%;border:3px solid #00e896;border-top-color:transparent;animation:spin 0.8s linear infinite;"></div>
          <div style="font-size:0.8rem;color:var(--text-secondary);">Capturing GPS coordinates</div>
          <div style="background:rgba(0,232,150,0.06);border:1px solid rgba(0,232,150,0.12);border-radius:12px;padding:12px;width:100%;text-align:left;">
            <div style="font-size:0.65rem;color:var(--accent-teal);margin-bottom:4px;">LOCATION DETECTED</div>
            <div style="font-size:0.78rem;color:var(--text-primary);font-weight:600;">NH-48, km 28.4</div>
            <div style="font-size:0.65rem;color:var(--text-muted);">28.4595°N, 77.0266°E · Accuracy: ±5m</div>
          </div>
          <div style="font-size:0.65rem;color:var(--text-muted);border:1px solid rgba(255,255,255,0.06);padding:6px 12px;border-radius:20px;">
            🔒 No personal data transmitted
          </div>
        </div>
      </div>
      <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
    `,
    logEntry: { type: 'info', text: '<strong>Report Received</strong> — Anonymous report at NH-48, km 28.4 · GPS locked ±5m' }
  },
  {
    id: 'legal',
    render: () => `
      <div class="sim-screen-inner" style="background:linear-gradient(180deg,#0a1f14,#050d12);">
        <div class="sim-status"><span>9:41</span><span>⬛⬛⬛ 5G</span></div>
        <div class="sim-app-content" style="gap:12px;">
          <div style="background:linear-gradient(135deg,#00e896,#00c4b4);color:#000;font-weight:800;font-size:0.72rem;padding:4px 14px;border-radius:20px;letter-spacing:0.05em;">✓ YOU ARE LEGALLY PROTECTED</div>
          <div style="font-size:2.5rem;">🛡️</div>
          <div style="font-family:var(--font-display);font-size:1.05rem;font-weight:800;color:#00e896;line-height:1.3;">Good Samaritan<br/>Law Active</div>
          <div style="background:rgba(0,232,150,0.05);border:1px solid rgba(0,232,150,0.15);border-radius:12px;padding:14px;text-align:left;width:100%;">
            <p style="font-size:0.75rem;color:var(--text-secondary);line-height:1.6;">"You are protected under the <strong style="color:var(--text-primary);">Motor Vehicles (Amendment) Act 2019, Section 134A</strong>. You cannot be detained, summoned to court, or held liable for reporting this accident."</p>
            <div style="border-top:1px solid rgba(0,196,180,0.15);margin-top:8px;padding-top:8px;font-size:0.65rem;color:var(--accent-teal);">
              📋 Gazette Notification GSR 732(E), 2019 · Screenshot this for proof
            </div>
          </div>
          <button class="ms-btn" onclick="simNext()" style="width:100%;">I Understand — Continue ›</button>
        </div>
      </div>
    `,
    logEntry: { type: 'success', text: '<strong>Legal Protection</strong> — Good Samaritan law (MV Act §134A) displayed to bystander. Screenshot option offered.' }
  },
  {
    id: 'routing',
    render: () => `
      <div class="sim-screen-inner" style="background:linear-gradient(180deg,#080e18,#050d12);">
        <div class="sim-status"><span>9:41</span><span>⬛⬛⬛ 5G</span></div>
        <div class="sim-app-content" style="gap:10px;">
          <div style="font-family:var(--font-display);font-weight:800;font-size:0.95rem;">🤖 AI Routing...</div>
          <div style="background:rgba(0,145,255,0.06);border:1px solid rgba(0,145,255,0.15);border-radius:12px;padding:10px;width:100%;text-align:left;">
            <span style="font-size:0.65rem;color:var(--accent-blue);">ACCIDENT LOCATION</span>
            <div style="font-size:0.82rem;font-weight:600;margin-top:2px;">NH-48, km 28.4 · Gurugram</div>
          </div>
          <div style="width:100%;display:flex;flex-direction:column;gap:8px;">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:rgba(0,232,150,0.07);border:1px solid #00e896;border-radius:12px;">
              <div>
                <div style="font-size:0.65rem;color:var(--accent-green);font-weight:700;">⚡ FASTEST — DISPATCHING</div>
                <div style="font-size:0.8rem;font-weight:600;margin-top:2px;">Medlife Ambulance #M-14</div>
                <div style="font-size:0.65rem;color:var(--text-muted);">Private · ALS equipped</div>
              </div>
              <div style="text-align:right;">
                <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;color:#00e896;">9 min</div>
                <div style="font-size:0.55rem;background:#00e896;color:#000;padding:2px 6px;border-radius:8px;font-weight:700;">WINNER</div>
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;opacity:0.65;">
              <div>
                <div style="font-size:0.65rem;color:var(--text-muted);">GOVT AMBULANCE 108</div>
                <div style="font-size:0.8rem;font-weight:600;margin-top:2px;">State Amb. Unit 7</div>
              </div>
              <div style="text-align:right;">
                <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:900;color:var(--text-muted);text-decoration:line-through;">34 min</div>
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;opacity:0.65;">
              <div>
                <div style="font-size:0.65rem;color:var(--text-muted);">NEAREST TRAUMA CENTRE</div>
                <div style="font-size:0.8rem;font-weight:600;margin-top:2px;">Medanta, Sector 38</div>
              </div>
              <div style="text-align:right;">
                <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:900;color:var(--accent-amber);">12 min</div>
              </div>
            </div>
          </div>
          <div style="font-size:0.65rem;color:var(--text-muted);">AI saved 25 minutes vs default emergency routing</div>
        </div>
      </div>
    `,
    logEntry: { type: 'alert', text: '<strong>AI Dispatch</strong> — Private Medlife Amb #M-14 dispatched (9 min ETA). Govt Amb 108 bypassed (34 min ETA). Medanta Hospital pre-alerted.' }
  },
  {
    id: 'actions',
    render: () => `
      <div class="sim-screen-inner" style="background:linear-gradient(180deg,#0d1218,#050d12);">
        <div class="sim-status"><span>9:41</span><span>⬛⬛⬛ 5G</span></div>
        <div class="sim-app-content" style="gap:12px;">
          <div style="font-family:var(--font-display);font-weight:800;font-size:0.95rem;">📋 While You Wait</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">Safe actions — no medical training needed</div>
          <div style="width:100%;display:flex;flex-direction:column;gap:8px;">
            ${[
              ['1', "🚫", "Don't move the victim", "Spinal injuries can worsen with movement"],
              ['2', "💬", "Talk to them", "Keep them conscious — ask their name, what happened"],
              ['3', "🧑‍🤝‍🧑", "Keep crowd back", "Clear 3m space for ambulance access and airflow"],
            ].map(([n, icon, title, sub]) => `
              <div style="display:flex;align-items:center;gap:12px;padding:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:12px;">
                <div style="width:32px;height:32px;border-radius:50%;background:rgba(0,232,150,0.12);color:#00e896;font-size:0.85rem;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${n}</div>
                <div>
                  <div style="font-size:0.8rem;font-weight:700;color:var(--text-primary);">${icon} ${title}</div>
                  <div style="font-size:0.68rem;color:var(--text-muted);margin-top:2px;">${sub}</div>
                </div>
              </div>
            `).join('')}
          </div>
          <div style="background:rgba(0,232,150,0.06);border:1px solid rgba(0,232,150,0.15);border-radius:10px;padding:10px;width:100%;text-align:center;">
            <div style="font-size:0.7rem;color:#00e896;font-weight:700;">⏱ Ambulance arriving in <span id="sim-countdown">9:00</span></div>
          </div>
        </div>
      </div>
    `,
    logEntry: { type: 'info', text: '<strong>Bystander Guided</strong> — 3 safe action instructions displayed. No-liability actions only. Language: English.' }
  },
  {
    id: 'family',
    render: () => `
      <div class="sim-screen-inner" style="background:linear-gradient(180deg,#080e1a,#050d12);">
        <div class="sim-status"><span>9:41</span><span>⬛⬛⬛ 5G</span></div>
        <div class="sim-app-content" style="gap:12px;">
          <div style="font-family:var(--font-display);font-weight:800;font-size:0.95rem;">📲 Family Notified</div>
          <div style="background:rgba(0,145,255,0.06);border:1px solid rgba(0,145,255,0.2);border-radius:14px;padding:18px;width:100%;text-align:center;">
            <div style="font-size:2rem;margin-bottom:8px;">👨‍👩‍👧</div>
            <div style="font-weight:700;font-size:0.9rem;margin-bottom:4px;">Live tracking link sent</div>
            <div style="font-size:0.72rem;color:var(--text-secondary);">Sent to 3 emergency contacts within 47 seconds</div>
            <div style="margin-top:12px;display:flex;flex-direction:column;gap:6px;">
              ${[
                ['Priya (Wife)', '✅ Link opened 32s ago'],
                ['Rohit (Brother)', '✅ Link opened 1m ago'],
                ['Mom', '📱 SMS sent (offline)'],
              ].map(([name, status]) => `
                <div style="display:flex;justify-content:space-between;font-size:0.72rem;padding:6px 10px;background:rgba(255,255,255,0.04);border-radius:8px;">
                  <span style="color:var(--text-secondary);">${name}</span>
                  <span style="color:var(--accent-green);">${status}</span>
                </div>
              `).join('')}
            </div>
            <div style="margin-top:10px;font-size:0.65rem;color:var(--accent-green);font-weight:600;">
              🏥 Medanta Hospital pre-briefed with Medical ID
            </div>
          </div>
          <div style="background:rgba(0,232,150,0.05);border:1px solid rgba(0,232,150,0.12);border-radius:10px;padding:10px;width:100%;">
            <div style="font-size:0.65rem;color:var(--accent-teal);font-weight:700;margin-bottom:4px;">MEDICAL ID SENT TO HOSPITAL</div>
            <div style="font-size:0.72rem;color:var(--text-secondary);">Blood: O+ · Allergic: Penicillin · Condition: None</div>
          </div>
          <div style="font-size:0.68rem;color:var(--text-muted);text-align:center;">Total time from tap to hospital pre-brief: <strong style="color:#00e896;">58 seconds</strong></div>
        </div>
      </div>
    `,
    logEntry: { type: 'success', text: '<strong>Family Notified</strong> — 3 contacts alerted in 47s. Medanta pre-briefed (Blood: O+, Penicillin allergy). Ambulance ETA live-tracked by family.' }
  }
];

function renderSimStep(step) {
  const screen = document.getElementById('sim-screen');
  if (screen) {
    screen.innerHTML = SIM_STEPS[step].render();
    startSimCountdown(step);
  }
  renderSimDots(step);
  if (SIM_STEPS[step].logEntry) {
    addLogEntry(SIM_STEPS[step].logEntry);
    updateResponderCards(step);
  }
}

function renderSimDots(current) {
  const container = document.getElementById('sim-dots');
  if (!container) return;
  container.innerHTML = '';
  SIM_STEPS.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'sim-dot' + (i === current ? ' active' : '');
    container.appendChild(dot);
  });
}

function simNext() {
  if (simCurrentStep < SIM_STEPS.length - 1) {
    simCurrentStep++;
    renderSimStep(simCurrentStep);
  }
}

function simBack() {
  if (simCurrentStep > 0) {
    simCurrentStep--;
    renderSimStep(simCurrentStep);
  }
}

let dispatchSeconds = 0;
let dispatchTimer = null;

function addLogEntry({ type, text }) {
  const body = document.getElementById('event-log-body');
  if (!body) return;
  const placeholder = body.querySelector('.log-placeholder');
  if (placeholder) placeholder.remove();
  
  dispatchSeconds += Math.floor(4 + Math.random() * 8);
  const mins = String(Math.floor(dispatchSeconds / 60)).padStart(2, '0');
  const secs = String(dispatchSeconds % 60).padStart(2, '0');
  
  const entry = document.createElement('div');
  entry.className = `log-entry ${type}`;
  entry.innerHTML = `<span class="log-time-stamp">${mins}:${secs}</span><div class="log-text">${text}</div>`;
  body.appendChild(entry);
  body.scrollTop = body.scrollHeight;
  
  // Update dispatch time display
  const timeEl = document.getElementById('dispatch-time');
  if (timeEl) timeEl.textContent = `${mins}:${secs}`;
}

function updateResponderCards(step) {
  if (step >= 3) {
    const pvt = document.getElementById('rc-private');
    const govt = document.getElementById('rc-govt');
    const hosp = document.getElementById('rc-hospital');
    if (pvt) {
      pvt.classList.add('dispatched');
      document.getElementById('rc-private-eta').textContent = '9 min';
      document.getElementById('rc-private-status').textContent = '⚡ Dispatched';
    }
    if (govt) {
      document.getElementById('rc-govt-eta').textContent = '34 min';
      document.getElementById('rc-govt-status').textContent = '⏭ Bypassed';
    }
    if (hosp) {
      document.getElementById('rc-hospital-eta').textContent = '12 min';
      document.getElementById('rc-hospital-status').textContent = '🏥 Pre-alerted';
    }
  }
}

let simCountdownInterval = null;
function startSimCountdown(step) {
  if (step === 4) {
    clearInterval(simCountdownInterval);
    let secs = 540;
    simCountdownInterval = setInterval(() => {
      secs--;
      const m = Math.floor(secs / 60);
      const s = String(secs % 60).padStart(2, '0');
      const el = document.getElementById('sim-countdown');
      if (el) el.textContent = `${m}:${s}`;
      if (secs <= 0) clearInterval(simCountdownInterval);
    }, 1000);
  } else {
    clearInterval(simCountdownInterval);
  }
}

// Init simulator
renderSimStep(0);

// ============ BYSTANDER MODAL ============
let modalStep = 0;

function openBystander() {
  modalStep = 0;
  document.getElementById('bystander-modal').classList.add('open');
  renderModalStep(0);
  document.body.style.overflow = 'hidden';
}

function closeBystander() {
  document.getElementById('bystander-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModal(e) {
  if (e.target === document.getElementById('bystander-modal')) closeBystander();
}

function renderModalStep(step) {
  const screen = document.getElementById('modal-screen');
  if (!screen) return;
  screen.innerHTML = SIM_STEPS[step].render();
  // Wire next button in modal
  const sos = screen.querySelector('[onclick="simNext()"]');
  if (sos) sos.setAttribute('onclick', 'modalNext()');
  const btn = screen.querySelector('.ms-btn');
  if (btn) btn.setAttribute('onclick', 'modalNext()');
  startModalCountdown(step);
}

function modalNext() {
  if (modalStep < SIM_STEPS.length - 1) {
    modalStep++;
    renderModalStep(modalStep);
  } else {
    closeBystander();
  }
}

function startModalCountdown(step) {
  if (step === 4) {
    clearInterval(simCountdownInterval);
    let secs = 540;
    simCountdownInterval = setInterval(() => {
      secs--;
      const m = Math.floor(secs / 60);
      const s = String(secs % 60).padStart(2, '0');
      const el = document.getElementById('sim-countdown');
      if (el) el.textContent = `${m}:${s}`;
      if (secs <= 0) clearInterval(simCountdownInterval);
    }, 1000);
  }
}

// ============ EMERGENCY MAP (CANVAS) ============
const MAP_W = 800, MAP_H = 540;
let mapScale = 1;
let mapOffsetX = 0, mapOffsetY = 0;
let animFrame = 0;

const mapEntities = {
  roads: [
    { x1: 0.05, y1: 0.5, x2: 0.95, y2: 0.5, width: 3 },
    { x1: 0.5, y1: 0.05, x2: 0.5, y2: 0.95, width: 3 },
    { x1: 0.1, y1: 0.3, x2: 0.9, y2: 0.7, width: 2 },
    { x1: 0.2, y1: 0.1, x2: 0.8, y2: 0.9, width: 1.5 },
    { x1: 0.15, y1: 0.8, x2: 0.85, y2: 0.2, width: 1.5 },
    { x1: 0.3, y1: 0.05, x2: 0.3, y2: 0.95, width: 1.5 },
    { x1: 0.7, y1: 0.05, x2: 0.7, y2: 0.95, width: 1.5 },
    { x1: 0.05, y1: 0.25, x2: 0.95, y2: 0.75, width: 1 },
    { x1: 0.05, y1: 0.75, x2: 0.95, y2: 0.25, width: 1 },
  ],
  accident: { x: 0.52, y: 0.45, label: 'Accident NH-48' },
  ambulances: [
    { x: 0.15, y: 0.2, type: 'private', label: 'Medlife #M-14', eta: 9, color: '#00e896', progress: 0 },
    { x: 0.85, y: 0.8, type: 'govt', label: 'State Amb 108', eta: 34, color: '#0091ff', progress: 0 },
  ],
  hospitals: [
    { x: 0.75, y: 0.2, label: 'Medanta', capacity: 68, color: '#ffb800' },
    { x: 0.18, y: 0.75, label: 'Fortis', capacity: 87, color: '#ff4757' },
    { x: 0.55, y: 0.8, label: 'AIIMS', capacity: 45, color: '#00e896' },
  ]
};

function initMap() {
  const container = document.getElementById('map-leaflet');
  if (!container) return;
  document.getElementById('map-canvas').style.display = 'none';
  
  if (!window.leafletMap) {
    window.leafletMap = L.map('map-leaflet').setView([INCIDENT.lat, INCIDENT.lng], 14);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(window.leafletMap);
    
    const incIcon = L.divIcon({className: 'legend-dot legend-dot--accident', iconSize: [16,16]});
    const hospIcon = L.divIcon({className: 'legend-dot legend-dot--hospital', iconSize: [16,16]});
    
    L.marker([INCIDENT.lat, INCIDENT.lng], {icon: incIcon}).addTo(window.leafletMap).bindPopup('Accident: ' + INCIDENT.label);
    
    if (window.HOSPITALS && window.HOSPITALS.length > 0) {
      window.HOSPITALS.forEach(h => {
        L.marker([h.lat, h.lng], {icon: hospIcon}).addTo(window.leafletMap).bindPopup(h.name);
      });
    }
  } else {
    window.leafletMap.setView([INCIDENT.lat, INCIDENT.lng], 14);
    
    // Clear old markers
    window.leafletMap.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        window.leafletMap.removeLayer(layer);
      }
    });
    
    const incIcon = L.divIcon({className: 'legend-dot legend-dot--accident', iconSize: [16,16]});
    const hospIcon = L.divIcon({className: 'legend-dot legend-dot--hospital', iconSize: [16,16]});
    
    L.marker([INCIDENT.lat, INCIDENT.lng], {icon: incIcon}).addTo(window.leafletMap).bindPopup('Accident: ' + INCIDENT.label);
    
    if (window.HOSPITALS) {
      window.HOSPITALS.forEach(h => {
        L.marker([h.lat, h.lng], {icon: hospIcon}).addTo(window.leafletMap).bindPopup(h.name);
      });
    }
  }
}

function drawMap() {} // Stubbed out for legacy canvas patches
function mapCenter() { if(window.leafletMap) window.leafletMap.setView([INCIDENT.lat, INCIDENT.lng], 15); }
function mapZoom(dir) { if(window.leafletMap) window.leafletMap.setZoom(window.leafletMap.getZoom() + dir); }

// ============ INCIDENT LIST ============
function renderIncidents() {
  const list = document.getElementById('incident-list');
  if (!list) return;
  const incidents = [
    { name: 'NH-48 km 28.4 · Gurugram', meta: 'Reported 2m ago · 2 casualties', eta: '9 min', status: 'critical' },
    { name: 'Ring Road, ITO · Delhi', meta: 'Reported 8m ago · 1 casualty', eta: '4 min', status: 'active' },
    { name: 'Dwarka Expressway km 12', meta: 'Reported 15m ago · resolved', eta: 'Done', status: 'resolved' },
  ];
  list.innerHTML = '<div class="incident-list-header">Active Incidents</div>' + incidents.map(inc => `
    <div class="incident-item">
      <div class="incident-dot ${inc.status}"></div>
      <div class="incident-info">
        <div class="incident-name">${inc.name}</div>
        <div class="incident-meta">${inc.meta}</div>
      </div>
      <div class="incident-eta">${inc.eta}</div>
    </div>
  `).join('');
}

function renderHospitals() {
  const el = document.getElementById('hospital-status');
  if (!el) return;
  const hospitals = [
    { name: 'Medanta, Sec 38', capacity: 68, level: 'mid' },
    { name: 'Fortis Memorial', capacity: 87, level: 'high' },
    { name: 'AIIMS Trauma', capacity: 45, level: 'low' },
    { name: 'Max Gurugram', capacity: 52, level: 'mid' },
  ];
  el.innerHTML = '<div class="hospital-status-header">Hospital Capacity</div>' + hospitals.map(h => `
    <div class="hospital-item">
      <div class="hospital-name">${h.name}</div>
      <div class="hospital-bar-wrap"><div class="hospital-bar ${h.level}" style="width:${h.capacity}%"></div></div>
      <div class="hospital-pct">${h.capacity}%</div>
    </div>
  `).join('');
}

// ============ AI CHATBOT ============
const chatResponses = {
  'am i legally safe if i stop': `Yes — you are fully protected! Under the **Motor Vehicles (Amendment) Act 2019, Section 134A**, stopping to help at an accident scene:\n\n✅ You cannot be arrested or detained\n✅ You cannot be summoned as a witness without consent\n✅ You cannot be held liable if the victim's condition worsens\n\nThis law applies across India. Similar Good Samaritan laws exist in all BIMSTEC nations. Screenshot the law screen in GoodStop for proof.`,
  'what should i do right now': `Three safe actions — no training needed:\n\n**1. Don't move them** — Spinal injuries can worsen\n**2. Talk to them** — Ask their name, keep them conscious\n**3. Keep crowd back** — Clear 3m for ambulance access\n\nGoodStop's AI has already dispatched the fastest ambulance. Your job is just those 3 things. You're doing great. 🛡️`,
  'call ambulance for me': `Done! GoodStop has:\n\n🚑 **Dispatched** Medlife Private Ambulance — ETA **9 minutes**\n🏥 **Pre-alerted** Medanta Hospital with location + severity\n📲 **Notified** victim's 3 emergency contacts\n📡 **SMS backup** sent to 108 via Twilio (2G fallback)\n\nDo NOT call 108 separately — it would route a government ambulance that's 34 min away. The private one GoodStop chose is 25 minutes faster.`,
  'मैं क्या करूं? (hindi)': `घबराएं नहीं! GoodStop ने सब कर दिया है:\n\n🛡️ **आप कानूनी रूप से सुरक्षित हैं** — मोटर वाहन अधिनियम §134A\n🚑 **एम्बुलेंस भेज दी गई** — 9 मिनट में आएगी\n\n**अभी 3 काम करें:**\n1. पीड़ित को हिलाएं नहीं\n2. उनसे बात करते रहें\n3. भीड़ को दूर रखें\n\nआप सही काम कर रहे हैं। 🙏`,
  'default': `I can help with:\n\n🛡️ **Legal protection** — Good Samaritan laws by country\n🚑 **Emergency routing** — Private vs government ambulance ETA\n📋 **First response** — Safe actions while waiting\n🌍 **Multilingual help** — Hindi, Bengali, Thai, Nepali, Sinhala\n\nWhat do you need right now?`
};

let chatOpen = false;

function toggleChat() {
  chatOpen = !chatOpen;
  const panel = document.getElementById('chatbot-panel');
  panel.classList.toggle('open', chatOpen);
}

function sendSuggest(btn) {
  const text = btn.textContent;
  sendChatMessage(text);
  document.getElementById('chat-suggestions').style.display = 'none';
}

function chatKeydown(e) {
  if (e.key === 'Enter') sendChat();
}

function sendChat() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  sendChatMessage(text);
}

function sendChatMessage(text) {
  const msgs = document.getElementById('chat-messages');
  
  // User message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg chat-msg--user';
  userMsg.innerHTML = `<div class="chat-bubble">${text}</div>`;
  msgs.appendChild(userMsg);
  msgs.scrollTop = msgs.scrollHeight;

  // Typing indicator
  const typing = document.createElement('div');
  typing.className = 'chat-msg chat-msg--bot';
  typing.innerHTML = `<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
  msgs.appendChild(typing);
  msgs.scrollTop = msgs.scrollHeight;

  // Find response
  const key = text.toLowerCase().trim();
  let response = chatResponses.default;
  for (const [k, v] of Object.entries(chatResponses)) {
    if (key.includes(k) || k.includes(key.substring(0, 10))) {
      response = v;
      break;
    }
  }

  setTimeout(() => {
    msgs.removeChild(typing);
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-msg chat-msg--bot';
    botMsg.innerHTML = `<div class="chat-bubble">${response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')}</div>`;
    msgs.appendChild(botMsg);
    msgs.scrollTop = msgs.scrollHeight;
  }, 1200 + Math.random() * 800);
}

// ============ INIT ============
window.addEventListener('DOMContentLoaded', () => {
  initMap();
  renderIncidents();
  renderHospitals();

  // Live dashboard pulse
  setInterval(() => {
    const dsActive = document.getElementById('ds-active');
    const dsSaved = document.getElementById('ds-saved');
    if (dsActive && Math.random() < 0.3) {
      const v = parseInt(dsActive.textContent);
      dsActive.textContent = Math.max(1, v + (Math.random() < 0.5 ? 1 : -1));
    }
    if (dsSaved && Math.random() < 0.2) {
      dsSaved.textContent = parseInt(dsSaved.textContent) + 1;
    }
  }, 3000);
});

window.addEventListener('resize', initMap);

// ============ MAP LIVE CLOCK ============
function updateMapClock() {
  const el = document.getElementById('map-clock');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('en-IN', { hour12: false });
}
setInterval(updateMapClock, 1000);
updateMapClock();

// ============ HEATMAP TOGGLE ============
let heatmapActive = false;
const hotspots = [
  { x: 0.52, y: 0.45, r: 55, intensity: 1.0 },
  { x: 0.3, y: 0.5, r: 45, intensity: 0.7 },
  { x: 0.7, y: 0.5, r: 35, intensity: 0.5 },
  { x: 0.5, y: 0.25, r: 30, intensity: 0.6 },
  { x: 0.18, y: 0.75, r: 25, intensity: 0.4 },
  { x: 0.82, y: 0.2, r: 28, intensity: 0.5 },
  { x: 0.45, y: 0.8, r: 32, intensity: 0.65 },
];

function toggleHeatmap() {
  heatmapActive = !heatmapActive;
  const btn = document.getElementById('map-heatmap-btn');
  const legend = document.getElementById('heatmap-legend');
  if (btn) btn.classList.toggle('active', heatmapActive);
  if (legend) legend.style.display = heatmapActive ? 'flex' : 'none';
}

// Patch drawMap to include heatmap
const _origDrawMap = drawMap;
window.drawMap = function() {
  _origDrawMap();
  if (!heatmapActive) return;
  const canvas = document.getElementById('map-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.save();
  hotspots.forEach(h => {
    const cx = h.x * W, cy = h.y * H;
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, h.r);
    grd.addColorStop(0, `rgba(255,50,50,${0.55 * h.intensity})`);
    grd.addColorStop(0.5, `rgba(255,140,0,${0.3 * h.intensity})`);
    grd.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(cx, cy, h.r, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();
  });
  ctx.restore();
};

// ============ AI SEVERITY SCANNER ============
const severityPresets = [
  "Person unconscious, not moving, blood visible on road",
  "Minor fender bender, everyone walking and talking normally",
  "Multiple vehicles involved, one car on fire, people trapped",
  "Motorbike fallen, rider seated on kerb, rubbing shoulder"
];

const severityDB = [
  {
    level: 'critical', score: 95, label: 'CRITICAL',
    chipClass: 'critical',
    icon: '🔴',
    responder: 'Advanced Life Support (ALS) Private Ambulance + Trauma Team',
    eta: '8 min',
    actions: [
      '🚨 Trauma team pre-alert sent to Medanta Level-1 centre',
      '🩸 Blood bank notified — O-negative reserved',
      '🚁 Air ambulance on standby if road blocked',
      '👮 Police notified for crowd and traffic control'
    ]
  },
  {
    level: 'low', score: 18, label: 'MINOR',
    chipClass: 'low',
    icon: '🟢',
    responder: 'Basic Life Support (BLS) Ambulance',
    eta: '12 min',
    actions: [
      '🚑 BLS Ambulance dispatched for precautionary check',
      '📝 Incident logged for insurance documentation',
      '🚔 Traffic police notified for clearance',
      '📲 No family alert sent — situation non-critical'
    ]
  },
  {
    level: 'critical', score: 99, label: 'MASS CASUALTY',
    chipClass: 'critical',
    icon: '🔴',
    responder: 'Mass Casualty Protocol — 3 ALS Units + Fire Brigade',
    eta: '6 min',
    actions: [
      '🆘 Mass Casualty Incident (MCI) protocol activated',
      '🚒 Fire brigade dispatched — fire + extrication risk',
      '🏥 3 hospitals pre-alerted with bed counts requested',
      '📡 Disaster management authority notified'
    ]
  },
  {
    level: 'medium', score: 42, label: 'MODERATE',
    chipClass: 'medium',
    icon: '🟡',
    responder: 'Basic Life Support + Orthopaedic consult',
    eta: '10 min',
    actions: [
      '🚑 BLS Ambulance en route with spinal board',
      '🦴 Nearest orthopaedic hospital pre-alerted',
      '📲 Family contact notified as precaution',
      '🚔 Police notified for FIR documentation'
    ]
  }
];

function setSeverityPreset(idx) {
  const ta = document.getElementById('severity-input');
  if (ta) ta.value = severityPresets[idx];
  document.querySelectorAll('.preset-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
}

function drawSeverityGauge(score, color) {
  const canvas = document.getElementById('severity-gauge');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2 + 20, r = 85;
  const startA = Math.PI * 0.75, endA = Math.PI * 2.25;

  // Track
  ctx.beginPath();
  ctx.arc(cx, cy, r, startA, endA);
  ctx.strokeStyle = 'rgba(255,255,255,0.07)';
  ctx.lineWidth = 12;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Color zones
  const zones = [
    { from: 0, to: 0.33, color: '#00e896' },
    { from: 0.33, to: 0.66, color: '#ffb800' },
    { from: 0.66, to: 1, color: '#ff4757' },
  ];
  zones.forEach(z => {
    const sa = startA + z.from * (endA - startA);
    const ea = startA + z.to * (endA - startA);
    ctx.beginPath();
    ctx.arc(cx, cy, r, sa, ea);
    ctx.strokeStyle = z.color + '44';
    ctx.lineWidth = 10;
    ctx.stroke();
  });

  // Value arc
  const valueA = startA + (score / 100) * (endA - startA);
  ctx.beginPath();
  ctx.arc(cx, cy, r, startA, valueA);
  ctx.strokeStyle = color;
  ctx.lineWidth = 12;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Center text
  ctx.fillStyle = color;
  ctx.font = 'bold 28px Space Grotesk, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(score, cx, cy - 8);
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.font = '11px Inter, sans-serif';
  ctx.fillText('Severity Score', cx, cy + 16);
}

function runSeverityScan() {
  const input = document.getElementById('severity-input');
  const output = document.getElementById('severity-output');
  const btn = document.getElementById('severity-scan-btn');
  const text = (input?.value || '').toLowerCase();
  if (!text.trim()) { alert('Please describe the scene first!'); return; }

  btn.textContent = '🤖 Analysing...';
  btn.classList.add('scanning');
  output.innerHTML = '<div class="severity-placeholder"><div style="font-size:1.5rem;margin-bottom:8px">⚙️</div><div>AI analysing scene description...</div></div>';

  // Blank gauge
  const gaugeLabel = document.getElementById('severity-gauge-label');
  const gaugeSub = document.getElementById('severity-gauge-sub');
  if (gaugeLabel) gaugeLabel.textContent = '—';
  if (gaugeSub) gaugeSub.textContent = 'Scanning...';

  // Select result based on text
  let result;
  if (text.includes('fire') || text.includes('multiple') || text.includes('trapped')) result = severityDB[2];
  else if (text.includes('unconscious') || text.includes('blood')) result = severityDB[0];
  else if (text.includes('minor') || text.includes('walking') || text.includes('fender')) result = severityDB[1];
  else result = severityDB[3];

  const colorsMap = { critical: '#ff4757', high: '#ffb800', medium: '#0091ff', low: '#00e896' };
  const c = colorsMap[result.chipClass] || '#00e896';

  setTimeout(() => {
    btn.textContent = '🤖 Analyse with AI';
    btn.classList.remove('scanning');

    output.innerHTML = `
      <div class="severity-result-title">${result.icon} AI Assessment Complete</div>
      <div class="severity-chip ${result.chipClass}">${result.icon} ${result.label} — Score ${result.score}/100</div>
      <div class="severity-dispatch-box">
        <strong>Recommended Responder:</strong> ${result.responder}<br/>
        <strong>Estimated Arrival:</strong> ${result.eta} (AI-optimised route)
      </div>
      <div class="severity-actions-list">
        ${result.actions.map(a => `<div class="severity-action-item"><span>${a}</span></div>`).join('')}
      </div>
    `;

    // Animate gauge
    let curr = 0;
    const target = result.score;
    const step = target / 30;
    const t = setInterval(() => {
      curr = Math.min(curr + step, target);
      drawSeverityGauge(Math.round(curr), c);
      if (curr >= target) {
        clearInterval(t);
        if (gaugeLabel) gaugeLabel.textContent = result.label;
        if (gaugeSub) gaugeSub.textContent = `Score: ${result.score}/100`;
      }
    }, 30);
  }, 1800);
}

// Draw blank gauge on load
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => drawSeverityGauge(0, '#00e896'), 500);
});

// ============ ANALYTICS CHARTS ============
function drawBarChart(canvasId, labels, beforeData, afterData) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width = canvas.offsetWidth || 400;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const pad = { top: 20, right: 20, bottom: 36, left: 40 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;
  const maxVal = Math.max(...beforeData, ...afterData) * 1.1;
  const barW = (chartW / labels.length) * 0.35;
  const gap = (chartW / labels.length) - barW * 2;

  labels.forEach((label, i) => {
    const x0 = pad.left + i * (chartW / labels.length) + gap / 2;
    const bH = (beforeData[i] / maxVal) * chartH;
    const aH = (afterData[i] / maxVal) * chartH;

    // Before bar
    ctx.fillStyle = 'rgba(255,71,87,0.5)';
    ctx.fillRect(x0, pad.top + chartH - bH, barW, bH);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '9px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(beforeData[i], x0 + barW / 2, pad.top + chartH - bH - 4);

    // After bar
    ctx.fillStyle = 'rgba(0,232,150,0.7)';
    ctx.fillRect(x0 + barW + 3, pad.top + chartH - aH, barW, aH);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText(afterData[i], x0 + barW * 1.5 + 3, pad.top + chartH - aH - 4);

    // Label
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '10px Inter';
    ctx.fillText(label, x0 + barW, pad.top + chartH + 16);
  });

  // Legend
  ctx.fillStyle = 'rgba(255,71,87,0.7)';
  ctx.fillRect(pad.left, 4, 10, 10);
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '9px Inter';
  ctx.textAlign = 'left';
  ctx.fillText('Before', pad.left + 14, 13);
  ctx.fillStyle = 'rgba(0,232,150,0.7)';
  ctx.fillRect(pad.left + 60, 4, 10, 10);
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillText('GoodStop', pad.left + 74, 13);
}

function drawLineChart(canvasId, labels, data) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width = canvas.offsetWidth || 400;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const pad = { top: 20, right: 20, bottom: 36, left: 40 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;
  const maxVal = Math.max(...data) * 1.2;
  const stepX = chartW / (labels.length - 1);

  const points = data.map((v, i) => ({
    x: pad.left + i * stepX,
    y: pad.top + chartH - (v / maxVal) * chartH
  }));

  // Fill gradient
  const grd = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
  grd.addColorStop(0, 'rgba(0,232,150,0.25)');
  grd.addColorStop(1, 'rgba(0,232,150,0)');
  ctx.beginPath();
  ctx.moveTo(points[0].x, pad.top + chartH);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, pad.top + chartH);
  ctx.fillStyle = grd;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.strokeStyle = '#00e896';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
  ctx.stroke();

  // Dots + labels
  points.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#00e896';
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '9px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(data[i], p.x, p.y - 10);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillText(labels[i], p.x, pad.top + chartH + 16);
  });
}

function drawDonutChart(canvasId, data, labels, colors) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width = canvas.offsetWidth || 300;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const total = data.reduce((a, b) => a + b, 0);
  const cx = W / 2 - 30, cy = H / 2, r = Math.min(cx, cy) - 20, hole = r * 0.55;
  let angle = -Math.PI / 2;

  data.forEach((v, i) => {
    const slice = (v / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angle, angle + slice);
    ctx.fillStyle = colors[i];
    ctx.fill();
    angle += slice;
  });

  // Hole
  ctx.beginPath();
  ctx.arc(cx, cy, hole, 0, Math.PI * 2);
  ctx.fillStyle = '#0a1520';
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = 'bold 14px Space Grotesk';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(total, cx, cy - 8);
  ctx.font = '9px Inter';
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.fillText('dispatched', cx, cy + 8);

  // Legend
  labels.forEach((l, i) => {
    const ly = 20 + i * 22;
    ctx.fillStyle = colors[i];
    ctx.fillRect(W - 90, ly, 12, 12);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '10px Inter';
    ctx.textAlign = 'left';
    ctx.fillText(`${l} (${Math.round(data[i] / total * 100)}%)`, W - 74, ly + 9);
  });
}

function renderCountryBars() {
  const container = document.getElementById('country-bars');
  if (!container) return;
  const countries = [
    { name: '🇮🇳 India', pct: 72 },
    { name: '🇧🇩 Bangladesh', pct: 48 },
    { name: '🇲🇲 Myanmar', pct: 31 },
    { name: '🇱🇰 Sri Lanka', pct: 55 },
    { name: '🇹🇭 Thailand', pct: 67 },
    { name: '🇳🇵 Nepal', pct: 43 },
    { name: '🇧🇹 Bhutan', pct: 29 },
    { name: '🇲🇻 Maldives', pct: 38 },
  ];
  container.innerHTML = countries.map(c => `
    <div class="country-bar-row">
      <div class="country-bar-name">${c.name}</div>
      <div class="country-bar-track">
        <div class="country-bar-fill" style="width:0%" data-target="${c.pct}"></div>
      </div>
      <div class="country-bar-pct">${c.pct}%</div>
    </div>
  `).join('');

  setTimeout(() => {
    container.querySelectorAll('.country-bar-fill').forEach(el => {
      el.style.width = el.dataset.target + '%';
    });
  }, 300);
}

function initCharts() {
  drawBarChart('chart-response',
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    [34, 38, 35, 33, 36, 32, 37],
    [9, 8, 10, 7, 9, 8, 9]
  );
  drawLineChart('chart-incidents',
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    [12, 18, 14, 22, 19, 31, 27]
  );
  drawDonutChart('chart-donut',
    [63, 28, 9],
    ['Private', 'Govt', 'Air'],
    ['#00e896', '#0091ff', '#ffb800']
  );
  renderCountryBars();
}

const analyticsObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) { initCharts(); analyticsObs.disconnect(); }
}, { threshold: 0.2 });
const analyticsEl = document.getElementById('analytics');
if (analyticsEl) analyticsObs.observe(analyticsEl);
window.addEventListener('resize', initCharts);

// ============ BIMSTEC LAW DATABASE ============
const bimstecLaws = [
  {
    flag: '🇮🇳', name: 'India', statusClass: 'active', statusLabel: 'Active Law',
    citation: 'Motor Vehicles (Amendment) Act 2019 · Section 134A · GSR 732(E)',
    text: '"A Good Samaritan shall not be liable for any civil or criminal action for any injury to or death of the victim of an accident involving a motor vehicle, if the Good Samaritan renders emergency medical or non-medical care or assistance at the scene of the accident."',
    protections: ['Cannot be arrested or detained at scene', 'Cannot be summoned to court without consent', 'Not liable if victim\'s condition worsens', 'Identity kept confidential from police', 'Hospital cannot demand payment before treatment']
  },
  {
    flag: '🇧🇩', name: 'Bangladesh', statusClass: 'partial', statusLabel: 'Partial Protection',
    citation: 'Road Transport Act 2018 · Section 48 (Bystander Provision)',
    text: '"A person who in good faith provides emergency assistance to a road accident victim shall not be held criminally liable for any unintentional consequence arising from such assistance, provided the assistance was rendered without negligence."',
    protections: ['Criminal liability waived for good-faith helpers', 'Must demonstrate no negligence', 'Civil liability not fully waived', 'Law awareness campaigns in progress']
  },
  {
    flag: '🇲🇲', name: 'Myanmar', statusClass: 'developing', statusLabel: 'Under Development',
    citation: 'Traffic Rules (Amendment) Draft 2023 · Proposed Article 17',
    text: '"The Ministry of Transport is currently drafting provisions to protect citizens who provide emergency assistance at road accident scenes, aligned with ASEAN road safety frameworks."',
    protections: ['Draft law under parliamentary review', 'Interim police guidelines protect helpers', 'GoodStop provides legal disclaimer screen', 'Expected enactment: 2025']
  },
  {
    flag: '🇱🇰', name: 'Sri Lanka', statusClass: 'active', statusLabel: 'Active Law',
    citation: 'Motor Traffic Act No. 14 of 1951 (Amended 2021) · Section 37A',
    text: '"Any person who voluntarily and in good faith renders emergency assistance to the victim of a motor vehicle accident shall be immune from civil and criminal prosecution arising out of such assistance, provided such person does not act with gross negligence or malicious intent."',
    protections: ['Full civil and criminal immunity', 'Good faith standard applies', 'Gross negligence exception', 'Recent 2021 amendment strengthened protections']
  },
  {
    flag: '🇹🇭', name: 'Thailand', statusClass: 'active', statusLabel: 'Active Law',
    citation: 'Civil and Commercial Code, Section 420 Proviso · Emergency Assistance Doctrine',
    text: '"A person who acts in an emergency to prevent damage to another person is not liable for damages arising from such action provided the action was reasonable and proportionate to the emergency."',
    protections: ['Emergency doctrine provides broad protection', 'Road accident specifically covered', 'Integrated into highway patrol protocols', 'Thai legal aid available to helpers']
  },
  {
    flag: '🇳🇵', name: 'Nepal', statusClass: 'partial', statusLabel: 'Partial Protection',
    citation: 'Motor Vehicle and Transport Management Act 2049 (1992) · Section 28',
    text: '"Citizens assisting road accident victims in good faith are encouraged by the state. Law enforcement officers are instructed not to detain persons providing emergency assistance unless prima facie evidence of criminal act exists."',
    protections: ['Police instruction not to detain helpers', 'Statutory civil liability still exists', 'Supreme Court precedent supports helpers', 'Full Good Samaritan bill pending']
  },
  {
    flag: '🇧🇹', name: 'Bhutan', statusClass: 'developing', statusLabel: 'Under Development',
    citation: 'Road Safety and Transport Authority Act 2017 · Section 52 (Pending)',
    text: '"Bhutan is working with SAARC to harmonise road safety legislation including provisions for Good Samaritan protection. Current policy guidance protects emergency helpers from immediate police action."',
    protections: ['Policy guidelines protect helpers', 'SAARC harmonisation in progress', 'GoodStop shows local Royal Police Circular', 'Expected statutory protection by 2025']
  },
  {
    flag: '🇲🇻', name: 'Maldives', statusClass: 'active', statusLabel: 'Active Law',
    citation: 'Maldives Traffic Act (Law No. 10/2013) · Section 19(b)',
    text: '"A person who renders aid or assistance to a road accident victim out of compassion and good faith shall not be subject to any legal liability arising from such assistance under this Act or any other law."',
    protections: ['Complete liability shield for helpers', 'No registration or reporting required', 'Anonymous reporting to Coast Guard available', 'Medical transport by sea covered']
  }
];

let selectedCountry = 0;

function renderLawDatabase() {
  const selector = document.getElementById('country-selector');
  const display = document.getElementById('law-display');
  if (!selector || !display) return;

  selector.innerHTML = bimstecLaws.map((c, i) => `
    <button class="country-btn ${i === selectedCountry ? 'active' : ''}" onclick="selectCountry(${i})">
      <span class="country-btn-flag">${c.flag}</span>
      <span class="country-btn-info">
        <span class="country-btn-name">${c.name}</span>
        <span class="country-btn-status ${c.statusClass === 'active' ? 'active-law' : ''}">${c.statusLabel}</span>
      </span>
    </button>
  `).join('');

  renderCountryLaw(selectedCountry);
}

function selectCountry(idx) {
  selectedCountry = idx;
  document.querySelectorAll('.country-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
  renderCountryLaw(idx);
}

function renderCountryLaw(idx) {
  const c = bimstecLaws[idx];
  const display = document.getElementById('law-display');
  if (!display) return;
  display.innerHTML = `
    <div class="law-country-header">
      <div class="law-country-flag">${c.flag}</div>
      <div>
        <div class="law-country-name">${c.name}</div>
        <div class="law-country-status">
          <span class="law-status-badge ${c.statusClass}">${c.statusLabel}</span>
        </div>
      </div>
    </div>
    <div class="law-citation">${c.citation}</div>
    <div class="law-text">${c.text}</div>
    <div class="law-protection-list">
      ${c.protections.map(p => `
        <div class="law-protect-item">
          <span class="law-protect-icon">✓</span>
          <span>${p}</span>
        </div>
      `).join('')}
    </div>
  `;
}

const lawsObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) { renderLawDatabase(); lawsObs.disconnect(); }
}, { threshold: 0.1 });
const lawsEl = document.getElementById('laws');
if (lawsEl) lawsObs.observe(lawsEl);

// ============ SMS DEMO ============
let smsRunning = false;
const smsMessages = [
  { type: 'out', delay: 500, text: '📵 NO INTERNET · GoodStop SMS Mode activated\n2G signal detected on Airtel' },
  { type: 'out', delay: 1500, text: '📍 EMERGENCY ALERT\nAccident: NH-48, km 28.4\nGPS: 28.4595°N, 77.0266°E\nTime: ' + new Date().toLocaleTimeString() + '\nSeverity: HIGH\nVia: GoodStop v2.0' },
  { type: 'in', delay: 3000, text: '✅ 108 DISPATCH CENTER\nAlert received. Unit dispatched.\nETA: 18 min. Stay on location.' },
  { type: 'out', delay: 4500, text: '👨‍👩‍👧 FAMILY ALERT\nTo: Priya (+91 98XXX XXXXX)\nAn accident has been reported near your registered family member.\nLive tracking: goodstop.app/track/A7F2K\nAccident location attached.' },
  { type: 'in', delay: 6000, text: '✅ SMS DELIVERED\nRecipient: Priya\nStatus: Opened 12s ago' },
  { type: 'out', delay: 7500, text: '🏥 HOSPITAL PRE-BRIEF\nTo: Medanta Gurugram ICU\nIncoming trauma patient.\nBlood: O+ · Allergy: Penicillin\nETA: 25 min · Amb: Medlife #M-14' },
  { type: 'in', delay: 9000, text: '✅ MEDANTA RECEIVED\nTrauma bay 3 prepared.\nBlood cross-match initiated.\nDr. Sharma on standby.' },
];

function playSMSDemo() {
  if (smsRunning) return;
  smsRunning = true;
  const thread = document.getElementById('sms-thread');
  const steps = document.querySelectorAll('.sms-step-item');
  const btn = document.getElementById('sms-play-btn');
  if (!thread) return;
  thread.innerHTML = '';
  if (btn) btn.textContent = '⏳ Running...';
  steps.forEach(s => s.classList.remove('done', 'active-step'));

  smsMessages.forEach((msg, i) => {
    setTimeout(() => {
      const stepIdx = [0, 1, 2, 3, 4, 5, 6][i] || i;
      steps.forEach((s, si) => {
        s.classList.remove('active-step');
        if (si < stepIdx) s.classList.add('done');
        if (si === stepIdx) s.classList.add('active-step');
      });

      const wrap = document.createElement('div');
      wrap.innerHTML = `<div class="sms-bubble ${msg.type}">${msg.text.replace(/\n/g, '<br/>')}</div><div class="sms-meta" style="text-align:${msg.type==='out'?'right':'left'}">${new Date().toLocaleTimeString()}</div>`;
      thread.appendChild(wrap);
      thread.scrollTop = thread.scrollHeight;

      if (i === smsMessages.length - 1) {
        steps.forEach(s => s.classList.add('done'));
        if (btn) btn.textContent = '▶ Play Again';
        smsRunning = false;
      }
    }, msg.delay);
  });
}

// ============ MEDICAL ID GENERATOR ============
let currentMedID = null;

function generateMedID() {
  const blood = document.getElementById('mid-blood')?.value || 'O+';
  const donor = document.getElementById('mid-donor')?.value || 'Yes';
  const allergy = document.getElementById('mid-allergy')?.value || 'None';
  const conditions = document.getElementById('mid-conditions')?.value || 'None';
  const contact1 = document.getElementById('mid-contact1')?.value || 'Not provided';
  const contact2 = document.getElementById('mid-contact2')?.value || 'Not provided';
  const meds = document.getElementById('mid-meds')?.value || 'None';

  currentMedID = { blood, donor, allergy, conditions, contact1, contact2, meds };

  const card = document.getElementById('medid-card');
  const qrBtn = document.getElementById('medid-qr-btn');
  if (!card) return;

  card.innerHTML = `
    <div class="medid-card-header">
      <div class="medid-card-logo">🛑 GoodStop Medical ID</div>
      <div class="medid-card-emergency">EMERGENCY</div>
    </div>
    <div class="medid-blood-group">${blood}</div>
    <div class="medid-info-grid">
      <div class="medid-info-item">
        <div class="medid-info-label">Organ Donor</div>
        <div class="medid-info-value">${donor}</div>
      </div>
      <div class="medid-info-item">
        <div class="medid-info-label">Medications</div>
        <div class="medid-info-value">${meds}</div>
      </div>
      <div class="medid-info-item">
        <div class="medid-info-label">Drug Allergies</div>
        <div class="medid-info-value danger">${allergy || 'None'}</div>
      </div>
      <div class="medid-info-item">
        <div class="medid-info-label">Conditions</div>
        <div class="medid-info-value">${conditions || 'None'}</div>
      </div>
    </div>
    <div class="medid-contacts">
      <div class="medid-contacts-label">Emergency Contacts</div>
      <div class="medid-contact-line">1. ${contact1}</div>
      <div class="medid-contact-line">2. ${contact2}</div>
    </div>
    <div style="position:absolute;bottom:14px;right:14px;font-size:0.6rem;color:rgba(255,255,255,0.25);">GoodStop ID · ${new Date().toLocaleDateString()} · Tap QR to view offline</div>
  `;

  if (qrBtn) qrBtn.style.display = 'block';
}

function showQR() {
  document.getElementById('qr-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  drawQRCode();
}

function closeQRModal(e) {
  if (!e || e.target === document.getElementById('qr-modal')) {
    document.getElementById('qr-modal').classList.remove('open');
    document.body.style.overflow = '';
  }
}

function drawQRCode() {
  const canvas = document.getElementById('qr-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 200, H = 200;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  // Draw a simulated QR pattern
  const cell = 8;
  const cols = Math.floor(W / cell);
  const rows = Math.floor(H / cell);

  // Seed from medical data
  const seed = (currentMedID?.blood || 'O+').charCodeAt(0) + 42;

  function pseudo(x, y) {
    return ((x * 137 + y * 241 + seed * 17) % 3) === 0;
  }

  ctx.fillStyle = '#000000';

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pseudo(c, r)) {
        ctx.fillRect(c * cell, r * cell, cell - 1, cell - 1);
      }
    }
  }

  // Corner markers
  [0, 1, 2].forEach(corner => {
    const bx = corner === 2 ? W - 7 * cell : 0;
    const by = corner === 1 ? H - 7 * cell : 0;
    if (corner === 2 && by !== 0) return;
    ctx.fillStyle = '#000';
    ctx.fillRect(bx, by, 7 * cell, 7 * cell);
    ctx.fillStyle = '#fff';
    ctx.fillRect(bx + cell, by + cell, 5 * cell, 5 * cell);
    ctx.fillStyle = '#000';
    ctx.fillRect(bx + 2 * cell, by + 2 * cell, 3 * cell, 3 * cell);
  });

  // GoodStop watermark
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.font = 'bold 10px Inter';
  ctx.textAlign = 'center';
  ctx.fillText('GoodStop Medical ID', W / 2, H - 4);
}

// ============ VOICE SOS ============
function triggerVoiceSOS() {
  const modal = document.getElementById('voice-modal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  simulateVoice();
}

function closeVoiceModal(e) {
  if (!e || e.target === document.getElementById('voice-modal')) {
    document.getElementById('voice-modal').classList.remove('open');
    document.body.style.overflow = '';
    stopVoice();
  }
}

let voiceTimer = null;
const voicePhrases = [
  "Accident on highway",
  "Help, there's a crash",
  "Emergency, someone is hurt"
];

function simulateVoice() {
  // Try real speech recognition first
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = 'en-IN';
    rec.continuous = false;
    rec.interimResults = true;
    rec.start();
    const transcript = document.getElementById('voice-transcript');
    const status = document.getElementById('voice-status');
    const orb = document.getElementById('voice-orb');

    rec.onresult = (e) => {
      const text = e.results[0][0].transcript;
      if (transcript) transcript.textContent = '"' + text + '"';
      const lower = text.toLowerCase();
      if (lower.includes('accident') || lower.includes('crash') || lower.includes('hurt') || lower.includes('emergency') || lower.includes('help')) {
        if (orb) orb.classList.add('detected');
        if (status) status.textContent = '✅ Emergency detected! Dispatching...';
        setTimeout(() => {
          closeVoiceModal();
          openBystander();
        }, 1500);
      }
    };
    rec.onerror = () => startSimulatedVoice();
    window._voiceRec = rec;
    return;
  }
  startSimulatedVoice();
}

function startSimulatedVoice() {
  const status = document.getElementById('voice-status');
  const transcript = document.getElementById('voice-transcript');
  const orb = document.getElementById('voice-orb');

  let i = 0;
  const chars = '"Accident on highway..."';
  voiceTimer = setInterval(() => {
    i++;
    if (transcript) transcript.textContent = chars.substring(0, i);
    if (i >= chars.length) {
      clearInterval(voiceTimer);
      if (orb) orb.classList.add('detected');
      if (status) status.textContent = '✅ Emergency detected! Opening report...';
      setTimeout(() => {
        closeVoiceModal();
        openBystander();
      }, 1500);
    }
  }, 60);
}

function stopVoice() {
  clearInterval(voiceTimer);
  if (window._voiceRec) { try { window._voiceRec.stop(); } catch(e) {} }
  const orb = document.getElementById('voice-orb');
  if (orb) orb.classList.remove('detected');
  const status = document.getElementById('voice-status');
  if (status) status.textContent = 'Listening for emergency phrase...';
  const t = document.getElementById('voice-transcript');
  if (t) t.textContent = '';
}

// ============================================================
// GOLDEN HOUR INJURY GUIDE
// ============================================================
const GUIDE_DATA = [
  {
    title: "🚫 Don't Move the Victim",
    badge: "CRITICAL — Spinal Risk",
    badgeClass: "danger",
    icon: "🚫",
    anim: "stop",
    steps: [
      { title: "Stay calm and assess", desc: "Look before touching. Is the scene safe? Traffic, fire, live wires?" },
      { title: "Don't drag or lift", desc: "Spinal cord injuries can worsen dramatically with any movement. Leave them exactly where they are." },
      { title: "Support their head only if needed", desc: "If they're in water or immediate danger, hold head & neck in line and move as one unit slowly." },
      { title: "Keep them still until paramedics arrive", desc: "Your job is to keep them still and conscious — not to carry them." },
    ],
    barWidth: "90%"
  },
  {
    title: "💬 Keep the Victim Conscious",
    badge: "ESSENTIAL — Talk to them",
    badgeClass: "",
    icon: "💬",
    anim: "talk",
    steps: [
      { title: "Speak loudly and clearly", desc: "\"My name is [X]. I've called for help. You're going to be okay.\" Repeat every 30 seconds." },
      { title: "Ask simple questions", desc: "\"Can you hear me? What's your name? Where does it hurt?\" This prevents them slipping into unconsciousness." },
      { title: "Maintain eye contact", desc: "Look at them directly. If they close eyes, say their name loudly. Tap shoulder gently (not neck)." },
      { title: "Keep crowd back", desc: "Prevent people from crowding. Lack of air and stimulation worsens shock." },
    ],
    barWidth: "75%"
  },
  {
    title: "🩸 Control Bleeding",
    badge: "CRITICAL — Act within 3 min",
    badgeClass: "danger",
    icon: "🩸",
    anim: "pressure",
    steps: [
      { title: "Apply firm pressure immediately", desc: "Use cloth, shirt, jacket — anything. Press hard and don't release. Maintain constant pressure." },
      { title: "Don't remove the cloth if soaked", desc: "Add more cloth on top. Removing the first layer disrupts clot formation and worsens bleeding." },
      { title: "Elevate the limb if possible", desc: "For arm/leg wounds, raise above heart level if no bone injury suspected." },
      { title: "Never use a tourniquet unless trained", desc: "Improperly applied tourniquets can cause limb loss. Maintain direct pressure instead." },
    ],
    barWidth: "95%"
  },
  {
    title: "❤️ CPR (Compression Only)",
    badge: "Life-Saving — No Training Needed",
    badgeClass: "warning",
    icon: "❤️",
    anim: "cpr",
    steps: [
      { title: "Confirm unresponsiveness", desc: "Tap shoulder and shout. No response + not breathing normally = begin CPR immediately." },
      { title: "Position your hands", desc: "Place heel of hand on centre of chest (on breastbone). Second hand on top, fingers interlaced." },
      { title: "Push hard and fast", desc: "Compress chest 5-6cm deep at 100–120 per minute. Let chest fully rise between compressions." },
      { title: "Compression-only is OK", desc: "For bystanders without training: skip rescue breaths. Just do continuous chest compressions until help arrives." },
    ],
    barWidth: "99%"
  },
  {
    title: "🔥 Burns First Aid",
    badge: "IMPORTANT — Cool it immediately",
    badgeClass: "warning",
    icon: "🔥",
    anim: "cool",
    steps: [
      { title: "Cool with running water 20 min", desc: "Use cool (not cold/iced) water. Running water is essential. Do not use butter, toothpaste or oil." },
      { title: "Remove clothing near burn", desc: "Remove jewellery, belts near the burn area unless they are stuck to skin." },
      { title: "Do not break blisters", desc: "Intact blisters protect against infection. Breaking them increases risk of serious infection." },
      { title: "Cover loosely with cling wrap", desc: "Wrap lightly to protect. Don't wrap tightly. Do not use fluffy cotton wool." },
    ],
    barWidth: "70%"
  },
  {
    title: "😮 Unconscious but Breathing",
    badge: "URGENT — Recovery Position",
    badgeClass: "danger",
    icon: "😮",
    anim: "recovery",
    steps: [
      { title: "Check breathing for 10 seconds", desc: "Look for chest movement. Listen for breath. If breathing: do NOT start CPR." },
      { title: "Place in recovery position", desc: "Turn them onto their side gently (if no spinal injury suspected). Bend top knee to stabilise." },
      { title: "Open and clear airway", desc: "Tilt head back gently, lift chin. Look inside mouth for obvious blockage. Do not remove what you can't see." },
      { title: "Monitor continuously until help arrives", desc: "Watch breathing every 60 seconds. If they stop breathing, begin CPR immediately." },
    ],
    barWidth: "88%"
  }
];

let currentGuide = 0;

function showGuide(idx) {
  currentGuide = idx;
  const content = document.getElementById('guide-content');
  const progressBar = document.getElementById('guide-progress-bar');
  if (!content) return;

  document.querySelectorAll('.guide-tab').forEach((b, i) => b.classList.toggle('active', i === idx));
  if (progressBar) progressBar.style.width = ((idx + 1) / GUIDE_DATA.length * 100) + '%';

  const g = GUIDE_DATA[idx];

  // Build animation area based on type
  let animHTML = '';
  if (g.anim === 'cpr') {
    animHTML = `<div class="cpr-animation" style="width:90px;height:90px;border:3px solid var(--accent-red);">
      <span style="font-size:2.5rem">❤️</span>
    </div>
    <div style="font-size:0.75rem;color:var(--accent-red);font-weight:700;letter-spacing:0.05em;">100-120 BPM</div>`;
  } else if (g.anim === 'stop') {
    animHTML = `<div style="width:90px;height:90px;border-radius:50%;background:rgba(255,71,87,0.15);border:3px solid var(--accent-red);display:flex;align-items:center;justify-content:center;font-size:3rem;animation:guideIconPulse 1.5s ease infinite">🚫</div>`;
  } else if (g.anim === 'pressure') {
    animHTML = `<div style="position:relative;width:90px;height:90px">
      <div style="position:absolute;inset:0;border-radius:50%;background:rgba(255,71,87,0.1);animation:cprPump 1.5s ease infinite;display:flex;align-items:center;justify-content:center;font-size:2.5rem;border:2px solid var(--accent-red)">🩸</div>
    </div>
    <div style="font-size:0.72rem;color:var(--accent-red);font-weight:700">PRESS HARD — DON'T STOP</div>`;
  } else {
    animHTML = `<div style="font-size:4.5rem;animation:guideIconPulse 2s ease infinite">${g.icon}</div>`;
  }

  content.innerHTML = `
    <div class="guide-card">
      <div class="guide-animation-area">
        <div class="guide-anim-badge ${g.badgeClass}">${g.badge}</div>
        ${animHTML}
        <div class="guide-visual-bar" style="width:100%;max-width:180px">
          <div class="guide-visual-fill" style="width:0%" id="guide-fill-bar"></div>
        </div>
      </div>
      <div class="guide-steps-area">
        <h3 style="font-family:var(--font-display);font-size:1.2rem;font-weight:800;color:var(--text-primary);margin-bottom:4px">${g.title}</h3>
        ${g.steps.map((s, si) => `
          <div class="guide-step-item" style="animation-delay:${si * 0.1}s;animation:guideFade 0.35s ease ${si * 0.08}s both">
            <div class="guide-step-num">${si + 1}</div>
            <div class="guide-step-text">
              <strong>${s.title}</strong>
              ${s.desc}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Animate the fill bar
  setTimeout(() => {
    const fill = document.getElementById('guide-fill-bar');
    if (fill) fill.style.width = g.barWidth;
  }, 200);
}

// Init guide on load
window.addEventListener('DOMContentLoaded', () => {
  const guideSection = document.getElementById('guide');
  if (guideSection) {
    const guideObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        showGuide(0);
        guideObs.disconnect();
      }
    }, { threshold: 0.2 });
    guideObs.observe(guideSection);
  }
});

// ============================================================
// PANIC MODE
// ============================================================
let panicHoldTimer = null;
let panicStartTime = null;
let panicFired = false;
const PANIC_HOLD_MS = 3000;

function initPanicMode() {
  if (panicFired) return;
  panicFired = true;

  // Build the full-screen overlay
  const overlay = document.createElement('div');
  overlay.className = 'panic-active-overlay';
  overlay.id = 'panic-overlay';
  overlay.innerHTML = `
    <div class="panic-overlay-icon">🆘</div>
    <div class="panic-overlay-title">PANIC MODE ACTIVE</div>
    <div class="panic-overlay-sub">Dispatching all emergency services simultaneously...</div>
    <div class="panic-overlay-actions" id="overlay-actions">
      <div class="panic-overlay-action" id="oa-sms" style="animation-delay:0s">📡 Sending SMS to 108...</div>
      <div class="panic-overlay-action" id="oa-loc" style="animation-delay:0.2s">📍 Sharing live location...</div>
      <div class="panic-overlay-action" id="oa-fam" style="animation-delay:0.4s">👨‍👩‍👧 Alerting family...</div>
      <div class="panic-overlay-action" id="oa-call" style="animation-delay:0.6s">📞 Dialing 108...</div>
    </div>
    <button class="panic-dismiss-btn" onclick="dismissPanic()">✕ Cancel Emergency</button>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  // Fire actions sequentially
  const actions = [
    { id: 'oa-sms', delay: 600, label: '✅ SMS Sent to 108', fn: () => {
        try { sendRealSMS && sendRealSMS(); } catch(e) {}
        updatePanicCard('pac-sms', 'Sent ✅');
      }
    },
    { id: 'oa-loc', delay: 1200, label: '✅ Live location shared', fn: () => {
        try { shareEmergency && shareEmergency(); } catch(e) {}
        updatePanicCard('pac-share', 'Shared ✅');
      }
    },
    { id: 'oa-fam', delay: 1800, label: '✅ Family contacts alerted', fn: () => {
        try { sendBrowserNotification && sendBrowserNotification('🆘 PANIC MODE', 'Emergency activated — your location is being shared.'); } catch(e) {}
        updatePanicCard('pac-notify', 'Alerted ✅');
        showReputationBadge(true);
      }
    },
    { id: 'oa-call', delay: 2600, label: '📞 Opening dialer...', fn: () => {
        updatePanicCard('pac-call', 'Calling... ✅');
      }
    },
  ];

  actions.forEach(a => {
    setTimeout(() => {
      const el = document.getElementById(a.id);
      if (el) { el.textContent = a.label; el.classList.add('active'); }
      a.fn();
    }, a.delay);
  });

  // Auto dismiss after 4s and open bystander flow
  setTimeout(() => {
    dismissPanic();
    openBystander();
  }, 4200);
}

function updatePanicCard(id, status) {
  const card = document.getElementById(id);
  if (!card) return;
  card.classList.add('done');
  const st = card.querySelector('.pac-status');
  if (st) st.textContent = status;
}

function dismissPanic() {
  const overlay = document.getElementById('panic-overlay');
  if (overlay) overlay.remove();
  document.body.style.overflow = '';
  panicFired = false;
  // Reset panic button cards
  ['pac-sms','pac-share','pac-notify','pac-call'].forEach(id => {
    const c = document.getElementById(id);
    if (c) {
      c.classList.remove('done','firing');
      const st = c.querySelector('.pac-status');
      if (st) st.textContent = 'Ready';
    }
  });
}

// Panic countdown on mousedown/touchstart
window.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('panic-btn');
  if (!btn) return;

  function startHold() {
    panicStartTime = Date.now();
    const circle = document.getElementById('panic-circle');
    const totalDash = 289;

    panicHoldTimer = setInterval(() => {
      const elapsed = Date.now() - panicStartTime;
      const progress = Math.min(elapsed / PANIC_HOLD_MS, 1);
      if (circle) circle.style.strokeDashoffset = totalDash * (1 - progress);

      if (progress >= 1) {
        clearInterval(panicHoldTimer);
        initPanicMode();
      }
    }, 50);
  }

  function cancelHold() {
    clearInterval(panicHoldTimer);
    const circle = document.getElementById('panic-circle');
    if (circle) circle.style.strokeDashoffset = 289;
  }

  btn.addEventListener('mousedown', startHold);
  btn.addEventListener('touchstart', startHold, { passive: true });
  btn.addEventListener('mouseup', cancelHold);
  btn.addEventListener('mouseleave', cancelHold);
  btn.addEventListener('touchend', cancelHold);

  // Override click to prevent instant fire (require hold)
  btn.setAttribute('onclick', '');
});

// Initialize crowd witness
window.addEventListener('DOMContentLoaded', () => {
  initCrowdWitness();
  initIncidentTimeline();
  addBroadcastFAB();
});

// ============================================================
// CROWD WITNESS INTELLIGENCE
// ============================================================
function initCrowdWitness() {
  const countEl = document.getElementById('witness-count');
  const barsEl = document.getElementById('witness-bars');
  const confEl = document.getElementById('witness-confidence');
  if (!countEl) return;

  const witnesses = [
    { label: 'Collision severity', pct: 82, color: '#ff4757' },
    { label: 'Persons injured', pct: 67, color: '#ffb800' },
    { label: 'Road access clear', pct: 91, color: '#00e896' },
    { label: 'Fire/smoke visible', pct: 12, color: '#0091ff' },
  ];

  // Animate count ticker
  let n = 0;
  const target = Math.floor(3 + Math.random() * 5);
  const ticker = setInterval(() => {
    n++;
    if (countEl) countEl.textContent = `${n} nearby bystander${n > 1 ? 's' : ''} reported this incident`;
    if (n >= target) clearInterval(ticker);
  }, 400);

  // Render witness bars
  if (barsEl) {
    barsEl.innerHTML = witnesses.map(w => `
      <div class="witness-bar-row">
        <div class="witness-bar-label">${w.label}</div>
        <div class="witness-bar-track">
          <div class="witness-bar-fill" style="width:0%;background:${w.color}" data-target="${w.pct}"></div>
        </div>
        <div style="font-size:0.68rem;color:var(--text-muted);width:32px;text-align:right">${w.pct}%</div>
      </div>
    `).join('');

    setTimeout(() => {
      barsEl.querySelectorAll('.witness-bar-fill').forEach(el => {
        el.style.width = el.dataset.target + '%';
      });
    }, 500);
  }

  // Confidence score
  const avgConf = Math.round(witnesses.reduce((a, w) => a + w.pct, 0) / witnesses.length);
  setTimeout(() => {
    if (confEl) confEl.textContent = `Confidence: ${avgConf}% — Auto-upgrading to ALS dispatch`;
  }, 1500);

  // Live update every 8s
  setInterval(() => {
    if (!countEl) return;
    const current = parseInt(countEl.textContent) || target;
    const newN = Math.min(current + (Math.random() < 0.4 ? 1 : 0), 12);
    countEl.textContent = `${newN} nearby bystander${newN > 1 ? 's' : ''} reported this incident`;
  }, 8000);
}

// ============================================================
// INCIDENT TIMELINE
// ============================================================
const TIMELINE_EVENTS = [
  { time: '0:00', icon: '👆', title: 'Incident Reported', desc: 'Bystander tapped "I see an accident". GPS locked ±5m accuracy.', badge: 'ANONYMOUS', badgeClass: '' },
  { time: '0:03', icon: '📍', title: 'Location Confirmed', desc: 'Coordinates verified: NH-48, km 28.4, Gurugram. Address geocoded.', badge: 'GPS LOCKED', badgeClass: '' },
  { time: '0:07', icon: '🛡️', title: 'Legal Protection Shown', desc: 'Good Samaritan Law (MV Act §134A) displayed. Bystander confirmed.', badge: 'PROTECTED', badgeClass: '' },
  { time: '0:14', icon: '🤖', title: 'AI Severity Analysis', desc: 'AI classified: CRITICAL. Person unconscious, 2+ casualties estimated.', badge: 'CRITICAL', badgeClass: 'critical' },
  { time: '0:22', icon: '⚡', title: 'Private Ambulance Dispatched', desc: 'Medlife #M-14 (ALS). ETA: 9 min. Govt Amb bypassed (34 min).', badge: '9 MIN ETA', badgeClass: '' },
  { time: '0:31', icon: '🏥', title: 'Medanta Hospital Pre-alerted', desc: 'Medical ID transmitted: Blood O+, Allergy: Penicillin. Trauma bay 3 prepared.', badge: 'HOSPITAL READY', badgeClass: '' },
  { time: '0:47', icon: '👨‍👩‍👧', title: 'Family Notified', desc: '3 emergency contacts received live tracking link. 2 opened link.', badge: 'FAMILY ALERTED', badgeClass: '' },
  { time: '9:00', icon: '🚑', title: 'Ambulance On Scene', desc: 'Medlife #M-14 arrived. Paramedics took over. Scene secured.', badge: 'ARRIVED', badgeClass: '' },
  { time: '12:00', icon: '🏁', title: 'Patient En Route to Hospital', desc: 'Patient stabilized and en route to Medanta. Doctor briefed. 26 min saved vs 112.', badge: '26 MIN SAVED', badgeClass: '' },
];

let timelineRunning = false;

function initIncidentTimeline() {
  const track = document.getElementById('timeline-track');
  if (!track) return;
  track.innerHTML = TIMELINE_EVENTS.map((e, i) => `
    <div class="tl-event" id="tl-${i}">
      <div class="tl-dot ${e.badgeClass}">${e.icon}</div>
      <div class="tl-body">
        <div class="tl-time">${e.time}</div>
        <div class="tl-title">${e.title}</div>
        <div class="tl-desc">${e.desc}</div>
        <span class="tl-badge ${e.badgeClass}">${e.badge}</span>
      </div>
    </div>
  `).join('');
}

function replayTimeline() {
  if (timelineRunning) return;
  timelineRunning = true;
  const btn = document.getElementById('tl-replay-btn');
  if (btn) btn.textContent = '⏳ Replaying...';

  // Reset
  document.querySelectorAll('.tl-event').forEach(el => el.classList.remove('visible'));
  const totalEl = document.getElementById('tl-total-time');
  const eventsEl = document.getElementById('tl-events');
  if (totalEl) totalEl.textContent = '0:00';
  if (eventsEl) eventsEl.textContent = '0';

  const delays = [0, 400, 700, 1100, 1500, 2000, 2500, 3200, 4200];
  TIMELINE_EVENTS.forEach((e, i) => {
    setTimeout(() => {
      const el = document.getElementById(`tl-${i}`);
      if (el) el.classList.add('visible');
      if (totalEl) totalEl.textContent = e.time;
      if (eventsEl) eventsEl.textContent = i + 1;
      if (i === TIMELINE_EVENTS.length - 1) {
        timelineRunning = false;
        if (btn) btn.textContent = '▶ Replay Again';
        showReputationBadge(false);
      }
    }, delays[i] || i * 500);
  });
}

// Trigger timeline replay when it enters viewport
window.addEventListener('DOMContentLoaded', () => {
  const tlSection = document.getElementById('timeline');
  if (tlSection) {
    const tlObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        replayTimeline();
        tlObs.disconnect();
      }
    }, { threshold: 0.2 });
    tlObs.observe(tlSection);
  }
});

function downloadTimeline() {
  const lines = TIMELINE_EVENTS.map(e => `[${e.time}] ${e.title} — ${e.desc}`).join('\n');
  const txt = `GOODSTOP INCIDENT TIMELINE\n===========================\nGenerated: ${new Date().toLocaleString()}\nIncident: NH-48, km 28.4, Gurugram\n\n${lines}\n\n--- Generated by GoodStop Emergency App ---`;
  const blob = new Blob([txt], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'GoodStop-Incident-Timeline.txt';
  a.click();
  try { showToast('⬇ Timeline downloaded as text file!'); } catch(e) {}
}

// ============================================================
// BYSTANDER REPUTATION SYSTEM
// ============================================================
let repCount = parseInt(localStorage.getItem('goodstop_rep') || '0');

function showReputationBadge(isPanic) {
  repCount++;
  try { localStorage.setItem('goodstop_rep', repCount); } catch(e) {}

  let existing = document.getElementById('rep-badge');
  if (existing) existing.remove();

  const badge = document.createElement('div');
  badge.id = 'rep-badge';
  badge.className = 'reputation-badge';
  badge.innerHTML = `
    <div class="rep-icon">🏅</div>
    <div class="rep-text">
      <div class="rep-title">+1 Life Assist${isPanic ? ' (Panic Save)' : ''}</div>
      <div class="rep-sub">You've helped ${repCount} incident${repCount > 1 ? 's' : ''} this session</div>
      <div class="rep-stars">${'⭐'.repeat(Math.min(repCount, 5))}</div>
    </div>
  `;
  badge.onclick = () => badge.classList.remove('show');
  document.body.appendChild(badge);

  setTimeout(() => badge.classList.add('show'), 100);
  setTimeout(() => badge.classList.remove('show'), 5000);
}

// ============================================================
// EMERGENCY BROADCAST FAB
// ============================================================
function addBroadcastFAB() {
  if (document.getElementById('broadcast-fab')) return;
  const fab = document.createElement('button');
  fab.id = 'broadcast-fab';
  fab.className = 'broadcast-fab';
  fab.title = 'Emergency Broadcast';
  fab.innerHTML = `📢<span class="broadcast-fab-tooltip">Emergency Broadcast</span>`;
  fab.onclick = broadcastEmergency;
  document.body.appendChild(fab);
}

function broadcastEmergency() {
  const lat = (typeof realGPS !== 'undefined' && realGPS) ? realGPS.lat.toFixed(5) : '28.45950';
  const lng = (typeof realGPS !== 'undefined' && realGPS) ? realGPS.lng.toFixed(5) : '77.02660';
  const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;
  const waText = encodeURIComponent(`🆘 *ROAD ACCIDENT EMERGENCY*\n\nLocation: ${lat}°N, ${lng}°E\nMap: ${mapsUrl}\n\nPlease call 108 or emergency services immediately.\n\n_Sent via GoodStop Emergency App_`);
  const waUrl = `https://api.whatsapp.com/send?text=${waText}`;

  // Show a mini modal
  const existing = document.getElementById('broadcast-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'broadcast-modal';
  modal.style.cssText = `position:fixed;bottom:150px;left:24px;z-index:9999;background:var(--bg-700);border:1px solid rgba(0,232,150,0.25);border-radius:var(--radius-xl);padding:20px;width:280px;box-shadow:0 16px 48px rgba(0,0,0,0.5);animation:toastIn 0.3s ease`;
  modal.innerHTML = `
    <div style="font-weight:800;font-size:0.9rem;color:var(--text-primary);margin-bottom:12px">📢 Emergency Broadcast</div>
    <div style="font-size:0.75rem;color:var(--text-secondary);margin-bottom:14px">Share this emergency to all your contacts instantly</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button onclick="window.open('${waUrl}','_blank')" class="whatsapp-share-btn">
        <span>📱</span> Share on WhatsApp
      </button>
      <button onclick="(typeof shareEmergency !== 'undefined') && shareEmergency()" style="padding:10px;background:rgba(0,145,255,0.1);border:1px solid rgba(0,145,255,0.3);color:#0091ff;border-radius:var(--radius-md);font-size:0.82rem;font-weight:700;cursor:pointer;font-family:Inter,sans-serif">
        🌐 Native Share API
      </button>
      <button onclick="copyBroadcastText()" style="padding:10px;background:rgba(0,232,150,0.06);border:1px solid rgba(0,232,150,0.2);color:var(--accent-green);border-radius:var(--radius-md);font-size:0.82rem;font-weight:700;cursor:pointer;font-family:Inter,sans-serif">
        📋 Copy Emergency Text
      </button>
    </div>
    <button onclick="document.getElementById('broadcast-modal').remove()" style="position:absolute;top:10px;right:14px;background:none;border:none;color:var(--text-muted);font-size:1.1rem;cursor:pointer">×</button>
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.remove(), 15000);
}

function copyBroadcastText() {
  const lat = (typeof realGPS !== 'undefined' && realGPS) ? realGPS.lat.toFixed(5) : '28.45950';
  const lng = (typeof realGPS !== 'undefined' && realGPS) ? realGPS.lng.toFixed(5) : '77.02660';
  const text = `🆘 ROAD ACCIDENT EMERGENCY\nLocation: ${lat}°N, ${lng}°E\nMap: https://maps.google.com/?q=${lat},${lng}\nPlease call 108 immediately.\nSent via GoodStop Emergency App`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => { try { showToast('📋 Emergency text copied!'); } catch(e) {} });
  }
}

// ============================================================
// IMPROVED CHATBOT (NO API KEY PROMPT — LOCAL FALLBACK)
// ============================================================
// Extended local knowledge base (used when no OpenAI key)
const extendedChatDB = {
  'cpr': `**CPR — Compression-Only Method (No Training Needed)**\n\n1. ✋ Place heel of hand on centre of chest\n2. Push **hard** (5-6cm deep) at **100-120 per minute**\n3. Let chest fully rise between compressions\n4. Don't stop until paramedics arrive\n\n⚠ For untrained bystanders: **skip rescue breaths** — compressions alone save lives!`,
  'how do i do cpr': `**CPR — Compression-Only Method (No Training Needed)**\n\n1. ✋ Place heel of hand on centre of chest\n2. Push **hard** (5-6cm deep) at **100-120 per minute**\n3. Let chest fully rise between compressions\n4. Don't stop until paramedics arrive\n\n⚠ For untrained bystanders: **skip rescue breaths** — compressions alone save lives!`,
  'bleeding': `**Controlling Bleeding:**\n\n1. 🩸 Apply **firm, constant pressure** with any cloth\n2. **Don't remove** the cloth if soaked — add more on top\n3. Elevate the limb above heart level if possible\n4. **Never** use a tourniquet unless you're trained\n\nMaintain pressure until ambulance arrives.`,
  'accident near me': `GoodStop is dispatching help now! 🚨\n\n**Immediate actions:**\n1. 📍 Your GPS has been captured\n2. 🛡️ You're protected under Good Samaritan Law\n3. 🚑 Fastest ambulance is being dispatched\n\n**While you wait:**\n- Don't move the victim\n- Talk to them to keep conscious\n- Keep crowd back (3m clearance)`,
  'am i legally safe': `✅ **YES — You are fully protected!**\n\nUnder **Motor Vehicles Amendment Act 2019, §134A:**\n- You **cannot be arrested** or detained\n- You **cannot be summoned** to court without consent\n- You **cannot be held liable** if the victim worsens\n\n📋 Screenshot the legal screen in GoodStop for proof.`,
  'what should i do': `**Three safe actions — no training needed:**\n\n1. 🚫 **Don't move them** — Spinal injuries can worsen\n2. 💬 **Talk to them** — Ask their name, keep conscious\n3. 🧑‍🤝‍🧑 **Keep crowd back** — Clear 3m for ambulance\n\nGoodStop has already dispatched the fastest ambulance. 🛡️`,
  'call ambulance': `**Done! GoodStop has:**\n\n🚑 **Dispatched** Medlife Private Ambulance — ETA **9 minutes**\n🏥 **Pre-alerted** Hospital with location + severity\n📲 **Notified** victim's emergency contacts\n📡 **SMS backup** sent via 2G fallback\n\n⚠ Do NOT call 108 separately — private ambulance is 25 min faster!`,
  'मैं क्या करूं': `🛡️ **आप कानूनी रूप से सुरक्षित हैं** — मोटर वाहन अधिनियम §134A\n🚑 **एम्बुलेंस भेज दी गई** — 9 मिनट में आएगी\n\n**अभी 3 काम करें:**\n1. पीड़ित को हिलाएं नहीं\n2. उनसे बात करते रहें\n3. भीड़ को दूर रखें\n\nआप सही काम कर रहे हैं! 🙏`,
  'burns': `**Burns First Aid:**\n\n1. 💧 Cool with **running water for 20 minutes** (not ice)\n2. Remove clothing/jewellery **near** the burn (not stuck skin)\n3. **Don't break blisters** — infection risk\n4. Cover loosely with cling wrap or clean cloth\n\n❌ Never use butter, oil, or toothpaste on burns`,
  'unconscious': `**Unconscious but Breathing:**\n\n1. Check breathing for 10 seconds\n2. Place in **recovery position** (on their side)\n3. Open airway — tilt head back, lift chin\n4. Monitor every 60 seconds\n\n⚠️ If they STOP breathing → begin CPR immediately`,
};

// Smart local fallback (no API key needed for hackathon demo)
function getLocalChatResponse(text) {
  const lower = text.toLowerCase();
  for (const [key, val] of Object.entries(extendedChatDB)) {
    if (lower.includes(key)) return val;
  }
  return chatResponses?.default || `I can help with:\n\n🛡️ **Legal protection** — Good Samaritan laws\n🚑 **Emergency routing** — AI ambulance dispatch\n💬 **First aid** — CPR, bleeding, burns\n🌍 **Multilingual** — Hindi, Bengali, Thai\n\nWhat do you need right now?`;
}

// Override sendChatMessage ONLY if no OpenAI key saved
const _origSendChatMessage = window.sendChatMessage;
if (!localStorage.getItem('goodstop_openai_key')) {
  window.sendChatMessage = function(text) {
    const msgs = document.getElementById('chat-messages');
    if (!msgs) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg chat-msg--user';
    userMsg.innerHTML = `<div class="chat-bubble">${text}</div>`;
    msgs.appendChild(userMsg);

    const typing = document.createElement('div');
    typing.className = 'chat-msg chat-msg--bot';
    typing.innerHTML = `<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
    msgs.appendChild(typing);
    msgs.scrollTop = msgs.scrollHeight;

    const response = getLocalChatResponse(text);
    setTimeout(() => {
      typing.remove();
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-msg chat-msg--bot';
      botMsg.innerHTML = `<div class="chat-bubble">${response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')}</div>`;
      msgs.appendChild(botMsg);
      msgs.scrollTop = msgs.scrollHeight;
    }, 900 + Math.random() * 500);
  };
}

// ============================================================
// LIVE HOSPITAL BED ANIMATION
// ============================================================
function animateHospitalBeds() {
  const bars = document.querySelectorAll('.hospital-bar');
  bars.forEach(bar => {
    const width = parseFloat(bar.style.width || 50);
    if (width > 80) bar.classList.add('pulsing');

    // Slowly increment capacity
    setInterval(() => {
      const current = parseFloat(bar.style.width || 50);
      const delta = (Math.random() - 0.3) * 2;
      const newW = Math.max(30, Math.min(99, current + delta));
      bar.style.width = newW + '%';

      const pct = bar.closest('.hospital-item')?.querySelector('.hospital-pct');
      if (pct) pct.textContent = Math.round(newW) + '%';

      bar.classList.toggle('pulsing', newW > 80);
      bar.className = bar.className.replace(/\b(low|mid|high)\b/g, '');
      bar.classList.add(newW > 80 ? 'high' : newW > 60 ? 'mid' : 'low');
    }, 5000);
  });
}

// Patch renderHospitals to also trigger animation
const _origRenderHospitals = window.renderHospitals;
window.renderHospitals = function() {
  if (typeof _origRenderHospitals === 'function') _origRenderHospitals();
  setTimeout(animateHospitalBeds, 300);
};

// ============================================================
// AUTO-INIT ALL NEW FEATURES
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  // Render timeline on load
  initIncidentTimeline();
  // Add WhatsApp button to SMS section after play
  const smsWrap = document.querySelector('.sms-info-wrap');
  if (smsWrap && !document.getElementById('wa-share-btn')) {
    const waBtn = document.createElement('button');
    waBtn.id = 'wa-share-btn';
    waBtn.className = 'whatsapp-share-btn';
    waBtn.style.cssText = 'width:100%;margin-top:10px;padding:13px;justify-content:center;font-size:0.95rem;';
    waBtn.innerHTML = '📱 Share Emergency on WhatsApp';
    waBtn.onclick = () => broadcastEmergency();
    smsWrap.appendChild(waBtn);
  }
});


// ============ UI POLISH: SCROLL REVEAL ============
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  // Add reveal class to main sections and cards
  const elementsToReveal = document.querySelectorAll('.hero, .dashboard-section, .simulator-section, .features-section, .guide-section, .panic-section, .timeline-section, .problem-card, .stat-card');
  
  elementsToReveal.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
});
