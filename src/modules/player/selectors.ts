import { moduleName } from "./module";
import { createSelector } from "reselect";

/**
 * селекторы
 */
//@ts-ignore
export const playerStore = (store: PlayerSchema) => store[moduleName];

export const newSelectedTimeSelector = createSelector(
  [playerStore],
  state => state.newSelectedTime
);

export const currentVideoTimeSelector = createSelector(
  [playerStore],
  state => state.currentVideoTime
);

export const muteStatusSelector = createSelector(
  [playerStore],
  state => state.muteStatusStore
);

export const volumeLevelSelector = createSelector(
  [playerStore],
  state => state.volumeLevelStore
);

export const userNeedToStartPlayManualSelector = createSelector(
  [playerStore],
  state => state.userNeedToStartPlayManual
);

export const hdStateSelector = createSelector(
  [playerStore],
  state => state.hdState
);

export const isPlayingSelector = createSelector(
  [playerStore],
  state => state.isPlaying
);

export const speedCoefficientSelector = createSelector(
  [playerStore],
  state => state.speedCoefficient
);
