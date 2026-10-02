# Teaching Conversational Malayalam to Adult English Speakers: Evidence Review

Scope: what the research supports, what boot.dev and Duolingo actually do, and what it means for this app.

## 1. Evidence-based methods

### Spaced repetition
- Ebbinghaus (1885): forgetting starts immediately and is steep; repetitions flatten the curve. Spacing beats massing in L2 specifically with a medium-to-large effect (Kim & Webb 2022: 48 experiments, 98 effect sizes).
- **Leitner boxes** (1974): 3-5 boxes with expanding intervals (1, 2, 4, 8 days). Correct promotes a card, wrong resets it to box 1. Simple, but no per-item difficulty model.
- **SM-2** (Woźniak, 1987): per-card ease factor, implicit ~90% retention target. Suffers "ease hell" after repeated lapses.
- **FSRS** (Ye, 2022): models Difficulty, Stability, Retrievability; configurable desired retention (typically 0.90). Over ~700M Anki reviews: log-loss 0.29 vs 0.35 for SM-2, retention RMSE 5.3% vs 16.2%, same retention with ~20-30% fewer reviews. MIT implementations exist (ts-fsrs for TypeScript).
- Expanding vs equal intervals: meta-analytically a wash. The fact of spacing matters far more than the exact schedule.

### Retrieval practice (testing effect)
- Being tested beats re-reading: ~30% advantage on delayed tests (Roediger & Karpicke); meta-analyses cover 118 studies / 15k participants (Adesope 2017) and 37 classroom studies (Agarwal 2021).
- Implication: tests are the teaching mechanism, not just assessment. Learners misjudge this and prefer rote review, so don't let them opt out of testing.

### Interleaving vs blocking
- Genuinely mixed in L2. Interleaving won for verb conjugation across weekly sessions (Pan et al.) and on delayed grammar tests (Nakata & Suzuki, d=0.64), and for L2 vocabulary (Finkbeiner & Nicol).
- Blocking won for pronunciation (Carpenter & Mueller) and, notably, Huffman & Hahn found blocking better when practice is retrieval-based, because interleaving delays feedback.
- Null results are common. Practical reading: block first exposure, interleave later review and tests, keep feedback immediate. Biggest interleaving gain is on confusable similar items.

### Comprehensible input (Krashen, i+1)
- Influential but "never fully validated empirically"; i+1 is unfalsifiable as stated and assumes the designer knows each learner's *i*.
- Immersion research: receptive skills reach native-like levels, productive skills do not. Input alone underdevelops output.
- Pair input with output (Swain) and interaction (Long). Supports graded input with one new element; does not support an input-only design.

### Audio-first (Pimsleur)
- **Graduated interval recall**: recall prompts at roughly 5s, 25s, 2min, 10min, 1h, 5h, 1 day, 5 days...
- **Anticipation principle**: prompt, pause for the learner to say the answer aloud, then play the native model as confirmation. This is retrieval practice + production + immediate feedback in one loop, and maps cleanly to a web audio player.
- Lessons are 30 minutes. That is a format choice, not a finding.

### Total Physical Response and visuals
- Asher: comprehension before production, words bound to actions. Gesture/visual support reliably improves vocabulary retention, and the benefit is specific to *iconic, meaning-bearing* gestures (Kelly et al.; Macedonia et al. 2011 found a motor trace; Tellier 2008). Dual coding (Paivio) is the usual explanation.
- Caveat: strongest for concrete, action-related vocabulary. Movement does not help arbitrary features (e.g., German gender) and can degrade into mechanical responding.

### Frequency ordering (Zipf)
- Top ~100 words cover ~50-58% of running text; first 1,000 cover ~80-85%; 2,000 ~85-90%. ~98% coverage (comfortable unassisted speech) needs 6,000-9,000 word families.
- A frequency-ordered syllabus buys usable language fast, but the tail is long and cannot be skipped.

### CEFR / ACTFL
- CEFR: six levels (A1-C2) defined by can-do statements across five skills. Published estimates: A1 ~30-50h, A2 ~50-100h, B1 ~100-200h.
- ACTFL: Novice/Intermediate/Advanced (Low/Mid/High) + Superior/Distinguished; no vocabulary counts or hour estimates.
- CEFR's can-do framing is the better template for app levels: it makes a level mean something externally rather than being an arbitrary number.

## 2. Gamification

