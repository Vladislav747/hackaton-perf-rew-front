import React from "react";

import noImg from "../../../assets/img/events/noimg.png";

import {
  EventElementWrapper,
  EventImgContainer,
  EventDataContainer,
  MetaDataList,
  EventImg,
} from "./styled-components";

import {
  formateDateForEvent,
  rawDateToTimestamp,
  tenMinInSeconds,
} from "./helpers";

import { countTimestampWithOffsetInSeconds } from "../../../helpers/time";

import { generateLoadUrl } from "../../../helpers/archive";

const EventElement = (props: EventElementProps) => {
  const {
    eventData: eventDataProps,
    setUserSeletedTimestamp: setUserSeletedTimestampProps,
    cameraId: cameraIdProps,
  } = props;

  const { START_DATE, END_DATE, TYPE } = eventDataProps;
  const fromatedEventTimers = formateDateForEvent(START_DATE, END_DATE);

  return (
    <EventElementWrapper
      onClick={() => {
        const timestamp = rawDateToTimestamp(START_DATE);
        const timestampInSeconds = new Date(timestamp).getSeconds();
        const loadedStart = countTimestampWithOffsetInSeconds(timestamp, -10);
        const loadedEnd = countTimestampWithOffsetInSeconds(timestamp, 28);
        //Оффсет в 10 минут

        setUserSeletedTimestampProps({
          selectedTimestamp: timestamp,
          timelineOffsetInMs: 0,
          videoPlayerOffsetInSeconds: timestampInSeconds + tenMinInSeconds,
          live: false,
          cameraId: cameraIdProps,
          playerUrl: generateLoadUrl(cameraIdProps, loadedStart),
          loadedStart,
          loadedEnd,
          fragmentOffset: timestamp,
        });
      }}
    >
      <EventImgContainer>
        <EventImg src={noImg} />
      </EventImgContainer>

      <EventDataContainer>
        <MetaDataList>
          <li>
            {(() => {
              switch (TYPE) {
                case 1: {
                  return "Движение";
                }
                default: {
                  return "Движение";
                }
              }
            })()}
          </li>
          <li>{fromatedEventTimers.eventDate}</li>
          <li>{fromatedEventTimers.eventTime}</li>
        </MetaDataList>
      </EventDataContainer>
    </EventElementWrapper>
  );
};

export default EventElement;
