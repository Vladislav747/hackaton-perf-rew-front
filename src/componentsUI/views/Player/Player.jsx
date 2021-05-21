import React, { useState, useRef, useEffect } from "react";
import screenfull from "screenfull";
import Hls from "hls.js";
import _ from "lodash";
import { findDOMNode } from "react-dom";

import PlayerErrorsView from "../PlayerErrorsView";
import sendErrorToSentry from "../../../helpers/sentry";

import { canEnablePIP } from "../../../helpers/device";
import PlayerControls from "../PlayerControls";
import Spinner from "../../../UIKit/atoms/Spinner";
import {
  VideoContainer,
  CamHoverContainer,
  CamHoverMenu,
  HoverPlayBtn,
  LoaderContainer,
  HlsPlayerStyled,
  IosPlayerStyled,
} from "./styled-components";

let hideMenusTimeout = null;
const HIDE_MENU_TIMEOUT = 4000;
const UPDATE_POSTER_TIMEOUT = 5 * 60 * 1000;
const CHECK_REPAIR_INTERVAL = 1 * 60 * 1000;
const QUALITYS = {
  HD: "HD",
  LD: "LD",
};

const isHdCheck = qualityState => QUALITYS.HD === qualityState;

//TODO: Делать скриншот
const createScreenshot = playerRef => {
  if (playerRef) {
    const player = findDOMNode(playerRef.current);
    const canvas = document.createElement("CANVAS");
    canvas.width = player.videoWidth;
    canvas.height = player.videoHeight;
    canvas
      .getContext("2d")
      .drawImage(player, 0, 0, canvas.width, canvas.height);

    const dataUri = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "snapshot.png";
    link.href = dataUri;
    link.click();
  }
};

const PlayerErrorCodes = {
  ok: 0,
  criticalError: 1,
  streamError: 2,
  notFoundError: 3,
};

