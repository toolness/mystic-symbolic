import { Random } from "./random";
import { range } from "./util";
import { hsluvToHex } from "hsluv";

/**
 * Clamp the given number to be between 0 and 255, then
 * convert it to hexadecimal.
 */
export function clampedByteToHex(value: number): string {
  if (value < 0) {
    value = 0;
  } else if (value > 255) {
    value = 255;
  }
  let hex = value.toString(16);
  if (hex.length === 1) {
    hex = "0" + hex;
  }
  return hex;
}

/*
function createRandomColor(rng: Random): string {
  const rgb = range(3).map(() => rng.inRange({ min: 0, max: 255, step: 1 }));
  return "#" + rgb.map(clampedByteToHex).join("");
}
*/

function createRandomColor(rng: Random): string {
    let hue: number = rng.inRange({ min: 0, max: 360, step: 1 });
    let saturation: number = rng.inRange({ min: 0, max: 100, step: 1 });
    let lightness: number = rng.inRange({ min: 0, max: 100, step: 1 });
    let randcol_hex: string = hsluvToHex([hue, saturation, lightness]);
    return randcol_hex;
}

/**
 * Create a random color palette with the given number of
 * entries, optionally using the given random number generator.
 *
 * The return value is an Array of strings, where each string is
 * a color hex hash (e.g. `#ff0000`).
 */
export function createRandomColorPalette(
  numEntries: number,
  rng: Random = new Random()
): string[] {
  return range(numEntries).map(() => createRandomColor(rng));
}
