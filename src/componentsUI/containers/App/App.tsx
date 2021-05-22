import AppView from "../../views/App";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { initStartAction } from "../../../modules/init/actions";
import { inProgressSelector, completeSelector } from "../../../modules/init";

import {
  setExtendedSidebarStatusAction,
  selectShowExtendedSidebarStatus,
} from "../../../modules/sidemenu";
import { Dispatch } from "redux";

const mapDispatchToProps = (dispatch:Dispatch) => ({
  initStart: () => {
    dispatch(initStartAction());
  },
  showExtendedSidebar: (status:boolean) => {
    dispatch(setExtendedSidebarStatusAction(status));
  },
});

const mapStateToProps = (state:any) => ({
  initInProgress: inProgressSelector(state),
  initComplete: completeSelector(state),
  showExtendedSidebarStatus: selectShowExtendedSidebarStatus(state),
});

export default withRouter(
  //@ts-ignore
  connect(mapStateToProps, mapDispatchToProps)(AppView)
);
