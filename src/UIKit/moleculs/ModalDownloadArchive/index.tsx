import React, { useRef, useState, useEffect } from "react";
import { addMinutes, subMinutes } from "date-fns";
import { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";

import {
  generateDownloadTime,
  generateLoadUrl,
  convertMsToMin,
} from "../../../helpers/archive";

import { notifyError } from "../../../helpers/toast";

import Player from "../../../componentsUI/views/Player";
import ToastContainer from "../../atoms/ToastNotification";
import CustomTimeInputForDatepicker from "../../atoms/CustomTimeInputForDatepicker";

import { ReactComponent as LineDivider } from "../../../assets/svgs/streetsOnline/Archive/Line-divider.svg";

import {
  StyledReactModal,
  StyledHeading,
  Content,
  ContentLeft,
  ContentRight,
  VideoDownloadCameraName,
  VideoDownloadContainer,
  ModalDownloadArchiveInputsWrapper,
  ModalDownloadArchiveCloseWrapper,
  ModalDownloadArchiveCloseText,
  ModalDownloadArchiveInputWrapper,
  StyledHeadingTitle,
  ModalDownloadArchiveSpan,
  ErrorArchiveSpan,
  BackSvgBtnStyled,
  ModalDownloadArchiveChip,
  ModalDownloadArchiveChipText,
  ModalDownloadArchiveStyledDatepicker,
  StyledButton,
  ModalDownloadArchiveInputDivider,
  StyledArrowCollapseDown,
} from "./styled-components/";

const ModalDownloadArchive = (props: ModalDownloadArchiveProps) => {
  const {
    title: titleProps,
    onClose: onCloseProps,
    liveUrl: liveUrlProps,
    cameraId: cameraIdProps,
    orderVideoFromServer: orderVideoFromServerProps,
    loadingVideoStatus: loadingVideoStatusProps,
    selectedDateTime: selectedDateTimeProps,
    cameraName: cameraNameProps,
  } = props;

  const PlayerContainerModalRef = useRef<HTMLDivElement>(null);

  //FIXME: Это решает ошибку с типами но нужно написать по всем правилам Typescript
  const JsPlayert: any = Player;

  /* Выбранное пользователем время для скачивания */
  const [selectedDateTimeState, setSelectedDateTimeState] = useState<Date>(
    subMinutes(selectedDateTimeProps, 15)
  );
  const [selectedDateEndTimeState, setSelectedDateEndTimeState] = useState(
    addMinutes(selectedDateTimeProps, 0)
  );

  //Разница между концом и началом даты выбора
  const [differenceStartEndState, setDifferenceStartEndState] = useState(15);

  //Валидация ошибок
  const [errorsInputState, setErrorsInputState] = useState({
    wrongInputs: false,
    wrongTimeDifference: false,
    message: "",
  });

  /* Время смещения видео в секундах */
  const [videoTimeState, setVideoTimeState] = useState(0);

  /* Изначальная ссылка на  загрузку */
  const [loadStartUrlState, setLoadStartUrlState] = useState(liveUrlProps);

  //Если мы поменяли изначальную дату - нужно новый кусок видео закачать
  useEffect(() => {
    //При очищении поля мы будем получать selectedDateTimeState = null
    //Проверяем тут
    if (selectedDateTimeState) {
      setLoadStartUrlState(
        generateLoadUrl(cameraIdProps, selectedDateTimeState.valueOf())
      );
    }
  }, [selectedDateTimeState]);

  //Посчитать разницу минут для Badge
  useEffect(() => {
    if (selectedDateTimeState && selectedDateEndTimeState) {
      let differenceStartEnd =
        new Date(selectedDateEndTimeState).getTime() -
        new Date(selectedDateTimeState).getTime();
      let minutes = convertMsToMin(differenceStartEnd);
      setDifferenceStartEndState(minutes);
    } else {
      notifyError("Заполните пожалуйста время начала и время конца");
      setDifferenceStartEndState(0);
    }
  }, [selectedDateTimeState, selectedDateEndTimeState]);

  //Валидация
  const generateLimitedTime = () => {
    //если по какой то причине не заполнены время начала или конца его нужно заполнить

    if (!selectedDateTimeState) {
      notifyError("Заполните время начала промежутка");
      return;
    }

    if (!selectedDateEndTimeState) {
      notifyError("Заполните время конца промежутка");
      return;
    }

    if (
      selectedDateTimeState.getTime() - selectedDateEndTimeState.getTime() >
      0
    ) {
      notifyError("Время начала не может быть больше время конца");

      return false;
    } else {
      return true;
    }
  };

  /**
   * Обработка запуска скачивания
   */
  const handlerButtonClick = () => {
    const checkValidation = generateLimitedTime();

    if (checkValidation) {
      orderVideoFromServerProps({
        cameraId: cameraIdProps,
        startTimeAsString: generateDownloadTime(selectedDateTimeState),
        stopTimeAsString: generateDownloadTime(selectedDateEndTimeState),
      });
    }
  };

  //Для локализации календаря - react-datepicker
  registerLocale("ru", ru);

  return (
    <StyledReactModal className="modal-download-archive">
      <ModalDownloadArchiveCloseWrapper
        className="modal-download-archive__close-wrapper"
        onClick={onCloseProps}
      >
        <BackSvgBtnStyled className="modal-download-archive__back-svg-btn" />
        <ModalDownloadArchiveCloseText className="modal-download-archive__back-text">
          Назад
        </ModalDownloadArchiveCloseText>
      </ModalDownloadArchiveCloseWrapper>
      <Content className="modal-download-archive__inner">
        <ContentLeft className="modal-download-archive__inner-left modal-download-archive-inner__left-part">
          <VideoDownloadCameraName className="modal-download-archive-inner__cameraName">
            {cameraNameProps}
          </VideoDownloadCameraName>
          <VideoDownloadContainer
            className="BodyViewContainer"
            ref={PlayerContainerModalRef}
          >
            <JsPlayert
              className="ModalPlayer"
              onUpdateProgressBar={(props: any) => {
                const newTime = Math.floor(props.srcElement.currentTime);
                if (newTime != videoTimeState) setVideoTimeState(newTime);
              }}
              startTime={videoTimeState}
              archiveMode={false}
              playingState={true}
              showInterface={false}
              url={loadStartUrlState}
              playImmediately={true}
            />
          </VideoDownloadContainer>
        </ContentLeft>
        <ContentRight className="modal-download-archive__inner-right modal-download-archive-inner__right-part">
          <StyledHeading className="modal-download-archive__heading">
            <StyledHeadingTitle className="modal-download-archive__title">
              {titleProps}
            </StyledHeadingTitle>
          </StyledHeading>
          {/* TODO: Пока не убирать так как  */}
          {/* <StyledSubHeading className="modalDownloadArchive__sub-title">
            <StyledSubHeadingSpan>
              Введите промежуток для скачивания не более 15 минут
            </StyledSubHeadingSpan>
          </StyledSubHeading> */}
          <ModalDownloadArchiveChip className="modal-download-archive__chip">
            <ModalDownloadArchiveChipText className="modal-download-archive__chip-text">
              Текущий отрезок времени составляет {differenceStartEndState} мин
            </ModalDownloadArchiveChipText>
          </ModalDownloadArchiveChip>
          <ModalDownloadArchiveInputsWrapper className="modal-download-archive__inputs-wrapper">
            <ModalDownloadArchiveInputWrapper className="modal-download-archive__input-wrapper">
              <ModalDownloadArchiveSpan>Время начала</ModalDownloadArchiveSpan>
              <ModalDownloadArchiveStyledDatepicker
                className="modal-download-archive__start-time"
                selected={selectedDateTimeState}
                onChange={(value: Date) => setSelectedDateTimeState(value)}
                showTimeInput
                timeInputLabel="Время начала:"
                dateFormat="dd.MM.yyyy, HH:mm"
                timeFormat="HH:mm"
                locale="ru"
                customTimeInput={<CustomTimeInputForDatepicker />}
                popperPlacement="top"
                maxDate={new Date(selectedDateTimeProps)}
                isClearable
              />
              {errorsInputState.wrongInputs && (
                <ErrorArchiveSpan>{errorsInputState.message}</ErrorArchiveSpan>
              )}
              {errorsInputState.wrongTimeDifference && (
                <ErrorArchiveSpan>{errorsInputState.message}</ErrorArchiveSpan>
              )}
            </ModalDownloadArchiveInputWrapper>
            <ModalDownloadArchiveInputDivider>
              <LineDivider />
            </ModalDownloadArchiveInputDivider>
            <ModalDownloadArchiveInputWrapper className="modal-download-archive__input-wrapper">
              <ModalDownloadArchiveSpan>Время конца</ModalDownloadArchiveSpan>
              <ModalDownloadArchiveStyledDatepicker
                className="modal-download-archive__end-time"
                selected={selectedDateEndTimeState}
                onChange={(value: Date) => setSelectedDateEndTimeState(value)}
                showTimeInput
                timeInputLabel="Время конца:"
                dateFormat="dd.MM.yyyy, HH:mm"
                timeFormat="HH:mm"
                locale="ru"
                customTimeInput={<CustomTimeInputForDatepicker />}
                popperPlacement="top"
                maxDate={new Date(selectedDateTimeProps)}
                isClearable
              />
              {errorsInputState.wrongInputs && (
                <ErrorArchiveSpan>{errorsInputState.message}</ErrorArchiveSpan>
              )}
            </ModalDownloadArchiveInputWrapper>
          </ModalDownloadArchiveInputsWrapper>
          <StyledButton
            className="modal-download-archive__btn"
            disabled={loadingVideoStatusProps ? true : false}
            onClick={() => handlerButtonClick()}
            height={42}
          >
            <StyledArrowCollapseDown />
            Скачать
          </StyledButton>
        </ContentRight>
      </Content>
      <ToastContainer />
    </StyledReactModal>
  );
};

export default ModalDownloadArchive;
