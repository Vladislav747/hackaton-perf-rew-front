import { reversePalette } from "styled-theme/composer";

const theme = {};

theme.palette = {
  primary: ["#1C346E", "#264796", "#2C66BE", "#65AFFF", "#BBDCFF", "#91C6FF"],
  secondary: ["#FF6700", "#E27307", "#FF6B55", "#f8bbd0", "#606875", "#283241"],
  success: ["#41C911"],
  danger: ["#C91111"],
  white: ["#fff", "#fff", "#eee"],
  grey: ["#e2e2e2"],
  grayscale: [
    "#212121",
    "#4d4d4d",
    "#616161",
    "#9e9e9e",
    "#bdbdbd",
    "#e0e0e0",
    "#eeeeee",
    "#ffffff",
  ],
  default: ["#000000"],
  hoverIcon: ["#ff0505", "#848484", "#222", "#33b52d", "#b0db43"],
  hoverText: ["#4479c9", "#f2f2f2"],
  buttonPrimaryColor: ["#2C66BE", "#264796"],
  buttonDangerColor: ["#CA2121", "#B61717"],
};

theme.reversePalette = reversePalette(theme.palette);

theme.fonts = {
  primary: "Roboto, sans-serif",
};

theme.sizes = {
  maxWidth: "1100px",
};

export default theme;
