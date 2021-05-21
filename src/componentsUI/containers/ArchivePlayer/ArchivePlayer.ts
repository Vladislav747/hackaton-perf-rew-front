/* Этот же плеер используется в сетках. В сетках привязывать его к редаксу не нужно. */
import ArchivePlayer from "../../views/Player";

import { connect } from "react-redux";

import { setNeedUserStartPlayFlagAction } from "../../../modules/player/actions";

import { setCurrentPlaylistDurarionAction } from "../../../modules/Archive/actions";

import {
  isPlayingSelector,
  hdStateSelector,
  speedCoefficientSelector,
  muteStatusSelector,
  volumeLevelSelector,
} from "../../../modules/player/selectors";

import {
  liveSelector,
  playerUrlSelector,
  currentVideoOffsetInSecondsSelector,
  newSelectedVideoOffsetSelector,
} from "../../../modules/Archive/selectors";

import { generateNextPlaylistAction } from "../../../modules/Archive/actions";

import { updateProgressBarAction } from "../../../modules/Archive/actions";

const mapDispatchToProps = (dispatch: any) => ({
  updateVideoProgress: (currentVideoTime: number) =>
    dispatch(updateProgressBarAction(currentVideoTime)),
  loadNextPlaylist: () => dispatch(generateNextPlaylistAction()),
  setCurrentPlaylistDurarion: (duration: number) =>
    dispatch(setCurrentPlaylistDurarionAction(duration)),
  setNeedUserStartPlayFlag: (status: boolean) =>
    dispatch(setNeedUserStartPlayFlagAction(status)),
});

const mapStateToProps = (state: any) => ({
  archiveMode: true,
  showInterface: false,
  playImmediately: true,
  currentVideoTime: currentVideoOffsetInSecondsSelector(state),
  newSelectedTime: newSelectedVideoOffsetSelector(state),
  live: liveSelector(state),
  url: playerUrlSelector(state),
  playingState: isPlayingSelector(state),
  sideHd: hdStateSelector(state),
  playSpeed: speedCoefficientSelector(state),
  muteStatus: muteStatusSelector(state),
  volumeLevel: volumeLevelSelector(state),
});

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(ArchivePlayer);
