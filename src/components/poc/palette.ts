/**
 * POC palette (visual proof of concept, branch poc-visuals).
 *
 * A self-contained warm palette for the drawn tea-shop panels. It is
 * deliberately NOT the app's green-paper token set: the panels are
 * illustrations and read the same in light and dark mode, like an image
 * would. `ink` outlines everything at a chunky 2 units in a 320x200
 * viewBox — the flat-vector look the panels are going for.
 */
export const PALETTE = {
  /** Outline for every drawn shape. Warm near-black, never pure black. */
  ink: "#2b201a",
  skyTop: "#a8cfe0",
  skyLow: "#dbe9ea",
  sun: "#f4e3b8",
  palm: "#3f7a4b",
  palmDark: "#2f5c39",
  trunk: "#7a5a3c",
  road: "#b0705a",
  roadDark: "#95573f",
  wall: "#efe0c6",
  wallShade: "#ddc9a6",
  roof: "#a8503c",
  roofDark: "#84392a",
  wood: "#8a5a34",
  woodDark: "#5e3b22",
  steel: "#cfd6d8",
  steelDark: "#9aa4a8",
  tea: "#c9722c",
  teaLight: "#e0a05e",
  milk: "#d9a05b",
  skin: "#b57a52",
  skinDark: "#96603d",
  shirt: "#e6e0d0",
  shirtDark: "#c9c1ac",
  towel: "#f6f1e4",
  trouser: "#4a5566",
  trouserDark: "#39414f",
  glass: "#eaf2f3",
  board: "#2f4034",
  /** Dialogue-box chrome */
  box: "#3a2a20",
  boxEdge: "#f2e4c8",
  boxShadow: "#1d1410",
} as const;
