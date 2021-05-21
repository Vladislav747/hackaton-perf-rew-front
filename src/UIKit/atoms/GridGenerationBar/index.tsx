import React, { useState } from "react";
//@ts-ignore
import classNames from "classnames";

import { BarWrapper, BarTitle, BarElement } from "./styled-components";

const GridGenerationBar = (props: GridGenerationBarProps) => {
  const {
    onChangeCamsInRow: onChangeCamsInRowProps,
    calculatedNum: calculatedNumProps,
  } = props;
  const [camsInRowValueState] = useState([3, 4, 5]);

  const onChangeInputHandler = (value: number) => {
    onChangeCamsInRowProps(value);
  };

  return (
    <BarWrapper className="bar-wrapper bar">
      <BarTitle className="bar__title">{`Укажите количество камер`}</BarTitle>
      {camsInRowValueState.map(el => (
        <BarElement
          key={el}
          onClick={() => onChangeInputHandler(el)}
          className={classNames({
            bar__element: true,
            active: el === calculatedNumProps,
          })}
        >
          {el} в ряд
        </BarElement>
      ))}
    </BarWrapper>
  );
};

export default GridGenerationBar;
