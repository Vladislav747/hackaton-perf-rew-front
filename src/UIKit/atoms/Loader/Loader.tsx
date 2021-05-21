import React from "react";

import { LdsDualRing, LoaderWrapper } from "./styled-components";

const Loader = ({ style: styleProps, loaderColor: loaderColorProps = "#2c66be", margin: marginProps = "50px auto" }: LoaderProps) => (
  <LoaderWrapper className="loader-wrapper" style={styleProps}>
    <LdsDualRing className="lds-dual-ring" loaderColor={loaderColorProps} marginProp={marginProps}></LdsDualRing>
  </LoaderWrapper>
);

export default Loader;
