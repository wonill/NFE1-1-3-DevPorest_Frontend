export const COLORS = {
  MAIN_GREEN: "#88CD34",
  MAIN_GREEN2: "#3E5617",
  LIGHTGREEN_BG: "#F7FAED",
  LIGHTGREEN_GRAY: "#ACB59D",
  LIGHTGREEN_SUB: "#A2C3A4",
  MAIN_GRAY: "#ABABAB",
  MAIN_BLACK: "#201E50",
  MAIN_BG: "#FFFFFF",
  RED: "#FE5F55",
};

export const PADDINGS = {
  X_SMALL: "0.75rem",
  SMALL: "1rem",
  MEDIUM: "1.5rem",
  LARGE: "2rem",
  X_LARGE: "3rem",
};

export const FONT_SIZE = {
  HEADING1: "3rem",
  HEADING2: "2.25rem",
  HEADING3: "1.5rem",
  CONTENT: "1rem",
  DESCRIPTION: "0.875rem",
  TAG: "0.75rem",
};

export const FONT_WEIGHT = {
  THICKER: "700",
  THICK: "600",
  DEFAULT: "400",
  THIN: "300",
};

export const BORDER_RADIUS = {
  CIRCLE: "50%",
  DEFAULT: "0.5rem",
  HALF_CIRCLE: "100rem",
};

export const theme = {
  COLORS,
  PADDINGS,
  FONT_SIZE,
  FONT_WEIGHT,
  BORDER_RADIUS,
};

export type ThemeType = typeof theme;
