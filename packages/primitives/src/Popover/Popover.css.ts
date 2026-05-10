import { style } from "@vanilla-extract/css";
import {
  color,
  elevation,
  fontFamily,
  fontSize,
  radius,
  space,
  zIndex,
} from "@catylast/tokens";

export const content = style({
  background: color.surface.overlay,
  color: color.text.primary,
  border: `1px solid ${color.border.default}`,
  borderRadius: radius.md,
  boxShadow: elevation.lg,
  padding: space[12],
  fontFamily: fontFamily.sans,
  fontSize: fontSize.sm,
  minWidth: "220px",
  zIndex: zIndex.popover,
  outline: "none",
});

export const arrow = style({
  fill: color.surface.overlay,
});
