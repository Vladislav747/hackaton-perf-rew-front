import FullscreenCarusel from "../../../UIKit/atoms/FullscreenCarusel";
import { connect } from "react-redux";
import {
  runCarusel,
  stopCarusel,
  caruselStateSelector,
} from "../../../modules/FullscreenCarusel";

import {
  toggleHdAllAction,
  selectHdAllStatus,
} from "../../../modules/PlayerBoxWithState";

import { setFsId, selectFsId } from "../../../modules/streetsOnline";

const mapDispatchToProps = (dispatch: any) => ({
  runCarusel: () => dispatch(runCarusel()),
  stopCarusel: () => dispatch(stopCarusel()),
  toggleHdAll: (hdStatus: boolean) => dispatch(toggleHdAllAction(hdStatus)),
  setFsId: (fsId: number) => dispatch(setFsId(fsId)),
});

const mapStateToProps = (state: any) => ({
  caruselIsRunning: caruselStateSelector(state),
  hdAllStatus: selectHdAllStatus(state),
  fsId: selectFsId(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(FullscreenCarusel);
