import { moduleName } from "./module";
import { createSelector } from "reselect";
import moment from "moment";

export const archiveState = (state: any) => state[moduleName];

export const currentVideoOffsetInSecondsSelector = createSelector(
  [archiveState],
  state => state.currentVideoOffsetInSeconds
);

export const currentPlaylistDurarionSelector = createSelector(
  [archiveState],
  state => state.currentPlaylistDurarion
);

export const archiveDaysDurationSelector = createSelector(
  [archiveState],
  state => {
    const archiveStartTime = state.cameraData.ARCHIVE.START_TIME;

    const startTime = archiveStartTime.split(" ")[1];

    const archiveStartTimestamp = moment(
      archiveStartTime,
      "DD-MM-YYYY HH:mm"
    ).unix();

    const difference = Date.now() / 1000 - archiveStartTimestamp;
    const days = Math.floor(difference / 60 / 60 / 24);

    return { days, startTime };
  }
);

export const timelineIntervalSelector = createSelector(
  [archiveState],
  state => {
    return {
      timelineStartPositionInMs:
        state.timelineInterval.timelineStartPositionInMs,
      timelineEndPositionInMs: state.timelineInterval.timelineEndPositionInMs,
    };
  }
);

export const newSelectedVideoOffsetSelector = createSelector(
  [archiveState],
  state => state.newSelectedVideoOffsetInSeconds
);

export const cameraNameSelector = createSelector(
  [archiveState],
  state => state.cameraName
);

export const cameraDataSelector = createSelector(
  [archiveState],
  state => state.cameraData
);

export const downloadModeSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.downloadMode
);

export const downloadRangeArraySelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.downloadRangeArray
);

export const archiveCursorSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.archiveCursorLocked
);

export const fragmentOffsetSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.fragmentOffset
);

export const loadedStartSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.loadedStart
);

export const loadedEndSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.loadedEnd
);

export const playerUrlSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.playerUrl
);

export const timelineOffsetInMsSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.timelineOffsetInMs
);

export const timelineStartTimestampSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.timelineStartTimestamp
);

export const timelineEndTimestampSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.timelineEndTimestamp
);

export const currentVideoTimestampSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.currentVideoTimestamp
);

export const userSeletedTimestampSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.userSeletedTimestamp
);

export const liveSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.live
);

export const videoPlayerOffsetInSecondsSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.videoPlayerOffsetInSeconds
);

export const isOpenModalStateSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.isOpenModalState
);

export const timelineInActionSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.timelineInAction
);

export const loadingStateSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.loadingProgress
);

export const loadingErrorStateSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.errorMessage
);

export const downloadLinkSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.downloadLink
);

export const downloadNameSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.name
);

export const canDownloadSelector = createSelector(
  [archiveState],
  (state: archiveSagaShema) => state.canDownload
);
