import styled from "styled-components";
// @ts-ignore-start
import { palette } from "styled-theme";

import { ReactComponent as HeaderBreadCrumbsDivider } from "../../../../assets/svgs/streetsOnline/RawSvg/headerBreadCrumbs-divider.svg";

export const HeaderBreadcrumbsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 1.4em;
  line-height: 1.3em;
  font-weight: 500;
  padding: 0 21px;
  &:hover {
    cursor: pointer;
    color: ${palette("hoverText", 0)};
  }
`;

export const HeaderBreadCrumbsDividerIcon = styled(HeaderBreadCrumbsDivider)`
  margin: 0 9px;
`;

export const HeaderBreadcrumbsRowSpan = styled.span`
  &:hover {
    cursor: pointer;
    color: ${palette("hoverText", 0)};
  }
`;
