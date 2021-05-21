import React, { useState, useEffect } from "react";

import { ContainerWithSpanWrapper } from "./styled-components";

const ContainerWithSpan = ({
  children,
  visibility,
}: ContainerWithSpanProps) => {
  const [visibilityState, setVisibilityState] = useState(false);

  useEffect(() => {
    if (visibility != visibilityState) {
      setVisibilityState(visibility);
    }
  }, [visibility]);

  return (
    <ContainerWithSpanWrapper
      className="container-with-span"
      visibility={visibility ? true : false}
    >
      {children}
    </ContainerWithSpanWrapper>
  );
};

export default ContainerWithSpan;
