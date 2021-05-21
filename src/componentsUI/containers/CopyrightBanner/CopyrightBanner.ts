import CopyrightBanner from "../../views/CopyrightBanner";

import { connect } from "react-redux";

import { hasSeenCopyrightBannerSelector } from "../../../modules/init/selectors";

import { changeHasSeenCopyrightBannerValAction } from "../../../modules/init/actions";

const mapDispatchToProps = (dispatch: any) => ({
  changeHasSeenCopyrightBannerVal: (value: boolean) =>
    dispatch(changeHasSeenCopyrightBannerValAction(value)),
});

const mapStateToProps = (state: any) => ({
  hasSeenCopyrightBanner: hasSeenCopyrightBannerSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CopyrightBanner);
