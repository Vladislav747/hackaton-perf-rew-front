import { combineReducers } from "redux";

import initReducer, { moduleName as initModuleName } from "../modules/init";

import flistReducer, { moduleName as flistModuleName } from "../modules/flist";

import newFlistReducer, {
  moduleName as newFlistModuleName,
} from "../modules/newFlist";
import userReducer, { moduleName as userModuleName } from "../modules/user";

import playerBoxWithStateReducer, {
  moduleName as playerBoxWithStateName,
} from "../modules/PlayerBoxWithState";

import archiveReducer, {
  moduleName as archiveModuleName,
} from "../modules/Archive";

import fullscreenCarusel, {
  moduleName as fullscreenCaruselModuleName,
} from "../modules/FullscreenCarusel";

import eventsReducer, {
  moduleName as eventsModuleName,
} from "../modules/events";

import streetsOnlineReducer, {
  moduleName as streetsOnlineModuleName,
} from "../modules/streetsOnline";

import sidemenuReducer, {
  moduleName as sidemenuModuleName,
} from "../modules/sidemenu";

import playerReducer, {
  moduleName as playerModuleName,
} from "../modules/player";

import timelineReducer, {
  moduleName as timelineModuleName,
} from "../modules/timeline";

import customGroupsModalReducer, {
  moduleName as customGroupsModalModuleName,
} from "../modules/customGroupsModal";

import customGroupsFlistReducer, {
  moduleName as customGroupsFlistModuleName,
} from "../modules/customGroupsFlist";

import favouriteReducer, {
  moduleName as favouriteModuleName,
} from "../modules/favourite";

import warningModalReducer, {
  moduleName as warningModalModuleName,
} from "../modules/WarningModal";

const rootReducer = combineReducers({
  [initModuleName]: initReducer,
  [userModuleName]: userReducer,
  [streetsOnlineModuleName]: streetsOnlineReducer,
  [flistModuleName]: flistReducer,
  [newFlistModuleName]: newFlistReducer,
  [playerBoxWithStateName]: playerBoxWithStateReducer,
  [archiveModuleName]: archiveReducer,
  [fullscreenCaruselModuleName]: fullscreenCarusel,
  [eventsModuleName]: eventsReducer,
  [sidemenuModuleName]: sidemenuReducer,
  [playerModuleName]: playerReducer,
  [timelineModuleName]: timelineReducer,
  [customGroupsModalModuleName]: customGroupsModalReducer,
  [customGroupsFlistModuleName]: customGroupsFlistReducer,
  [favouriteModuleName]: favouriteReducer,
  [warningModalModuleName]: warningModalReducer,
});

export default rootReducer;
