import React from "react";

import Player from "../Player";

import {
  CamContainer,
  CamHeader,
  CamTitle,
  CamMenu,
  PlayerContainer,
} from "./styled-components";

const apiUrl = process.env.REACT_APP_BASE_STREAMS_URL;

const Cam = (props: CamComponentProps) => {
  const {
    NAME: nameProps,
    HLS: hlsUrlProps,
    SNAPSHOT: snapshotProps = { LOSSY: "" },
  } = props;
  const { LOSSY: poster } = snapshotProps;
  return (
    <CamContainer>
      <CamHeader>
        <CamTitle>{nameProps}</CamTitle>
        <CamMenu />
      </CamHeader>
      <PlayerContainer>
        <Player url={`${apiUrl}${hlsUrlProps}`} poster={`${apiUrl}${poster}`} />
      </PlayerContainer>
    </CamContainer>
  );
};

Cam.displayName = "Cam";
export default Cam;
