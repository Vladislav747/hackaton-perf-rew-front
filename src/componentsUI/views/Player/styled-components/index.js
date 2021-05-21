import styled, { keyframes } from "styled-components";

import IosPlayer from "../../../../helpers/IosPlayer";
import EzHlsPlayer from "../../../../helpers/EzHlsPlayer";

import { ReactComponent as PlayIcon } from "../../../../assets/img/play.svg";

const correctPlayerStyles = `
    box-sizing: border-box;
    /* Fix video height */
    margin-bottom: -4px;

    /*noinspection CssInvalidPseudoSelector*/
    video::-webkit-media-controls-enclosure {
        display: none !important;
    }

    /*noinspection CssInvalidPseudoSelector*/
    video::-webkit-media-controls {
        display: none !important;
    }

    /*  Из сафари */
    /*noinspection CssInvalidPseudoSelector*/
    video::-webkit-media-controls-panel {
        display: none !important;
    }

    /*noinspection CssInvalidPseudoSelector*/
    video::-webkit-media-controls-play-button {
        display: none !important;
    }

    /*noinspection CssInvalidPseudoSelector*/
    video::-webkit-media-controls-current-time-display {
        display: none !important;
    }

    /*noinspection CssInvalidPseudoSelector*/
    video::-webkit-media-controls-time-remaining-display {
        display: none !important;
    }

    /*noinspection CssInvalidPseudoSelector*/
    video::-webkit-media-controls-timeline {
        display: none !important;
    }

    /*noinspection CssInvalidPseudoSelector*/
    video::-webkit-media-controls-mute-button {
        display: none !important;
    }

    /*noinspection CssInvalidPseudoSelector*/
    video::-webkit-media-controls-volume-slider {
        display: none !important;
    }

    /*noinspection CssInvalidPseudoSelector*/
    video::-webkit-media-controls-fullscreen-button {
        display: none !important;
    }

    /*noinspection CssInvalidPseudoSelector*/
    video::-internal-media-controls-download-button {
        display: none !important;
    }

    /* Из фаерфокса */

    *::-moz-list-bullet,
    *::-moz-list-number {
        display: none !important;
    }

    /*noinspection CssInvalidPseudoSelector*/
    *::-moz-meter-bar {
        display: none !important;
    }

    :-moz-full-screen:not(:root)::backdrop {
        display: none !important;
    }

    *::backdrop {
        display: none !important;
    }
`;

export const IosPlayerStyled = styled(IosPlayer)`
  ${correctPlayerStyles}
`;

export const HlsPlayerStyled = styled(EzHlsPlayer)`
  ${correctPlayerStyles}
`;

export const VideoContainer = styled.div`
  position: absolute;
  box-sizing: border-box;
  /*height: 100%;*/
  overflow: hidden;
  min-height: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`;

export const fadeIn = keyframes`
  0% {  opacity: 0; }
  100% { opacity: 1; }
`;

export const CamHoverContainer = styled.div`
  display: flex;
  background: rgba(57, 57, 58, 0.3);
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  animation: ${fadeIn} 250ms;
`;

export const LoaderContainer = styled.div`
  position: absolute;
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const CamHoverMenu = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HoverPlayBtn = styled(PlayIcon)`
  cursor: pointer;
  z-index: 1;
`;
