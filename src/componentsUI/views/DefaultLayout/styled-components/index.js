import styled from "styled-components";

import device from "../../../../helpers/device";
import { mediaQueries } from "../../../../helpers/styled-components";

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
  max-width: 2100px;
  width: 100%;
  padding-left: 36px;
  padding-right: 36px;
  margin: auto;

  ${mediaQueries("xl")`
      width: 100%;
      padding-left: 24px;
      padding-right: 24px;
    `};

  ${mediaQueries("sm")`
      width: 100%;
      min-width: 320px;
      padding-left: 0;
      padding-right: 0;
    `};
`;

export const Main = styled.main`
  display: flex;
  flex: 1 0 auto;
  width: 100%;
  position: relative;
  justify-content: center;
`;
export const FooterStyled = styled.footer`
  flex: 0 0 auto;
  width: 100%;
  margin-top: 3rem;
`;
