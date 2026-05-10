import { style, styleVariants } from "@vanilla-extract/css";
import {
  color,
  fontFamily,
  fontSize,
  fontWeight,
  radius,
  space,
} from "@catylast/tokens";

export const root = style({
  display: "inline-flex",
  alignItems: "center",
  gap: space[4],
  padding: `${space[2]} ${space[6]}`,
  borderRadius: radius.xs,
  fontFamily: fontFamily.sans,
  fontSize: fontSize.xs,
  fontWeight: fontWeight.semibold,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  whiteSpace: "nowrap",
  border: "1px solid transparent",
});

export const variant = styleVariants({
  default: {
    background: color.surface.sunken,
    color: color.text.secondary,
    borderColor: color.border.subtle,
  },
  primary: {
    background: color.accent.background,
    color: color.accent.text,
  },
  success: {
    background: color.success.background,
    color: color.success.text,
  },
  warning: {
    background: color.warning.background,
    color: color.warning.text,
  },
  danger: {
    background: color.danger.background,
    color: color.danger.text,
  },
});
