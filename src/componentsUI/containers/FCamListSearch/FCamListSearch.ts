import { connect } from "react-redux";

import FCamListSearch from "../../views/FCamListSearch";

import {
  searchStringSelector,
  changeSearchStringAction,
} from "../../../modules/newFlist";

const mapDispatchToProps = (dispatch: any) => ({
  changeSearchString: (string: string) =>
    dispatch(changeSearchStringAction(string)),
});

const mapStateToProps = (state: any) => ({
  searchString: searchStringSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(FCamListSearch);
