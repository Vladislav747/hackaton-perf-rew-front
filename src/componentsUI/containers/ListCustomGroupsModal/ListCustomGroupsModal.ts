import { connect } from "react-redux";

import ListCustomGroupsModal from "../../views/ListCustomGroupsModal";

import {
  openListGroupsModalAction,
  selectShowListCustomGroupsModalStatus,
  selectPersonalGroups,
  editCameraInCustomGroupAction,
  openAddGroupModalAction,
} from "../../../modules/customGroupsModal";

const mapDispatchToProps = (dispatch: any) => ({
  closeListCustomGroupsModal: (status: boolean) =>
    dispatch(openListGroupsModalAction(status)),
  editCameraInCustomGroup: (customGroupId: string, typeOfAction: string) =>
    dispatch(editCameraInCustomGroupAction(customGroupId, typeOfAction)),
  openAddGroupModal: (status: boolean) =>
    dispatch(openAddGroupModalAction(status)),
});

const mapStateToProps = (state: any) => ({
  statusModal: selectShowListCustomGroupsModalStatus(state),
  personalGroups: selectPersonalGroups(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCustomGroupsModal);
