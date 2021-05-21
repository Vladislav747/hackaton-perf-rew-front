import React, { useEffect, useState } from "react";

import Timeline from "../../../helpers/canvasTimeline/classes/timeline/Timeline";
import { getMinuteDashesCount } from "../../../helpers/canvasTimeline/helpers";
import { TimelineMouseEvent } from "../../../helpers/canvasTimeline/classes/timeline/types/TimelineTypes";

import { TimelineCanvasWrapper } from "./styled-components";

const TimelineCanvas = ({
  userSelectedTimestamp: userSelectedTimestampProps,
  changeCommitted: changeCommittedProps,
  speedCoefficient: speedProps,
  maxTime: maxTimeProps,
}: TimelineCanvasProps) => {
  const [canvasRefState, setCanvasRefState] = useState<
    HTMLCanvasElement | false
  >(false);
  const [timelineState, setTimelineState] = useState<Timeline | false>(false);
  const [timelineInitedState, setTimelineInitedState] = useState<boolean>(
    false
  );

  /**
   * Инициализация канваса для таймлайна
   */
  useEffect(() => {
    if (!canvasRefState)
      setCanvasRefState(document.getElementById("canvas") as HTMLCanvasElement);
  }, [canvasRefState]);

  /**
   * Создание нового экземпляра
   * CanvasTimeline только если у нас нет прошлого экземпляра
   * и найден DOM элемент для вставки
   */
  useEffect(() => {
    if (canvasRefState && !timelineState) {
      setTimelineState(
        new Timeline(canvasRefState, {
          startTime: new Date(userSelectedTimestampProps),
          minuteDashes: getMinuteDashesCount(window.innerWidth),
          secondsDashes: 5,
        })
      );
    }
  }, [canvasRefState, timelineState, userSelectedTimestampProps]);

  /**
   * Запуск таймлайна и создание обработчиков событий
   */
  useEffect(() => {
    /**
     * Проверяем наличие существующего Canvas, объекта Timeline
     * и то что Timeline не инициализирован
     */
    if (
      canvasRefState !== false &&
      timelineState !== false &&
      !timelineInitedState
    ) {
      // Изменение ширины при ресайзе окна
      window.onresize = () => {
        //Получение ширины родительского элемента canvas'а
        //Свойство clientWidth содержит ширину элемента внутри границ вместе с padding, но без border и прокрутки.
        const {
          clientWidth: width,
        } = canvasRefState.parentElement as HTMLElement;
        timelineState.canvasWidth = width;
        timelineState.minuteDashes = getMinuteDashesCount(width);
      };

      timelineState.on("mouseMovingStopped", ({ time }: TimelineMouseEvent) => {
        changeCommittedProps(time.getTime());
      });

      timelineState.on("click", ({ time }: TimelineMouseEvent) => {
        changeCommittedProps(time.getTime());
      });

      // ширина именно та которая попадает внутрь окна
      const {
        clientWidth: width,
      } = canvasRefState.parentElement as HTMLElement;
      timelineState.canvasWidth = width;
      // Запуск таймлайна
      timelineState.start();

      setTimelineInitedState(true);
    }
  }, [
    canvasRefState,
    changeCommittedProps,
    timelineState,
    timelineInitedState,
  ]);

  useEffect(() => {
    if (timelineInitedState && timelineState !== false) {
      // Установка скорости таймлайна
      timelineState.speed = speedProps;
      // Установка времени таймлайна
      timelineState.setTime(userSelectedTimestampProps);
      // Установка максимального времени для черной границы недоступности таймлайна
      timelineState.maxAvailableTime = maxTimeProps;
    }
  }, [
    maxTimeProps,
    speedProps,
    timelineInitedState,
    timelineState,
    userSelectedTimestampProps,
  ]);

  return <TimelineCanvasWrapper id="canvas" />;
};

export default TimelineCanvas;
