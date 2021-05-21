import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  StyledTextarea,
  StyledSelect,
  StyledInput,
  InputContainer,
  InputLabel,
  IconWrapper,
} from "./styled-components";

const StatusIcon = ({ status }) => {
  if (status === "valid") {
    return <i class="fa fa-check"></i>;
  }
  return <i class="fa fa-question-circle"></i>;
};

const Input = React.forwardRef(({ ...props }, ref) => {
  const { label, status, height } = props;
  const [input, setInput] = useState("");

  if (props.type === "textarea") {
    return <StyledTextarea ref={ref} {...props} />;
  } else if (props.type === "select") {
    return <StyledSelect ref={ref} {...props} />;
  } else if (props.type === "checkbox") {
    return <StyledInput ref={ref} {...props} />;
  } else if (props.type === "radio") {
    return <StyledInput ref={ref} {...props} />;
  }
  return (
    <InputContainer>
      <StyledInput
        ref={ref}
        value={input}
        onChange={e => setInput(e.target.value)}
        {...props}
      />
      {label && (
        <InputLabel value={input} {...props}>
          {label}
        </InputLabel>
      )}
      {status && (
        <IconWrapper status={status} height={height}>
          <StatusIcon status={status} />
        </IconWrapper>
      )}
    </InputContainer>
  );
});

Input.propTypes = {
  type: PropTypes.string,
  height: PropTypes.number,
  status: PropTypes.oneOf(["invalid", "valid"]),
};

Input.defaultProps = {
  type: "text",
  height: 40,
};

export default Input;
