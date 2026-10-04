# Portfolio QA report

## Completed

- Extracted and visually inspected the supplied one-page resume.
- Retrieved the public GitHub repository inventory; inspected README/file trees and selected implementation files.
- Built pre-rendered semantic HTML without external runtime dependencies.
- JavaScript syntax checks passed.
- Eight Node tests passed: original resume-link preservation; unique IDs and navigation targets; asset existence; content coverage; metadata, semantics and external-link attributes; filters/deep links; mobile-menu state and keyboard behavior; dark/light toggle with blocked-storage handling.
- All resume education records, percentages, CGPA, dates, certifications, contact targets, skills and three projects are represented. Intentional wording/metric differences are documented in `source-audit.md`.
- Native project detail disclosure, email and telephone links, and full content remain available without client JavaScript.
- CSS includes desktop, tablet and mobile breakpoints; the mobile navigation has accessible name/expanded state, Escape handling and section focus.
- Static narrow-width review identified a cramped architecture endpoint label; hidden it on mobile while keeping all functional information in text.
- Color contrast review identified a low-contrast light-theme orange accent; darkened it. Main text/accent pairs exceed WCAG AA normal-text contrast. This is not a full automated accessibility audit.
- Reduced-motion preferences, visible focus rings, skip link, headings, local assets, favicon, social image, print styles and a 404 page are included.
- Every unique website HTTP link is attempted by `scripts/check-links.mjs`; the final results are in `link-checks.json`. Original resume links are retained even if a provider challenges automated access.

## HTTP verification limits

GitHub profile/repositories, the three education files, and certificate links returned HTTP 200 during the initial pass. LinkedIn returned a browser-check/reCAPTCHA page, so actual profile visibility remains unverified. DevHub initially timed out, then returned HTTP 200 with a matching workspace page title on retry. HTTP status does not verify authenticated app functions, certificate contents, or future availability.

## Browser and visual QA: completed

Verified the public GitHub Pages deployment on October 5, 2026 (India time), using Playwright and Chrome in GitHub Actions. Run: https://github.com/sandii087/developer-portfolio/actions/runs/37241764799

- Passed at 320, 390, 768, and 1440 CSS pixels, with light and dark themes.
- Full-page screenshots captured at every width/theme; reviewed the mobile, tablet, and desktop layouts, including the entire narrow mobile page.
- No horizontal overflow, uncaught JavaScript exceptions, browser console errors, failed requests, or HTTP errors for site resources during the tests.
- Mobile menu opens and closes, supports Escape with focus restoration, and closes after navigation.
- Every header navigation link reaches its target and moves focus correctly.
- Skip link initially failed to transfer keyboard focus. Fixed by adding `tabindex="-1"` to the main landmark; the real-browser regression check now passes.
- Theme preference survives reload; project filters, links to filtered-out projects, and all case-study disclosures work.
- Internal anchors and the resume PDF pass verification.
- With JavaScript disabled, navigation, all projects, and native case-study disclosures remain usable.
- Eight existing Node validation tests also pass.

The machine-readable result is `docs/browser-qa-results.json`. Full screenshots are available in the `portfolio-browser-qa` artifact attached to the successful run. The workflow reruns after successful Pages deployments and can be started manually.

### Scope

These are responsive Chrome tests, not tests on physical phones or a full cross-browser/accessibility certification. The third-party LinkedIn challenge noted above remains outside this site's browser verification. The contact section uses email and telephone links, not a web form.

### Repeating the checks

Run the Browser QA workflow from GitHub Actions. To run locally with optional testing tools (not website dependencies):

```sh
npm install --no-save --package-lock=false playwright@1.58.2
npx playwright install chromium
node scripts/browser-qa.cjs
```

`QA_URL` overrides the public test address; `QA_OUTPUT` overrides the screenshot/report folder; `CHROME_PATH` selects an existing Chrome executable.
