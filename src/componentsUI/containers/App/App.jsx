import AppView from "../../views/App";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { initStartAction } from "../../../modules/init/actions";
import { inProgressSelector, completeSelector } from "../../../modules/init";

import {
  setExtendedSidebarStatusAction,
  selectShowExtendedSidebarStatus,
} from "../../../modules/sidemenu";

const mapDispatchToProps = dispatch => ({
  initStart: () => {
    dispatch(initStartAction());
  },
  showExtendedSidebar: status => {
    dispatch(setExtendedSidebarStatusAction(status));
  },
});

const mapStateToProps = state => ({
  initInProgress: inProgressSelector(state),
  initComplete: completeSelector(state),
  showExtendedSidebarStatus: selectShowExtendedSidebarStatus(state),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppView)
);
