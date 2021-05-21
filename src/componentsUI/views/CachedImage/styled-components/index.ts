import styled, { keyframes } from "styled-components";
//@ts-ignore
import { palette } from "styled-theme";

import { ReactComponent as PlayIcon } from "../../../../assets/img/play.svg";
import { ReactComponent as ArchiveIcon } from "../../../../assets/img/archive.svg";

const loadind = keyframes`
    100% {
        transform: translateX(100%);
    }
`;

const fadeIn = keyframes`
  0% {  opacity: 0; }
  100% { opacity: 1; }
`;

export const Sceleton = styled.figure`
  position: relative;
  background-color: ${palette("grey", 0)};

  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
  border-radius: 0px 0px 10px 10px;
  display: block;

  &::after {
    display: block;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(162, 159, 159, 0.2),
      transparent
    );
    animation: ${loadind} 1.5s infinite;
  }
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
    background: ${palette("primary", 2)};
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

export const NoPreviewContainer = styled.div`
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  border-radius: 0px 0px 4px 4px;
  background: ${palette("primary", 2)};
  color: #fff;
  font-weight: 400;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

export const FailedImgContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 100%;
  width: 100%;
  border-radius: 0px 0px 4px 4px;
`;

export const Img = styled.img`
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  border-radius: 0px 0px 4px 4px;
`;

export const CameraImgContainer = styled.div`
  width: 100%;
  height: 100%;
`;
