import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import {
  getRandomIntInclusive,
  getRoundedTimestamp,
  generateImageHeaders,
} from "../../../helpers/archive";
import sendErrorToSentry from "../../../helpers/sentry";
import { getAuthTokenFromLs } from "../../../helpers/authTokens";

import CachedImagesPreviewGenerator from "./CachedImagesPreviewGenerator";

const min = 60 * 1000 * 5; // 5 minutes
const max = 60 * 1000 * 6; // 6 minutes

enum cachedImageStatus {
  loading,
  ok,
  networkError,
  notFoundError,
}

/* Объект для предотвращения лишних загрузок. Объект Кэша */
const cache: any = {};

const CachedImageView = ({
  url: urlProps,
  setPlayerMode: setPlayerModeProps,
  token: tokenProps,
  idCachedImage: idCachedImageProps,
  addCameraToActive: addCameraToActiveProps,
  cameraId: cameraIdProps,
  isCameraInFavourites: isCameraInFavouritesProps,
  addCameraToFavourites: addCameraToFavouritesProps,
  deleteCameraFromFavourites: deleteCameraFromFavouritesProps,
}: CachedImageTypes) => {
  const [imgData, setImgData] = useState<any>({
    imgLoadStatus: cachedImageStatus.loading,
    imgBlob: null,
  });
  const [fullImgUrl, setFullImgUrl] = useState<string>("");

  const history = useHistory();

  //TODO: Костыль
  if (tokenProps === "") {
    const tokenFromLs = getAuthTokenFromLs();
    tokenProps = tokenFromLs.TOKEN;
  }

  const getImage = useCallback(() => {
    if (cache[generateFullImgUrl()]) {
      setImgData({
        imgBlob: cache[generateFullImgUrl()],
        imgLoadStatus: cachedImageStatus.ok,
      });
    } else {
      fetch(fullImgUrl, {
        method: "GET",
        headers: generateImageHeaders(tokenProps),
        mode: "cors",
        cache: "default",
      })
        .then(response => {
          //Если 404 статус то ставим особую заглушку
          if (response.status === 404) {
            setImgData({
              imgBlob: null,
              imgLoadStatus: cachedImageStatus.notFoundError,
            });
            return null;
          } else {
            return response.blob();
          }
        })
        .then(imgBlob => {
          if (imgBlob) {
            cache[generateFullImgUrl()] = URL.createObjectURL(imgBlob);
            setImgData({
              imgBlob: URL.createObjectURL(imgBlob),
              imgLoadStatus: cachedImageStatus.ok,
            });
          }
        })
        .catch(e => {
          //Если 404 статус то ставим особую заглушку
          setImgData({
            imgBlob: null,
            imgLoadStatus: cachedImageStatus.networkError,
          });
          sendErrorToSentry(
            `Image url ${urlProps} download for CachedImageView failed with ${e}`
          );
        });
    }
  }, [fullImgUrl, tokenProps, urlProps]);

  /**
   * Если у нас url картинки получаем ее
   */
  useEffect(() => {
    if (fullImgUrl) getImage();
  }, [fullImgUrl, getImage]);

  const generateFullImgUrl = useCallback(
    () => `${urlProps}?${getRoundedTimestamp()}`,
    [urlProps]
  );

  useEffect(() => {
    setFullImgUrl(generateFullImgUrl());
    const updateTimerState = setInterval(() => {
      setFullImgUrl(generateFullImgUrl());
    }, getRandomIntInclusive(min, max));
    return () => {
      clearInterval(updateTimerState);
    };
  }, [generateFullImgUrl]);

  /**
   * Выбор избранной камеры
   */
  const handleFavouritesClick = () => {
    if (isCameraInFavouritesProps) {
      deleteCameraFromFavouritesProps(+cameraIdProps);
    } else {
      addCameraToFavouritesProps(+cameraIdProps);
    }
  };

  return (
    <CachedImagesPreviewGenerator
      onPlayButtonClick={() => {
        addCameraToActiveProps(idCachedImageProps);
        setPlayerModeProps(true);
      }}
      onArchiveButtonClick={() => {
        history.push(`/camera-archive/id/${cameraIdProps}`);
      }}
      onFavouriteButtonClick={() => {
        handleFavouritesClick();
      }}
      imgData={imgData}
      isCameraInFavourites={isCameraInFavouritesProps}
    />
  );
};

export default CachedImageView;
