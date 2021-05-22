import React from "react";
import Loadable from "react-loadable";

import Loader from "../../../UIKit/atoms/Loader";

import { RootWrapper, Main, FooterStyled } from "./styled-components";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <Loader />
  </div>
);

// Containers
const Header = Loadable({
  loader: () => import("../../containers/Header"),
  loading,
});

const Footer = Loadable({
  loader: () => import("../../views/Footer"),
  loading,
});

const DefaultLayout = (props:any) => (
  <div>
    <div className="sidebar"></div>
    <RootWrapper>
      <Header />
      <Main>{props.children}</Main>
      <FooterStyled>
        <Footer />
      </FooterStyled>
    </RootWrapper>
  </div>
);

export default DefaultLayout;
