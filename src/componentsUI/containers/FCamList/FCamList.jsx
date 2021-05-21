import { connect } from "react-redux";

import FCamListView from "../../views/FCamList";
import {
  listSelector,
  initListAction,
  activeObjectIdSelector,
  setActiveObjectIdAction,
  isLoadingSelector,
  activeObjectNameSelector,
  objectStateParentIdSelector,
  isInitSelector,
  isSelectableSelector,
  selectStartAction,
  selectedObjectsSelector,
  fullSelectedGroupsSelector,
  searchStringSelector,
  cleanAllAction,
  failedLimitedIdsSelector,
  loadingLimitedIdsSelector,
  getGroupAction,
} from "../../../modules/flist";
import { setCamerasReadyState } from "../../../modules/streetsOnline";

const mapDispatchToProps = dispatch => ({
  initList: () => dispatch(initListAction()),
  setActiveObjectId: id => dispatch(setActiveObjectIdAction(id)),
  toggleSelected: id => dispatch(selectStartAction(id)),
  setCamerasReadyState: currentState =>
    dispatch(setCamerasReadyState(currentState)),
  cleanAll: () => dispatch(cleanAllAction()),
  getGroup: id => dispatch(getGroupAction(id)),
});

const mapStateToProps = state => ({
  list: listSelector(state),
  activeObjectId: activeObjectIdSelector(state),
  isLoading: isLoadingSelector(state),
  activeObjectName: activeObjectNameSelector(state),
  isInit: isInitSelector(state),
  parentObjectId: objectStateParentIdSelector(state, {
    id: activeObjectIdSelector(state),
  }),
  parentIsSelectable: isSelectableSelector(state, {
    id: activeObjectIdSelector(state),
  }),
  selectedObjects: selectedObjectsSelector(state),
  fullSelectedGroups: fullSelectedGroupsSelector(state),
  searchString: searchStringSelector(state),
  loadingObjects: loadingLimitedIdsSelector(state),
  failedObjects: failedLimitedIdsSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(FCamListView);
