import styled from "styled-components";

import { mediaQueries } from "../../../../helpers/styled-components";

export const TopBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  flex-wrap: nowrap;
  width: 100%;

  ${mediaQueries("md")`
  justify-content: center;
    padding: 1em 0;
  `};
`;

export const SortBarContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

export const SortItem = styled.span`
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
  white-space: nowrap;
`;
export const ArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    transform: ${props => (props.active ? `rotate(180deg)` : `none`)};
    margin-left: 4px;

    path {
      fill: #2c66be;
    }
  }
`;

export const SortBarTitle = styled.span`
  font-weight: 400;
  margin-right: 10px;
`;

export const SortTextContainer = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${props => (props.active ? "#2C66BE" : "inherit")};
  &:hover {
    color: #2c66be;
  }
`;

export const SortElementContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin-right: 1em;
`;
