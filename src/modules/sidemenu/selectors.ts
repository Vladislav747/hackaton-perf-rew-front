import { moduleName } from "./module";
import { createSelector } from "reselect";

//@ts-ignore
export const sidemenuState = (state: SidemenuSchema) => state[moduleName];

export const selectOptionsForStreetsSubMenu = createSelector(
  [sidemenuState],
  state => state.optionsForStreetsSubMenuStore
);

export const selectShowExtendedSidebarStatus = createSelector(
  [sidemenuState],
  state => state.showExtendedSidebarStatusStore
);

export const selectShowExtendedSubMenuStreetsStatus = createSelector(
  [sidemenuState],
  state => state.showExtendedSubMenuStreetsStatusStore
);

export const selectShowExtendedSubMenuCustomGroupsStatus = createSelector(
  [sidemenuState],
  state => state.showExtendedSubMenuCustomGroupsStatusStore
);
