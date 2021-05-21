import styled from "styled-components";
// @ts-ignore-start
import { ifProp } from "styled-tools";

export const ControlsContainer = styled.div<ControlsContainerStyled>`
  display: ${(props: ControlsContainerStyled) =>
    props.hoverMenu || props.showControl ? `` : `none`};
  position: absolute;
  width: 100vw;
  height: 10vh;
  min-height: 10vh;
  padding: 0;
  bottom: 0;
  z-index: 100;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 100%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 50;
`;

export const BtnContainer = styled.div<BtnContainerStyled>`
  width: 20px;
  height: 20px;
  margin: 10px;
  cursor: pointer;
  & svg {
    fill: ${ifProp("active", "#4479C9", "#4d4d4d")};
    stroke: none;
    cursor: pointer;
  }
`;

export const SliderContainer = styled.div<SliderContainerStyled>`
  display: ${ifProp("show", "flex", "none")};
  flex-direction: row;
  position: absolute;
  width: 80px;
`;
