import MobileDevicesModalControl from "../../views/MobileDevicesModalControl";
import { connect } from "react-redux";

import {
  setHdStateAction,
  setIsPlayingAction,
  hdStateSelector,
  isPlayingSelector,
} from "../../../modules/player";

import {
  liveSelector,
  setCurrentVideoTimestampOnShiftAction,
} from "../../../modules/Archive";

const mapDispatchToProps = (dispatch: any) => ({
  fiveSecondBack: () => dispatch(setCurrentVideoTimestampOnShiftAction(-5)),
  fiveSecondForward: () => dispatch(setCurrentVideoTimestampOnShiftAction(5)),
  clickPlay: (isPlaying: boolean) => dispatch(setIsPlayingAction(isPlaying)),
  clickHd: (hdState: boolean) => dispatch(setHdStateAction(hdState)),
});

const mapStateToProps = (state: any) => ({
  hdActive: hdStateSelector(state),
  live: liveSelector(state),
  isPlaying: isPlayingSelector(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileDevicesModalControl);
