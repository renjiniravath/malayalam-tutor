# Research: Teaching Manglish (Colloquial Malayalam) to English Speakers

Scope: linguistic difficulty, existing resources, colloquial specifics, romanization, and 2026 audio tech for an interactive web app teaching conversational Kerala Manglish.

---

## 1. Linguistic Challenges for English Speakers

Ranked by difficulty. Tiers 1–2 justify the slow-audio/minimal-pair treatment.

### Tier 1 — Perceptually hard, needs slow audio

- **Retroflex vs dental vs alveolar.** A three-way coronal place contrast with no phonemic counterpart in English: *muttu* (pearl, dental) / *muttu* (density, alveolar) / *muttu* (knee, retroflex). Geminate context is the only place all three contrast. An ICPhS study trained 37 native American English listeners on a three-way forced-choice task: they "were not able to identify the categories well based on abstract descriptions," with substantial confusion. Dental–retroflex is reported as the **poorest** place contrast.
- **Retroflex articulation is also motorically hard.** Malayalam retroflexes are (sub)apical — tongue tip curled back, *underside* of the tongue contacting the post-alveolar region, with retraction and a sublingual cavity. Children acquire them later than bilabials, dentals and velars, and they are frequently misarticulated. A production problem, not just perception.
- **ഴ (zh), the retroflex approximant /ɻ/.** Not English /r/, not /ʒ/ — learners substitute both. Highest-friction single sound (*pazham* "fruit", *mazha* "rain").
- **Gemination.** Distinctive word-medially: *kaḷam* "cell" vs *kaḷḷam* "lie"; also *kuppi*, *kutti*, *pacca*. Cued by **both** consonant duration and surrounding vowel duration — vowels shorten before geminates (Local & Simpson 1999). English has no such contrast, so the learner must master a two-part cue.
- **Phonemic vowel length.** All vowels have minimal pairs: *paṭṭŭ* "silk" vs *pāṭṭŭ* "song"; *koḍi* "flag" vs *kōḍi* "crore". Duration is the primary cue.

### Tier 2 — Moderate

- **Aspiration in loanwords** (*palam* "fruit" vs *phalam* "result"). The aspirated series is largely Sanskrit/English-derived, and English speakers have a *partial advantage* (English voiceless stops are aspirated word-initially). The real risk is the reverse: over-aspirating native unaspirated stops.
- **Word-medial consonant clusters** English does not permit (up to five consonants in some words).
- **Dental vs retroflex nasals and laterals** — same contrast, separate minimal pairs, equally confusable.

### Tier 3 — Grammatical/pragmatic, audio less critical

- **Agglutination + case suffixes**: *-il* (locative), *-ilekk* (allative), *-kku/-inu* (dative), *-nte/-uṭe* (genitive). Seven to eight cases are recognized; agglutination blurs the boundaries.
- **SOV order**, consistently head-final: verb last, postpositions, relative clauses *before* the head noun, pro-drop nearly everywhere. The processing load is the clause-final verb.
- **Good news: verbs do not agree** for person, gender or number (unlike Tamil/Telugu/Kannada, and unlike Hindi/Spanish). They inflect for tense, mood, aspect only — a burden English speakers brace for that Malayalam does not impose.
- **Politeness levels.** *nee* is [-honorific] (inferiors, close juniors, God); *ningal* is neutral plural but honorific for a singular addressee; *taankal* is high honorific. Third person: *awan/awaL* nonhonorific, *ayaan/iyaaL* neutral, *addeham* +honorific; *avar* is plural but also honorifically refers to a singular feminine referent. The safest native strategies — to teach first — are **pronoun avoidance** (pro-drop) and **title substitution**. Social-cost errors, not comprehension errors.

**Hardest overall:** ഴ, then dental/retroflex/alveolar, then gemination, then vowel length.

---

## 2. Existing Resources and the Gap

| Resource | Strengths | Weaknesses |
|---|---|---|
| *Learn Malayalam in 30 Days* (Meenakshi Amma, Balaji) | Cheap (~$3–4); Roman transliteration removes the alphabet barrier | Typos, pronunciation errors, dated/illegible print; 30-day claim widely called exaggerated |
| **Ling** app | 4.4/5 Google Play (~1,510 reviews); 200+ lessons; native audio; voice recognition | Crashes; reported grammar and pronunciation errors; $79.99/yr, $149.99 lifetime; Langoly rates 7.1/10, "supplementary only"; **no alphabet module** |
| **uTalk** | ~2,500 words/phrases, 60+ topics, gamified, offline | Vocabulary drill, not grammar or conversation |
| **50Languages** | 100 topic lessons, free beginner tier | Phrasebook-style, no grammar |
| **Memrise** | Community courses exist | No reliable quality data found; treat as unverified |
| **Duolingo** | — | **Does not offer Malayalam** |
| **EliKutty** (YouTube) | Free, frequently updated; Beginners + Pronunciation playlists; UT Austin and All Language Resources both rate it well | Creator is herself a learner, so accent is sometimes less accurate; can feel unstructured for a beginner |
| **UT Austin / Moag**, *Malayalam: A University Course and Reference Grammar* | The serious academic option. 4th ed. (2018) **open access, CC BY-SA**, 25 lessons + audio; supports MAL 506 | Built for **formal written** Malayalam and script literacy; explicitly not colloquial |

