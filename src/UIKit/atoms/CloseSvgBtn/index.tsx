import React from 'react';

import { CloseSvg } from './styled-components';

/* js to ts adaptation */
const JsCloseSvg: any = CloseSvg;

class CloseSvgBtn extends React.Component<any, any> {
  render() {
    const props = this.props
    return <JsCloseSvg {...props} />;
  }
};

export default CloseSvgBtn;
