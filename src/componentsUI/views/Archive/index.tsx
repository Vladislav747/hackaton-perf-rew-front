import React, { useRef, useState, useEffect, useCallback } from "react";
import screenfull from "screenfull";
import { findDOMNode } from "react-dom";
import { toast } from "react-toastify";

import { countTimestampWithOffsetInSeconds } from "../../../helpers/time";

import { generateLoadUrl } from "../../../helpers/archive";

import {
  HeadViewContainer,
  VideoContainer,
  ArchiveWrapper,
  FlexRaw,
  ArchivePlayerWrapper,
  EventsContainer,
  ArchiveContainerWithClose,
  RowWithClose,
  CameraContainerCloseWrapper,
  CameraContainerCloseWrapperCloseText,
  BackSvgBtnStyled,
  StyledLink,
  ContainerWithControll,
  PlayerContainer,
} from "./styled-components";

import Events from "../../containers/Events";

import Player from "../../../componentsUI/containers/ArchivePlayer";
import MobileDevicesModalControl from "../../../componentsUI/containers/MobileDevicesModalControl";

import CameraHeadMenu from "../../../UIKit/atoms/CameraHeadMenu";
import ArchiveInterfaceBar from "../../containers/ArchiveInterfaceBar";
import Loader from "../../../UIKit/atoms/Loader";

import ModalDownloadArchive from "../../../UIKit/moleculs/ModalDownloadArchive";

import HoverArchivePlayButton from "../../../UIKit/moleculs/HoverArchivePlayButton";

import { apiUrl, fiveMinInMs } from "./helpers";

/* js to ts adaptation */
const JsPlayert: any = Player;

/**
 * Запуск полноэкранного режима плеера
 * @param ref
 */
const handleClickFullscreen = (ref: HTMLDivElement) => {
  if (screenfull.isEnabled && ref) {
    const dom = findDOMNode(ref);
    if (dom && dom instanceof Element) {
      screenfull.toggle(dom);
    }
  }
};

const exitFullscreen = (ref: HTMLDivElement) => {
  if (screenfull.isEnabled && screenfull.isFullscreen && ref) {
    screenfull.exit();
  }
};

/* FIX */
let screens: Function | null = null;
let reff: HTMLDivElement | null = null;

//Для Toast Notification
const notifyError = (text: string) => toast.error(text);

