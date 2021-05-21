import { connect } from "react-redux";

import FCamListHeader from "../../views/FCamListHeader";

import {
  isContentFullSelectedSelector,
  isContentSelectableSelector,
  currentSelectedGroupIdSelector,
  currentGroupNameSelector,
  currentGroupParentIdSelector,
} from "../../../modules/newFlist/selectors";

import {
  changeGroupStartAction,
  cleanAllSelectedAction,
  selectAllCamerasInCurrentGroup,
} from "../../../modules/newFlist/actions";

const mapDispatchToProps = (dispatch: any) => ({
  setActiveGroupId: (groupId: number) =>
    dispatch(changeGroupStartAction(groupId)),
  cleanAll: () => dispatch(cleanAllSelectedAction()),
  toggleSelected: (groupId: number) =>
    dispatch(selectAllCamerasInCurrentGroup(groupId)),
});

const mapStateToProps = (state: any) => ({
  name: currentGroupNameSelector(state),
  id: currentSelectedGroupIdSelector(state),
  parentGroupId: currentGroupParentIdSelector(state),
  isSelectable: isContentSelectableSelector(state, {
    groupId: currentSelectedGroupIdSelector(state),
  }),
  fullSelectedGroups: isContentFullSelectedSelector(state, {
    groupId: currentSelectedGroupIdSelector(state),
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FCamListHeader);
