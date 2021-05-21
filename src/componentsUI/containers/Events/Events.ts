import Events from "../../views/Events";

import { connect } from "react-redux";

import {
  eventsLoadingInProgressSelector,
  eventsNotFoundOrFailedSelector,
  cameraEventsSelector,
  selectedEventsDateSelector,
} from "../../../modules/events";

import {
  cleanCameraEventsAction,
  startUpdateEventsAction,
  setEventsDateAction,
} from "../../../modules/events";

import { setCurrentVideoTimestampOnCalendarAction } from "../../../modules/Archive";

const mapDispatchToProps = (dispatch: any) => ({
  setUserSeletedTimestamp: (selectedTimestamp: number) =>
    dispatch(setCurrentVideoTimestampOnCalendarAction(selectedTimestamp)),
  setSelectedEventsDate: (cameraId: number, selectedEventsDate: Date) =>
    dispatch(setEventsDateAction(cameraId, selectedEventsDate)),
  updateCameraEvents: (cameraId: number) =>
    dispatch(startUpdateEventsAction(cameraId)),
  cleanCameraEvents: () => dispatch(cleanCameraEventsAction()),
});

const mapStateToProps = (state: any) => ({
  eventsNotFoundOrFailed: eventsNotFoundOrFailedSelector(state),
  cameraEvents: cameraEventsSelector(state),
  eventsLoadingInProgress: eventsLoadingInProgressSelector(state),
  selectedEventsDate: selectedEventsDateSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
