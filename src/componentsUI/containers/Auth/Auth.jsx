import AuthView from "../../views/Auth";
import { connect } from "react-redux";
import { authByCode, authErrorAction } from "../../../modules/user/actions";
import {
  authorizedSelector,
  authCompleteSelector,
} from "../../../modules/user";

const mapDispatchToProps = dispatch => ({
  authByCode: code => dispatch(authByCode(code)),
  authError: message => dispatch(authErrorAction(message)),
});

const mapStateToProps = state => ({
  authorized: authorizedSelector(state),
  authComplete: authCompleteSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthView);
