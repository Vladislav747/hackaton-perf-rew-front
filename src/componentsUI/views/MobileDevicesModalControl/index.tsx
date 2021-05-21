import React from "react";

import { MobileInterfaceContainer } from "./styled-components";

import { ReactComponent as PlayIcon } from "../../../assets/svgs/streetsOnline/Archive/Play.svg";
import { ReactComponent as PauseIcon } from "../../../assets/svgs/streetsOnline/Archive/Pause.svg";
import { ReactComponent as ForwardIcon } from "../../../assets/svgs/streetsOnline/Archive/Forward.svg";
import { ReactComponent as BackIcon } from "../../../assets/svgs/streetsOnline/Archive/Back.svg";
import { ReactComponent as FullscreenIcon } from "../../../assets/svgs/streetsOnline/Archive/Fullscreen.svg";
import { ReactComponent as HdIcon } from "../../../assets/img/player/HD.svg";

const MobileDevicesModalControl = (props: MobileDevicesModalControlProps) => {
  const {
    fiveSecondBack: fiveSecondBackProps,
    fiveSecondForward: fiveSecondForwardProps,
    clickFullscreen: clickFullscreenProps,
    hdActive: hdActiveProps,
    live: liveProps,
    isPlaying: isPlayingProps,
    clickPlay: clickPlayProps,
    clickHd: clickHdProps,
  } = props;
  return (
    <MobileInterfaceContainer hdActive={hdActiveProps}>
      {liveProps ? null : (
        <BackIcon className="back" onClick={() => fiveSecondBackProps()} />
      )}
      {isPlayingProps ? (
        <PauseIcon className="play" onClick={() => clickPlayProps(false)} />
      ) : (
        <PlayIcon className="play" onClick={() => clickPlayProps(true)} />
      )}
      {liveProps ? null : (
        <ForwardIcon
          className="forward"
          onClick={() => fiveSecondForwardProps()}
        />
      )}
      <FullscreenIcon
        className="fullscreen"
        onClick={() => clickFullscreenProps()}
      />
      {liveProps ? (
        <HdIcon className="hd" onClick={() => clickHdProps(!hdActiveProps)} />
      ) : null}
    </MobileInterfaceContainer>
  );
};

export default MobileDevicesModalControl;
