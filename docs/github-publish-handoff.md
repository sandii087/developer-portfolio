# GitHub Pages publishing handoff

The user has authorized public publication of this portfolio under GitHub account `sandii087`, using a separate `developer-portfolio` repository. Do not alter `sandii087.github.io`, the existing data analytics portfolio. Do not use the ChatGPT account's hosting namespace for the public site.

The GitHub integration is confirmed installed, and the user reports connecting it. The existing conversation did not receive GitHub tools or skills after installation; it also has no authenticated GitHub CLI. Continue in a new chat with the GitHub integration enabled. Do not ask the user to reinstall merely because this older conversation lacked its tools.

## Ready to publish

- Full source and built website are included in the archive.
- `.github/workflows/deploy-pages.yml` tests, builds, and publishes on pushes to `main`, with manual dispatch available.
- Build uses the actual Pages base URL from `actions/configure-pages`, so canonical links, sitemap and social metadata target the deployed address.
- The 404 page supports the `/developer-portfolio/` subpath.
- No installation step or external application credentials are needed for this static site's build.
- Browser visual/console QA remains unverified; see `qa-report.md`.

## Steps for the publishing agent

1. Read the GitHub integration's skill and verify authenticated identity and repository write access.
2. Inspect `sandii087/developer-portfolio` and its current contents/default branch. Preserve unexpected existing work; do not force-push or replace another project.
3. Commit the extracted project files to that repository. The archive's outer `sandeep-portfolio/` folder is not part of the repository path; its contents belong at repository root. Do not include `.openai`, Sites credentials, or Sites git metadata.
4. Configure the repository's Pages publishing source as GitHub Actions. Check that it is public, or that its plan supports public Pages for its visibility, before changing visibility.
5. Run and monitor the provided workflow. Fix any concrete deployment failure, then verify the returned public deployment URL and local assets through unauthenticated HTTP requests.
6. Check desktop/mobile rendering and console if browser tooling is available. Clearly preserve the QA limitation otherwise.
7. Return the actual deployed URL. The intended address is `https://sandii087.github.io/developer-portfolio/`; do not claim it is live before verification.
