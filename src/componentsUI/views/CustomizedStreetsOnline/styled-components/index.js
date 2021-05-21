import styled from "styled-components";

import { mediaQueries } from "../../../../helpers/styled-components";

export const StreetsOnlineWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StreetsOnlineTopPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0.5em 0;

  ${mediaQueries("md")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1em 1.2em;
  `};
`;

export const StreetsOnlineTopPanelLeftPart = styled.div`
  display: flex;
`;

export const StreetsOnlineTopPanelRightPart = styled.div`
  display: flex;
  ${mediaQueries("md")`
    justify-content: space-between;
    width: 100%;
  `};
`;

export const StreetsOnlineTopPanelControl = styled.div`
  display: flex;
  justify-content: center;
`;

export const SortRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-wrap: nowrap;
  padding: 0 21px;

  ${mediaQueries("lg")`
    width: 100%;
  `};

  ${mediaQueries("md")`
    width: 100%;
  `};

  ${mediaQueries("sm")`
    width: 100%;
    justify-content: center;
  `};
`;
