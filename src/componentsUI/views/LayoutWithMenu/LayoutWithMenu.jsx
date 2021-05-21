import React from "react";
import Loadable from "react-loadable";

import Loader from "../../../UIKit/atoms/Loader";

import {
  RootWrapper,
  Main,
  FooterStyled,
  Wrapper,
  SideBarWrapper,
  SidebarOverlay,
} from "./styled-components";

import SideMenu from "../../containers/SideMenu";

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
  loader: () => import("../Footer"),
  loading,
});

const LayoutWithMenu = ({
  children: childrenProps,
  showSidebarStatus: showSidebarStatusProps,
  showExtendedSidebar: showExtendedSidebarProps,
}) => (
  <Wrapper className="wrapper">
    <SideBarWrapper className="sidebar-wrapper">
      <SideMenu />
    </SideBarWrapper>
    <RootWrapper show={showSidebarStatusProps} className="root-wrapper">
      <Header />
      <Main>{childrenProps}</Main>
      <FooterStyled>
        <Footer />
      </FooterStyled>
    </RootWrapper>
    <SidebarOverlay
      className="sidebar__overlay"
      showOverlay={showSidebarStatusProps}
      onClick={() => showExtendedSidebarProps(false)}
    />
  </Wrapper>
);

export default LayoutWithMenu;
