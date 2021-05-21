import styled from "styled-components";
import { Link } from "react-router-dom";

import { mediaQueries } from "../../../../helpers/styled-components";
import { ReactComponent as BackSvgBtn } from "../../../../assets/svgs/streetsOnline/Archive/BackV2.svg";

export const ArchiveWrapper = styled.div`
  flex: 1 1 100%;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-direction: row;

  height: calc(1288px * 0.56 + 2.5em);
  width: 100%;

  @media (max-width: 1288px) {
    height: calc(100vw * 0.56 + 2.5em);
  }

  @media (max-width: 960px) {
    flex: 1 1 auto;
    flex-direction: column;
    height: 100%;
  }
`;

export const RowWithClose = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 2.5em;
  width: 100%;
`;

export const ArchiveContainerWithClose = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  max-width: 1288px;
`;

export const ArchivePlayerWrapper = styled.div`
  flex: 5 1 auto;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const FlexRaw = styled.div`
  flex: 1 1 auto;
  width: 1rem;
  max-width: 1rem;
  @media (max-width: 960px) {
    height: 10px;
    max-height: 10px;
    max-width: 100%;
  }
`;

export const EventsContainer = styled.div`
  flex: 4 1 auto;
  max-height: 100%;
  min-width: 230px;
  display: flex;
  position: relative;
  @media (max-width: 960px) {
    flex: 1 0 auto;
    min-height: 250px;
    min-width: 100%;
    margin-bottom: 10px;
  }
`;

export const PlayerWrapper = styled.div`
  display: flex;
  flex: 0 0 100%;
  min-height: 100%;
  flex-direction: column;
  position: relative;
`;

export const HeadViewContainer = styled.div`
  flex: 1 1 auto;
  box-sizing: border-box;
  display: flex;
  max-height: 2rem;
`;

export const ContainerWithControll = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  position: relative;
`;

export const PlayerContainer = styled.div`
  flex: 56 1 auto;
  position: relative;
  ${mediaQueries("md")`
     padding-bottom: 56.6%;
     @-moz-document url-prefix() {
       padding-bottom: 56.6%;
     }
  `};
`;

export const VideoContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  background-color: black;
  flex: 1 1 auto;
  flex-direction: column;
  border-radius: 0 0 10px 10px;
  height: 100%;
  width: 100%;
  min-height: 100%;
  min-width: 100%;
`;

export const CameraContainerCloseWrapper = styled.div`
  cursor: pointer;
`;

export const CameraContainerCloseWrapperCloseText = styled.span`
  font-weight: 400;
  color: #333333;
`;

export const BackSvgBtnStyled = styled(BackSvgBtn)`
  margin-right: 9px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;
