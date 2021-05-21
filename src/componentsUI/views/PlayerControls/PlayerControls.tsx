import React, { useState, useEffect } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import screenfull from "screenfull";
import classNames from "classnames";
import { useHistory } from "react-router-dom";

import Tooltip from "@material-ui/core/Tooltip";

import { ReactComponent as PlayIcon } from "../../../assets/img/player/play.svg";
import { ReactComponent as PauseIcon } from "../../../assets/img/player/pause.svg";
import { ReactComponent as HdIcon } from "../../../assets/img/player/HD.svg";
import { ReactComponent as PipIcon } from "../../../assets/img/player/pip.svg";
import { ReactComponent as FullScreenIcon } from "../../../assets/img/player/full_screen.svg";
import { ReactComponent as ArrowDownIcon } from "../../../assets/svgs/streetsOnline/RawSvg/arrow-down-circle.svg";
import { ReactComponent as ArrowUpIcon } from "../../../assets/svgs/streetsOnline/RawSvg/arrow-up-circle.svg";
import { ReactComponent as FolderIcon } from "../../../assets/svgs/streetsOnline/Archive/FolderIcon2.svg";

import {
  ControlsContainer,
  Container,
  BtnContainer,
  BtnContainerTop,
} from "./styled-components";

/* Подсказки */
const playIconText = "Запустить";
const pauseIconText = "Пауза";
const HDIconText = "Включить HD Режим";
const pipIconText = "Мини проигрыватель";
const fullScreenIconText = "Полноэкранный режим";
const archiveIconText = "Перейти в архив";

const PlayerControls = ({
  isPlaying: isPlayingProps,
  togglePlaying: togglePlayingProps,
  isHd: isHdProps,
  toggleHd: toggleHdProps,
  isPip: isPipProps,
  canPip: canPipProps,
  togglePip: togglePipProps,
  refForFullscreen: refForFullscreenProps,
  addCameraToActive: addCameraToActiveProps,
  removeCameraFromActive: removeCameraFromActiveProps,
  cameraId: cameraIdProps,
  canHide: canHideProps = false,
  canTimeOutHide: canTimeOutHideProps,
  timeoutHide: timeoutHideProps = 8000,
}: PlayerControlsProps) => {
  const [showState, setShowState] = useState(true);

  /** Если мы передали значения для спрятывания панели и для его спрятывания по таймауту */
  useEffect(() => {
    if (canHideProps && canTimeOutHideProps) {
      const intervalId = setInterval(() => {
        //Прячем панель если ничего не происходит
        setShowState(false);
      }, timeoutHideProps);

      return () => clearInterval(intervalId);
    }
  }, [canHideProps]);

  /**
   * Запуск полноэкранного режима плеера
   * @param ref
   */
  const handleClickFullscreen = (ref: any = null) => {
    if (ref) {
      if (screenfull.isEnabled && ref && ref !== null) {
        //@ts-ignore
        screenfull.toggle(findDOMNode(ref));
      }
    }
  };

  /**
   * Обработка скрытия раскрытия меню
   */
  const handleControlsContainerClick = () => {
    setShowState(showState => !showState);
  };

  /**
   * Обработка нажатия иконки play
   */
  const handlePlayIconClick = () => {
    //Если это полноэкранный режим архивного плеера то в активные камеры мы не добавляем
    if (!canHideProps) {
      addCameraToActiveProps(cameraIdProps);
    }
  };

  /**
   * Обработка нажатия иконки pause
   */
  const handlePauseIconClick = () => {
    //Если это полноэкранный режим архивного плеера то из активных мы не удалеям
    if (!canHideProps) {
      removeCameraFromActiveProps(cameraIdProps);
    }
  };

  const history = useHistory();

  /**
   * Обработка перехода в архив
   */
  const handleArchiveIconClick = () => {
    //Если это полноэкранный режим архивного плеера то в активные камеры мы не добавляем
    history.push(`/camera-archive/id/${cameraIdProps}`);
  };

  return (
    <ControlsContainer
      className={classNames({
        "controls-container": true,
        "controls-container_fullscreen": canHideProps === true,
        show: showState === true,
      })}
    >
      {canHideProps && (
        <BtnContainerTop
          className="btn-container-top"
          onClick={() => handleControlsContainerClick()}
        >
          {showState ? (
            <ArrowDownIcon className="btn-container__arrow-down-icon" />
          ) : (
            <ArrowUpIcon className="btn-container__arrow-up-icon" />
          )}
        </BtnContainerTop>
      )}
      <Container
        className={classNames({
          "controls-container__inner-container": true,
        })}
      >
        <Tooltip
          title={isPlayingProps ? pauseIconText : playIconText}
          placement="top"
        >
          <BtnContainer
            className="btn-container"
            onClick={() => togglePlayingProps()}
          >
            {isPlayingProps ? (
              <PauseIcon
                className="btn-container__pause-icon"
                onClick={() => handlePauseIconClick()}
              />
            ) : (
              <PlayIcon
                className="btn-container__play-icon"
                onClick={() => handlePlayIconClick()}
              />
            )}
          </BtnContainer>
        </Tooltip>
        <Tooltip title={HDIconText} placement="top">
          <BtnContainer active={isHdProps} onClick={() => toggleHdProps()}>
            <HdIcon />
          </BtnContainer>
        </Tooltip>

        {canPipProps && (
          <Tooltip title={pipIconText} placement="top">
            <BtnContainer
              active={isPipProps}
              onClick={() => {
                togglePipProps();
                //@ts-ignore
                if (screenfull?.isFullscreen) {
                  //@ts-ignore
                  screenfull.exit();
                }
              }}
            >
              <PipIcon />
            </BtnContainer>
          </Tooltip>
        )}

        <Tooltip title={fullScreenIconText} placement="top">
          <BtnContainer
            onClick={() => {
              if (refForFullscreenProps) {
                handleClickFullscreen(refForFullscreenProps.current);
              }
            }}
          >
            <FullScreenIcon />
          </BtnContainer>
        </Tooltip>
        <Tooltip title={archiveIconText} placement="top">
          <BtnContainer
            onClick={() => {
              handleArchiveIconClick();
            }}
          >
            <FolderIcon />
          </BtnContainer>
        </Tooltip>
      </Container>
    </ControlsContainer>
  );
};

PlayerControls.propTypes = {
  togglePlaying: PropTypes.func.isRequired,
  toggleHd: PropTypes.func.isRequired,
  togglePip: PropTypes.func.isRequired,
  refForFullscreen: PropTypes.any, // @todo исправить тип
  canPip: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool,
  isHd: PropTypes.bool,
  isPip: PropTypes.bool,
};

PlayerControls.defaultProps = {
  playing: false,
  isHd: false,
  isPip: false,
  canPip: false,
};

PlayerControls.displayName = "PlayerControls";
export default PlayerControls;
