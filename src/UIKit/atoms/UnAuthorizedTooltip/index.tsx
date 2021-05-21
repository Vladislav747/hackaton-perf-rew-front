import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

import { UnAuthorizedTooltipProps } from "./types/UnAuthorizedTooltipType";

import { getAccessToken } from "../../../helpers/authTokens";
import history from "../../../helpers/history";

import { SpanLink, TooltipLink } from "./styled-components";

const UnAuthorizedTooltip = ({
  children: childrenProps,
}: UnAuthorizedTooltipProps) => {
  const [isAuthorizedState, setIsAuthorizedState] = useState<Boolean>(false);

  const redirectToAuth = () => {
    history.push(`/authorization`);
  };

  useEffect(() => {
    setIsAuthorizedState(getAccessToken());
  }, []);

  return (
    <>
      {isAuthorizedState ? (
        <>{childrenProps}</>
      ) : (
        <>
          <TooltipLink data-tip data-for="soclose">
            {childrenProps}
          </TooltipLink>
          <ReactTooltip
            id="soclose"
            place="top"
            effect="solid"
            clickable={true}
            delayHide={1000}
          >
            Для доступа к функционалу необходимо <br />
            <SpanLink
              onClick={() => {
                redirectToAuth();
              }}
            >
              авторизоваться
            </SpanLink>
          </ReactTooltip>
        </>
      )}
    </>
  );
};
export default UnAuthorizedTooltip;
