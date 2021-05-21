// @ts-ignore-start
import { ifProp } from "styled-tools";
import styled from "styled-components";
// @ts-ignore-start
import { palette } from "styled-theme";

import {
  mediaQueries,
  widthSidebar,
} from "../../../../helpers/styled-components";

import { ReactComponent as HamburgerMenuIcon } from "../../../../assets/svgs/streetsOnline/Archive/HamburgerMenu.svg";
import { ReactComponent as FavouritesIcon } from "../../../../assets/svgs/streetsOnline/Archive/FavouritesIcon.svg";
import { ReactComponent as FavouritesFilledIcon } from "../../../../assets/svgs/streetsOnline/Archive/FavouritesFilledIconV2.svg";
import { ReactComponent as DemoIcon } from "../../../../assets/svgs/streetsOnline/Archive/DemoIcon.svg";
import { ReactComponent as FolderIcon } from "../../../../assets/svgs/streetsOnline/Archive/FolderIcon.svg";
import { ReactComponent as StreetsOnlineIcon } from "../../../../assets/svgs/streetsOnline/Archive/StreetsOnlineIcon.svg";
import { ReactComponent as VideoNabludenieIcon } from "../../../../assets/svgs/streetsOnline/Archive/VideoNabludenieIcon.svg";
import { ReactComponent as ArrowDownIcon } from "../../../../assets/svgs/streetsOnline/RawSvg/arrow_down_v2.svg";

import { ReactComponent as HamburgerMenuOpenedIcon } from "../../../../assets/svgs/streetsOnline/Main/HamburgerMenuOpened.svg";
import { ReactComponent as LogoVersion2Icon } from "../../../../assets/svgs/streetsOnline/RawSvg/LogoVersionV2.svg";
import { ReactComponent as PlusCircleIcon } from "../../../../assets/svgs/solid/circle-plus.svg";

export const SidebarWrapper = styled.div`
  height: 100%;
  left: 0;
  top: 0;
  &.sidebar--closed {
    ${mediaQueries("md")`
      display:none;
    `};
  }
  &.sidebar--opened {
    position: fixed;
    z-index: 999;
  }
`;

export const SidebarInner = styled.div`
  padding: 0 0 10px;
  min-width: ${widthSidebar}px;
  height: 100%;
  background: ${palette("secondary", 5)};
`;

export const SidebarInnerTop = styled.div`
  display: flex;
  align-items: center;
  padding: 17px 29px 7px;
`;

export const SidebarInnerSection = styled.div`
  padding: 7px 29px;
  border-bottom: 1px solid ${palette("secondary", 4)};
`;

export const SidebarTopIconWrapper = styled.div`
  padding: 16px 0;
  cursor: pointer;
`;

export const SidebarIconWrapper = styled.div`
  padding: 14px 0;
  cursor: pointer;
`;

export const StyledHamburgerMenuIcon = styled(HamburgerMenuIcon)`
  &:hover,
  &.active {
    rect {
      fill: ${palette("hoverIcon", 4)};
    }
  }
`;

export const StyledHamburgerMenuIconExtended = styled(HamburgerMenuOpenedIcon)`
  &:hover,
  &.active {
    rect {
      fill: ${palette("hoverIcon", 4)};
    }
  }
`;

export const StyledFavouritesIcon = styled(FavouritesIcon)`
  &:hover,
  &.active {
    path {
      fill: ${palette("hoverIcon", 4)};
    }
  }
`;

export const StyledFavouritesFilledIcon = styled(FavouritesFilledIcon)`
  &:hover,
  &.active {
    path {
      fill: ${palette("hoverIcon", 4)};
    }
  }
`;

export const StyledStreetsOnlineIcon = styled(StreetsOnlineIcon)`
  &:hover,
  &.active {
    path {
      fill: ${palette("hoverIcon", 4)};
    }
  }
`;

