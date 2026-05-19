# CLAUDE.md — Method Intensive

This file is the source of truth for Claude Code in this repo. Read it first, sync against it before any non-trivial action, and update it (with architect approval) when decisions change.

---

## Project

One landing page for the **Method Intensive** — a short-format spinoff of Method 3.0 (a 10-week creative-strategy course by Got Added Value, run by Denis).

- Full course landing already lives at `gotaddedvalue.com/method` (built on Readymag — NOT our scope).
- Intensive landing will live at `method.gotaddedvalue.com`.

---

## Roles and protocol

- **You (Claude Code) = executor.** You write code, run research passes, create files. Cite source files/passages for every factual claim in research. Use `/clear` between passes for adversarial critique of your own outputs. **Surface scope-creep to the architect — never act on it unilaterally.**
- **Architect = Claude in chat with Denis at claude.ai.** Scope gatekeeper. Default answer to any "let's also add..." is "no, after launch." Architect approves scope changes, reviews briefs, makes copy/design calls.
- **Truth lives in this repo.** `CLAUDE.md` and `/docs/` are authoritative. If anyone's memory disagrees with the repo, the repo wins.

### Communication style with Denis (CRITICAL)

Denis is doing dev work for the first time. **Every technical term — git, repo, branch, commit, deploy, CI, framework, pixel, UTM, DNS, subdomain, CLI, CNAME, webhook, etc. — must be explained briefly in parens in plain Russian the first time it appears.** Don't assume any knowledge. All communication in Russian. Match Denis's casual register (typos, lowercase, fragments — that's how he writes).

---

## Hard scope — today (10 hours from kickoff)

### In scope
- **Full strategic research pipeline** (six analytical files → `LANDING_BRIEF.md`). Foundation for all future GAV/Method landings.
- **Stub landing** live at `method.gotaddedvalue.com` — hook + "скоро откроем запись" + single CTA → Telegram bot (`https://t.me/gotaddedvalue_bot`).
- **Minimum pixels on stub:** Meta Pixel + GA4 (pasted directly into HTML, no GTM today).
- **Instagram post draft** + bot link.

### Out of scope today — escalate if Denis asks for any of these

- Full polished landing (phase 2, after research complete)
- Stripe / payments
- "X мест осталось" auto-counter
- Waitlist form with name+email+telegram+role fields (phase 2 — Denis confirmed adding this in the next sprint)
- Yandex.Metrica pixel (phase 2, ~1 day later)
- Google Ads conversion pixel (phase 2)
- Second landing for the full course (out indefinitely)
- Email automation / drip campaigns (out)
- A/B testing infrastructure (out)

---

## Stack

- **Frontend:** vanilla HTML + CSS + JavaScript. **No frameworks** (Next.js, React, Vue) — speed over sophistication, fits intensive product, easier for Denis to read later.
- **Code repo:** GitHub, private, owned by Denis.
- **Hosting:** Vercel free tier. Auto-deploys on every push to `main`.
- **Domain:** `method.gotaddedvalue.com` (subdomain of GAV's main domain). DNS provider TBD — Denis to confirm where `gotaddedvalue.com` is registered.
- **Lead capture (phase 2):** Google Sheet via Apps Script (no server).
- **Payments (phase 2):** Stripe Checkout (hosted) + webhook.
- **Pixels (today):** Meta Pixel + GA4, direct HTML paste.

---

## Brand — non-negotiable visual rules

- **Background:** light gray (use exact value from existing Method assets — sample it, don't approximate).
- **Palette:** strict monochrome. Black / white / gray only. No accent colors.
- **Typography:** bold sans-serif. Match font used in existing Method assets.
- **Signature visual element:** **isometric cube cropped by canvas edges.** NOT a generic polygon, NOT a hexagon. The cube must visibly intersect/be cut by the canvas frame on at least one edge. This is Denis's codified Method gesture — he has corrected this specifically in past sessions. If you find yourself wanting to render "a polygon" or "a hexagon," stop.
- **Assets available** (Denis has them in project files — he'll drop into `/assets/`): `cube.png`, `cube1.png`, `S1-S4` series, `Union.png` series, `Vector_10.png`, `Group_6-8.png`. **Use these directly — don't recreate the cube programmatically.** If a needed asset is missing, escalate to architect rather than improvising.

See `/docs/BRAND.md` for full visual ID once populated.

---

## Voice and tone

- Russian. Informal "ты". No corporate-speak.
- **Pattern: pain first, then resolution.** Reference example (the strongest hook we've found so far): *«Сидеть три дня перед пустым документом — это не креативный процесс. Это отсутствие процесса.»*
- "Жиза"-codes — culturally specific Kazakh creative-class humor and relatability. Avoid generic motivation, "раскрой свой потенциал" type copy.
- Concise. Short sentences. No three-paragraph buildups before the point.
- **Proof over hype.** When claiming something (e.g., "international jury"), back with specifics ("7 креативных директоров, 80 каннских львов на всех").

See `/docs/VOICE.md` for tone examples and "жиза"-codes catalog once populated.

---

## Audience

- Primary: Kazakh creative-industry professionals, 25–35.
- Bilingual: Russian primary, Kazakh gaining among younger cohort. Today's copy in Russian.
- Channels: Instagram (highest penetration), Telegram secondary.
- Trust barrier: EdTech category in this region requires credentialing signals (jury composition, alumni outcomes, instructor pedigree). Front-load these.

See `/docs/AUDIENCE.md` once populated.

---

## Strategic research pipeline ("разбор")

Six analytical files, each from a single focused Claude Code session. Each session: do work → `/clear` → run adversarial critique on the file you just wrote → revise → commit.

1. **`/research/01_value_props.md`** — what Method actually sells (in alumni words, not marketing tagline)
2. **`/research/02_aha_moments.md`** — top 20 strongest moments from lectures
3. **`/research/03_student_questions.md`** — recurring questions from past cohorts (= audience fears, = landing copy fuel)
4. **`/research/04_language_of_buyers.md`** — how alumni describe results (= copy lexicon)
5. **`/research/05_objection_map.md`** — what blocks the purchase
6. **`/research/06_intensive_carveout.md`** — which slice of Method 3.0 becomes the intensive (length, theme, format)

Then synthesis:

7. **`/research/LANDING_BRIEF.md`** — positioning, ICP, offer, page structure, voice constraints, required blocks, proof points. This is the source for actual copy.

**Citation rule:** every claim in these files cites a specific source file/passage from `/materials/`. No claims from training data or assumption. If a claim can't be cited, mark it `[UNVERIFIED]` and surface to architect.

See `/docs/PIPELINE.md` for detailed methodology once populated.

---

## Materials (Denis will supply into `/materials/`)

Required for full research pipeline:
- Lecture recordings/transcripts of past Method cohorts
- Alumni reviews/testimonials (any format)
- Student questions log (chats, bot logs, DMs)
- Denis's positioning notes for the intensive
- Full Method 3.0 program document (more detailed than the 10-week summary)

Already accessible to architect (not to you directly):
- Past Claude chats with Method content — architect can paste relevant excerpts on request

**If a material is missing, do best-effort analysis with what's available AND log the gap in `/docs/MATERIALS_NEEDED.md` so Denis sees what to supply next.** Don't block on missing materials — surface and continue.

---

## Escalation rules

**Always escalate to architect (= ask Denis to bring it to architect Claude in chat) before acting on:**
- Any change to scope above
- Any new feature request from Denis ("давай добавим...")
- Any technology choice not in `/docs/STACK.md`
- Any major copy or visual decision where you can't ground in materials or memory
- Visual identity choices beyond codified rules
- Anything that pushes the 10-hour budget

**Don't escalate for:**
- Implementation details inside agreed scope
- File naming, code structure
- Standard dev hygiene (git, deploy, debugging)
- Bug fixes, refactors of your own code

---

## First task — set up the repo and report status

1. Check if `gh` (GitHub command-line tool) is authenticated: `gh auth status`. If not, walk Denis through `gh auth login` step by step, explaining each prompt in plain Russian.
2. Initialize git locally if not done: `git init && git branch -M main`.
3. Create the remote private repo: `gh repo create method-intensive --private --source=. --remote=origin`.
4. Create this directory structure:
   ```
   /docs/        ← decisions, briefs, methodology (you populate over time)
   /materials/   ← Denis drops research source material here
   /assets/      ← brand PNGs (ask Denis where he has them locally)
   /research/    ← the six analytical files + LANDING_BRIEF go here
   /src/         ← stub landing HTML/CSS/JS
   ```
5. Place this `CLAUDE.md` at the repo root if not already.
6. Create empty placeholder `.md` files in `/docs/`: `SCOPE.md`, `STACK.md`, `BRAND.md`, `AUDIENCE.md`, `VOICE.md`, `PIPELINE.md`, `MATERIALS_NEEDED.md`. You'll fill them as you make decisions — keep them as the running record.
7. First commit: `git add -A && git commit -m "kickoff: repo skeleton, CLAUDE.md, docs structure"`. Push: `git push -u origin main`.
8. **Report to Denis** in plain Russian (with terms explained):
   - Что репо создан, дай ссылку
   - Что лежит в папках
   - Что нужно от него прямо сейчас: материалы в `/materials/`, бренд-ассеты в `/assets/` (или путь куда они у него на компе сложены — ты их сам положишь)
   - Что DNS-настройка домена `method.gotaddedvalue.com` — отдельная задача, нужны логин/пароль от регистратора домена. Спроси где зарегистрирован.

After kickoff is done, work begins in two parallel tracks:
- **Track A:** research pipeline starting with Этап 0 (gather all materials available) + Этап 1 (index)
- **Track B:** stub landing skeleton in `/src/` (HTML/CSS/JS with hook + bot CTA + pixels)

When in doubt about anything, ask Denis to take it to architect.
