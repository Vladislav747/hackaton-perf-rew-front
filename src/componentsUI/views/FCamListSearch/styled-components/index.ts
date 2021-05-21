import styled from "styled-components";
//@ts-ignore
import { palette } from "styled-theme";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  position: relative;
`;

export const IconContainer = styled.div`
  position: absolute;
  right: 0;
  width: 1.2em;
  height: 1.2em;
  padding-right: 1em;
  line-height: 1.5;
  & svg {
    width: 1.2em;
    height: 1.2em;
    fill: ${palette("grayscale", 2)};
    stroke: none;
  }
`;

export const InputStyled = styled.input<InputStyledProps>`
  position: relative;
  height: calc(1.5em + 0.5rem + 2px);
  width: 100%;
  padding: 0.25rem 1.8rem 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid ${palette("grayscale", 3)};
  &:active,
  :focus {
    border: 1px solid ${palette("primary", 4)};
    box-shadow: 0 0 0 1px ${palette("primary", 4)};
  }
`;
export const ClearIconContainer = styled.span`
  position: absolute;
  cursor: pointer;
  right: 0.5rem;
  width: 1em;
  height: 1em;
  & svg {
    width: 1em;
    height: 1em;
    fill: ${palette("grayscale", 3)};
    stroke: none;
  }
`;
