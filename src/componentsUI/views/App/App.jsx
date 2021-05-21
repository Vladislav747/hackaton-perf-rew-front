import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import { YMInitializer } from "react-yandex-metrika";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import Loader from "../../../UIKit/atoms/Loader";
import ToastContainer from "../../../UIKit/atoms/ToastNotification";
import CopyrightBanner from "../../containers/CopyrightBanner/CopyrightBanner";
import AddCustomGroupModal from "../../containers/AddCustomGroupModal";
import EditCustomGroupModal from "../../containers/EditCustomGroupModal";

import theme from "../../../helpers/themes/default";
import { GlobalStyle } from "./styled-components";
import ListCustomGroupsModal from "../../containers/ListCustomGroupsModal";
import WarningModal from "../../containers/WarningModal";

// Containers
const DefaultLayout = Loadable({
  loader: () => import("../DefaultLayout"),
  loading: Loader,
});

const LayoutWithMenu = Loadable({
  loader: () => import("../LayoutWithMenu"),
  loading: Loader,
});

const Page404 = Loadable({
  loader: () => import("../Page404"),
  loading: Loader,
});

const Page500 = Loadable({
  loader: () => import("../Page500"),
  loading: Loader,
});

const StreetsOnline = Loadable({
  loader: () => import("../../containers/StreetsOnline"),
  loading: Loader,
});

const Archive = Loadable({
  loader: () => import("../../containers/Archive"),
  loading: Loader,
});

const LoginForm = Loadable({
  loader: () => import("../../containers/LoginForm"),
  loading: Loader,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  componentDidMount() {
    this.props.initStart();
  }
  render() {
    if (!this.props.initComplete) {
      return <Loader />;
    }
    return (
      <React.Fragment>
        <YMInitializer accounts={[+process.env.REACT_APP_YANDEX_METRICS]} />
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Switch>
            <Route
              path="/authorization"
              name="Авторизация"
              component={LoginForm}
            />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <ProtectedRoute
              path={`/camera-archive/id/:cameraId`}
              name="Архив"
              component={props => (
                <DefaultLayout>
                  <Archive {...props} />
                </DefaultLayout>
              )}
            />
            <Route
              path="/video"
              name="Видеонаблюдение"
              component={props => (
                <DefaultLayout>
                  <StreetsOnline {...props} />
                </DefaultLayout>
              )}
            />
            <Route
              path="/favourites"
              name="Избранное"
              component={props => (
                <LayoutWithMenu
                  showSidebarStatus={this.props.showExtendedSidebarStatus}
                  showExtendedSidebar={this.props.showExtendedSidebar}
                >
                  <StreetsOnline {...props} />
                </LayoutWithMenu>
              )}
            />
            <Route
              path="/"
              name="Улицы онлайн"
              component={props => (
                <LayoutWithMenu
                  showSidebarStatus={this.props.showExtendedSidebarStatus}
                  showExtendedSidebar={this.props.showExtendedSidebar}
                >
                  <StreetsOnline {...props} />
                </LayoutWithMenu>
              )}
            />
          </Switch>
          <CopyrightBanner />
          <WarningModal />
          <AddCustomGroupModal />
          <EditCustomGroupModal />
          <ListCustomGroupsModal />
          <ToastContainer />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  initStart: PropTypes.func.isRequired,
  initComplete: PropTypes.bool.isRequired,
  initInProgress: PropTypes.bool,
};

export default App;
