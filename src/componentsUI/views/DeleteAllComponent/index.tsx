import React from "react";

import Tooltip from "@material-ui/core/Tooltip";
import { ReactComponent as GarbageIcon } from "../../../assets/img/FCamListItem/garbage.svg";

import {
  DeleteContainer,
  DeleteBtnText,
  DeleteIconContainer,
} from "./styled-components";

//Подсказки
const deleteAllIconText = "Очистить выбор камер";

const DeleteAllComponent = ({
  cleanAll: cleanAllProps,
}: DeleteAllComponentProps) => {
  return (
    <>
      <Tooltip title={deleteAllIconText} placement="top">
        <DeleteContainer
          className="delete-container"
          onClick={() => cleanAllProps()}
        >
          <DeleteIconContainer className="delete-icon-container">
            <GarbageIcon />
          </DeleteIconContainer>
          <DeleteBtnText>Очистить список</DeleteBtnText>
        </DeleteContainer>
      </Tooltip>
    </>
  );
};

DeleteAllComponent.displayName = "DeleteAllComponent";

export default DeleteAllComponent;
