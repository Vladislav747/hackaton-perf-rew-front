import styled, { keyframes } from "styled-components";
import { mediaQueries } from "../../../../helpers/styled-components";

const fadeIn = keyframes`
  0% {  opacity: 0; }
  100% { opacity: 1; }
`;

export const MobileInterfaceContainer = styled.div<
  MobileInterfaceContainerProps
>`
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  background: rgba(57, 57, 58, 0.3);
  animation: ${fadeIn} 250ms;
  z-index: 1;

  display: none;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "hd . . . fullscreen"
    ". . . . ."
    "back . play . forward"
    ". . . . ."
    ". . . . .";

  .back {
    grid-area: back;
    width: 4rem;
    height: 4rem;
  }
  .play {
    grid-area: play;
    width: 4rem;
    height: 4rem;
  }
  .forward {
    grid-area: forward;
    width: 4rem;
    height: 4rem;
  }
  .fullscreen {
    grid-area: fullscreen;
    width: 2rem;
    height: 2rem;
  }
  .hd {
    grid-area: hd;
    width: 2rem;
    height: 2rem;
    fill: ${(props: MobileInterfaceContainerProps) =>
      props.hdActive ? "#91C6FF" : "white"};
    stroke: none;
  }

  ${mediaQueries("md")`
     display: grid;
  `};

  & > svg {
    cursor: pointer;
  }
`;
