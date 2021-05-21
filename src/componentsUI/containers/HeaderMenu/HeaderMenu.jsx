import HeaderMenuView from "../../views/HeaderMenu";
import { connect } from "react-redux";
import {
  logOutAction,
  userNameSelector,
  authorizedSelector,
  authInProgressSelector,
} from "../../../modules/user";

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOutAction()),
});

const mapStateToProps = state => ({
  authorized: authorizedSelector(state),
  authInProgress: authInProgressSelector(state),
  username: userNameSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenuView);
