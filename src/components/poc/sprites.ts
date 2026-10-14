/**
 * The cast and the props, drawn as pixel grids (POC, branch poc-visuals).
 *
 * Every sprite is a list of strings: one character per pixel, '0' empty and
 * 1-f the palette in pixel.ts. They are typed by hand, so they are checked
 * by hand: `sprite()` throws if a row is the wrong length, which turns a
 * miscount into a build error instead of a character leaning over.
 *
 * Characters are drawn inside a 16-wide box with room beside the head, so a
 * raised arm has somewhere to go. The chettan wears a white banian and the
 * learner a steel shirt: the two have to stay apart from each other and
 * from the cream wall, and a one-pixel ink outline at stamp time does the
 * rest.
 */

import { type Grid, type Sprite, box, sprite, stamp } from "./pixel";

/* ------------------------------------------------------------ chettan --- */

/** The head, shared by every pose so his face never changes shape. */
const CHETTAN_HEAD = [
  ".....ffffff.....",
  "....ffddddff....",
  "...ffddddddff...",
  "...fddddddddf...",
  "...fddfddfddf...",
  "...fddddddddf...",
  "....fdffffdf....",
  ".....fddddf.....",
];

const CHETTAN_LEGS = ["..999999999999..", "...9999..9999..."];

/** Standing, arms at his sides. */
export const CHETTAN_REST = sprite([
  ...CHETTAN_HEAD,
  "...2222ff2222...",
  "..222222222222..",
  ".22222222222222.",
  ".dd2222222222dd.",
  ".dd2222222222dd.",
  ".dd2222222222dd.",
  ...CHETTAN_LEGS,
]);

/** Both arms up and out, hands level with his head. The price beat. */
export const CHETTAN_SPREAD = sprite([
  ...CHETTAN_HEAD,
  "dd.fddfddfddf.dd",
  "dd.fddddddddf.dd",
  ".dd.fdffffdf.dd.",
  "..dd.fddddf.dd..",
  "..d2222ff2222d..",
  "..222222222222..",
  ".22222222222222.",
  ".22222222222222.",
  ...CHETTAN_LEGS,
]);

/** Leaning in: both forearms down and out, hands flat on the counter. */
export const CHETTAN_LEAN = sprite([
  ...CHETTAN_HEAD,
  "..d2222ff2222d..",
  ".dd2222222222dd.",
  ".dd2222222222dd.",
  ".dd2222222222dd.",
  "dd.2222222222.dd",
  "dd..22222222..dd",
  ...CHETTAN_LEGS,
]);

/** One arm out to the side at shoulder height, a glass balanced on the hand. */
export const CHETTAN_HOLD = sprite([
  ...CHETTAN_HEAD,
  "...2222ff2222...",
  "..22222222222dd.",
  "..22222222222ddd",
  "..22222222222ddd",
  "..222222222222..",
  "..222222222222..",
  ...CHETTAN_LEGS,
]);

/**
 * The chettan as he appears in the serving hatch from across the road: head
 * and shoulders only, because at that distance that is all there is. Draws
 * him small in the wide shots without shrinking the standing sprite, which
 * would have put his pixels out of step with everyone else's.
 */
export const CHETTAN_HATCH = sprite([
  "..ffff..",
  ".fddddf.",
  "fddddddf",
  "fdffdffd",
  "fddddddf",
  ".ffffff.",
  "..dddd..",
  "22222222",
]);

/* ------------------------------------------------------------ learner --- */

const LEARNER_HEAD = [
  ".....ffffff.....",
  "....ffddddff....",
  "...ffddddddff...",
  "...fddddddddf...",
  "...fddfddfddf...",
  "...fddddddddf...",
  "....fddddddf....",
  ".....fddddf.....",
];

const LEARNER_LEGS = ["..999999999999..", "...9999..9999..."];

/** Walking away: same figure from behind, so the eye row is plain skin. */
export const LEARNER_BACK = sprite([
  ...LEARNER_HEAD.map((row) => (row === "...fddfddfddf..." ? "...fddddddddf..." : row)),
  "...cccccccccc...",
  "..cccccccccccc..",
  ".cccccccccccccc.",
  ".ddccccccccccdd.",
  ".ddccccccccccdd.",
  ".ddccccccccccdd.",
  ...LEARNER_LEGS,
]);

/** One arm up, calling out across the road. */
export const LEARNER_CALL = sprite([
  ".....ffffff.....",
  "dd..ffddddff....",
  "dd.ffddddddff...",
  ".dd.fddddddddf..",
  "..d.fddfddfddf..",
  "..ddfddddddddf..",
  "...d.fddddddf...",
  "....dfddddf.....",
  "..ddcccccccccc..",
  "..cccccccccccc..",
  ".cccccccccccccc.",
  "..cccccccccccdd.",
  "..cccccccccccdd.",
  "..cccccccccccdd.",
  ...LEARNER_LEGS,
]);

