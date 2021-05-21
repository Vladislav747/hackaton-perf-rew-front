import Archive from "../../views/Archive";

import { connect } from "react-redux";

import {
  currentVideoTimestampSelector,
  isOpenModalStateSelector,
  cameraDataSelector,
  cameraNameSelector,
  downloadModeSelector,
  downloadRangeArraySelector,
  downloadLinkSelector,
  downloadNameSelector,
  playerUrlSelector,
  loadingStateSelector,
} from "../../../modules/Archive";

import {
  setIsOpenModalStateAction,
  updateCameraDataAction,
  cleanCameraDataAction,
  setDownloadModeAction,
  setDownloadRangeArrayAction,
  setDownloadLinkAction,
  setDownloadNameAction,
  startDownloadVideo,
} from "../../../modules/Archive";

import { setIsPlayingAction } from "../../../modules/player/actions";

import {
  muteStatusSelector,
  volumeLevelSelector,
} from "../../../modules/player";

import {
  setMuteStatusAction,
  setVolumeLevelAction,
} from "../../../modules/player";

const mapDispatchToProps = (dispatch: any) => ({
  updateCameraData: (cameraId: number) =>
    dispatch(updateCameraDataAction(cameraId)),
  cleanCameraData: () => dispatch(cleanCameraDataAction()),
  setIsOpenModalState: (isOpenModalState: boolean) =>
    dispatch(setIsOpenModalStateAction(isOpenModalState)),
  setDownloadMode: (downloadMode: boolean) =>
    dispatch(setDownloadModeAction(downloadMode)),
  setDownloadRangeArray: (downloadRangeArray: Date[]) =>
    dispatch(setDownloadRangeArrayAction(downloadRangeArray)),
  setDownloadLink: (data: any) => dispatch(setDownloadLinkAction(data)),
  setDownloadName: (data: any) => dispatch(setDownloadNameAction(data)),
  setVolumeLevelPlayer: (volume: string) =>
    dispatch(setVolumeLevelAction(volume)),
  setMuteStatusPlayer: (muteStatus: boolean) =>
    dispatch(setMuteStatusAction(muteStatus)),
  setIsPlaying: (isPlaying: boolean) => dispatch(setIsPlayingAction(isPlaying)),
  orderVideo: (data: downloadVideoData) => dispatch(startDownloadVideo(data)),
});

const mapStateToProps = (state: any) => ({
  cameraData: cameraDataSelector(state),
  isOpenModalState: isOpenModalStateSelector(state),
  cameraName: cameraNameSelector(state),
  currentVideoTimestamp: currentVideoTimestampSelector(state),
  selectedDateTime: currentVideoTimestampSelector(state),
  liveUrl: playerUrlSelector(state),
  userSeletedTimestamp: currentVideoTimestampSelector(state),
  downloadMode: downloadModeSelector(state),
  downloadRangeArray: downloadRangeArraySelector(state),
  lastDownloadLink: downloadLinkSelector(state),
  lastDownloadName: downloadNameSelector(state),
  loadingProgress: loadingStateSelector(state),
});

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Archive);