const Archive = ({
  cameraName: cameraNameProps,
  orderVideo: orderVideoProps,
  loadingProgress: videoLoadInProgressProps,
  liveUrl: liveUrlProps,
  cameraId: cameraIdProps,
  setLive: setLiveProps,
  userSeletedTimestamp: userSeletedTimestampProps,
  setIsPlaying: setIsPlayingProps,
  downloadMode: downloadModeProps,
  setDownloadMode: setDownloadModeProps,
  setDownloadRangeArray: setDownloadRangeArrayProps,
  setDownloadLink: setDownloadLinkProps,
  setDownloadName: setDownloadNameProps,
  lastDownloadLink: lastDownloadLinkProps,
  lastDownloadName: lastDownloadNameProps,
  updateCameraData: updateCameraDataProps,
  cameraData: cameraDataProps,
  setNeedUserStartPlayFlag: setNeedUserStartPlayFlagProp,
  userNeedToStartPlayManual: userNeedToStartPlayManualProp,
}: ArchiveProps) => {
  //@ts-ignore
  const cameraId = parseInt(cameraIdProps);

  /* state block */
  const PlayerContainerRef = useRef<HTMLDivElement>(null);
  const [lastDownloadLinkLocalState, setLastDownloadLinkLocalState] = useState(
    ""
  );
  const [downloadTimeState, setDownloadTimeState] = useState(
    userSeletedTimestampProps
  );

  const [showMobileInterface, setShowMobileInterface] = useState(false);
  const [hideMobileInterfaceTimer, setHideMobileInterfaceTimer] = useState(-1);

  /**
   * Cпрятать мобильное меню по истечению таймаута
   */
  const startHideMobile = useCallback(() => {
    clearTimeout(hideMobileInterfaceTimer);
    setHideMobileInterfaceTimer(
      setTimeout(() => setShowMobileInterface(false), 2000)
    );
  }, [hideMobileInterfaceTimer]);

  /**
   * Показать мобильное меню
   */
  const startShowMobile = useCallback(() => {
    setShowMobileInterface(true);
  }, []);

  /**
   * Обновлением информации о камере - при инициализации компонента Archive
   */
  useEffect(() => {
    updateCameraDataProps(cameraId);
  }, []);

  /**
   * Автоматический запуск скачивания
   */
  useEffect(() => {
    if (
      lastDownloadLinkProps !== lastDownloadLinkLocalState &&
      lastDownloadLinkProps
    ) {
      const downloadLink = document.createElement("a");
      downloadLink.href = `${apiUrl}${lastDownloadLinkProps}`;
      downloadLink.download = lastDownloadNameProps;
      downloadLink.click();
      downloadLink.remove();
      setLastDownloadLinkLocalState(lastDownloadLinkProps);
    }
  }, [
    lastDownloadLinkLocalState,
    lastDownloadLinkProps,
    lastDownloadNameProps,
  ]);

  /**
   * Изменение конечного времени для модального окна скачивания
   * при смене Timeline или
   */
  useEffect(() => {
    setDownloadTimeState(userSeletedTimestampProps);
  }, [userSeletedTimestampProps]);

  return !cameraDataProps ? (
    <Loader />
  ) : (
    <ArchiveContainerWithClose className="camera-container">
      <RowWithClose>
        <StyledLink to={"/"}>
          <CameraContainerCloseWrapper className="camera-container__close-wrapper">
            <BackSvgBtnStyled className="camera-container__back-svg-btn" />
            <CameraContainerCloseWrapperCloseText className="camera-container__back-text">
              Назад
            </CameraContainerCloseWrapperCloseText>
          </CameraContainerCloseWrapper>
        </StyledLink>
      </RowWithClose>
      <>
        <ArchiveWrapper className="camera-archive">
          <ArchivePlayerWrapper className="camera-archive__player">
            <HeadViewContainer className="camera-archive__player__header">
              <CameraHeadMenu type="archive" cameraName={cameraNameProps} />
            </HeadViewContainer>

            <ContainerWithControll>
              <VideoContainer
                className="camera-archive__player__video"
                ref={PlayerContainerRef}
                onTouchStart={() => startShowMobile()}
                onTouchEnd={() => startHideMobile()}
                onMouseOver={() => startShowMobile()}
                onMouseLeave={() => startHideMobile()}
              >
                <PlayerContainer>
                  {userNeedToStartPlayManualProp && (
                    <HoverArchivePlayButton
                      onClick={() => {
                        setLiveProps(
                          true,
                          `${apiUrl}${cameraDataProps.REALTIME_HLS}`
                        );
                        setNeedUserStartPlayFlagProp(false);
                      }}
                    />
                  )}
                  {showMobileInterface && (
                    <MobileDevicesModalControl
                      clickFullscreen={() => {
                        if (PlayerContainerRef.current) {
                          handleClickFullscreen(PlayerContainerRef.current);
                        }
                      }}
                    />
                  )}
                  {!downloadModeProps && <JsPlayert />}
                </PlayerContainer>

                <ArchiveInterfaceBar
                  setFullscreen={() => {
                    if (PlayerContainerRef.current) {
                      handleClickFullscreen(PlayerContainerRef.current);
                    }
                  }}
                  exitFullscreen={() => {
                    if (PlayerContainerRef.current) {
                      exitFullscreen(PlayerContainerRef.current);
                    }
                  }}
                />
              </VideoContainer>
            </ContainerWithControll>
          </ArchivePlayerWrapper>
          {cameraDataProps?.ACCESS?.MOVEMENT?.STATUS && (
            <>
              <FlexRaw />
              <EventsContainer className="camera-archive__events">
                <Events cameraId={cameraId} />
              </EventsContainer>
            </>
          )}

          {/*Модальное окно для скачивания фрагмента видео*/}

          {downloadModeProps && (
            <ModalDownloadArchive
              onClose={() => {
                setIsPlayingProps(true);
                setDownloadModeProps(false);
                setDownloadLinkProps(null);
                setDownloadNameProps(null);
              }}
              isOpen={downloadModeProps}
              title="Скачивание архива"
              liveUrl={liveUrlProps}
              cameraId={cameraId}
              setDowloadTimeArray={(startDate: Date, endDate: Date) => {
                setDownloadRangeArrayProps([startDate, endDate]);
              }}
              orderVideoFromServer={orderVideoProps}
              loadingVideoStatus={videoLoadInProgressProps}
              selectedDateTime={downloadTimeState}
              cameraName={cameraNameProps}
            />
          )}
        </ArchiveWrapper>
      </>
    </ArchiveContainerWithClose>
  );
};

export default Archive;
