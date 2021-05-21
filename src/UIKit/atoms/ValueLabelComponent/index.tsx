import React from "react";
// @ts-ignore-start
import Tooltip from "@material-ui/core/Tooltip";

const ValueLabelComponent = (props: ValueLabelComponentProps) => {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top-end" title={value}>
      {children}
    </Tooltip>
  );
};
export default ValueLabelComponent;
