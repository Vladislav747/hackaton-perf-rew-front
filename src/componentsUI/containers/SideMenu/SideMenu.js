import { connect } from "react-redux";

import SideMenu from "../../../UIKit/moleculs/SideMenu";

import {
  selectOptionsForStreetsSubMenu,
  selectShowExtendedSidebarStatus,
  setExtendedSidebarStatusAction,
  selectShowExtendedSubMenuCustomGroupsStatus,
  selectShowExtendedSubMenuStreetsStatus,
} from "../../../modules/sidemenu";

const mapDispatchToProps = dispatch => ({
  setExtendedSidebarStatus: status =>
    dispatch(setExtendedSidebarStatusAction(status)),
});

const mapStateToProps = state => ({
  optionsForStreetsMenu: selectOptionsForStreetsSubMenu(state),
  showExtendedSidebarStatus: selectShowExtendedSidebarStatus(state),
  showExtendedSubMenuCustomGroupsStatus: selectShowExtendedSubMenuCustomGroupsStatus(
    state
  ),
  showExtendedSubMenuStreetsStatus: selectShowExtendedSubMenuStreetsStatus(
    state
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
