import { style } from "@vanilla-extract/css";
import {
  color,
  elevation,
  fontFamily,
  fontSize,
  fontWeight,
  radius,
  space,
  zIndex,
} from "@catylast/tokens";

export const content = style({
  background: color.surface.overlay,
  color: color.text.primary,
  border: `1px solid ${color.border.default}`,
  borderRadius: radius.sm,
  boxShadow: elevation.md,
  padding: `${space[4]} ${space[8]}`,
  fontFamily: fontFamily.sans,
  fontSize: fontSize.xs,
  fontWeight: fontWeight.medium,
  maxWidth: "240px",
  zIndex: zIndex.tooltip,
});

export const arrow = style({
  fill: color.surface.overlay,
});
