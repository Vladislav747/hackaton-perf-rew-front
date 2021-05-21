import { connect } from "react-redux";

import StreetsOnlineView from "../../views/StreetsOnline";

import {
  changeViewType,
  changeSortType,
  selectCurrentView,
  selectCurrentSortFunctionName,
  selectCurrentSortType,
  addPlayingId,
  selectFullscreenMode,
  setFullscreenMode,
  setCalculatedNum,
  selectCalculatedNum,
  setPlayAll,
  selectPlayAll,
  selectShowSceleton,
} from "../../../modules/streetsOnline";

import {
  selectPlayStateIds,
  addPlayingIdAction,
  removePlayingIdAction,
  setPlayingArrayAction,
  toggleHdAllAction,
  selectHdAllStatus,
} from "../../../modules/PlayerBoxWithState";

import {
  selectedCamerasContentSelector,
  cleanAllSelectedAction,
} from "../../../modules/newFlist";

const mapDispatchToProps = dispatch => ({
  changeViewType: newViewType => dispatch(changeViewType(newViewType)),
  changeSortType: (newSortTypeName, type) =>
    dispatch(changeSortType(newSortTypeName, type)),
  addPlayingId: id => dispatch(addPlayingId(id)),
  setFullscreenMode: mode => dispatch(setFullscreenMode(mode)),
  setCalculatedNum: num => dispatch(setCalculatedNum(num)),
  setPlayAll: state => dispatch(setPlayAll(state)),
  addPlayigId: id => dispatch(addPlayingIdAction(id)),
  removePlayigId: id => dispatch(removePlayingIdAction(id)),
  setPlayingArray: playingArray =>
    dispatch(setPlayingArrayAction(playingArray)),
  toggleHdAll: hdStatus => dispatch(toggleHdAllAction(hdStatus)),
  cleanAllProps: () => dispatch(cleanAllSelectedAction()),
});

const mapStateToProps = state => ({
  currentView: selectCurrentView(state),
  currentSortFunctionName: selectCurrentSortFunctionName(state),
  currentSelectedCamerasProps: selectedCamerasContentSelector(state),
  currentShowSceletonState: selectShowSceleton(state),
  currentPlayngIds: selectPlayStateIds(state),
  currentSortType: selectCurrentSortType(state),
  fullscreenMode: selectFullscreenMode(state),
  calculatedNum: selectCalculatedNum(state),
  playAllState: selectPlayAll(state),
  playStateIds: selectPlayStateIds(state),
  hdAllStatus: selectHdAllStatus(state),
});
export default connect(mapStateToProps, mapDispatchToProps)(StreetsOnlineView);
