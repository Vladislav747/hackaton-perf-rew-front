import { palette } from "styled-theme";
import styled from "styled-components";
import Checkbox from "rc-checkbox";
// @ts-ignore-start
import { ifProp } from "styled-tools";
import Heading from "../../../../UIKit/atoms/Heading";

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  height: 2em;
  padding-bottom: 16px;
`;
export const HeadingStyled = styled(Heading)`
  padding-left: ${ifProp("withicon", "1rem", "2.2rem")};
  overflow: hidden;
  color: ${palette("primary", 2)};
  display: inline;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const IconContainer = styled.div`
  cursor: pointer;
  width: 1.2em;
  height: 1.2em;
  & svg {
    width: 1.2em;
    height: 1.2em;
    fill: ${palette("grayscale", 2)};
    stroke: none;
  }
`;

export const Grow = styled.div`
  flex-grow: 1;
`;

export const CheckboxStyled = styled(Checkbox)`
  /*padding-left: 1em;*/
`;

export const SelectableLabel = styled.label`
  margin-right: 15px;
  width: 1.2em;
  height: 1.2em;
`;

export const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
