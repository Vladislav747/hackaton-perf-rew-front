import React from 'react';
import PropTypes from 'prop-types';

import { StyledLink, StyledButton, Anchor } from './styled-components';

const Button = ({ ...props }) => {
  const { to, href } = props;
  if (to) {
    return <StyledLink {...props} />;
  }
  if (href) {
    return <Anchor {...props} />;
  }
  return <StyledButton {...props} />;
};

Button.propTypes = {
  disabled: PropTypes.bool,
  palette: PropTypes.string,
  transparent: PropTypes.bool,
  reverse: PropTypes.bool,
  height: PropTypes.number,
  to: PropTypes.string,
  href: PropTypes.string,
  round: PropTypes.oneOf(['all', 'right', 'left', 'disabled']),
};
/**
 * round
 */
Button.defaultProps = {
  palette: 'primary',
  height: 40,
  round: 'all',
};

Button.displayName = 'Button';

export default Button;
