import styled from "styled-components";
import { Link } from "react-router-dom";
import { Item as MenuItem } from "rc-menu";
import { palette } from "styled-theme";

export const MenuStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  padding: 0;
`;

export const MenuLinkStyled = styled(Link)`
  font-size: 18px;
  line-height: 21px;
  text-decoration: none;
  display: inline;
  margin: 0 1em;
  &:visited {
    color: ${palette("grayscale", 1)};
  }
  &:hover {
    text-decoration: underline;
  }
`;
export const MenuExitBtnStyled = styled.div`
  font-size: 18px;
  line-height: 21px;
  display: inline;
  cursor: pointer;
  margin: 0 1em;
`;

export const MenuItemStyled = styled(MenuItem)`
  cursor: pointer;
  font-size: 18px;
  line-height: 20px;
  font-weigjt: 400;
`;

export const BtnExitUsernameTextStyled = styled.span`
  color: #757575;
`;

export const BtnExitBtnTextStyled = styled.span`
  &:hover {
    text-decoration: underline;
  }
`;
