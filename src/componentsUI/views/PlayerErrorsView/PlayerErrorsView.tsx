import React from "react";

import {
  PlayerErrorsViewContainer,
  StreamErrorMessageContainer,
  FallbackImage,
} from "./styled-components";

import { errorsBases } from "./erorsBase64";

enum PlayerErrorCodes {
  ok = 0,
  criticalError = 1,
  streamError = 2,
  notFoundError = 3,
}

const PlayerErrorsView = (props: PlayerErrorsViewProps) => {
  const { error } = props;
  return (
    <PlayerErrorsViewContainer className="stream-not-enable-message-container">
      {(() => {
        switch (error.code) {
          case PlayerErrorCodes.notFoundError:
            return <FallbackImage src={errorsBases.notFoundError} />;
          case PlayerErrorCodes.streamError:
            return <FallbackImage src={errorsBases.streamError} />;
          case PlayerErrorCodes.criticalError:
            return <FallbackImage src={errorsBases.criticalError} />;
          default:
            return null;
        }
      })()}
    </PlayerErrorsViewContainer>
  );
};
export default PlayerErrorsView;
