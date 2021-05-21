import { connect } from "react-redux";

import AddCustomGroupModal from "../../views/AddCustomGroupModal";

import {
  openAddGroupModalAction,
  selectShowAddGroupModalStatus,
  addPersonalGroupForUserAction,
  addSelectedCamerasFromFlistInCustomGroupAction,
} from "../../../modules/customGroupsModal";

const mapDispatchToProps = (dispatch: any) => ({
  closeAddGroupModal: (status: boolean) => dispatch(openAddGroupModalAction(status)),
  addPersonalGroupForUser: (name: string) => dispatch(addPersonalGroupForUserAction(name)),
  addSelectedCamerasFromFlistInCustomGroup: (status: any) => dispatch(addSelectedCamerasFromFlistInCustomGroupAction(status)),
});

const mapStateToProps = (state: any) => ({
  statusModal: selectShowAddGroupModalStatus(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomGroupModal);
