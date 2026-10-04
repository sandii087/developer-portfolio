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

## Browser and visual QA: not performed

This managed environment did not expose the required `control-browser` capability. The Sites workflow explicitly requires skipping the preview server and browser QA in that situation. No substitute browser automation or screenshot rendering was used.

Consequently, this delivery does **not** claim verified desktop/mobile screenshots, browser-console results, browser accessibility audit, interactive third-party profile/certificate visibility, or successful manual form handling. The site has no web contact form; it uses an email link.

Before public launch, run locally and check at 320/390 px, 768 px, and 1280/1440 px, in both themes:

1. No horizontal overflow; no cropped text or overlapping controls.
2. Tab through the skip link, header, themes, filters, project disclosures and contact links; use Enter/Space and Escape as appropriate.
3. Open the mobile menu, follow every navigation link, and verify focus and scrolling.
4. Filter Backend and Full-stack; then follow a deep link to a previously hidden project.
5. Expand all case studies, resize, and confirm readability.
6. Download and open the resume, verify academic/certificate links and complete LinkedIn's browser challenge.
7. Check the developer console and network panel for errors; verify reduced-motion mode and disabled JavaScript.
8. Confirm deployment access and the chosen public canonical URL before sharing with recruiters.

The source and build can be used immediately; these remaining checks are explicitly unverified release checks.
