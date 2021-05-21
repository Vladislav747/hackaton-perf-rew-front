import React from "react";

import { PlayButtonContainer, PlayBtnWrapper } from "./styled-components";

import { ReactComponent as PlayIcon } from "../../../assets/svgs/streetsOnline/Archive/Play.svg";

const HoverArchivePlayButton = (props: HoverArchivePlayButtonProps) => {
  const { onClick: onClickProps } = props;
  return (
    <PlayButtonContainer onClick={() => onClickProps()}>
      <PlayBtnWrapper>
        <PlayIcon />
      </PlayBtnWrapper>
    </PlayButtonContainer>
  );
};

export default HoverArchivePlayButton;
