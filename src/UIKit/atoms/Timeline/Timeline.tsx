import React, { useEffect } from "react";

import { TimelineWrapper, VcTimelineWrapper } from "./styled-components";

import TimelineCanvas from "../TimelineCanvas/";

const Timeline = ({
  currentVideoTimestamp: currentVideoTimestampProps,
  timelineInterval: timelineIntervalProps,
  speedCoefficient: speedCoefficientProps,
  fiveSecondBack: fiveSecondBackProps,
  fiveSecondForward: fiveSecondForwardProps,
  setIsPlaying: setIsPlayingActionProps,
  isPlaying: isPlayingProps,
  setCurrentVideoTimestamp: setCurrentVideoTimestampProps,
}: TimelineComponentProps) => {
  /**
   * При изменении положения таймлайна пользователем - изменение метки видео
   * @param newValue
   */
  const changeCommitted = (newValue: number) => {
    setCurrentVideoTimestampProps(newValue);
  };

  //Обработка нажатия клавиш влево, вправо и пробел
  const handleEnterPressedEdit = (e: KeyboardEvent) => {
    const { code } = e;

    if (code === "Space") {
      setIsPlayingActionProps(!isPlayingProps);
    } else if (code === "ArrowLeft") {
      fiveSecondBackProps();
    } else if (code === "ArrowRight") {
      if (
        currentVideoTimestampProps + 5 * 1000 <
        timelineIntervalProps.timelineEndPositionInMs
      ) {
        fiveSecondForwardProps();
      }
    }
  };

  //Вешаем обработчик для клавиш
  useEffect(() => {
    document.addEventListener("keydown", handleEnterPressedEdit);

    return () =>
      document.removeEventListener("keydown", handleEnterPressedEdit);
  }, [handleEnterPressedEdit]);

  return (
    <TimelineWrapper className="timeline__canvas-wrap">
      <VcTimelineWrapper className="vc-timeline">
        <div className="timeline__canvas-wrap">
          <TimelineCanvas
            userSelectedTimestamp={currentVideoTimestampProps}
            changeCommitted={(val: number) => changeCommitted(val)}
            speedCoefficient={speedCoefficientProps}
            maxTime={timelineIntervalProps.timelineEndPositionInMs}
          />
        </div>
      </VcTimelineWrapper>
    </TimelineWrapper>
  );
};

export default Timeline;
