import styled from "styled-components";
// @ts-ignore-start
import { palette } from "styled-theme";

export const SpanLink = styled.a`
  cursor: pointer;
  text-align: center;
  color: ${palette("primary", 4)};
  &:hover {
    color: ${palette("primary", 5)};
  }
`;

export const TooltipLink = styled.a`
  opacity: 0.5;
`;
