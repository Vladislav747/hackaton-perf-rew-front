import React from "react";

import { LogoContainer } from "./styled-components";
import { ReactComponent as IsLogo } from "../../../assets/svgs/streetsOnline/RawSvg/logo.svg";

const Logo = () => (
  <LogoContainer className="logo-container">
    <a href="/">
      <IsLogo />
    </a>
  </LogoContainer>
);

Logo.displayName = "Logo";
export default Logo;
