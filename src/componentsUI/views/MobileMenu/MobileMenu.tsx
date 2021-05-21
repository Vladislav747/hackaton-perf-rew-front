import React from "react";

import {
  MenuStyled,
  StyledHamburgerMenuIcon
} from "./styled-components";

const MobileMenu = (props: MobileMenuProps) => {
  const {
    showExtendedSidebar: showExtendedSidebarProps,
    showExtendedSidebarStatus: showExtendedSidebarStatusProps,
  } = props;

  return (
    <MenuStyled className="component-mobile-menu">
      <StyledHamburgerMenuIcon onClick={() => showExtendedSidebarProps(!showExtendedSidebarStatusProps)} />
    </MenuStyled>
  );
};

MobileMenu.displayName = "MobileMenu";
export default MobileMenu;
