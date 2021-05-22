import React, { useState } from "react";
import classNames from "classnames";

import Logo from "../Logo";
import HeaderMenu from "../../containers/HeaderMenu";
import MobileMenu from "../../containers/MobileMenu";
// import BreadCrumbs from "../BreadCrumbs";
import HeaderBreadCrumbs from "../../../UIKit/atoms/HeaderBreadCrumbs";
import Button from "../../../UIKit/atoms/Button";

import {
  HeaderStyled,
  HeaderStyledNoLink,
  GridStyled,
  ColStyled,
  RowStyled,
  LeftPartCol,
  RightPartCol,
  GridRowStyled,
  HeaderStyledTop,
  BackArrowIconStyled,
  CloseSmallSvgStyled,
} from "./styled-components";

import {
  ymSendAnalytics,
  yandexEvents,
} from "../../../helpers/yandex-analytics";

const Header = ({
  currentObjectName: currentObjectNameProps,
  showLoginLink: showLoginLinkProps = true,
  changeHasSeenRedirectBannerVal: changeHasSeenRedirectBannerValProps,
  hasSeenRedirectBanner: hasSeenRedirectBannerProps,
}: HeaderProps) => {
  const [showRedirectLinkState, setShowRedirectLinkState] = useState(true);

  const closeClickHandler = () => {
    setShowRedirectLinkState(false);
    if (changeHasSeenRedirectBannerValProps) {
      changeHasSeenRedirectBannerValProps(true);
    }
  };

  return showLoginLinkProps ? (
    <HeaderStyled className="component-header">

      <GridStyled className="component-header__grid">
        <GridRowStyled
          between={"sm"}
          center={"xs"}
          className="component-header__row"
        >
          <LeftPartCol
            className="component-header__left-part"
            xs={12}
            sm={12}
            md={12}
            lg={8}
          >
            <RowStyled center={"xs"} start={"sm"}>
              <ColStyled className="component-header__col">
                <Logo />
                <HeaderBreadCrumbs currentObjectName={currentObjectNameProps} />
              </ColStyled>
            </RowStyled>
          </LeftPartCol>
          <RightPartCol
            className="component-header__right-part"
            xs={12}
            sm={12}
            md={12}
            lg={4}
          >
            <RowStyled xs={12} sm={6} className="component-header__right-row">
              <ColStyled className="component-header__col col--right">
                <MobileMenu />
                <HeaderMenu />
              </ColStyled>
            </RowStyled>
          </RightPartCol>
        </GridRowStyled>
      </GridStyled>
    </HeaderStyled>
  ) : (
    <HeaderStyledNoLink className="component-header">
      <GridStyled className="component-header__grid">
        <GridRowStyled
          between={"sm"}
          center={"xs"}
          className="component-header__row"
        >
          <LeftPartCol
            className="component-header__left-part"
            xs={12}
            sm={12}
            md={12}
            lg={12}
          >
            <RowStyled center={"xs"} start={"sm"}>
              <ColStyled className="component-header__col">
                <Logo />
                <HeaderBreadCrumbs currentObjectName={currentObjectNameProps} />
              </ColStyled>
            </RowStyled>
          </LeftPartCol>
        </GridRowStyled>
      </GridStyled>
    </HeaderStyledNoLink>
  );
};

Header.displayName = "Header";
export default Header;
