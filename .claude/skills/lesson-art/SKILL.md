---
name: lesson-art
description: Decide what gets illustrated, then make or replace the art — generating scene plates and vocabulary objects with Retro Diffusion, and verifying the result inside the real frame. Use before any lesson or scene artwork is created or changed, and whenever generated art needs re-rolling, comparing, or checking in place.
---

# Lesson art

Art is the most expensive thing in this repo per unit of value, and most of the cost is iteration, not generation. This skill is the loop that avoids re-learning. **Read PLAN §5 (scene rulings, composition, plate reuse) and §9 rule 10 (fonts) before starting; they hold the rulings this skill assumes.**

## 1. Does this item get art at all?

Answer this first. The default is **no**.

| Kind | Art? | Form |
|---|---|---|
| Concrete noun that is genuinely an object | **yes** | inventory object, ~24x24 |
| Verb | **yes** | the **action**, with a person doing it — never the bare prop |
| `sound:*` items, minimal pairs | **never** | picture lets the learner answer without hearing the contrast |
| Pronouns | **never** | depicts people; risks encoding gender (PLAN §5, 2026-10-13) |
| Function words, particles, suffixes, copulas | **never** | pattern frames instead |
| Expressions, phrases | **never** | not iconic |
| Sentences | **never** per item | they need scenes; scenes are Level 5's |
| Unit, as a whole | **yes** | one establishing plate per unit, on the gate and completion screens, **never inside a graded step** |

Measured on this corpus: of 287 non-conversational items, about **14** qualify. If you find yourself illustrating more than a handful, re-read the table.

**A verb's picture shows the action, never the object.** An image for `kudikkuva` is a person drinking — not a glass of tea, which is what `chaaya`'s picture already is. A bare prop makes the verb image and the noun image collide, and the learner cannot tell which one the drill is asking about. The person in a verb image does not need to be a recurring character, so this is the one place a face can appear without the identity problem — but keep it consistent in look (South Indian, matching the app's world) so the set does not read as strangers.

## 2. Two methods — never interchangeable

**Generate vocabulary objects, like the plates.** Tried and settled on 2026-10-14: a code-drawn 24x24 sprite set was built with the existing `stampOutlined` primitive, and the user rejected it on sight as "MS Paint again" — the same judgement that killed the hand-drawn tea-shop panels. Code drawing is cheap and perfectly consistent, and it still reads as crude at this size. **Consistency is not worth trading the quality bar for.**

The working recipe for an object:

- **128x128**, `detailed:rd_flux`, `upscale_output_factor: 2`.
- **The object dominates the frame**, with real light and a cast shadow — not a flat icon.
- **A plain warm cream ground** and **warm afternoon light from the left**, stated in the prompt, identical across every object, so a set reads as one family even though each is generated independently.
- 128 native shown at ~155 CSS px keeps the object at the plates' pixel density (~1.2x).

**Generate scene plates for scenery** — same style, 384x264, per §3.

## 3. Generating a plate

1. **Aspect must equal the frame's.** The scene frame is 64:44. Request `384x264` exactly; anything else is cropped or squashed.
2. **`detailed:rd_flux`** is the style for scenery. `default:rd_flux` is the plain one.
3. **Prompt is one descriptive sentence plus a few tags.** Not tag soup. **Never write "pixel art"** — the style does the rendering.
4. **The tier takes no reference images.** Nothing carries a face, a building or a roofline between plates. Plan around it: reuse plates rather than trying to match them.
5. **Generate 2-3 candidates in one call** (`num_images`), then pick. This is cheaper than iterating on one image.
6. `estimate_inference_cost` is **free** — price before spending. `fix_pixel_art` is **free** and reports the true native grid.
7. `upscale_output_factor: 2` returns a 4x blow-up. It changes file size, not art quality.

## 4. Composition — decided before the prompt

- **Nothing the learner must see in the bottom 15%** of a scene plate. The dialogue box sits there. Everything above row 225 of 264 is unobstructed at both phone and desktop widths.
- **The speaker's portrait lives inside the dialogue box**, so the right third of a plate is never covered either.
- **A location a scene returns to reuses the plate it opened with.** Never a second generation of it — two shots of "the same shop" come out as two different shops, at exactly the moment the story says the learner is going back to one they know. Let the caption carry the movement.
- **One plate per camera set-up, not per turn.** The tea shop's seven beats use four plates.
- **Hands are the generator's weak point.** Six fingers, melded grips, a shapeless fist on the resting hand — and rerolling moves the fault rather than removing it. **Compose so no hand is the subject**: a glass on a counter beats a hand setting it down.

## 5. Portraits

- Size to the **display pixel density**, not to taste. The portrait panel is ~24% of a 474px frame and the plate is 384px at that width, so **96x96** puts the face at the same pixel density as the world behind it.
- **One face per speaker.** Per-turn expressions were built and dropped: at the strength that actually moves a face, the man changes — hairline, moustache, shirt colour. `rd_pro__edit` holds better and still is not the same man, at 6x the price. A face that changes between slides is worse than a face that does not move.
- A face that would drift is better left out of the scene entirely — the portrait panel exists to carry identity so the plate does not have to.

## 6. Verify in the frame

Never judge art standalone. Rebuild and look at it in the frame at **360px** as well as desktop — that is where the box and the portrait crop hardest.

`src/app/poc` is served as a **production build**. New files in `public/` are **not** served until `npx next build` runs and the server restarts; a newly added asset 404s until then.

## 7. Cost log

Fast tier is $0.03/image; `rd_pro` is $0.18. A round of 4 plates x 2 candidates is $0.24. Budget the round before starting and say the number out loud. The expensive part is never one image — it is re-rolling because the brief was unclear or the plate was judged outside the frame.

## 8. Unresolved — do not decide these alone

1. **What licence value generated art gets.** `src/content/images/manifest.ts` allows only `CC0 | PD | CC-BY | CC-BY-SA` — all four describe redistributing someone else's work. A generated asset must take one of them and carry a non-empty `source` and `author`, and what those should say is **not yet written down**. Ask.
2. **Whether Retro Diffusion's terms permit commercial redistribution.** That statement covers the Aseprite extension, not the hosted service. Unread; ask before shipping generated art.
3. **Nothing renders `item.image` yet.** There is no image slot in the player, no copy step to `public/`, no `next/image`. Satisfying `content:check` does not make a picture appear.
4. **The checker's image rule cannot fire** — it triggers only on `pos: noun|verb`, and no item has either. Missing art is invisible to CI until the nouns and verbs are tagged.
