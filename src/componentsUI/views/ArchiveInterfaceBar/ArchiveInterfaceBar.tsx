import React, { useState } from "react";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import Tooltip from "@material-ui/core/Tooltip";
import { subDays } from "date-fns";

import { ReactComponent as PlayIcon } from "../../../assets/svgs/streetsOnline/Archive/PlayV2.svg";
import { ReactComponent as PauseIcon } from "../../../assets/svgs/streetsOnline/Archive/PauseV2.svg";
import { ReactComponent as DownloadIcon } from "../../../assets/svgs/streetsOnline/Archive/DownloadTypeTwo.svg";
import { ReactComponent as FillscreenIcon } from "../../../assets/svgs/streetsOnline/Archive/Fullscreen.svg";
import { ReactComponent as TextLiveIcon } from "../../../assets/svgs/streetsOnline/Archive/Text-Online.svg";
import { ReactComponent as HdIcon } from "../../../assets/img/player/HD.svg";
import { ReactComponent as GoBackIcon } from "../../../assets/svgs/streetsOnline/Archive/GoBack5SecondsIcon.svg";
import { ReactComponent as GoForwardIcon } from "../../../assets/svgs/streetsOnline/Archive/GoForward5SecondsIcon.svg";

import CustomTimeInputForDatepicker from "../../../UIKit/atoms/CustomTimeInputForDatepicker";
import CustomDatepicker from "../../../UIKit/atoms/CustomDatepicker";

import "react-datepicker/dist/react-datepicker.css";

import {
  ArchiveInterfaceBarContainer,
  PlayerContainer,
  TimeSelectorContainer,
  ExtraInterfaceContainer,
  IconContainer,
  BtnContainer,
  ArchiveInterfaceBarStyled,
  MenuItemStyled,
  SelectStyled,
  VolumeControlContainer,
  InputRangeStyled,
  TimelineContainer,
  BottomPart,
  MuteVolumeOnIconStyled,
  MuteVolumeOffIconStyled,
} from "./styled-components";

import Timeline from "../../containers/Timeline";

import {
  ymSendAnalytics,
  yandexEvents,
} from "../../../helpers/yandex-analytics";

