import { connect } from "react-redux";

import SideMenu from "../../../UIKit/moleculs/SideMenu";

import {
  selectOptionsForStreetsSubMenu,
  selectShowExtendedSidebarStatus,
  chooseCityAction,
  setExtendedSidebarStatusAction,
  selectShowExtendedSubMenuCustomGroupsStatus,
  setSubmenuCustomGroupsStatusAction,
  selectShowExtendedSubMenuStreetsStatus,
  setSubmenuStreetsStatusAction,
} from "../../../modules/sidemenu";

import {
  openAddGroupModalAction,
  selectPersonalGroups,
  deletePersonalGroupForUserAction,
  openEditGroupModalAction,
  openEditModeAction,
  selectActivePersonalGroup,
  setActivePersonalGroupAction,
} from "../../../modules/customGroupsModal";

import { chooseFavouritesAction } from "../../../modules/favourite";

const mapDispatchToProps = dispatch => ({
  chooseCity: (id, name) => dispatch(chooseCityAction(id, name)),
  setExtendedSidebarStatus: status =>
    dispatch(setExtendedSidebarStatusAction(status)),
  openAddGroupModal: status => dispatch(openAddGroupModalAction(status)),
  deletePersonalGroupForUser: name =>
    dispatch(deletePersonalGroupForUserAction(name)),
  openEditGroupModal: status => dispatch(openEditGroupModalAction(status)),
  openEditMode: id => dispatch(openEditModeAction(id)),
  setActivePersonalGroup: id => dispatch(setActivePersonalGroupAction(id)),
  setSubmenuCustomGroupsStatus: status =>
    dispatch(setSubmenuCustomGroupsStatusAction(status)),
  setSubmenuStreetsStatus: status =>
    dispatch(setSubmenuStreetsStatusAction(status)),
  chooseFavourites: () => dispatch(chooseFavouritesAction()),
});

const mapStateToProps = state => ({
  optionsForStreetsMenu: selectOptionsForStreetsSubMenu(state),
  showExtendedSidebarStatus: selectShowExtendedSidebarStatus(state),
  personalGroups: selectPersonalGroups(state),
  activeGroup: selectActivePersonalGroup(state),
  showExtendedSubMenuCustomGroupsStatus: selectShowExtendedSubMenuCustomGroupsStatus(
    state
  ),
  showExtendedSubMenuStreetsStatus: selectShowExtendedSubMenuStreetsStatus(
    state
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
