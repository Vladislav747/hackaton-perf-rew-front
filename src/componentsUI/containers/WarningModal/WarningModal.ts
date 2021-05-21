import { connect } from "react-redux";

import WarningModal from "../../views/WarningModal";

import {
  openWarningModalAction,
  selectWarningModalStatus,
  deleteAllCamerasFlagAction,
  deleteAllCamerasFlagStatus,
} from "../../../modules/WarningModal";

const mapDispatchToProps = (dispatch: any) => ({
  closeWarningModal: (status: boolean) => dispatch(openWarningModalAction(status)),
  deleteAllCamerasFlag: (status: boolean) => dispatch(deleteAllCamerasFlagAction(status))
});

const mapStateToProps = (state: any) => ({
  openWarningModal: selectWarningModalStatus(state),
  deleteAllCamerasFlag: deleteAllCamerasFlagStatus(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(WarningModal);
