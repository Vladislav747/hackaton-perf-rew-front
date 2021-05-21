import Timeline from "../../../UIKit/atoms/Timeline/Timeline";

import { connect } from "react-redux";

import { setCurrentVideoTimestampAction } from "../../../modules/Archive/actions";

import {
  timelineStartTimestampSelector,
  timelineEndTimestampSelector,
  playerUrlSelector,
  loadedStartSelector,
  loadedEndSelector,
  archiveCursorSelector,
  cameraDataSelector,
} from "../../../modules/Archive";

import {
  currentVideoTimestampSelector,
  timelineIntervalSelector,
  setCurrentVideoTimestampOnShiftAction,
} from "../../../modules/Archive";

import { setIsPlayingAction, isPlayingSelector } from "../../../modules/player";

import { speedCoefficientSelector } from "../../../modules/player";

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentVideoTimestamp: (currentVideoTimestamp: number) =>
    dispatch(setCurrentVideoTimestampAction(currentVideoTimestamp)),
  setIsPlaying: (isPlaying: boolean) => dispatch(setIsPlayingAction(isPlaying)),
  fiveSecondBack: () => dispatch(setCurrentVideoTimestampOnShiftAction(-5)),
  fiveSecondForward: () => dispatch(setCurrentVideoTimestampOnShiftAction(5)),
});

const mapStateToProps = (state: any) => ({
  timelineInterval: timelineIntervalSelector(state),
  currentVideoTimestamp: currentVideoTimestampSelector(state),
  timelineStartTimestamp: timelineStartTimestampSelector(state),
  timelineEndTimestamp: timelineEndTimestampSelector(state),
  cursorLocked: archiveCursorSelector(state),
  cameraData: cameraDataSelector(state),
  loadedStart: loadedStartSelector(state),
  loadedEnd: loadedEndSelector(state),
  playerUrl: playerUrlSelector(state),
  speedCoefficient: speedCoefficientSelector(state),
  isPlaying: isPlayingSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
