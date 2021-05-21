import React from "react";
import styled from "styled-components";

import { styles } from "./styled-components";

const Heading = styled(
  ({
    level = 4,
    children,
    reverse,
    palette = "grayscale",
    theme,
    ...props
  }: HeadingProps) => React.createElement(`h${level}`, props, children)
)`
  ${styles}
`;

Heading.displayName = "Heading";

export default Heading;
