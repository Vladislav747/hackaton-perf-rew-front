import { connect } from "react-redux";

import EditCustomGroupModal from "../../views/EditCustomGroupModal";

import {
  openEditGroupModalAction,
  selectShowEditGroupModalStatus,
  selectCamsForPersonalGroup,
  editPersonalGroupForUserAction,
  selectCurrentEditName,
} from "../../../modules/customGroupsModal";

const mapDispatchToProps = (dispatch: any) => ({
  closeEditGroupModal: (status: boolean) => dispatch(openEditGroupModalAction(status)),
  editPersonalGroupForUser: (name: string) => dispatch(editPersonalGroupForUserAction(name)),
});

const mapStateToProps = (state: any) => ({
  camsForPersonalGroup: selectCamsForPersonalGroup(state),
  showEditGroupModalStatus: selectShowEditGroupModalStatus(state),
  currentEditName: selectCurrentEditName(state),

});

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomGroupModal);
