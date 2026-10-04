# Factual source audit

Reviewed 3 October 2026 UTC / 4 October 2026 India time.

## Primary source

`Sandeep_Yadav_Professional_Resume (2).pdf`, supplied by the user. A byte-for-byte copy is included at `public/assets/Sandeep-Yadav-Resume.pdf`. Extracted PDF hyperlink annotations are preserved in `resume-links.json`; the automated tests compare every original URI against the generated page.

No information from the account owner's unrelated personal history was used. The portfolio identity is Sandeep Yadav, matching the attached document.

## Profile, skills and credentials

- Name, email, phone, Varanasi location, GitHub, LinkedIn, B.Tech graduation year, technical skills, school percentages, degree CGPA, certification dates and URLs: resume.
- Headline: Software Developer, with backend/full-stack focus. This describes the intended role and demonstrated project work, not an employment title.
- All resume technologies are retained in skill categories. Spring Boot is supported by the resume's JobFlow project and code. JDBC is supported by the airline repository.
- The resume has no employment history, employer, internship dates, awards, or separate achievements section. The Experience section is explicitly project-based. No employment timeline was invented.
- AI Fundamentals includes the resume's sales-prediction, feature-engineering, and data-handling details. No extra certificate issuer or completion score was invented.
- Education links preserve the degree and both school marksheet targets. The degree and institution share one URL in the PDF; Class X and the school name share another. Each unique target is retained meaningfully.

## Public repository review

Public repository inventory retrieved from GitHub's user API; file trees and README files inspected where present. Repository descriptions alone were not treated as proof of implementation.

| Repository | Decision |
| --- | --- |
| `Jobflow` | Lead project: strongest relevance to backend jobs. Inspected README, repository query, worker, service, demo executors, Maven dependencies. Default branch: `codex/jobflow-platform`. |
| `devhub-ai` | Featured full-stack project. Root README describes an older churn project; the actual collaboration application is in `devhub/`. Inspected its README, authentication code, main API, frontend package manifest, and file tree. |
| `airline-reservation-system` | Featured Java/database project. Inspected README, schema, JDBC repository, booking service, and concurrency test. |
| `crm-sales-customer-analytics` | README and file tree reviewed. Analytics-oriented; less central to the requested backend portfolio. Available through the GitHub repository link. |
| `customer-churn-retention-intelligence` | README and tree reviewed. Synthetic-data analytics project; not promoted as client or production work. |
| `Data-Science-Internship` | README/tree show practice notebooks. Repository name is not evidence of employment; no internship claim added. |
| `IBM-Data-Analyst-Portfolio` | README/tree show ongoing analytics learning materials, not a completed additional certification. |
| `sales-performance-prediction` | GitHub tree returned 409; empty repository content did not support an additional case study. Resume learning-project mention remains. |
| `sandii087.github.io` | Existing data analytics portfolio. HTTP 200 with matching Sandeep Yadav title. Linked as supporting work. |
| `small-office-vlan-troubleshooting` | README/tree reviewed; networking project less relevant to the requested developer positioning. |

## JobFlow evidence and boundaries

- [README](https://github.com/sandii087/Jobflow/blob/codex/jobflow-platform/README.md)
- [JobRepository](https://github.com/sandii087/Jobflow/blob/codex/jobflow-platform/src/main/java/dev/jobflow/repo/JobRepository.java): native claim query with priority aging and `FOR UPDATE SKIP LOCKED`.
- [JobService](https://github.com/sandii087/Jobflow/blob/codex/jobflow-platform/src/main/java/dev/jobflow/service/JobService.java): scoped idempotency, transactional claim, completion, retry, expired lease recovery and admin replay.
- [JobWorker](https://github.com/sandii087/Jobflow/blob/codex/jobflow-platform/src/main/java/dev/jobflow/service/JobWorker.java): fixed worker pool, scheduled polling/recovery and executor invocation.
- [DemoJobExecutors](https://github.com/sandii087/Jobflow/blob/codex/jobflow-platform/src/main/java/dev/jobflow/service/DemoJobExecutors.java): simulated transient/permanent failure and synthetic result. It does not actually send emails or generate business reports; neither is claimed.
- The architecture and SQL excerpt on the portfolio are explanatory visuals, not screenshots or monitoring telemetry. The excerpt explicitly elides the ordering clause.
- At-least-once semantics are stated; no exactly-once promise. No deployment, production workload, user count, availability, throughput, or test-pass claim was invented. Test/CI configuration exists, but JobFlow itself was not executed in this task.

## DevHub evidence and discrepancies

- [Application source and README](https://github.com/sandii087/devhub-ai/tree/main/devhub)
- [Authentication](https://github.com/sandii087/devhub-ai/blob/main/devhub/backend/devhub/auth.py)
- Current repository documents OIDC and revocable sessions, while the resume names Google/GitHub and password authentication. The portfolio uses the directly supported OIDC/session description; provider-specific and password claims are not expanded.
- Resume reports Render and Neon deployment. Nested README still says deployment is unverified. The supplied application URL initially timed out, then returned HTTP 200 with the title “DevHub — Your team's workspace.” This confirms an application shell is reachable, not that authenticated workflows or integrations were tested.
- AI is described as opt-in drafting requiring configuration. No RAG, autonomous engineering, model performance, or active provider claim is made.

## Airline evidence and discrepancy

- [Repository](https://github.com/sandii087/airline-reservation-system)
- [JDBC implementation](https://github.com/sandii087/airline-reservation-system/blob/main/src/main/java/com/sandeep/airline/dao/MySqlBookingRepository.java)
- [Schema](https://github.com/sandii087/airline-reservation-system/blob/main/schema.sql)
- Transaction isolation, seat row locking, route index, domain models and five-table schema are present.
- Resume says flight lookups were under 100 ms across 50+ simulated routes. Repository says the live MySQL path is untested and asks readers not to quote database latency. The website intentionally omits the disputed metric, rather than silently presenting it as independently verified.
- Concurrency tests target the in-memory repository. The portfolio distinguishes those from the JDBC implementation and does not turn their results into production guarantees.

## Visual and contact choices

No genuine application screenshots were present in the three selected repository trees. The website uses small source-based architecture illustrations instead of fabricated screenshots. There is no invented portrait, employer logo, testimonial, contribution percentage, skill rating, or activity statistic.

All contact information is preserved. Email and telephone are real protocol links, not proof of message deliverability. The complete original resume remains downloadable for context, including claims intentionally not repeated in the case-study prose.
