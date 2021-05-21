import styled, { css } from "styled-components";
import { ifProp } from "styled-tools";
import { font, palette } from "styled-theme";

import React from "react";
import Link from "react-router-dom/Link";

const fontSize = ({ height }) => `${height / 48}rem`;

const backgroundColor = ({ transparent, disabled }) =>
  transparent ? "transparent" : palette(disabled ? 3 : 2);

const foregroundColor = ({ transparent, disabled }) =>
  transparent ? palette(disabled ? 3 : 2) : palette("grayscale", 1, true);

const borderRadius = ({ round }) => {
  switch (round) {
    case "all":
      return "1.75em";
    case "right":
      return "0 1.75em 1.75em 0";
    case "left":
      return "1.75em 0 0 1.75em";
    default:
      return "0";
  }
};

export const styles = css`
  display: inline-flex;
  font-family: ${font("primary")};
  font-weight: ${ifProp("transparent", "300", "bold")};
  align-items: center;
  white-space: nowrap;
  font-size: ${fontSize};
  border: 0.0625em solid ${ifProp("transparent", "currentcolor", "transparent")};
  height: 3em;
  justify-content: center;
  text-decoration: none;
  cursor: ${ifProp("disabled", "default", "pointer")};
  appearance: none;
  padding: 0 1em;
  border-radius: ${borderRadius};
  box-sizing: border-box;
  pointer-events: ${ifProp("disabled", "none", "auto")};
  transition: background-color 250ms ease-out, color 250ms ease-out,
    border-color 250ms ease-out;
  background-color: ${backgroundColor};
  color: ${foregroundColor};
  opacity: ${ifProp("disabled", "0.4", "unset")};

  &:active {
    box-shadow: 0px 0.3125em 0.625em rgba(0, 0, 0, 0.24),
      0px 0px 0.625em rgba(0, 0, 0, 0.12),
      inset 0px -0.5em 0.5em rgba(0, 0, 0, 0.3);
  }
  &:focus {
    outline: 0;
  }
`;

export const StyledLink = styled(
  ({ disabled, transparent, reverse, palette, height, theme, ...props }) => (
    <Link {...props} />
  )
)`
  ${styles}
`;

export const Anchor = styled.a`
  ${styles}
`;
export const StyledButton = styled.button`
  ${styles}
`;
