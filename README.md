# Blue Crew Academy

Blue Crew Academy is a lightweight browser-based learning platform for NFHS baseball umpires.

It is designed to help you study:

- rule-area decision making through original situation-based quiz prompts
- plate and base mechanics reminders
- pregame communication topics for your crew
- personal season notes stored locally in the browser

## Important note about NFHS content

This project is built to support NFHS baseball study without reproducing the full NFHS rulebook text.
It uses:

- topic references to NFHS rule areas
- original teaching prompts and paraphrased study explanations
- mechanic and crew-management reminders

For official rule language, case plays, and yearly changes, use your current NFHS baseball rules book and case book alongside the app.

## Source materials used

The current app is grounded in the materials you provided:

- [2020 NFHS Baseball Rule Book .xlsx](/Users/michaelwitham/Desktop/Umpire%20Rulebooks/2020%20NFHS%20Baseball%20Rule%20Book%20.xlsx)
- [2025 Rulebook.pdf](/Users/michaelwitham/Desktop/Umpire%20Rulebooks/2025%20Rulebook.pdf)
- [2026 Umpires Manual.pdf](/Users/michaelwitham/Desktop/Umpire%20Rulebooks/2026%20Umpires%20Manual.pdf)

Direct extraction in this environment came from the 2020 workbook, which provided:

- the Rule 1 through Rule 10 outline
- dead-ball quick-reference items
- baserunning awards study prompts

The 2025 rulebook PDF and 2026 umpires manual PDF are included in the study source set and referenced in the UI, but I could not reliably machine-extract readable text from those PDFs with the tools available in this workspace.

We now also have a workable OCR export from the manual at:

- [2026 Umpires Manual 123 text.txt](/Users/michaelwitham/Desktop/2026%20Umpires%20Manual%20123%20text.txt)
- [2025 Rulebook text.txt](/Users/michaelwitham/Desktop/Umpire%20Rulebooks/2025%20Rulebook%20text.txt)

Those OCR text exports are now being used to shape:

- the manual study path
- glossary/mechanics concept cards
- crew-of-one through crew-of-four study modules
- 2025 rule changes and points-of-emphasis panels
- rulebook support sections like signals and awards references

## Run it

Because the app is static, you can open it directly in a browser or serve it locally.

Simple local server options:

```bash
python3 -m http.server 8000
```

Then open [index.html](/Users/michaelwitham/Documents/New%20project/index.html) at `http://127.0.0.1:8000`.

## Publish on GitHub Pages

This project is set up to work well as a GitHub Pages site:

- the front end is fully static
- the Pages workflow is already present in `.github/workflows/deploy-pages.yml`
- app assets use relative paths so the site can load from a repository subpath

Suggested publishing approach:

- publish only the app files and supporting repo files
- keep the source rulebooks, OCR text exports, and other local reference files out of the public repo
- use this site as the public study app and keep source processing local

## What is included

- a study-map dashboard for major NFHS baseball umpire focus areas
- a Rule 1 through Rule 10 outline based on the workbook structure
- a manual-driven study path built from the exported umpires manual text
- 2025 rulebook update and points-of-emphasis study panels
- dead-ball and baserunning awards quick-reference panels
- glossary and crew-size study panels from the manual OCR text
- a local quiz engine with saved progress
- plate and base mechanics study panels
- pregame partner discussion prompts
- local browser note-taking

## Files

- [index.html](/Users/michaelwitham/Documents/New%20project/index.html)
- [styles.css](/Users/michaelwitham/Documents/New%20project/styles.css)
- [app.js](/Users/michaelwitham/Documents/New%20project/app.js)

## Next ideas

- add more situation decks by rule area
- track missed questions separately for spaced review
- add two-umpire and three-umpire mechanic modes
- import your own local notes from clinic handouts
