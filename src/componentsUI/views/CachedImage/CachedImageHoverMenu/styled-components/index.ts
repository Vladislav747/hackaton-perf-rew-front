import styled, { keyframes } from "styled-components";
//@ts-ignore
import { palette } from "styled-theme";

import { ReactComponent as PlayIcon } from "../../../../../assets/img/play.svg";
import { ReactComponent as ArchiveIcon } from "../../../../../assets/img/archive.svg";

const fadeIn = keyframes`
  0% {  opacity: 0; }
  100% { opacity: 1; }
`;

export const CamHoverContainer = styled.div`
  display: flex;
  background: rgba(57, 57, 58, 0.3);
  border-radius: 0px 0px 10px 10px;
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  box-sizing: border-box;
  animation: ${fadeIn} 250ms;
  &.cam-hover-container--no-preview {
    background: rgb(44, 102, 190);
  }
`;

export const CamHoverMenu = styled.div`
  border-radius: 0px 0px 10px 10px;
  display: flex;
  flex: 1 1 auto;
  justify-content: space-around;
  align-items: center;
  position: relative;
`;

export const HoverPlayBtn = styled(PlayIcon)`
  cursor: pointer;
  z-index: 1;
  max-width: 30%;

  &:hover {
    & path {
      opacity: 0.8;
    }
  }
`;

export const ArchivePlayBtn = styled(ArchiveIcon)`
  cursor: pointer;
  z-index: 1;
  max-width: 30%;
  &:hover {
    & path {
      opacity: 0.8;
    }
  }
`;
