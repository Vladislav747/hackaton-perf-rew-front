import HeaderView from "../../views/Header";

import { withRouter } from "react-router";
import { connect } from "react-redux";

import { currentGroupNameSelector } from "../../../modules/newFlist";

import { changeHasSeenRedirectBannerValAction } from "../../../modules/init/actions";
import { hasSeenRedirectBannerSelector } from "../../../modules/init/selectors";

const mapStateToProps = state => ({
  currentObjectName: currentGroupNameSelector(state),
  hasSeenRedirectBanner: hasSeenRedirectBannerSelector(state),
});

const mapDispatchToProps = dispatch => ({
  changeHasSeenRedirectBannerVal: hasSeenRedirectBannerVal =>
    dispatch(changeHasSeenRedirectBannerValAction(hasSeenRedirectBannerVal)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderView)
);
