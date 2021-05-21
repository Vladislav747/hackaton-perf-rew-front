import React, { useState, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";

import {
  SpanLink,
  FavouritesBtn,
  FavouritesFilledBtn,
} from "./styled-components";

import history from "../../../helpers/history";
import { getAccessToken } from "../../../helpers/authTokens";
import UnAuthorizedTooltip from "../UnAuthorizedTooltip";

const addFavouritesIconText = "Добавить в избранное";
const deleteFavouritesIconText = "Убрать из избранного";

/**
 * Переход неавторизованным
 * @param activeStatus
 */
const handleUnauthorizedFavouritesClick = () => {
  history.push(`/authorization`);
};

const FavouritesIconWrapper = ({
  handleFavouritesBtnClick: handleFavouritesBtnClickProps,
  isCameraInFavourites: isCameraInFavouritesProps,
}: FavouritesIconWrapperProps) => {
  const [isAuthorizedState, setIsAuthorizedState] = useState<any>(false);

  useEffect(() => {
    setIsAuthorizedState(getAccessToken());
  }, []);

  return (
    <>
      {isAuthorizedState ? (
        <>
          {isCameraInFavouritesProps ? (
            <Tooltip title={deleteFavouritesIconText} placement="top">
              <FavouritesFilledBtn
                onClick={() => {
                  handleFavouritesBtnClickProps();
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title={addFavouritesIconText} placement="top">
              <FavouritesBtn
                onClick={() => {
                  handleFavouritesBtnClickProps();
                }}
              />
            </Tooltip>
          )}
        </>
      ) : (
        <>
          <UnAuthorizedTooltip>
            <FavouritesBtn />
          </UnAuthorizedTooltip>
        </>
      )}
    </>
  );
};

export default FavouritesIconWrapper;
