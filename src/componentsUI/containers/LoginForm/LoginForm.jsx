import LoginFormView from "../../views/LoginForm";
import { connect } from "react-redux";
import {
  authorizedSelector,
  authInProgressSelector,
  authStartAction,
  authErrorsSelector,
  frontendIsReadySelector,
} from "../../../modules/user";

const mapDispatchToProps = dispatch => ({
  handleSubmit: data => dispatch(authStartAction(data)),
});

const mapStateToProps = state => ({
  isAuthorized: authorizedSelector(state),
  authInProgress: authInProgressSelector(state),
  errorMsg: authErrorsSelector(state),
  frontendIsReady: frontendIsReadySelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormView);