**The gap.** Existing options teach either formal/written Malayalam (Moag) or generic phrasebook vocabulary (uTalk, 50Languages, Ling), with audio that is studio-read scripts or absent. **Nobody teaches the actual register of Kerala conversation and movies** — English-heavy code-mixed Manglish — and **nobody does systematic minimal-pair pronunciation training with slow audio**. That is the wedge.

---

## 3. Colloquial Malayalam Specifics

- **Sound dropping and contraction is pervasive**: *entha → ntha*, *ippol → ippo*, *cheyyendayirunnu → cheyyanaarnnu*. Clipped question word + nominalized verb replaces the textbook form: *nee ippo enthaa cheyyunnath?*, not *enthaa cheyyunnu?*
- **Verb-form collapse**: *pokunnu → pokuva*; the *-unnu* finite ending weakens to *-uva/-a*. Historically Malayalam **lost its pronominal verb endings** over roughly two centuries after the 16th, described as entering an "analytical stage, like English" — structural drift, not sloppiness.
- **Suffix assimilation into English words** is the core Manglish mechanic. English nouns take Malayalam case suffixes directly, vowel assimilating: *office-il → officil*, *joli-kku → jolikk*. "Lunch" and "cooking" slot straight into Malayalam grammar. Single most teachable, highest-yield pattern.
- **Question and tag particles**: *-o* (*niyyo?* "and you?", *cheytho?*), additive *-um* (*njanum*), tags *alle?*, *kettiyo?*
- **Code-switching research.** Manglish is the standard term for Malayalam–English code-mixing. The Interspeech 2022 Malayalam–English Twitter corpus documents inter-sentential, intra-sentential and **intra-word** switching (420 intra-word tokens), with ~7,580 Malayalam words in Roman script — romanized code-mixing is first-class, not an edge case. A study of Malayalee-Americans in New York hypothesizes verbs are the part of speech most often switched into English. Related: Manglish sentiment/emotion classification (IEEE 2022; DravidianCodeMix, FIRE 2020); hip-hop code-switching (*Language, Culture and Society*, 2025). A Kochi University field study describes the everyday split: English for academic/professional life, Malayalam for friends and family.

---

## 4. Romanization: Recommendation

**ISO 15919** is precise (*ṭ ḍ ṇ ḻ ṟ ē ō*) but typographically hostile, untypeable on a phone, and **not used by Malayalees**.

**Manglish / Mozhi ASCII** is what Malayalees actually type: case-sensitive (*T/Th/D/N* retroflex vs *th/dh/n* dental), *zh* for ഴ, doubled vowels. Downside: case is meaningful (names go uncapitalized) and it is genuinely ambiguous.

**Recommended learner convention** — ASCII-first, audio-anchored:

- **Long vowels: always double** — *a/aa, i/ii, u/uu, e/ee, o/oo*.
- **Gemination: double the consonant** — *tt, pp, kk, ll, nn*.
- **Retroflex vs dental t/d: `th` = dental ത/ദ, plain `t` = retroflex ട/ഡ.** Matches common Manglish usage and lets English readers lean on the dental association of "th". Geminates fall out naturally: *tth* = ത്ത, *tt* = ട്ട.
- **ഴ = `zh`** — universally recognized by Malayalees and what learners will see in real messages.
- **Offer an ISO 15919 toggle**; **always display Malayalam script alongside**.

**Ambiguities the app must fix by rule, not convention:**

1. Dental vs retroflex (the big one) — real Manglish uses bare `t`/`d` for both. Never render a bare `t` without deciding which.
2. Long vs short vowels — enforce doubling strictly.
3. **`ll`/`nn` collide**: doubling can mean geminate ല്ല/ന്ന *or* the distinct lateral/nasal ള/ഞ. Give those dedicated symbols (`ḷ`/`L`, `nj`).
4. Capitalization — never use case as a phonemic signal; mobile keyboards auto-capitalize.
5. **State plainly that no romanization is unambiguous and audio is the source of truth.**

---

## 5. Audio Technology (2026)

**Cloud TTS availability**