### boot.dev
- XP per completed lesson; level thresholds ramp up so early levels come fast. Level 100 = "Archmage"; <1,000 of ~500k users had reached it.
- Streaks described as "the most important game feature"; changed weekly to daily in Nov 2024. **Frozen Flame** (gems, auto-consumed, protects a 4-day gap) and an in-development **embers** system (earned on hard days, covers a missed day) exist specifically to allow breaks without punishment.
- Also: gems currency, guilds, leaderboards, community "boss battles" with pooled XP toward an event goal.
- Two stances worth copying: XP loss is *warned* for viewing solutions, and the team avoids being "so gamified that it's distracting or perceived as unprofessional."

### Duolingo: what works
- Strong adherence; per-word strength tracking driven by spaced repetition; unit checkpoint quizzes.
- **Practice Hub**: daily targeted modules, including "do you remember this unit?" from a recently completed unit, plus a mistakes collection.
- **Review Exercises**: one exercise sampled from 3 or 5 skills earlier, inserted at a random position inside a normal lesson (not in a "review block").

### Duolingo: what to avoid
- Hearts/lives created "an environment of anxiety rather than a space for learning"; users cut sessions short on losing hearts and found earning them back punitive.
- Streaks "allow no breaks": families wanted a pause, and pausing felt like losing achievements. Documented failure mode: learners avoid hard lessons, repeat easy content, and settle into "not quitting, not learning — just maintaining."
- Streak maintenance can outweigh the activity itself, and breaking a streak predicts abandoning the platform entirely.
- Leaderboards drove XP gaming: "the only thing I cared about was beating out the other users."
- Controlled 10-week vocabulary study: gamification raised controlled motivation (d=0.52) and lowered autonomous motivation (d=-0.38), with motivation quality fully mediating a small negative effect on learning.
- Meta-analyses find modest positive average effects with high heterogeneity — *design* matters more than the presence of game elements.

### Cumulative recall inside level tests
Two patterns with evidence behind them: (1) sample items from 3-5 lessons back and drop them at random positions inside a lesson; (2) a terminal test drawing on the whole level. Both are interleaved retrieval practice.

## 3. Practical implications for this app

- **Romanized-only is the riskiest planned feature.** A controlled study found segment-based orthography (which romanization is) *impaired* adults' sensitisation to a novel language's prosody on first exposure. Malayalam's gemination, dental vs retroflex nasals/stops, and vowel length are exactly what romanization flattens — a real fossilization risk if text precedes audio. Design: audio primary, romanization revealable but hidden, never shown before the learner has heard the item.
- **When to speak**: a short comprehension-first phase is supported (delayed oral practice, Postovsky/Gary), but output research says don't prolong it. Two or three audio-only lessons, then aloud repetition, then prompted production.
- **How much repetition**: spaced retrieval with immediate feedback targeting ~90% recall, not a fixed rep count. Advance on level-test accuracy.
- **Lesson length**: 5-10 minutes. Adults sustain roughly 10-15 minutes of focused attention, and sub-10-minute modules show better completion.
- **Level structure**: anchor levels to CEFR-like can-do statements and be honest that A2 is ~50-100 guided hours.
- **Gamification balance**: maximize personal progress and competence feedback, make social features optional, avoid loss-framed mechanics.

## Recommendations for this app

1. Use FSRS (ts-fsrs) rather than SM-2 or hand-rolled Leitner — better prediction and ~20-30% fewer reviews at the same retention, with a tunable target.
2. Set desired retention near 0.90 and advance learners on level-test accuracy, not on a repetition count — mastery-based progression beats exposure-based.
3. Keep audio mandatory and romanization opt-in and hidden-until-heard — segment-based text measurably interfered with early prosody learning, and romanization is lossy for Malayalam's hard contrasts.
4. Ship the slow + regular audio pair with a Pimsleur-style anticipation gap (prompt, silence, model answer) — one mechanic that delivers retrieval practice, production and immediate feedback.
5. Sequence comprehension first, then choral repetition, then prompted production over the first few lessons — respects the delayed-oral-practice evidence without extending the silent period past its value.
6. Use images and gesture visuals for concrete nouns and verbs only — the gesture benefit is specific to iconic, meaning-bearing material and fades for arbitrary grammar.
7. Order vocabulary by frequency (top 100 words ≈ 50% coverage, top 1,000 ≈ 80-85%) — front-loads usable language and makes early levels feel productive.
8. Block new material, interleave review — the interleaving advantage is most reliable for similar, confusable items, which is precisely Malayalam's minimal pairs (ണ/ന, റ/ര, geminates).
9. Build cumulative recall into tests using Duolingo's two patterns: items from 3-5 lessons back injected at random positions, plus a terminal test over the whole level.
10. Keep lessons 5-10 minutes and make the daily streak winnable in under 10 minutes — matches adult attention span and microlearning completion data.
11. Gamify progress, never punish: XP for learning behaviours, no hearts/lives, no XP penalty for viewing help, no public leaderboards by default, and streaks with earned grace plus an explicit pause — the controlled study showed controlled motivation rising and autonomous motivation falling, and Duolingo's no-break streaks produced "not quitting, not learning — just maintaining."