const ArchiveInterfaceBar = (props: ArchiveInterfaceBarProps) => {
  const {
    speedCoefficient: speedCoefficientProps,
    setSpeedCoefficient: setSpeedCoefficientProps,
    timelineStartDate: timelineStartDateProps,
    setTimelineStartDate: setTimelineStartDateProps,
    setPlaying: setPlayingProps,
    setFullscreen: setFullscreenProps,
    startLoad: startLoadProps,
    live: liveProps,
    setLive: setLiveProps,
    downloadMode: downloadModeProps,
    setDownloadMode: setDownloadModeProps,
    hd: hdProps,
    setHd: setHdProps,
    playingStatus: playingStatusProps,
    fiveSecondBack: fiveSecondBackProps,
    fiveSecondForward: fiveSecondForwardProps,
    setMute: setMuteProps,
    setVolume: setVolumeProps,
    muteStatus: muteStatusProps,
    volumeLevel: volumeLevelProps,
    archiveDaysDuration: archiveDaysDurationProps,
    canDownload: canDownloadProps,
  } = props;

  //для скрытия Tooltip скорость воспроизведения
  const [
    showTooltipStatusSpeedState,
    setShowTooltipStatusSpeedState,
  ] = useState<boolean>(false);
  const [canShowTooltipSpeedState, setCanShowTooltipSpeedState] = useState<
    boolean
  >(false);

  //для скрытия Tooltip выбрать время
  const [showTooltipStatusDateState, setShowTooltipStatusDateState] = useState<
    boolean
  >(false);
  const [canShowTooltipDateState, setCanShowTooltipDateState] = useState<
    boolean
  >(false);

  //Для всплывающих подсказок
  //Иконка Play
  const playIconText = "Просмотр";
  const pauseIconText = "Пауза";
  //Иконка HD
  const HDIconText = "HD режим";
  //Иконка Live
  const liveIconText = "Live режим";
  //Иконка Даты, Загрузить видео, Скорость
  const dateIconText = "Выбрать дату и время начала записи";
  const downloadIconText = "Загрузить видео";
  const x2IconText = "Скорость воспроизведения";
  //Иконка Полноэкранный режим
  const fullScreenIconText = "Полный экран";
  const BackText = "5 секунд";
  const ForwardText = "5 секунд";
  //Иконка
  const muteVolumeOnText = "Включить звук";
  const muteVolumeOffText = "Выключить звук";

  //Для локализации календаря - react-datepicker
  registerLocale("ru", ru);

  const today = new Date();
  const minPickerDate = subDays(today, archiveDaysDurationProps.days ?? 7);

  return (
    <BottomPart className="camera-archive__player__controll" fsMode={false}>
      <TimelineContainer>
        <Timeline />
      </TimelineContainer>
      <ArchiveInterfaceBarContainer className="archive-interface-bar-container">
        <PlayerContainer className="archive-interface-bar-container__left-part player-container">
          <IconContainer className="player-container">
            {playingStatusProps ? (
              <Tooltip title={pauseIconText} placement="top">
                <PauseIcon
                  onClick={() => {
                    setPlayingProps(false);
                  }}
                />
              </Tooltip>
            ) : (
              <Tooltip title={playIconText} placement="top">
                <PlayIcon
                  onClick={() => {
                    setPlayingProps(true);
                  }}
                />
              </Tooltip>
            )}
          </IconContainer>

          <IconContainer className="shift-container">
            <Tooltip title={BackText} placement="top">
              <GoBackIcon
                onClick={() => {
                  ymSendAnalytics(yandexEvents.clickRewindPlayer);
                  fiveSecondBackProps();
                }}
              />
            </Tooltip>
          </IconContainer>
          <IconContainer className="shift-container">
            {!liveProps && (
              <Tooltip title={ForwardText} placement="top">
                <GoForwardIcon
                  onClick={() => {
                    ymSendAnalytics(yandexEvents.clickForwardPlayer);
                    if (!liveProps) fiveSecondForwardProps();
                  }}
                />
              </Tooltip>
            )}
          </IconContainer>

          <BtnContainer
            show={true}
            active={liveProps}
            onClick={() => {
              ymSendAnalytics(yandexEvents.clickLivePlayer);
              setLiveProps(true);
            }}
          >
            <Tooltip title={liveIconText} placement="top">
              <TextLiveIcon />
            </Tooltip>
          </BtnContainer>
        </PlayerContainer>

        <Tooltip
          open={showTooltipStatusDateState}
          title={dateIconText}
          placement="top"
        >
          <TimeSelectorContainer
            className="archive-interface-bar-container__center-part player-container timeselector__container"
            onMouseOver={() => {
              if (!canShowTooltipDateState) {
                setShowTooltipStatusDateState(true);
              }
            }}
            onMouseLeave={() => {
              setShowTooltipStatusDateState(false);
            }}
          >
            {console.log(timelineStartDateProps, "timelineStartDateProps")}
            <ArchiveInterfaceBarStyled
              className="calendar__datepicker"
              selected={timelineStartDateProps}
              minDate={minPickerDate}
              maxDate={today}
              showTimeInput
              timeInputLabel="Время:"
              dateFormat="dd.MM.yyyy, HH:mm"
              timeFormat="HH:mm"
              onChange={value => setTimelineStartDateProps(value)}
              locale="ru"
              customTimeInput={<CustomTimeInputForDatepicker />}
              customInput={<CustomDatepicker />}
              popperPlacement="top"
              onCalendarOpen={() => {
                ymSendAnalytics(yandexEvents.clickChangeTimePlayer);
                setShowTooltipStatusDateState(false);
                setCanShowTooltipDateState(true);
              }}
              onCalendarClose={() => {
                setCanShowTooltipDateState(false);
              }}
            />
          </TimeSelectorContainer>
        </Tooltip>

        <ExtraInterfaceContainer className="archive-interface-bar-container__right-part extra-interface-container">
          <IconContainer className="mute-icon-container">
            {muteStatusProps ? (
              <Tooltip title={muteVolumeOnText} placement="top">
                <MuteVolumeOffIconStyled
                  onClick={() => {
                    setMuteProps(false);
                  }}
                />
              </Tooltip>
            ) : (
              <Tooltip title={muteVolumeOffText} placement="top">
                <MuteVolumeOnIconStyled
                  onClick={() => {
                    setMuteProps(true);
                  }}
                />
              </Tooltip>
            )}
          </IconContainer>

          <VolumeControlContainer>
            <InputRangeStyled
              type="range"
              step="0.1"
              className="seekbar"
              min="0"
              max="1"
              value={volumeLevelProps}
              onChange={e => {
                setVolumeProps(e.target.value);
              }}
            />
          </VolumeControlContainer>

          <BtnContainer
            show={!liveProps}
            active={!liveProps}
            onMouseOver={() => {
              if (!canShowTooltipSpeedState) {
                setShowTooltipStatusSpeedState(true);
              }
            }}
            onMouseLeave={() => {
              setShowTooltipStatusSpeedState(false);
            }}
          >
            <Tooltip
              open={showTooltipStatusSpeedState}
              title={x2IconText}
              placement="top"
              arrow
            >
              <SelectStyled
                value={speedCoefficientProps}
                onChange={(event: any) => {
                  ymSendAnalytics(yandexEvents.clickChangeSpeedPlayer);
                  setSpeedCoefficientProps(event.target.value);
                }}
                className="interface__buttons__speed-selectors"
                onOpen={() => {
                  setShowTooltipStatusSpeedState(false);
                  setCanShowTooltipSpeedState(true);
                }}
                onClose={() => {
                  setCanShowTooltipSpeedState(false);
                }}
              >
                <MenuItemStyled value={1.0}>x1</MenuItemStyled>
                <MenuItemStyled value={2.0}>x2</MenuItemStyled>
                <MenuItemStyled value={4.0}>x4</MenuItemStyled>
                <MenuItemStyled value={8.0}>x8</MenuItemStyled>
                <MenuItemStyled value={16.0}>x16</MenuItemStyled>
              </SelectStyled>
            </Tooltip>
          </BtnContainer>
          <BtnContainer
            className="hd-container"
            show={liveProps ? true : false}
            active={hdProps}
            onClick={() => setHdProps(!hdProps)}
          >
            <Tooltip title={HDIconText} placement="top">
              <HdIcon />
            </Tooltip>
          </BtnContainer>
          {canDownloadProps &&
            (downloadModeProps ? (
              <IconContainer className="download-icon-container">
                <Tooltip title={downloadIconText} placement="top">
                  <DownloadIcon
                    onClick={() => {
                      ymSendAnalytics(yandexEvents.clickDownloadModeBtnPlayer);
                      startLoadProps();
                    }}
                  />
                </Tooltip>
              </IconContainer>
            ) : (
              <IconContainer className="download-icon-container">
                <Tooltip title={downloadIconText} placement="top">
                  <DownloadIcon
                    onClick={() => {
                      ymSendAnalytics(yandexEvents.clickDownloadModeBtnPlayer);
                      setDownloadModeProps(true);
                      setLiveProps(false);
                    }}
                  />
                </Tooltip>
              </IconContainer>
            ))}

          <IconContainer className="fullscreen-container">
            <Tooltip title={fullScreenIconText} placement="top">
              <FillscreenIcon
                onClick={() => {
                  ymSendAnalytics(yandexEvents.clickFullScreenPlayer);
                  setFullscreenProps();
                }}
              />
            </Tooltip>
          </IconContainer>
        </ExtraInterfaceContainer>
      </ArchiveInterfaceBarContainer>
    </BottomPart>
  );
};

export default ArchiveInterfaceBar;
