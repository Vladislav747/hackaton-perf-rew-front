import { connect } from "react-redux";

import FCamListHeader from "../../views/FCamListHeader";

import {
  activeObjectIdCustomGroupSelector,
  setActiveObjectIdAction,
  activeObjectNameCustomGroupSelector,
  objectParentIdCustomGroupSelector,
  isSelectableCustomGroupSelector,
  selectStartAction,
  fullSelectedGroupsCustomGroupSelector,
  cleanAllAction,
} from "../../../modules/customGroupsFlist";

const mapDispatchToProps = (dispatch: any) => ({
  setActiveObjectId: (id: any) => dispatch(setActiveObjectIdAction(id)),
  cleanAll: () => dispatch(cleanAllAction()),
  toggleSelected: (id: any) => dispatch(selectStartAction(id)),
});

const mapStateToProps = (state: any) => ({
  name: activeObjectNameCustomGroupSelector(state),
  id: activeObjectIdCustomGroupSelector(state),
  parentObjectId: objectParentIdCustomGroupSelector(state, {
    id: activeObjectIdCustomGroupSelector(state),
  }),
  isSelectable: isSelectableCustomGroupSelector(state, {
    id: activeObjectIdCustomGroupSelector(state),
  }),
  fullSelectedGroups: fullSelectedGroupsCustomGroupSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(FCamListHeader);
