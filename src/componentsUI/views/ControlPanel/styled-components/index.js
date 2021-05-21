import styled from "styled-components";
// @ts-ignore-start
import { ifProp } from "styled-tools";

export const BtnContainer = styled.div`
  width: 100%;
  height: auto;
  & svg {
    fill: ${ifProp("active", "#4479C9", "#4d4d4d")};
    stroke: none;
    cursor: pointer;
  }
`;

export const ControlPanelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex: 1 1 auto;
  justify-content: space-between;
  align-items: center;
`;
