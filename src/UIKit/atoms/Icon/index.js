import React from "react";
import PropTypes from "prop-types";

import { Wrapper } from "./styled-components";

const Icon = ({ icon: Svg, ...props }) => {
  return (
    <Wrapper {...props}>
      <Svg />
    </Wrapper>
  );
};

Icon.propTypes = {
  icon: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  palette: PropTypes.string,
  reverse: PropTypes.bool,
};

export default Icon;
