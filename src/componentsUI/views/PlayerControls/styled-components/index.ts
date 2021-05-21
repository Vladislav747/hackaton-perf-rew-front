import styled from "styled-components";
//@ts-ignore
import { palette } from "styled-theme";
//@ts-ignore
import { ifProp } from "styled-tools";

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
    rgba(0, 0, 0, 1) 3%,
    rgba(255, 255, 255, 0) 100%
  );
`;

export const BtnContainer = styled.div<BtnContainerStyled>`
  width: 20px;
  height: auto;
  margin: 0 1em;
  & svg {
    fill: ${ifProp("active", "#264796", "#fff")};
    stroke: none;
    cursor: pointer;
    &:hover {
      fill: ${palette("primary", 2)};
    }
  }
`;

export const BtnContainerTop = styled.div`
  width: 20px;
  height: 20px;
  margin: 0 auto;
  & svg {
    fill: white;
    stroke: none;
    cursor: pointer;
  }
`;

export const ControlsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 15%;
  min-height: 35px;
  padding: 0;
  bottom: -10%;
  z-index: 2;
  transition: all 0.2s ease-in-out;

  &._fullscreen {
    height: 10%;
    bottom: -5%;
  }
  &.show {
    bottom: 1%;
  }
`;
