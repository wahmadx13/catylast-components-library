import { primitives, semantic } from "./definitions";
import { makeVars } from "./_buildVars";

const colorPrimitiveVars = makeVars(primitives.color, ["color"]);
const colorSemanticVars = makeVars(semantic.light.color, ["color"]);

/**
 * Color tokens — primitive ramps and theme-aware semantic colors, both under
 * the same `color` namespace.
 *
 * Primitive ramps (escape hatch — reach for these only when no semantic
 * token fits): `color.neutral`, `color.blue`, `color.red`, `color.yellow`,
 * `color.green`, `color.purple`.
 *
 * Semantic groups (preferred): `color.surface`, `color.text`, `color.border`,
 * `color.accent`, `color.danger`, `color.success`, `color.warning`.
 */
export const color = { ...colorPrimitiveVars, ...colorSemanticVars };

export const space = makeVars(primitives.space, ["space"]);
export const radius = makeVars(primitives.radius, ["radius"]);
export const fontFamily = makeVars(primitives.font.family, ["font", "family"]);
export const fontSize = makeVars(primitives.font.size, ["font", "size"]);
export const fontWeight = makeVars(primitives.font.weight, ["font", "weight"]);
export const lineHeight = makeVars(primitives.font.lineHeight, ["font", "line-height"]);
export const borderWidth = makeVars(primitives.borderWidth, ["border-width"]);
export const motion = makeVars(primitives.motion, ["motion"]);
export const zIndex = makeVars(primitives.zIndex, ["z-index"]);
export const elevation = makeVars(semantic.light.elevation, ["elevation"]);

export { TOKEN_PREFIX } from "./_buildVars";
