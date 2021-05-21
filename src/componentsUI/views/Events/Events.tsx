import React, { useEffect } from "react";

import EventElement from "../../../UIKit/moleculs/EventElement";
import { AutoSizer } from "react-virtualized";

import {
  EventsElementsBoxContainer,
  EventsBodyContent,
  EventsHeaderContent,
  StyledEventsList,
} from "./styled-components";

const preloadEventsRows = 10;

const _eventCellRenderer = (
  { index, key, style }: cellRendererInputProps,
  event: cameraEvent,
  setUserSeletedTimestampProps: Function,
  cameraIdProps: number
) => {
  return (
    <div id={String(index)} key={key} style={style}>
      <EventElement
        key={event.ID}
        eventData={event}
        setUserSeletedTimestamp={setUserSeletedTimestampProps}
        cameraId={cameraIdProps}
      />
    </div>
  );
};

const Events = (props: EventsProps & any) => {
  const {
    eventsNotFoundOrFailed: eventsNotFoundOrFailedProps,
    cameraEvents: cameraEventsProps,
    cameraId: cameraIdProps,
    eventsLoadingInProgress: eventsLoadingInProgressProps,
    setUserSeletedTimestamp: setUserSeletedTimestampProps,
    updateCameraEvents: updateCameraEventsProps,
    cleanCameraEvents: cleanCameraEventsProps,
  } = props;

  useEffect(() => {
    updateCameraEventsProps(cameraIdProps);
    return () => {
      cleanCameraEventsProps();
    };
  }, [cameraIdProps, cleanCameraEventsProps, updateCameraEventsProps]);

  return (
    <EventsElementsBoxContainer>
      <EventsHeaderContent>
        <span>События</span>
      </EventsHeaderContent>

      <EventsBodyContent>
        {eventsNotFoundOrFailedProps ? (
          <span>События не найдены</span>
        ) : eventsLoadingInProgressProps ? (
          <span>Идет поиск событий...</span>
        ) : (
          <AutoSizer>
            {({ height, width }) => (
              <StyledEventsList
                className={`EventsList`}
                overscanRowCount={preloadEventsRows}
                width={width}
                minWidth={width}
                noRowsRenderer={() => "События не найдены"}
                height={height}
                rowCount={cameraEventsProps?.length}
                rowHeight={60}
                rowRenderer={({
                  index,
                  key,
                  style,
                }: cellRendererInputProps) => {
                  return _eventCellRenderer(
                    { index, key, style },
                    cameraEventsProps[index],
                    setUserSeletedTimestampProps,
                    cameraIdProps
                  );
                }}
              />
            )}
          </AutoSizer>
        )}
      </EventsBodyContent>
    </EventsElementsBoxContainer>
  );
};

export default Events;
