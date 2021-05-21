import React, { Component } from "react";

import { BtnContainer, ControlPanelWrapper } from "./styled-components";

import { ReactComponent as FullScreenIcon } from "../../../assets/img/player/full_screen.svg";

export default class ControlPanel extends Component<ControlPanelProps> {
  changePlayState = () => {
    this.props.changePlayAll();
  };

  render() {
    if (this.props.showMode) {
      return (
        <ControlPanelWrapper>
          <BtnContainer
            onClick={() => {
              this.props.fullscreen();
              this.changePlayState();
              this.props.startRotate();
            }}
          >
            <FullScreenIcon />
          </BtnContainer>
        </ControlPanelWrapper>
      );
    } else return <></>;
  }
}
