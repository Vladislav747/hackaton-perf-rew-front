import { connect } from "react-redux";

import MobileMenu from "../../views/MobileMenu";

import {
  selectShowExtendedSidebarStatus,
  setExtendedSidebarStatusAction,
} from "../../../modules/sidemenu";

const mapDispatchToProps = dispatch => ({
  showExtendedSidebar: status => {
    dispatch(setExtendedSidebarStatusAction(status));
  },
});

const mapStateToProps = state => ({
  showExtendedSidebarStatus: selectShowExtendedSidebarStatus(state),
});


export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
