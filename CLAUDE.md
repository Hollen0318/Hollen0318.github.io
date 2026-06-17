# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Hollen (Haoran) Zhang's personal **academic** website — a **Jekyll** site, minimal/modern,
fully **data-driven**. Deploys to https://hollen0318.github.io/ via GitHub Pages.

> The redesign currently lives on the **`redesign`** branch. `main` still holds the old
> hand-written multi-page site until you merge. Do not assume `main` reflects this structure.

## Build & preview

There is **no Jekyll in system Ruby (2.6, too old)**. Ruby 4 + Jekyll 4.4 are installed in the
conda/mamba env **`lumos`** (conda-forge ships Ruby). Always run Jekyll through it:

```bash
mamba run -n lumos jekyll serve --host 127.0.0.1 --port 4020   # preview at http://127.0.0.1:4020/
mamba run -n lumos jekyll build                                # one-off build to _site/
```

- `_config.yml` changes are **not** picked up by `--watch` — restart `serve` after editing it.
- If `serve` fails with `Address already in use`, the previous port is in TIME_WAIT; use a new
  port (4021, 4022, …) rather than waiting.

## How content works (edit data, not HTML)

Everything visible is generated from data files — adding a paper, project, talk, or service role
is **one YAML entry**, never hand-written HTML.

- **Profile, social links, advisor, CV path** → `_config.yml` under `author:` and `social:`
  (a blank `social:` value hides that icon).
- **`_data/*.yml`** drive each section: `publications.yml`, `projects.yml`, `education.yml`,
  `news.yml`, `presentations.yml`, `service.yml`, `awards.yml`, `skills.yml`.
- **Pages** (`index.html`, `publications.html`, `projects.html`, `service.html`) only *loop over*
  that data via shared includes. The nav/header/footer come from **one** source —
  `_layouts/default.html` + `_includes/{head,nav,footer,social,pub,project-card}.html` — so a nav
  change is made once (this is the whole reason for the rebuild; the old site duplicated nav on
  every page).

Conventions that aren't obvious:
- **Your name is auto-bolded** in author lists by a `replace` filter in `_includes/pub.html`.
  Spell it `Haoran Zhang` or `H. Zhang` in `authors:` or the bolding misses.
- **Publication `type:`** is `published | preprint | draft`. `draft` renders a muted "Draft" tag;
  otherwise the optional `tag:` shows a venue chip (e.g. "EMBC 2025", "Under review").
- **Project thumbnails** live in `assets/img/projects/<key>.{png,svg}` and are referenced by the
  `image:` field; omit `image:` to get a lettered placeholder. The three current-research repos
  (OptiLact / Lumos Workbench / Adub) use hand-made spectral **SVG** thumbnails.
- **The CV is at `/files/CV.pdf`** (moved from the old `downloads/_CV.pdf` — Jekyll ignores files
  whose names start with `_`, so the underscore name would not have deployed).
- **Layout width** is the `--maxw` CSS variable in `assets/css/style.css`; long-form text is
  capped at a reading measure so widening the layout doesn't make prose lines too long.
- **Dark mode** is `data-theme` on `<html>` + CSS custom properties, with the initial theme set
  *before paint* by an inline script in `_includes/head.html`; the toggle is in `assets/js/main.js`.

## Deployment

GitHub Pages **classic "deploy from branch"** builds the site with its own pinned **Jekyll 3.9**
and **ignores the `Gemfile`**. The site is written to stay compatible with both 3.9 and the local
4.4, with no custom plugins — so going live is just merging `redesign → main` and pushing. No CI.

## Known intentional TODOs
`_config.yml` (LinkedIn/Scholar are set; ORCID blank), and a few publication links flagged inline
in `_data/publications.yml` (OptiLact full author list; OpenOOD links; confirm the blood-pressure
arXiv id). The OptiLact paper PDF is deliberately **not** hosted (it's an anonymized double-blind
submission); only the repo is linked.
