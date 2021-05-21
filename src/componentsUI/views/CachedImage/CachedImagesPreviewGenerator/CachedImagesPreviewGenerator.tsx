import React, { useState } from "react";

import { errorsBases } from "./errosBase64";

import CachedImageHoverMenu from "../CachedImageHoverMenu";
import {
  PreviewContainer,
  FailedLoadImgContainer,
  SuccessImg,
  LoadingImgContainer,
  Sceleton,
} from "./styled-components";

enum cachedImageStatus {
  loading,
  ok,
  networkError,
  notFoundError,
}

const CachedImagesPreviewGenerator = ({
  onPlayButtonClick: onPlayButtonClickProps,
  onArchiveButtonClick: onArchiveButtonClickProps,
  onFavouriteButtonClick: onFavouriteButtonClickProps,
  imgData: imgDataProps,
  isCameraInFavourites: isCameraInFavouritesProps,
}: CachedImagesPreviewGeneratorProps) => {
  const [showButtonState, setButtonState] = useState<boolean>(false);
  const loadStatus = imgDataProps?.imgLoadStatus;

  return (
    <PreviewContainer
      className="camera__img-container"
      onMouseOver={() => setButtonState(true)}
      onMouseLeave={() => setButtonState(false)}
      onTouchEnd={() => setButtonState(true)}
    >
      {/** Вывод CachedImage в случае успешного получения всех данных картинки */}
      {showButtonState && (
        <CachedImageHoverMenu
          onPlayButtonClick={() => onPlayButtonClickProps()}
          onArchiveButtonClick={() => onArchiveButtonClickProps()}
          onFavouriteButtonClick={() => onFavouriteButtonClickProps()}
          isCameraInFavourites={isCameraInFavouritesProps}
        />
      )}
      {/** Если есть нет картикни то показываем соотвествующую заглушку  */}
      {(() => {
        switch (loadStatus) {
          case cachedImageStatus.ok: {
            return (
              <SuccessImg className="camera__img" src={imgDataProps?.imgBlob} />
            );
          }
          case cachedImageStatus.networkError: {
            return (
              <FailedLoadImgContainer
                src={errorsBases.networkError}
                className="img--not-able-network"
              />
            );
          }
          case cachedImageStatus.notFoundError: {
            return (
              <FailedLoadImgContainer
                src={errorsBases.notFoundError}
                className="img--not-able-not-found"
              />
            );
          }
          case cachedImageStatus.loading:
          default: {
            return (
              <LoadingImgContainer className="failed-img-container">
                <Sceleton />
              </LoadingImgContainer>
            );
          }
        }
      })()}
    </PreviewContainer>
  );
};

export default CachedImagesPreviewGenerator;