export const StyledVideoNabludenieIcon = styled(VideoNabludenieIcon)`
  &:hover,
  &.active {
    path {
      stroke: ${palette("hoverIcon", 4)};
    }
    rect {
      fill: ${palette("hoverIcon", 4)};
    }
  }
`;

export const StyledDemoIcon = styled(DemoIcon)`
  &:hover,
  &.active {
    circle {
      stroke: ${palette("hoverIcon", 4)};
    }
    path {
      stroke: ${palette("hoverIcon", 4)};
    }
  }
`;

export const StyledFolderIcon = styled(FolderIcon)<StyledFolderIconProps>`
  width: 30px;
  height: 30px;
  path {
    fill: ${palette("white", 0)};
  }
  opacity: ${ifProp("disabled", "0.5", "1")};
  &:hover,
  &.active {
    path {
      fill: ${palette("hoverIcon", 4)};
    }
  }
`;

export const StyledPlusCircleIcon = styled(PlusCircleIcon)`
  cursor: pointer;
  margin-left: 8px;
  path {
    fill: ${palette("white", 0)};
  }
`;

export const SidebarInnerExtended = styled.div`
  position: absolute;
  min-width: 334px;
  top: 0;
  left: 0;
  z-index: 999;
  height: inherit;
  background: #283241;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background: #151b23;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #acacac;
  }
`;

export const SidebarInnerTopExtended = styled.div`
  display: flex;
  align-items: center;
  padding: 17px 29px 7px;
`;

export const StyledLogoIcon = styled(LogoVersion2Icon)`
  margin-left: 22px;
`;

export const SidebarInnerSectionExtended = styled.div`
  padding: 5px 0 0;
`;

export const SidebarIconWrapperExtended = styled.div<
  StyledSidebarIconWrapperExtended
>`
  display: flex;
  align-items: center;
  padding: 16px 29px;
  cursor: pointer;
  color: ${palette("white", 0)};
  position: relative;
  height: 100%;
  &.--auth {
    opacity: ${ifProp("disabled", "1", "0.5")};
  }

  &:before {
    position: absolute;
    border-left: 4px solid ${palette("hoverIcon", 4)};
    width: 4px;

    content: "";
    top: 0;
    left: 0;
    display: none;
  }

  &:hover {
    background: ${palette("secondary", 5)};

    svg {
      circle {
        stroke: ${palette("hoverIcon", 4)};
      }
      path {
        stroke: ${palette("hoverIcon", 4)};
        fill: ${palette("hoverIcon", 4)};
      }
    }

    &:before {
      display: block;
    }
  }
`;

export const SidebarNameIconExtended = styled.span`
  margin-left: 22px;
  font-size: 18px;
  line-height: 20px;
`;

export const StyledArrowDownIcon = styled(ArrowDownIcon)<StyledArrowIconProps>`
  margin-left: 8px;
  transform: ${props => (props.opened == "true" ? `rotate(180deg)` : `none`)};
`;

export const SubMenuSidebarWrapper = styled.div`
  padding: 0 60px;
  color: ${palette("white", 0)};
  display: none;
  position: relative;
  &.opened {
    display: block;
  }
`;

export const SubMenuElement = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SubMenuLink = styled.a`
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  display: block;
  cursor: pointer;
  padding: 8px;
  &:hover {
    background: ${palette("secondary", 5)};
  }
`;

export const SubMenuBtn = styled.button`
  border: none;
  margin: 8px;
  appearance: none;
  text-decoration: none;
  font-weight: 400;
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  display: inline-block;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  color: ${palette("white", 0)};
  background: rgb(41, 148, 0);
  padding: 4px 8px;
  display: flex;
`;

export const SubMenuSecondWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 68px;
`;

export const SubMenuSecondElement = styled.div`
  padding: 8px;
  cursor: pointer;
  background: ${palette("white", 0)};
  &:hover {
    background: ${palette("secondary", 5)};
  }
`;

export const SubMenuNoElements = styled.div`
  padding: 0 16px;
`;