/* ---------------------------------------------------------- portraits --- */

/** The chettan's face, close up, over the sky fill the frame uses. */
export const CHETTAN_FACE = sprite([
  "1111111111111111",
  "1111111111111111",
  "11111ffffff11111",
  "1111ffddddff1111",
  "111ffddddddff111",
  "111fddddddddf111",
  "11fddddddddddf11",
  "11fddfddddfddf11",
  "11fddddddddddf11",
  "11fddffffffddf11",
  "11fddddddddddf11",
  "111fddddddddf111",
  "11111dddddd11111",
  "1111aaaaaaaa1111",
  "111aaaaaaaaaa111",
  "11aaaaaaaaaaaa11",
]);

/** The learner's face: same head, no moustache, steel collar. */
export const LEARNER_FACE = sprite([
  "1111111111111111",
  "1111111111111111",
  "11111ffffff11111",
  "1111ffddddff1111",
  "111ffddddddff111",
  "111fddddddddf111",
  "11fddddddddddf11",
  "11fddfddddfddf11",
  "11fddddddddddf11",
  "11fddddddddddf11",
  "11fddddddddddf11",
  "111fddddddddf111",
  "11111dddddd11111",
  "1111cccccccc1111",
  "111cccccccccc111",
  "11cccccccccccc11",
]);

/* -------------------------------------------------------------- props --- */

/** A tea glass: white walls, tea down the middle. */
export const GLASS = sprite([
  ".fff.",
  "f222f",
  "f2e2f",
  "f2e2f",
  "f2e2f",
  "f2e2f",
  ".fff.",
]);

/**
 * The same glass drawn for the close-up. Scaling the small one up three
 * times only scaled its outline three times, and a three-pixel black frame
 * around a three-pixel wall is a black box. Pixel art redraws for the size
 * it will be seen at, so this one carries its own outline, walls two pixels
 * thick, and a highlight down the inside of the tea.
 */
export const GLASS_CLOSE = sprite([
  "..ffffffff..",
  ".f22222222f.",
  ".f2eeeeee2f.",
  ".f2eeeeee2f.",
  ".f2e2eeee2f.",
  ".f2e2eeee2f.",
  ".f2e2eeee2f.",
  ".f2e2eeee2f.",
  ".f2e2eeee2f.",
  ".f2e2eeee2f.",
  ".f2e2eeee2f.",
  ".f2eeeeee2f.",
  ".f2eeeeee2f.",
  ".f22eeee22f.",
  ".f22222222f.",
  ".f22222222f.",
  ".f22222222f.",
  "..ffffffff..",
]);

/** The big aluminium kettle on the counter. */
export const KETTLE = sprite([
  "...ffffff...",
  "..ff....ff..",
  ".cccccccccc.",
  ".c22222222c.",
  "fccccccccccf",
  "fccc2222cccf",
  "fccccccccccf",
  "..cccccccc..",
  ".cccccccccc.",
  "..ffffffff..",
]);

/** A jar of sugar or tea on the shelf. */
export const JAR = sprite([
  ".fff.",
  "f222f",
  "f777f",
  "f777f",
  "f777f",
  "f777f",
  ".fff.",
]);

/** The sugar bowl, spoon standing in it. */
export const SUGAR_BOWL = sprite([
  "...f....",
  "..ff....",
  "..ff....",
  ".ffffff.",
  "f777777f",
  "f777777f",
  ".ffffff.",
]);

/** The tea board above the hatch. The marks stand in for lettering. */
export const TEA_BOARD = sprite([
  "ffffffffffff",
  "f6666666666f",
  "f6226226226f",
  "f6666666666f",
  "ffffffffffff",
]);

/* ------------------------------------------------------------- loader --- */

/**
 * Stamp a sprite with a one-pixel ink outline. The outline is drawn from
 * the silhouette first, then the sprite over it, so a character reads
 * against grass, cream wall or a wooden counter without a second pass.
 */
export function stampOutlined(g: Grid, s: Sprite, x: number, y: number, scale = 1) {
  const filled = (i: number, j: number) => {
    if (i < 0 || j < 0 || i >= s.w || j >= s.h) return false;
    const ch = s.rows[j][i];
    return ch !== "0" && ch !== ".";
  };
  for (let j = -1; j <= s.h; j++) {
    for (let i = -1; i <= s.w; i++) {
      if (filled(i, j)) continue;
      const touching = filled(i - 1, j) || filled(i + 1, j) || filled(i, j - 1) || filled(i, j + 1);
      if (touching) box(g, x + i * scale, y + j * scale, scale, scale, 15);
    }
  }
  stamp(g, s, x, y, scale);
}
