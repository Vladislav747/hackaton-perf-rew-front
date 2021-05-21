import React, { useEffect } from "react";

import { FCamListNewContainer } from "./styled-components";

const FCamListNew = (props: any) => {
  useEffect(() => {
    props.initFlist("", 0);
  }, []);

  return <FCamListNewContainer>123</FCamListNewContainer>;
};

export default FCamListNew;
