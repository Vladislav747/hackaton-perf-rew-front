import SuperCameraView from "../../../UIKit/atoms/superCameraView";
import { connect } from "react-redux";
import {
  runCarusel,
  stopCarusel,
  caruselStateSelector,
} from "../../../modules/FullscreenCarusel";

import { setFsId, selectFsId } from "../../../modules/streetsOnline";

const mapDispatchToProps = (dispatch: any) => ({
  runCarusel: () => dispatch(runCarusel()),
  stopCarusel: () => dispatch(stopCarusel()),
  setFsId: (fsId: number | undefined) => dispatch(setFsId(fsId)),
});

const mapStateToProps = (state: any) => ({
  caruselIsRunning: caruselStateSelector(state),
  fsId: selectFsId(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuperCameraView);
