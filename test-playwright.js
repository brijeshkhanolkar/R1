const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('BROWSER ERROR:', msg.text());
  });
  page.on('pageerror', err => {
    console.log('PAGE EXCEPTION:', err.message);
  });
  
  const fileUrl = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
  console.log('Loading:', fileUrl);
  
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  
  // Try clicking a button to see if it throws
  try {
    await page.evaluate(() => {
      if(window.simNext) window.simNext();
      if(window.sendChat) window.sendChat();
    });
  } catch (e) {
    console.log('CLICK EXCEPTION:', e.message);
  }
  
  await browser.close();
})();
