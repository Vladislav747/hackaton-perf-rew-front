import styled from "styled-components";
// @ts-ignore-start
import { ifProp } from "styled-tools";
// @ts-ignore-start
import { palette } from "styled-theme";
import DatePicker from "react-datepicker";

import { mediaQueries } from "../../../../helpers/styled-components";
import MenuItem from "@material-ui/core/MenuItem";
import MuiSelect from "@material-ui/core/Select";
import { ReactComponent as FiveSecBackSvgBtn } from "../../../../assets/svgs/streetsOnline/Archive/Back.svg";
import { ReactComponent as FiveSecForwardSvgBtn } from "../../../../assets/svgs/streetsOnline/Archive/Forward.svg";
import { ReactComponent as MuteVolumeOnIcon } from "../../../../assets/svgs/streetsOnline/Archive/MuteVolumeOn.svg";
import { ReactComponent as MuteVolumeOffIcon } from "../../../../assets/svgs/streetsOnline/Archive/MuteVolumeOff.svg";

const correctDatePickerStyles = `
  text-align: center;
  align-items: center;
`;

export const FiveSecBackSvgBtnStyled = styled(FiveSecBackSvgBtn)`
  cursor: pointer;
  margin: 9px;
`;

export const FiveSecForwardSvgBtnStyled = styled(FiveSecForwardSvgBtn)`
  cursor: pointer;
  margin: 9px;
`;

export const BottomPart = styled.div<BottomPartProps>`
  ${(props: BottomPartProps) =>
    props.fsMode
      ? `position: absolute; z-index: 100; bottom: 0; width: 100%;`
      : ``}
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  border-radius: 0 0 10px 10px;
  background-color: #333333;
  box-sizing: border-box;
`;

export const TimelineContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  margin-left: 10px;
  margin-right: 10px;

  svg {
    &:hover {
      path {
        fill: ${palette("primary", 5)};
      }
    }
  }
`;

export const ArchiveInterfaceBarStyled = styled(DatePicker)`
  ${correctDatePickerStyles}
  .react-datepicker-wrapper {
    padding: 10px;
  }
`;

export const TimeInputStyled = styled.input<any>`
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

export const ArchiveInterfaceBarContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  ${mediaQueries("md")`
    .fullscreen-container, .player-container, .hd-container, .shift-container {
      display: none;
    };
  `};
  margin-top: 1em;
  margin-bottom: 1em;

  ${mediaQueries("lg")`
    flex-direction: column;
  `};
`;

export const CustomDatepickerContainer = styled.span`
  text-decoration-line: underline;
  color: ${palette("primary", 5)};
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    color: ${palette("primary", 4)};
  }
`;

export const PlayerContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 100%;
  ${mediaQueries("lg")`
    justify-content: center;
    padding: 10px 0;
  `};
`;

export const TimeSelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  ${mediaQueries("lg")`
    justify-content: center;
    padding: 10px 0;
  `};
`;

export const ExtraInterfaceContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  ${mediaQueries("lg")`
    justify-content: center;
    padding: 10px 0;
  `};
`;

export const IconContainer = styled.div`
  cursor: pointer;
  margin-left: 1.3em;
  margin-right: 1.3em;

  & svg {
    padding: 10px;
    fill: ${palette("white", 1)};
    stroke: none;
    path {
      fill: ${palette("white", 1)};
    }
    &:hover {
      background-color: #222;
      fill: ${palette("primary", 5)};
      path,
      rect {
        fill: ${palette("primary", 5)};
      }
    }
  }

  & .fs {
    display: none;
  }
  &.mute-icon-container {
    & svg {
      font-size: 1.3em;
    }
  }
`;

export const VolumeControlContainer = styled.div``;

export const InputRangeStyled = styled.input`
  cursor: pointer;
  width: 65px;
`;

export const SpinnerContainer = styled.div`
  width: 1.3em;
  height: 1.3em;
  display: flex;
  flex-direction: column;
`;

export const BtnContainer = styled.div<BtnProps>`
  display: ${ifProp("show", "block", "none")};
  margin-left: 1.3em;
  margin-right: 1.3em;
  & svg {
    padding: 10px;
    fill: ${ifProp("active", "#91C6FF", "#FFF")};
    stroke: none;
    cursor: pointer;
    path {
      fill: ${ifProp("active", "#91C6FF", "#FFF")};
    }
    &:hover {
      fill: ${palette("primary", 5)};
      background-color: ${palette("hoverIcon", 2)};
      path {
        fill: ${ifProp("active", "#FFF", "#91C6FF")};
      }
    }
  }
  &:hover {
    background-color: ${palette("hoverIcon", 2)};
  }
`;

export const CurrentTimeContainer = styled.div`
  text-decoration: underline;
  color: ${palette("primary", 2)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MenuItemStyled = styled(MenuItem)``;

export const SelectStyled = styled(MuiSelect)`
  & .MuiSelect-select.MuiSelect-select {
    color: ${palette("primary", 5)};
  }
  &:after {
    display: none;
    content: none !important;
  }
  &:before {
    display: none;
    content: none !important;
  }
  svg {
    padding: 0;
  }
`;

export const MuteVolumeOnIconStyled = styled(MuteVolumeOnIcon)`
  width: 1.3em;
  height: 1.3em;
`;

export const MuteVolumeOffIconStyled = styled(MuteVolumeOffIcon)`
  width: 1.3em;
  height: 1.3em;
`;
