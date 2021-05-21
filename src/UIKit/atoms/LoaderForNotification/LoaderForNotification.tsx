import React from "react";

import { Wrapper, WrapperText } from "./styled-components";

import Loader from "../Loader"

const LoaderForNotification = () => (
  <Wrapper className="loader-for-notification">
    <WrapperText className="loader-for-notification__text">Видео обрабатывается, ожидайте пожалуйста!</WrapperText>
    <Loader loaderColor={"#fff"} margin={"0"} />
  </Wrapper>
);

export default LoaderForNotification;
