import React from "react";

import "../../../assets/css/rc-dropdown/index.css";

import {
  MenuStyled,
  MenuLinkStyled,
  MenuExitBtnStyled,
  BtnExitUsernameTextStyled,
  BtnExitBtnTextStyled,
} from "./styled-components";

const HeaderMenu = (props: HeaderMenuProps) => {
  const {
    authorized: authorizedProps,
    username: usernameProps,
    authInProgress: authInProgressProps,
    logOut: logOutProps,
  } = props;
  return (
    <MenuStyled className="component-header-menu">
      {!authorizedProps && !authInProgressProps && (
        <MenuLinkStyled to="/authorization" className="btn-login">
          Войти
        </MenuLinkStyled>
      )}
      {authorizedProps && (
        <MenuExitBtnStyled className="btn-exit">
          <BtnExitUsernameTextStyled className="btn-exit__username-text">
            ({usernameProps ? usernameProps : "Пользователь"}){" "}
          </BtnExitUsernameTextStyled>
          <BtnExitBtnTextStyled
            className="btn-exit__btn-text"
            onClick={() => logOutProps()}
          >
            Выйти
          </BtnExitBtnTextStyled>
        </MenuExitBtnStyled>
      )}
    </MenuStyled>
  );
};

HeaderMenu.displayName = "HeaderMenu";
export default HeaderMenu;
