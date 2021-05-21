import styled from "styled-components";
import { ifProp } from "styled-tools";
import device from "../../../../helpers/device";
import {
  mediaQueries,
  widthSidebar,
} from "../../../../helpers/styled-components";

export const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

export const SideBarWrapper = styled.div``;

export const SidebarOverlay = styled.div`
  display: ${ifProp("showOverlay", "block", "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  opacity: 0.3;
  cursor: pointer;
`;

export const RootWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  min-height: ${props => {
    if (device.isAny()) {
      return `${window.innerHeight}px`;
    }
    return "100vh;";
  }};
  width: 100%;
  padding-left: ${ifProp("show", `${36 + widthSidebar}px`, "36px")};
  padding-right: 36px;
  margin: auto;

  ${mediaQueries("xl")`
      width: 100%;
      padding-left: ${ifProp("show", `calc(${24 + widthSidebar}px)`, "24px")};
      padding-right: 24px;
    `};

  ${mediaQueries("sm")`
      width: 100%;
      min-width: 320px;
      padding-left: 10px;
      padding-right: 10px;
    `};
`;

export const Main = styled.main`
  display: flex;
  flex: 1 0 auto;
  width: 100%;
  justify-content: center;
`;
export const FooterStyled = styled.footer`
  flex: 0 0 auto;
  width: 100%;
  margin-top: 3rem;
`;
