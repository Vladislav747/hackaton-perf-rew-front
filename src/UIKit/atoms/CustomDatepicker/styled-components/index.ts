import styled from "styled-components";
// @ts-ignore-start
import { palette } from "styled-theme";

export const CustomDatepickerContainer = styled.span`
  text-decoration-line: underline;
  color: ${palette("primary", 5)};
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    color: ${palette("primary", 4)};
  }
`;
