export const viewTypes = Object.freeze({
  BIG_PANEL: "BIG_PANEL",
  FOUR_PANEL: "FOUR_PANEL",
  NINE_PANEL: "NINE_PANEL",
  LIST_PANEL: "LIST_PANEL",
  SEARCH: "SEARCH",
  MAP: "MAP",
  LIST: "LIST_PANEL",
  CALCULATOR: "CALC",
  MOBILE: "MOBILE",
  TABLET: "TABLET",
});

export const elementsNumForTypes = Object.freeze({
  BIG_PANEL_FIRST_ROW: 7,
  BIG_PANEL_REST_ROW: 5,
  FOUR_PANEL: 3,
  NINE_PANEL: 5,
  MOBILE: 1,
  TABLET: 2,
});

export const stateSchema = {
  currentViewType: viewTypes.FOUR_PANEL,
  currentSortFunctionName: "default",
  sortType: "inc",
  showSceleton: false,
  imageSrcWithTimestamp: {},
  fullscreenMode: false,
  gridCalculatedNum: undefined,
  playAllState: false,
  fsId: null,
  activePlayerCams: [],
};