- **Google Cloud TTS, ml-IN**: reported as 2 Standard + 4 WaveNet voices. Standard/WaveNet/Neural2 support SSML including `<prosody rate>`. **Chirp 3: HD supports neither SSML nor rate/pitch** — unusable for slow audio. (ml-IN list came from a third-party repo; verify against live docs.)
- **Microsoft Azure**: `ml-IN-SobhanaNeural` (female), SSML-capable, ~87 wpm default. One voice only — weak for dialogue variety.
- **Sarvam Bulbul V3** (Feb 2026): 11 languages including Malayalam, 30+ persona voices, pace control, ₹30/10,000 chars in beta. Ranked **highest at 8 kHz telephony** in a 20,000-vote blind study and reports the **lowest error rates on code-mixed input** — directly relevant to Manglish. ElevenLabs v3 alpha still leads on studio full-band.
- **Open source**: AI4Bharat Indic-TTS (ICASSP 2023; FastPitch + HiFi-GAN; includes Malayalam) and Indic Parler TTS (Apache 2.0, no preset voices). A 2026 preference benchmark across 10 Indian languages ranked INDIC F5 **last** — open source still trails commercial badly.

**Slow audio feasibility.** SSML `<prosody rate>` works on Google Standard/WaveNet and Azure. Caveat: naively slowing everything degrades quality and can flatten exactly the timing cues learners need (VOT for place, geminate vs singleton duration). Generate at discrete rates (1.0 / 0.75 / 0.6) and **also** produce segment-level "sound focus" clips; verify empirically that duration contrasts survive each rate.

**Browser Web Speech API.** `speechSynthesis` has been widely available since Sept 2018 and `ml-IN` appears in Chrome's Web Speech language list. **But voice availability is device/OS-dependent**: `getVoices()` can return empty until `voiceschanged` fires, and Chromium without Google's cloud voices falls back to espeak-ng, which has no usable Malayalam. **Pre-generate audio server-side; treat Web Speech API only as an optional fallback.**

**ASR: avoid in v1.** Curated benchmarks look acceptable (IndicWhisper on Vistaar Malayalam: WER 7.6–26.8, avg 13.6), but real-world performance collapses: 32–66 WER on `vividh-test-malayalam`, and the 2026 "Voice of India" benchmark on unscripted telephonic speech found Malayalam WER **≥100%** in harder tiers. Dravidian languages run ~15–20% WER versus ~5–6% for Indo-Aryan; OpenAI models exceeded 55% on Indian speech; Meta's Malayalam/Tamil rates were 2–3× worse than Indian systems. Causes are structural — agglutinative morphology, long words, high vocabulary diversity, sparse token distributions. Two multipliers make it worse here: **learners' non-native accents** and **code-mixed Manglish**. For pronunciation feedback, use **closed-set discrimination** (app plays a minimal pair, learner taps which they heard), not open ASR scoring.

---

## Implications for Curriculum and Audio Design

1. **Sequence pronunciation by perceptual difficulty, not alphabet order.** ഴ first; then dental/retroflex/alveolar; then gemination; then vowel length. These four get slow audio, native-rate audio, and minimal-pair discrimination drills.
2. **Teach SOV and agglutination early via the pattern learners most need**: English noun + assimilated Malayalam suffix (*office → officil*, *joli → jolikk*). High yield, immediately usable, and it is the actual mechanic of the target register.
3. **No verb agreement is a selling point.** Say so explicitly.
4. **Teach colloquial forms as primary forms**, formal written form as a secondary note: *pokuva* not *pokunnu*; *ippo*, *ntha*. Include tag questions (*alle?*, *kettiyo?*) and the *-o* particle by Lesson 3–4 — they carry most conversational turn-taking.
5. **Make politeness a first-class early module** — *nee / ningal / taankal* plus the third-person honorific ladder, with **pro-drop and title substitution as the safe default**.
6. **Two-layer romanization**: ASCII Manglish by default, ISO 15919 toggle, Malayalam script always visible. Enforce the five §4 rules in code, not by convention.
7. **Audio architecture**: pre-generate with Sarvam Bulbul V3 (best on code-mixed Manglish) or Google WaveNet ml-IN as fallback; bake 3 rate tiers plus segment-level sound-focus clips at build time. Do **not** depend on Web Speech API at runtime. Do **not** ship ASR in v1.
8. **Register authenticity is the moat.** Source dialogue from modern Malayalam cinema and real conversation; no competitor occupies this register.

---

## Sources

