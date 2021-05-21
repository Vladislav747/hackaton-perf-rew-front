import styled from "styled-components";
import { Link } from "react-router-dom";
import { palette } from "styled-theme";

import { ReactComponent as HamburgerMenuIcon } from "../../../../assets/svgs/streetsOnline/Archive/HamburgerMenu.svg";
import { mediaQueries } from "../../../../helpers/styled-components";

export const MenuStyled = styled.div`
  display: none;
  ${mediaQueries("md")`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    padding: 0;
`};
`;

export const MenuLinkStyled = styled(Link)`
  font-size: 18px;
  line-height: 21px;
  text-decoration: none;
  display: inline;
  margin: 0 1em;
  &:visited {
    color: ${palette("grayscale", 1)};
  }
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledHamburgerMenuIcon = styled(HamburgerMenuIcon)`
  cursor: pointer;
  rect {
    fill: #000;
  }
  &:hover,
  &.active {
    rect {
      fill: #b0db43;
    }
  }
`;
