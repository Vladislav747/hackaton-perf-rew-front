import { connect } from "react-redux";

import FCamListGroup from "../../views/FCamListGroup";

import {
  listCustomGroupSelector,
  initListAction,
  setActiveObjectIdAction,
  isLoadingCustomGroupSelector,
  isInitCustomGroupSelector,
  selectStartAction,
  selectedObjectsCustomGroupSelector,
  failedLimitedIdsCustomGroupSelector,
  loadingLimitedIdsCustomGroupSelector,
  linkNameSelector,
} from "../../../modules/customGroupsFlist";

const mapDispatchToProps = dispatch => ({
  initList: () => dispatch(initListAction()),
  setActiveObjectId: id => dispatch(setActiveObjectIdAction(id)),
  toggleSelected: id => dispatch(selectStartAction(id)),
});

const mapStateToProps = state => ({
  list: listCustomGroupSelector(state),
  isLoading: isLoadingCustomGroupSelector(state),
  isInit: isInitCustomGroupSelector(state),
  selectedObjects: selectedObjectsCustomGroupSelector(state),
  loadingObjects: loadingLimitedIdsCustomGroupSelector(state),
  failedObjects: failedLimitedIdsCustomGroupSelector(state),
  linkName: linkNameSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(FCamListGroup);
