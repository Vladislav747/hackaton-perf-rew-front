import React, { useState, useEffect } from "react";
import { ClickAwayListener } from "@material-ui/core";

import {
  CameraViewHead,
  CameraSnapShot,
  CameraViewHeadText,
  CameraViewHeadIcon,
  ThreeDotsIconStyled,
  CamSubmenuExtra,
  CamSubmenuExtraList,
  CamSubmenuExtraListItem,
  CamSubmenuExtraListIcon,
} from "./styled-components";

import Player from "../Player";
import CachedImage from "../CachedImage";
import UnAuthorizedTooltip from "../../../UIKit/atoms/UnAuthorizedTooltip";

import { getAccessToken } from "../../../helpers/authTokens";
import history from "../../../helpers/history";

import { ReactComponent as GarbageIcon } from "../../../assets/img/FCamListItem/garbage.svg";
import { ReactComponent as PlusCircleIcon } from "../../../assets/svgs/solid/circle-plus.svg";

const PlayerBoxWithState = ({
  url: urlProps,
  poster: posterProps,
  id: idProps,
  authorized: authorizedProps,
  playStateIds: playStateIdsProps,
  cameraName: cameraNameProps,
  hdAllStatus: hdAllStatusProps,
  token: tokenProps,
  showUI: showUIProps,
  playNow: playNowProps,
  fsId: fsIdProps,
  cleanOneCamera: cleanOneCameraProps,
  addCameraToActive: addCameraToActiveProps,
  activePlayCameras: activePlayCamerasProps,
  removeCameraFromActive: removeCameraFromActiveProps,
  changeCustomGroup: changeCustomGroupProps,
  addCameraToFavourites: addCameraToFavouritesProps,
  deleteCameraFromFavourites: deleteCameraFromFavouritesProps,
  favouritesCameras: favouritesCamerasProps,
}: PlayerBoxWithStateProps) => {
  const [playerModeState, setPlayerModeState] = useState(playNowProps);
  const [enableHdState, setEnableHdState] = useState(false);
  const [openSubmenuState, setOpenSubmenuState] = useState(false);
  const [activeHeaderState, setActiveHeaderState] = useState(false);

  const [isCameraInFavouritesState, setIsCameraInFavouritesState] = useState(
    false
  );

  //Проверка что мы авторизованы или нет?
  const isAuthorized = getAccessToken();

  /**
   * Обработчик для custom group в нераскрытом меню
   */
  const clickCustomGroupsHandler = (id: number | null) => {
    //Если мы авторизованы то показываем меню иначе редиректим на авторизацию
    if (isAuthorized) {
      changeCustomGroupProps(idProps);
    } else {
      history.push("/authorization");
    }
  };

  useEffect(() => {
    if (fsIdProps && fsIdProps == idProps) {
      setEnableHdState(true);
    } else if (fsIdProps && fsIdProps != idProps) {
      setPlayerModeState(false);
    } else if (!fsIdProps) {
      setPlayerModeState(true);
    }
  }, [fsIdProps]);

  useEffect(() => {
    if (playStateIdsProps && !playNowProps) {
      if (playStateIdsProps.indexOf(idProps) != -1) {
        setPlayerModeState(true);
      } else {
        setPlayerModeState(false);
      }
    }
  }, [idProps, playStateIdsProps]);

  //Если камера активна(запущена кнопка play) то делаем заголовок синий
  useEffect(() => {
    const checkId = activePlayCamerasProps.includes(idProps);
    setActiveHeaderState(checkId);
  }, [activePlayCamerasProps]);

  //Проверка является ли камера избранной
  useEffect(() => {
    if (favouritesCamerasProps.includes(idProps)) {
      setIsCameraInFavouritesState(true);
    } else {
      setIsCameraInFavouritesState(false);
    }
  }, [favouritesCamerasProps, idProps]);

  return (
    <>
      <CameraViewHead className="camera-view__head" active={activeHeaderState}>
        <CameraViewHeadText className="camera-view__title">
          {cameraNameProps}
        </CameraViewHeadText>
        <CameraViewHeadIcon
          onClick={() => {
            setOpenSubmenuState(!openSubmenuState);
          }}
        >
          <ThreeDotsIconStyled />
          {openSubmenuState && (
            <ClickAwayListener onClickAway={() => setOpenSubmenuState(false)}>
              <CamSubmenuExtra>
                <CamSubmenuExtraList>
                  <CamSubmenuExtraListItem
                    onClick={() => {
                      cleanOneCameraProps(idProps);
                    }}
                  >
                    <CamSubmenuExtraListIcon>
                      <GarbageIcon />
                    </CamSubmenuExtraListIcon>
                    Удалить камеру из списка
                  </CamSubmenuExtraListItem>
                  <UnAuthorizedTooltip>
                    <CamSubmenuExtraListItem
                      onClick={() => {
                        clickCustomGroupsHandler(+idProps);
                      }}
                      disabled={!isAuthorized}
                    >
                      <CamSubmenuExtraListIcon>
                        <PlusCircleIcon />
                      </CamSubmenuExtraListIcon>
                      Изменить камеру в группе
                    </CamSubmenuExtraListItem>
                  </UnAuthorizedTooltip>
                </CamSubmenuExtraList>
              </CamSubmenuExtra>
            </ClickAwayListener>
          )}
        </CameraViewHeadIcon>
      </CameraViewHead>
      <CameraSnapShot className="camera__snapshot">
        {/*Если нажата кнопка play*/}
        {playerModeState && (
          <Player
            url={urlProps}
            poster={posterProps}
            playImmediately={true}
            showInterface={showUIProps}
            onStop={() => {
              setPlayerModeState(false);
            }}
            sideHd={hdAllStatusProps || enableHdState}
            addCameraToActive={addCameraToActiveProps}
            removeCameraFromActive={removeCameraFromActiveProps}
            cameraId={idProps}
          />
        )}
        {/*Если не нажата кнопка play*/}
        {!playerModeState && (
          <CachedImage
            key={idProps}
            url={posterProps}
            authorized={authorizedProps}
            setPlayerMode={() => {
              setPlayerModeState(true);
            }}
            token={tokenProps}
            idCachedImage={idProps}
            addCameraToActive={addCameraToActiveProps}
            cameraId={+idProps}
            isCameraInFavourites={isCameraInFavouritesState}
            addCameraToFavourites={addCameraToFavouritesProps}
            deleteCameraFromFavourites={deleteCameraFromFavouritesProps}
          />
        )}
      </CameraSnapShot>
    </>
  );
};

PlayerBoxWithState.displayName = "PlayerBoxWithState";

export default PlayerBoxWithState;
