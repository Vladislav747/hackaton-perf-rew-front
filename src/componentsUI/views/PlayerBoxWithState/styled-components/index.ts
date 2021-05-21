import styled from "styled-components";
// @ts-ignore-start
import { ifProp } from "styled-tools";
// @ts-ignore-start
import { palette } from "styled-theme";

import { ReactComponent as ThrreDotsIcon } from "../../../../assets/svgs/streetsOnline/RawSvg/3dot.svg";

export const CameraViewHead = styled.div<CameraViewHeadStyled>`
  display: flex;
  flex-wrap: nowrap;
  background-color: ${ifProp("active", "#2C66BE", "#efefef")};
  transition: all 0.3s ease-in-out;
  border-radius: 4px 4px 0px 0px;
  justify-content: space-between;
  padding-right: 10px;
  height: 1em;
  color: ${ifProp("active", "#FFFFFF", "#4d4d4d")};
  position: relative;
`;

export const CameraViewHeadText = styled.div`
  display: flex;
  align-items: baseline;
  padding: 0 0.8rem;
  overflow: hidden;
  font-size: 1em;
  line-height: 1.1em;
`;

export const ThreeDotsIconStyled = styled(ThrreDotsIcon)`
  circle {
    fill: ${palette("hoverIcon", 1)};
  }
`;

export const CamSubmenuExtra = styled.div`
  position: absolute;
  min-width: 100px;
  opacity: 1;
  background: ${palette("white", 0)};
  top: 1em;
  right: 0;
  z-index: 999;
  box-shadow: 0 12px 12px rgb(0 0 0 / 18%);
`;

export const CamSubmenuExtraList = styled.ul`
  list-style: none;
  padding: 10px 0;
  margin: -10px 0;
`;

export const CamSubmenuExtraListItem = styled.li<CamSubmenuExtraListItemStyled>`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  opacity: ${ifProp("disabled", "0.5", "1")};
  color: ${palette("grayscale", 1)};
  &:hover {
    background: ${palette("hoverText", 1)};
  }
`;

export const CamSubmenuExtraListIcon = styled.span`
  margin-right: 5px;
`;

export const CameraViewHeadIcon = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.8rem;
  overflow: hidden;
  font-size: 1em;
  line-height: 1.1em;
  cursor: pointer;
`;

export const CameraSnapShot = styled.div`
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  height: calc(100% - 1em);
`;
