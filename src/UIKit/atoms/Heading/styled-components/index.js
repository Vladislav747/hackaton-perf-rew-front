import { css } from "styled-components";
import { font } from "styled-theme";

const fontSize = ({ level }) => {
  switch (level) {
    case 1:
      return "2.75rem";
    case 2:
      return "2.25rem";
    case 3:
      return "1.75rem";
    default:
      return "1.25rem";
  }
};

const lineHeight = ({ level }) => {
  switch (level) {
    case 1:
      return "3.25rem";
    case 2:
      return "2.75rem";
    case 3:
      return "2rem";
    default:
      return "1.5rem";
  }
};

const letterSpacing = ({ level }) => {
  switch (level) {
    case 1:
      return "-0.02em";
    case 2:
      return "-0.01em";
    default:
      return "normal";
  }
};

export const styles = css`
  font-family: ${font("primary")};
  font-weight: bold;
  font-size: ${fontSize};
  line-height: ${lineHeight};
  letter-spacing: ${letterSpacing};
`;
