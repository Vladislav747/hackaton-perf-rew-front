import React from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import { ThemeProvider } from "styled-components";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import Loader from "../../../UIKit/atoms/Loader";
import ToastContainer from "../../../UIKit/atoms/ToastNotification";

import theme from "../../../helpers/themes/default";
import { GlobalStyle } from "./styled-components";

import ReviewForm from "../ReviewForm";
import Reviews from "../Reviews";
import LeaderProfile from "../LeaderProfile";

// Containers
const DefaultLayout = Loadable({
  loader: () => import("../../layouts/DefaultLayout"),
  //@ts-ignore
  loading: Loader,
});

const LayoutWithMenu = Loadable({
  loader: () => import("../../layouts/LayoutWithMenu"),
  //@ts-ignore
  loading: Loader,
});

const Page404 = Loadable({
  loader: () => import("../Page404"),
  //@ts-ignore
  loading: Loader,
});

const Page500 = Loadable({
  loader: () => import("../Page500"),
  //@ts-ignore
  loading: Loader,
});

const LoginForm = Loadable({
  loader: () => import("../../containers/LoginForm"),
  //@ts-ignore
  loading: Loader,
});

const StaffProfile = Loadable({
  loader: () => import("../../views/StaffProfile"),
  //@ts-ignore
  loading: Loader,
});

const App = (props: any) => 
{
  // return() {
  //   if (!this.props.initComplete) {
  //     return <Loader />;
  //   }
    return (
      <React.Fragment>
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
            <Route
              exact
              path="/"
              name="Карточка сотрудника"
              component={(props:any) => (
                <LayoutWithMenu
                showSidebarStatus={props.showExtendedSidebarStatus}
                showExtendedSidebar={props.showExtendedSidebar}
              >
                <StaffProfile {...props} />
              </LayoutWithMenu>
              )}
            />
            <Route
              exact
              path="/review"
              name="Оставить отзыв"
              component={(props:any) => (
                <LayoutWithMenu
                  showSidebarStatus={props.showExtendedSidebarStatus}
                  showExtendedSidebar={props.showExtendedSidebar}
                >
                  <ReviewForm {...props} />
                </LayoutWithMenu>
              )}
            />
            <Route
              exact
              path="/card-leader"
              name="Карточка руководителя"
              component={(props:any) => (
                <LayoutWithMenu
                  showSidebarStatus={props.showExtendedSidebarStatus}
                  showExtendedSidebar={props.showExtendedSidebar}
                >
                  <LeaderProfile {...props} />
                </LayoutWithMenu>
              )}
            />
            <Route
              exact
              path="/reviews"
              name="Мои отзывы"
              component={(props:any) => (
                <LayoutWithMenu
                  showSidebarStatus={props.showExtendedSidebarStatus}
                  showExtendedSidebar={props.showExtendedSidebar}
                >
                  <Reviews {...props} />
                </LayoutWithMenu>
              )}
            />
          </Switch>
          <ToastContainer />
        </ThemeProvider>
      </React.Fragment>
    );
  }

export default App;
