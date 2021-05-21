import React, { useState, useEffect } from "react";
import _ from "lodash";

import { ReactComponent as FullScreenIcon } from "../../../assets/img/player/full_screen.svg";
import { ReactComponent as HdIcon } from "../../../assets/img/player/HD.svg";
import { ReactComponent as TimerIcon } from "../../../assets/img/player/timer.svg";

import {
  ControlsContainer,
  Container,
  BtnContainer,
  SliderContainer,
} from "./styled-components";

const HIDE_MENU_TIMEOUT = 4000;

const FullscreenMenuControl = ({
  tHdAll,
  fsId,
  exitFullscreen,
  hdAllStatus,
  setRotateInterval,
  rotateInterval,
  exitCameraFs,
}: FullscreenCaruselProps) => {
  const [showControl, setShowControl] = useState(false);
  const [hideMenusTimer, setHideMenusTimer] = useState(0);
  const [hoverMenu, setHoverMenu] = useState(false);
  const [showSpeedSlider, setShowSpeedSlider] = useState(false);

  const hideMenu = () => {
    if (showMenu && typeof showMenu.cancel === "function") {
      showMenu.cancel();
    }
    clearTimeout(hideMenusTimer);
    setShowControl(false);
  };
  const createTimer = () => {
    clearTimeout(hideMenusTimer);
    setHideMenusTimer(setTimeout(() => hideMenu(), HIDE_MENU_TIMEOUT));
  };

  let showMenu = _.throttle(
    () => {
      if (!showControl) {
        setShowControl(true);
      }
      createTimer();
    },
    5000,
    { trailing: false }
  );

  useEffect(() => {
    document.addEventListener("mousemove", showMenu);
    hideMenu();
    return () => {
      document.removeEventListener("mousemove", showMenu);
    };
  }, [showMenu]);

  return (
    <ControlsContainer
      className="carusel-fsMenuControll"
      hoverMenu={hoverMenu}
      showControl={showControl}
      onMouseEnter={() => setHoverMenu(true)}
      onMouseLeave={() => setHoverMenu(false)}
    >
      {fsId ? (
        <Container>
          <BtnContainer onClick={() => exitCameraFs()}>
            <FullScreenIcon />
          </BtnContainer>
        </Container>
      ) : (
        <Container>
          <BtnContainer
            active={hdAllStatus ? "true" : undefined}
            onClick={() => {
              tHdAll(!hdAllStatus);
            }}
          >
            <HdIcon />
          </BtnContainer>
          <BtnContainer style={{ position: "relative" }}>
            <TimerIcon
              onClick={() => {
                setShowSpeedSlider(!showSpeedSlider);
              }}
            />
            <SliderContainer show={showSpeedSlider}>
              <a> {rotateInterval} sec </a>
              <input
                type="range"
                min="30"
                max="60"
                value={rotateInterval}
                step="10"
                onChange={e => setRotateInterval(e.target.value)}
              />
            </SliderContainer>
          </BtnContainer>
          <BtnContainer onClick={() => exitFullscreen()}>
            <FullScreenIcon />
          </BtnContainer>
        </Container>
      )}
    </ControlsContainer>
  );
};

export default FullscreenMenuControl;
