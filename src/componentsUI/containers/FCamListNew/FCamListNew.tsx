import { connect } from "react-redux";

import FCamListView from "../../views/FCamList";

import {
  currentGroupContentSelector,
  isInitSelector,
  selectedCamerasSelector,
  isLoadingSelector,
} from "../../../modules/newFlist/selectors";

import {
  initListAction,
  changeGroupStartAction,
  toggleSelectedStartAction,
} from "../../../modules/newFlist/actions";

import { setCamerasReadyState } from "../../../modules/streetsOnline";

const mapDispatchToProps = (dispatch: any) => ({
  initList: () => dispatch(initListAction()),
  setCamerasReadyState: (currentState: boolean) =>
    dispatch(setCamerasReadyState(currentState)),
  setCurrentGroup: (groupId: number) =>
    dispatch(changeGroupStartAction(groupId)),
  toggleSelected: (toggledIds: number[]) =>
    dispatch(toggleSelectedStartAction(toggledIds)),
});

const mapStateToProps = (state: any) => ({
  list: currentGroupContentSelector(state),
  isInit: isInitSelector(state),
  selectedObjects: selectedCamerasSelector(state),
  isLoading: isLoadingSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(FCamListView);
