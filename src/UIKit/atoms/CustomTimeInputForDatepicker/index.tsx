import React from "react";

import { TimeInputStyled } from "./styled-components/";

//Кастомный вывод даты для календаря камеры - react-datepicker
const CustomTimeInputForDatepicker = ({
  value: valueProps,
  onChange: onChangeProps,
}: CustomTimeOptions) => {
  const time = valueProps.split(":");
  const hour = time[0];
  const minutes = time[1];

  return (
    <>
      <TimeInputStyled
        value={hour}
        className="custom-time__input-hours"
        type="number"
        style={{ textAlign: "center", fontSize: "16px", width: "2.5em" }}
        onChange={(e: any) => {
          e.preventDefault();
          onChangeProps(`${e.target.value}:${minutes}`);
        }}
        min="0"
        max="23"
      />
      :
      <TimeInputStyled
        value={minutes}
        className="custom-time__input-minutes"
        type="number"
        style={{ textAlign: "center", fontSize: "16px", width: "2.5em" }}
        onChange={(e: any) => {
          onChangeProps(`${hour}:${e.target.value}`);
        }}
        min="0"
        max="59"
      />
    </>
  );
};

export default CustomTimeInputForDatepicker;
