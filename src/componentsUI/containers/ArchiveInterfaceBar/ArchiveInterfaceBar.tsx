import ArchiveInterfaceBarView from "../../views/ArchiveInterfaceBar";
import { connect } from "react-redux";

import {
  setVolumeLevelAction,
  setMuteStatusAction,
  setSpeedСoefficientAction,
  setHdStateAction,
  setIsPlayingAction,
  hdStateSelector,
  volumeLevelSelector,
  muteStatusSelector,
  isPlayingSelector,
  speedCoefficientSelector,
} from "../../../modules/player";

import {
  setLiveAction,
  setDownloadModeAction,
  liveSelector,
  currentVideoTimestampSelector,
  downloadModeSelector,
  archiveDaysDurationSelector,
  setCurrentVideoTimestampOnCalendarAction,
  setCurrentVideoTimestampOnShiftAction,
  canDownloadSelector,
} from "../../../modules/Archive";

const mapDispatchToProps = (dispatch: any) => ({
  fiveSecondBack: () => dispatch(setCurrentVideoTimestampOnShiftAction(-5)),
  fiveSecondForward: () => dispatch(setCurrentVideoTimestampOnShiftAction(5)),
  fiveMinutesBack: () =>
    dispatch(setCurrentVideoTimestampOnShiftAction(-5 * 60)),
  fiveMinutesForward: () =>
    dispatch(setCurrentVideoTimestampOnShiftAction(5 * 60)),
  setLive: (live: boolean, url: string) => dispatch(setLiveAction(live, url)),
  setTimelineStartDate: (date: Date) =>
    dispatch(setCurrentVideoTimestampOnCalendarAction(date.valueOf())),
  setDownloadMode: (downloadMode: boolean) =>
    dispatch(setDownloadModeAction(downloadMode)),
  setHd: (hdState: boolean) => dispatch(setHdStateAction(hdState)),
  setSpeedСoefficient: (speedСoefficient: number) =>
    dispatch(setSpeedСoefficientAction(speedСoefficient)),
  setPlaying: (isPlaying: boolean) => dispatch(setIsPlayingAction(isPlaying)),
  setMute: (muteStatus: boolean) => dispatch(setMuteStatusAction(muteStatus)),
  setVolume: (volumeLevel: string) =>
    dispatch(setVolumeLevelAction(volumeLevel)),
});

const mapStateToProps = (state: any) => ({
  selectedDateTime: currentVideoTimestampSelector(state),
  live: liveSelector(state),
  timelineStartDate: currentVideoTimestampSelector(state),
  downloadMode: downloadModeSelector(state),
  hd: hdStateSelector(state),
  speedСoefficient: speedCoefficientSelector(state),
  playingStatus: isPlayingSelector(state),
  volumeLevel: volumeLevelSelector(state),
  muteStatus: muteStatusSelector(state),
  archiveDaysDuration: archiveDaysDurationSelector(state),
  canDownload: canDownloadSelector(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchiveInterfaceBarView);
