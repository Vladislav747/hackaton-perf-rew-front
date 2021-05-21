import { connect } from "react-redux";

import PlayerBoxWithState from "../../views/PlayerBoxWithState";

import {
  selectPlayAll,
  selectFsId,
  addCameraToActiveAction,
  selectActivePlayerCams,
  removeCameraFromActiveAction,
} from "../../../modules/streetsOnline";

import { cleanOneCameraAction } from "../../../modules/newFlist";

import {
  selectPlayStateIds,
  addPlayingIdAction,
  removePlayingIdAction,
  setPlayingArrayAction,
  selectHdAllStatus,
} from "../../../modules/PlayerBoxWithState";

import { changeCustomGroupAction } from "../../../modules/customGroupsModal";

import { authTokenSelector, authorizedSelector } from "../../../modules/user";

import {
  addCameraToFavouritesAction,
  deleteCameraFromFavouritesAction,
  favouritesCamerasSelector,
} from "../../../modules/favourite";

const mapDispatchToProps = (dispatch: any) => ({
  addPlayigId: (id: string) => dispatch(addPlayingIdAction(id)),
  removePlayigId: (id: string) => dispatch(removePlayingIdAction(id)),
  setPlayingArray: (plaingArray: any) =>
    dispatch(setPlayingArrayAction(plaingArray)),
  cleanOneCamera: (id: number) => dispatch(cleanOneCameraAction(id)),
  addCameraToActive: (id: number) => dispatch(addCameraToActiveAction(id)),
  removeCameraFromActive: (id: number) =>
    dispatch(removeCameraFromActiveAction(id)),
  changeCustomGroup: (cameraId: number) =>
    dispatch(changeCustomGroupAction(cameraId)),
  addCameraToFavourites: (cameraId: number) =>
    dispatch(addCameraToFavouritesAction(cameraId)),
  deleteCameraFromFavourites: (cameraId: number) =>
    dispatch(deleteCameraFromFavouritesAction(cameraId)),
});

const mapStateToProps = (state: any) => ({
  authorized: authorizedSelector(state),
  playAllState: selectPlayAll(state),
  playStateIds: selectPlayStateIds(state),
  hdAllStatus: selectHdAllStatus(state),
  token: authTokenSelector(state),
  fsId: selectFsId(state),
  activePlayCameras: selectActivePlayerCams(state),
  favouritesCameras: favouritesCamerasSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerBoxWithState);