const Player = props => {
  const {
    //selectedsecondsOffsetFromStartState: newSelectedTimeProp,
    newSelectedTime: newSelectedTimeProp,
    playSpeed: playSpeedProp,
    url: urlProps,
    poster: posterProps,
    playImmediately: playImmediatelyProps,
    showInterface: showInterfaceProps,
    showSpinner: showSpinnerProps,
    getScreenshot: getScreenshotProps,
    archiveMode: archiveModeProps,
    startTime: startTimeProps,
    onUpdateProgressBar: onUpdateProgressBarProps,
    onStop: onStopProps,
    isPlaying: isPlayingProps,
    setPlaying: setPlayingProps,
    sideHd: sideHdProps,
    setArchiveCursorLocked: setArchiveCursorLockedProps,
    playingState: playingStateProps,
    suspend: suspendProps,
    playerReadyForCaruselCallback: playerReadyForCaruselCallbackProps,
    sideStop: sideStopProps,
    addCameraToActive: addCameraToActiveProps,
    removeCameraFromActive: removeCameraFromActiveProps,
    cameraId: cameraIdProps,
    fragmentOffset: fragmentOffsetProps,
    live: liveProps,
    muteStatus: muteStatusProps,
    volumeLevel: volumeLevelProps,
    onCantPlayAfterReload: onCantPlayAfterReloadProps,
    updateVideoProgress: updateVideoProgressProps,
    currentVideoTime: currentVideoTimeProps,
    setCurrentPlaylistDurarion: setCurrentPlaylistDurarionProps,
    setNeedUserStartPlayFlag: setNeedUserStartPlayFlagProps,
    loadNextPlaylist: loadNextPlaylistProps,
    loadPreviousPlaylist: loadPreviousPlaylistProps,
  } = props;

  const [isPlayingState, setIsPlayingState] = useState(false);
  const [isPipState, setPipState] = useState(false);
  const [isOpenControlState, setIsOpenControlsState] = useState(false);
  const [suspendState, setSuspendState] = useState(suspendProps);
  const [isOpenHoverMenuState, setIsOpenHoverMenuState] = useState(false);
  const [qualityState, setQualityState] = useState(QUALITYS.LD);
  const [isHdState, setIsHdState] = useState(false);
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [posterUrlState, setPosterUrlState] = useState("");
  const [posterUpdateIntervalState, setPosterUpdateIntervalState] = useState(
    null
  );

  const [playerErrorStatus, setPlayerErrorStatus] = useState({
    error: false,
    code: PlayerErrorCodes.ok,
    message: "",
  });

  const togglePlaying = () => {
    setIsPlayingState(!isPlayingState);
    if (isPlayingState && typeof onStopProps == "function") onStopProps();
  };

  const togglePip = () => setPipState(!isPipState);
  const PlayerContainerRef = useRef(null);
  const PlayerRef = useRef(null);

  const onSideStartPlay = () => {
    setIsPlayingState(true);
    setIsOpenHoverMenuState(false);
  };

  useEffect(() => {
    if (sideStopProps) setIsPlayingState(false);
    else setIsPlayingState(true);
  }, [sideStopProps]);

  useEffect(() => {
    setPlayerErrorStatus({
      error: false,
      code: PlayerErrorCodes.ok,
      message: "",
    });
  }, [urlProps]);

  useEffect(() => {
    setSuspendState(suspendProps);
  }, [suspendProps]);

  useEffect(() => {
    if (archiveModeProps) togglePlaying();
  }, [playingStateProps, archiveModeProps]);

  //Если HD качество то ставим HD качество
  useEffect(() => {
    if (sideHdProps) {
      setIsHdState(true);
      setQualityState(QUALITYS.HD);
    } else {
      setIsHdState(false);
      setQualityState(QUALITYS.LD);
    }
  }, [sideHdProps]);

  useEffect(() => {
    if (isPlayingState) {
      clearInterval(posterUpdateIntervalState);
      setPosterUpdateIntervalState(null);
    }
    if (posterProps && !isPlayingState) {
      setPosterUrlState(posterProps);
      clearInterval(posterUpdateIntervalState);
      const interval = setInterval(() => {
        setPosterUrlState(
          `${posterProps}?${parseInt(new Date().getTime() / 1000)}`
        );
      }, UPDATE_POSTER_TIMEOUT);
      setPosterUpdateIntervalState(interval);
    }
    return () => clearInterval(posterUpdateIntervalState);
    // eslint-disable-next-line
  }, [isPlayingState, posterProps]);

  useEffect(() => {
    if (playImmediatelyProps) {
      onSideStartPlay();
    }
  }, [playImmediatelyProps]);

  const createTimer = () => {
    clearTimeout(hideMenusTimeout);
    hideMenusTimeout = setTimeout(() => hideMenu(), HIDE_MENU_TIMEOUT);
  };
  const showMenu = _.throttle(
    function() {
      if (!isOpenControlState) {
        setIsOpenControlsState(true);
      } else {
        if (!isOpenHoverMenuState) {
          setIsOpenHoverMenuState(true);
        }
      }
      createTimer();
    },
    3000,
    { trailing: false }
  );

  /**
   * Показывать меню внизу
   * */
  const hideMenu = () => {
    if (showMenu && typeof showMenu.cancel === "function") {
      showMenu.cancel();
    }
    clearTimeout(hideMenusTimeout);
    if (isLoadingState && isPlayingState) {
      createTimer();
    } else {
      setIsOpenControlsState(false);
      setIsOpenHoverMenuState(false);
    }
  };

  /**
   * При двойном клике убирать полноэкранный режим
   * */
  const handleClickOutFullscreen = () => {
    //Выйти из режима полного экрана
    if (
      screenfull.isEnabled &&
      screenfull.isFullscreen &&
      PlayerContainerRef &&
      PlayerContainerRef.current
    ) {
      screenfull.toggle(PlayerContainerRef);
    }
  };

  if (suspendState) return null;

  return (
    <VideoContainer
      className="videoContainer"
      ref={PlayerContainerRef}
      onMouseOver={showMenu}
      onMouseLeave={() => hideMenu()}
      onTouchEnd={() => {
        showMenu();
      }}
      onMouseMove={showMenu}
      onDoubleClick={() => handleClickOutFullscreen()}
    >
      <PlayerErrorsView error={playerErrorStatus} />

      {!isOpenControlState && !playImmediatelyProps && (
        <CamHoverContainer>
          <CamHoverMenu>
            <HoverPlayBtn
              onClick={() => {
                setIsPlayingState(true);
                setIsOpenHoverMenuState(false);
                setIsOpenControlsState(true);
              }}
            />
          </CamHoverMenu>
        </CamHoverContainer>
      )}
      {isLoadingState && isPlayingState && showSpinnerProps && (
        <LoaderContainer>
          <Spinner palette="primary" />
        </LoaderContainer>
      )}
      {Hls.isSupported() ? (
        <HlsPlayerStyled
          className="hls-player"
          live={liveProps}
          ref={PlayerRef}
          url={urlProps}
          onError={(err, data) => {
            if (err.code == 0) {
              setNeedUserStartPlayFlagProps(true);
            } else if (data?.response?.code == 404) {
              setPlayerErrorStatus({
                error: true,
                code: PlayerErrorCodes.notFoundError,
                message: "notFound",
              });
            } else if (data?.fatal) {
              sendErrorToSentry(
                `EzHlsPlayer Component hls error ${data?.details}`,
                data,
                true
              );
              if (data.type == "mediaError" || data.type == "networkError") {
                setPlayerErrorStatus({
                  error: true,
                  code: PlayerErrorCodes.streamError,
                  message: data.details,
                });
              } else {
                setPlayerErrorStatus({
                  error: true,
                  code: PlayerErrorCodes.criticalError,
                  message: data?.details,
                });
              }
            }
          }}
          playing={isPlayingState}
          quality={qualityState}
          playsinline
          onEnded={() =>
            typeof loadNextPlaylistProps == "function" &&
            loadNextPlaylistProps()
          }
          pip={isPipState}
          poster={posterUrlState}
          onEnablePIP={() => setPipState(true)}
          onDisablePIP={() => setPipState(false)}
          onBuffer={() => {
            setIsLoadingState(true);
            if (
              archiveModeProps &&
              typeof setArchiveCursorLockedProps == "function"
            )
              setArchiveCursorLockedProps(true);
          }}
          onBufferEnd={() => {
            setIsLoadingState(false);
            if (
              archiveModeProps &&
              typeof setArchiveCursorLockedProps == "function"
            )
              setArchiveCursorLockedProps(false);
          }}
          onChangeQuality={lvl => {
            setIsHdState(isHdCheck(lvl));
            if (qualityState !== lvl) {
              setQualityState(lvl);
            }
          }}
          readyForCarusel={() =>
            typeof playerReadyForCaruselCallbackProps == "function" &&
            playerReadyForCaruselCallbackProps()
          }
          onUpdateProgressBar={() => {
            if (playerErrorStatus.error) {
              setPlayerErrorStatus({
                error: false,
                code: PlayerErrorCodes.ok,
                message: "",
              });
            }

            typeof onUpdateProgressBarProps == "function" &&
              onUpdateProgressBarProps();
          }}
          startTime={startTimeProps}
          newSelectedTime={newSelectedTimeProp}
          fragmentOffset={fragmentOffsetProps}
          playSpeed={playSpeedProp}
          removeCameraFromActivePlayerProps={removeCameraFromActiveProps}
          onStopPlayerProps={onStopProps}
          cameraIdPlayerProps={cameraIdProps}
          setPlaying={setPlayingProps}
          isPlaying={isPlayingProps}
          muted={muteStatusProps}
          volume={volumeLevelProps}
          updateVideoProgress={updateVideoProgressProps}
          currentVideoTime={currentVideoTimeProps}
          setCurrentPlaylistDurarion={setCurrentPlaylistDurarionProps}
        />
      ) : (
        <IosPlayerStyled
          ref={PlayerRef}
          url={urlProps}
          quality={qualityState}
          playing={isPlayingState}
          onBuffer={() => setIsLoadingState(true)}
          onBufferEnd={() => setIsLoadingState(false)}
          removeCameraFromActive={removeCameraFromActiveProps}
          onStopPlayer={onStopProps}
          cameraIdPlayer={cameraIdProps}
          setPlaying={setPlayingProps}
          isPlaying={isPlayingProps}
          onChangeQuality={lvl => {
            setIsHdState(isHdCheck(lvl));
            if (qualityState !== lvl) {
              setQualityState(lvl);
            }
          }}
        />
      )}

      {showInterfaceProps && isOpenControlState && !isPipState && (
        <PlayerControls
          isPlaying={isPlayingState}
          togglePlaying={togglePlaying}
          toggleHd={() =>
            setQualityState(
              QUALITYS.HD === qualityState ? QUALITYS.LD : QUALITYS.HD
            )
          }
          isHd={isHdState}
          refForFullscreen={PlayerContainerRef}
          isPip={isPipState}
          canPip={canEnablePIP(urlProps)}
          togglePip={togglePip}
          addCameraToActive={addCameraToActiveProps}
          removeCameraFromActive={removeCameraFromActiveProps}
          cameraId={cameraIdProps}
        />
      )}
    </VideoContainer>
  );
};

Player.displayName = "Player";
export default Player;
