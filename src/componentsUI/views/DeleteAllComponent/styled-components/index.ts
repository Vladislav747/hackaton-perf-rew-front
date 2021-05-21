import styled from "styled-components";
// @ts-ignore-start
import { palette } from "styled-theme";
import { mediaQueries } from "../../../../helpers/styled-components";

export const DeleteContainer = styled.div`
  cursor: pointer;
  display: flex;
  padding: 0 24px;
  ${mediaQueries("sm")`
    padding: 0 18px;
  `};
  & svg {
    width: 1.2em;
    height: 1.2em;
  }
    &:hover {
      & svg path{
        fill: ${palette("hoverIcon", 0)};
      }
    }
  }

`;

export const DeleteIconContainer = styled.div`
  margin-right: 0.5em;
  display: flex;
  align-items: center;
`;

export const DeleteBtnText = styled.span`
  border: none;
  font-weight: 400;
  outline: none;
  display: flex;
  align-items: center;

  &:hover {
    color: ${palette("hoverText", 0)};
  }
`;