## Sources

- Anki FAQ, what SRS algorithm Anki uses: https://faqs.ankiweb.net/what-spaced-repetition-algorithm
- FSRS vs SM-2 benchmarks: https://www.deckbase.co/blog/fsrs-vs-sm-2
- FSRS repository (DSR model, bindings): https://github.com/open-spaced-repetition/free-spaced-repetition-scheduler
- Scheduler implementations overview: https://jsr.io/@flashcard/schedulers
- Spaced repetition, spacing effect, Leitner intervals: https://theses.cz/id/hg5ydc/17837_Archive.pdf
- Spacing effect in L2 (Kim & Webb 2022 review): https://researchmap.jp/RMAP333/published_papers/48134675/attachment_file.pdf
- Retrieval practice vs interleaving, L2 evidence: https://psycnet.apa.org/manuscript/2019-01991-001.pdf
- Blocking vs interleaving retention study: http://tjtesol.org/attachments/article/489/04_English%20Vocabulary%20and%20Grammar%20Retention%20Blocking%20Versus%20Interleaving.pdf
- Krashen's input hypothesis critique (Frontiers 2025): https://public-pages-files-2025.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1636777/text
- Delayed oral practice / silent period: https://core.ac.uk/download/pdf/189928232.pdf
- Pimsleur method (graduated interval recall, anticipation): https://www.pimsleur.com/the-pimsleur-method/
- Critical review of Pimsleur: https://aws1.hpu.edu/research-publications/tesol-working-papers/2016/08ChoeTaiAnn.pdf
- TPR rationale and classroom use (ERIC): https://files.eric.ed.gov/fulltext/ED111203.pdf
- Gesture and L2 vocabulary memory: https://www.scielo.br/j/ides/a/7PVHQd8WSpTHYDS8qXtTqNd/?lang=pt
- When movement helps and hurts language learning: https://www.goethe.de/ins/be/fr/spr/mgs/27305639.html
- Zipf / word frequency coverage: https://www.newgeneralservicelist.com/why-it-works
- CEFR levels and guided hours: https://www.languagetrainers.com/language-levels.php
- ACTFL structure and performance descriptors: https://doe.louisiana.gov/docs/default-source/academic-standards/2023-louisiana-guide-to-world-languages-programming-grades-9-12.pdf
- Prosody learning is easier without orthography (Cambridge): https://www.cambridge.org/core/services/aop-cambridge-core/content/view/5A46BC3A2F5EF223322144EE508541A5/S1366728925000082a.pdf/tuning_in_to_the_prosody_of_a_novel_language_is_easier_without_orthography.pdf
- boot.dev Beat, March 2024 (streaks, frozen flames, gems, boss battles): https://www.boot.dev/blog/news/bootdev-beat-2024-03
- boot.dev Beat, November 2024 (daily streaks, embers): https://www.boot.dev/blog/news/bootdev-beat-2024-11
- Duolingo Practice Hub guide: https://blog.duolingo.com/es/guia-centro-practica-duolingo-2/
- Duolingo assessment at scale (Review Exercises, checkpoint quizzes): https://files.eric.ed.gov/fulltext/ED615620.pdf
- Duolingo dark patterns / streaks "allow no breaks": https://csl.uwaterloo.ca/download/documents/reportsarticles/idc26a_sub2151_i6pdf;v1?attachment=1
- Streak creep: https://thedecisionlab.com/es-ES/insights/consumer-insights/streak-creep-the-perils-of-too-much-gamification
- Gamification misuse and dark nudges (arXiv): https://export.arxiv.org/pdf/2203.16175
- Gamification meta-analysis in language learning: https://elt.tabrizu.ac.ir/article_17772_ed62a3564e327f2aa10b1e548cd179b4.pdf
- EUROCALL review of gamification in language education: https://files.eric.ed.gov/fulltext/EJ1257523.pdf
- Reward undermines intrinsic motivation (Springer): https://link.springer.com/content/pdf/10.1007/978-3-032-26816-7_21.pdf
- Microlearning / bite-sized learning evidence: https://www.prd.timeshighereducation.com/campus/bitesized-learning-when-less-can-be-more
- 10-minute lesson / microlearning retention: https://blog.ck12.org/the-rise-of-the-10-minute-lesson-how-microlearning-fits-into-real-school-days-621cca2fb737
