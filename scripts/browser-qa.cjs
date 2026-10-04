// Optional QA dependency: npm install --no-save playwright
// Run with: node scripts/browser-qa.cjs
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const base = process.env.QA_URL || 'https://sandii087.github.io/developer-portfolio/';
const out = process.env.QA_OUTPUT || 'browser-qa-results';
(async () => {
  await fs.mkdir(out, { recursive: true });
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
  const results = [];
  try {
    for (const width of [320, 390, 768, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: 'light', reducedMotion: 'reduce', isMobile: width < 500, hasTouch: width < 500 });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
      page.on('requestfailed', r => errors.push(`${r.url()}: ${r.failure()?.errorText}`));
      page.on('response', r => { if (r.status() >= 400 && r.url().startsWith(base)) errors.push(`${r.status()} ${r.url()}`); });
      const response = await page.goto(base, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      await page.keyboard.press('Tab');
      assert.equal(await page.locator(':focus').textContent(), 'Skip to content');
      await page.keyboard.press('Enter');
      assert.equal(await page.locator(':focus').getAttribute('id'), 'main');
      const overflow = async () => page.evaluate(() => [...document.querySelectorAll('body *')].filter(e => {
        const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
        return r.width && r.height && s.position !== 'absolute' && (r.right > innerWidth + 1 || r.left < -1);
      }).map(e => `${e.tagName}.${e.className}`).slice(0, 15));
      for (const theme of ['light', 'dark']) {
        if (theme === 'dark') await page.locator('.theme-toggle').click();
        assert.deepEqual(await overflow(), [], `${width}px ${theme} overflow`);
        await page.screenshot({ path: path.join(out, `${width}-${theme}.png`), fullPage: true });
      }
      await page.reload({ waitUntil: 'networkidle' });
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark', 'theme persists');
      if (width <= 1100) {
        const menu = page.locator('.menu-toggle');
        await menu.click();
        assert.equal(await menu.getAttribute('aria-expanded'), 'true');
        assert.deepEqual(await overflow(), [], `${width}px open menu overflow`);
        await page.keyboard.press('Escape');
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');
        assert.equal(await page.locator(':focus').getAttribute('class'), await menu.getAttribute('class'));
      }
      for (const link of await page.locator('#main-nav a').all()) {
        if (width <= 1100) await page.locator('.menu-toggle').click();
        const target = (await link.getAttribute('href')).slice(1);
        await link.click();
        assert.equal(new URL(page.url()).hash, `#${target}`);
        assert.equal(await page.locator(':focus').getAttribute('id'), target);
        if (width <= 1100) assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
      }
      await page.locator('[data-filter="Full-stack"]').click();
      assert.equal(await page.locator('[data-category]:visible').count(), 1);
      await page.locator('a[href="#project-jobflow"]').first().click();
      assert.equal(await page.locator('#project-jobflow').isVisible(), true);
      await page.locator('[data-filter="Backend"]').click();
      assert.equal(await page.locator('[data-category]:visible').count(), 2);
      await page.locator('[data-filter="All"]').click();
      for (const summary of await page.locator('summary').all()) await summary.click();
      assert.deepEqual(await overflow(), [], `${width}px expanded case studies overflow`);
      assert.equal(await page.locator('details[open]').count(), 3);
      const links = await page.locator('a[href^="#"]').evaluateAll(as => as.map(a => a.hash).filter(h => h && !document.getElementById(h.slice(1))));
      assert.deepEqual(links, []);
      const resume = await context.request.get(new URL('assets/Sandeep-Yadav-Resume.pdf', base).href);
      assert.equal(resume.status(), 200);
      assert.match(resume.headers()['content-type'], /pdf/);
      assert.deepEqual(errors, [], `${width}px browser errors`);
      results.push({ width, themes: ['light', 'dark'], passed: true, consoleErrors: errors });
      console.log(`PASS ${width}px: themes, overflow, navigation, keyboard, filters, case studies, PDF, console`);
      await context.close();
    }
    const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: {width:390,height:844} });
    const p = await nojs.newPage(); await p.goto(base);
    assert.equal(await p.locator('#main-nav').isVisible(), true);
    assert.equal(await p.locator('[data-category]:visible').count(), 3);
    await p.locator('summary').first().click();
    assert.equal(await p.locator('details[open]').count(), 1);
    await nojs.close();
    await fs.writeFile(path.join(out, 'report.json'), JSON.stringify({url:base,checkedAt:new Date().toISOString(),results,javascriptDisabled:'passed'},null,2));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