- ICPhS 2023, perception of Malayalam coronal contrasts: http://www.internationalphoneticassociation.org/icphs-proceedings/ICPhS2023/full_papers/682.pdf
- Local & Simpson 1999, gemination and vowel duration: http://www.phon.ox.ac.uk/jcoleman/Local&Simpson1999.pdf
- Malayalam phonology (vowel length, gemination minimal pairs): https://web.archive.org/web/20210707163437/https://en.wikipedia.org/wiki/Malayalam_language
- Malayalam grammar, SOV, morphology: https://en.wikipedia.org/wiki/Malayalam
- Lexical anaphors and pronouns in Malayalam (politeness): https://www.degruyterbrill.com/de/document/doi/10.1515/9783110818888.113/html
- Romanisation of Malayalam (ISO 15919, Mozhi, Manglish): https://en.m.wikipedia.org/wiki/Romanisation_of_Malayalam
- Mozhi transliteration scheme: https://en-wikipedia--on--ipfs-org.ipns.dweb.link/wiki/Mozhi_%28transliteration%29
- Multiple-criteria Brahmic script romanization (ACL LREC 2022): https://aclanthology.org/2022.lrec-1.718.pdf
- ISO 15919 standard preview: https://www.unige.ch/biblio_info/files/5116/3775/9122/ISO_15919_en.pdf
- Language in India, June 2016 (entha/ntha, ippol/ippo): https://www.languageinindia.com/june2016/v16i6june2016.pdf
- italki, "Real Malayalam at Real Speed — A Phone Call, Decoded": https://www.italki.com/es/podcast/episode/1zxpuo2rqpdztrvodn1acr
- italki, "How to Pronounce Zha": https://www.italki.com/fr/podcast/episode/v5faa61o3qulwfntnnpfvv
- Interspeech 2022, Malayalam-English code-switched corpus: https://www.isca-archive.org/interspeech_2022/manghat22_interspeech.pdf
- IEEE 2022, Manglish sentiment analysis: https://xplorestaging.ieee.org/document/9885285
- Malayalee-American code-switching, New York: https://undergrad-language-research.org/wp-content/uploads/2023/07/Angel-Shaji-slides.pptx.pdf
- Kochi University field study on bilingualism in Kerala: http://jinbun.cc.kochi-u.ac.jp/pdf/20240730-report_2023.pdf
- All Language Resources, EliKutty review: https://www.alllanguageresources.com/learn-malayalam-with-elikutty/
- UT Austin Malayalam program: https://malayalam.la.utexas.edu/
- UT Austin Malayalam textbooks/resources: https://malayalam.la.utexas.edu/resources/textbooks/
- Moag, *Learn Malayalam in 30 Days* (Balaji) review: https://www.amazon.in/gp/customer-reviews/R3VV6AHKSS4KYY?ASIN=1553940458
- Ling app user reviews: https://chrome-stats.com/d/com.simyasolutions.ling.ml/reviews
- Langoly, Ling app review: https://www.langoly.com/ling-app-review/
- Google Cloud TTS supported voices: https://docs.cloud.google.com/text-to-speech/docs/list-voices-and-types
- Google Cloud TTS ml-IN voice listing (third-party): https://github.com/araguaci/google-cloud-text-to-speech-php
- Azure ml-IN Sobhana: https://json2video.com/ai-voices/azure/voices/ml-in-sobhananeural/
- MDN, SpeechSynthesis.getVoices: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices
- Stack Overflow, Web Speech API supported languages (ml-IN): https://stackoverflow.com/questions/23733537/what-are-the-supported-languages-for-web-speech-api-in-html5
- AI4Bharat Indic-TTS: https://github.com/AI4Bharat/Indic-TTS
- Indic Parler TTS (Malayalam voices): https://tts.ai/voices/indic-parler/
- Vistaar / IndicWhisper ASR benchmarks: https://ar5iv.labs.arxiv.org/html/2305.15386
- Adalat AI vividh-test-malayalam: https://huggingface.co/datasets/adalat-ai/vividh-test-malayalam
- The Hindu BusinessLine, speech models and Indian languages: https://www.thehindubusinessline.com/info-tech/openai-meta-speech-models-struggle-with-indian-languages/article70638185.ece
- Jain & Bhowmick 2025, low-resource Indic ASR: https://asmp-eurasipjournals.springeropen.com/counter/pdf/10.1186/s13636-025-00395-5.pdf
- Whisper decoder inconsistencies for Dravidian ASR: https://www.emergentmind.com/papers/2606.09535
- Sarvam Bulbul V3 launch: https://yourstory.com/ai-story/sarvam-ai-bulbul-v3
- Economic Times, Bulbul V3: https://m.economictimes.com/tech/artificial-intelligence/sarvam-ai-launches-bulbul-v3-wins-praise-for-indic-text-to-speech/amp_articleshow/128032979.cms
- ThinnestAI, Malayalam voice AI comparison: https://www.thinnest.ai/solutions/malayalam-voice-ai
- TTS preference benchmark for Indian languages: https://arxiv.org/pdf/2604.21481v1
