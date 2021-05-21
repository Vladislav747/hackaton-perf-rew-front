import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

import {
  CamHoverContainer,
  CamHoverMenu,
  HoverPlayBtn,
  ArchivePlayBtn,
} from "./styled-components";

import FavouritesIconWrapper from "../../../../UIKit/atoms/FavouritesIconWrapper";

//Подсказки
const archiveIconText = "Режим Архива";
const playIconText = "Запустить";

const CachedImageHoverMenu = ({
  onPlayButtonClick: onPlayButtonClickProps,
  onArchiveButtonClick: onArchiveButtonClickProps,
  onFavouriteButtonClick: onFavouriteButtonClickProps,
  isCameraInFavourites: isCameraInFavouritesProps,
}: CachedImageHoverMenuProps) => {
  return (
    <CamHoverContainer className="cam-hover-container">
      <CamHoverMenu>
        <Tooltip title={playIconText} placement="top">
          <HoverPlayBtn onClick={() => onPlayButtonClickProps()} />
        </Tooltip>
        <Tooltip title={archiveIconText} placement="top">
          <ArchivePlayBtn onClick={() => onArchiveButtonClickProps()} />
        </Tooltip>
        <FavouritesIconWrapper
          handleFavouritesBtnClick={() => onFavouriteButtonClickProps()}
          isCameraInFavourites={isCameraInFavouritesProps}
        />
      </CamHoverMenu>
    </CamHoverContainer>
  );
};
export default CachedImageHoverMenu;
