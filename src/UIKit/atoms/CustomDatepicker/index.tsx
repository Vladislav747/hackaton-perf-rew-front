import React from "react";

import { CustomDatepickerContainer } from "./styled-components";

//Кастомный вывод времени
const CustomDatepicker = React.forwardRef(
  (
    { value: valueProps, onClick: onClickProps }: CustomDatepickerProps,
    ref: any
  ) => (
    <CustomDatepickerContainer
      className="custom-datepicker"
      onClick={onClickProps}
      ref={ref}
    >
      {valueProps}
    </CustomDatepickerContainer>
  )
);

export default CustomDatepicker;
