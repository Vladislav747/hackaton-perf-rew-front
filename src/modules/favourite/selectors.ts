import { moduleName } from "./module";
import { createSelector } from "reselect";

/**
 * селекторы
 */
export const favouritesState = (state: any) => state[moduleName];

export const favouritesCamerasSelector = createSelector(
  [favouritesState],
  state => state.favouritesCameras
);

export const favouriteGroupIdSelector = createSelector(
  [favouritesState],
  state => state.favouriteGroupId
);

// export const isCameraInFavouritesSelector = createSelector(
//   [favouritesState],
//   (state: any, cameraId: number) => {
//     return state.favouritesCameras.includes(cameraId);
//   }
// );
