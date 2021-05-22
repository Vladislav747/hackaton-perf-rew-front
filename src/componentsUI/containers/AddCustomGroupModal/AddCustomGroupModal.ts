import { connect } from "react-redux";

import AddCustomGroupModal from "../../views/AddCustomGroupModal";

const mapStateToProps = (state: any) => ({
  statusModal: false,
});

export default connect(mapStateToProps, null)(AddCustomGroupModal);
