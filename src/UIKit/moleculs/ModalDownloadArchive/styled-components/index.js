import styled from "styled-components";
import DatePicker from "react-datepicker";

import { mediaQueries } from "../../../../helpers/styled-components";
import { ReactComponent as BackSvgBtn } from "../../../../assets/svgs/streetsOnline/Archive/BackV2.svg";
import { ReactComponent as ArrowCollapseDown } from "../../../../assets/svgs/streetsOnline/Archive/ArrowCollapseDown.svg";
import Button from "../../../atoms/Button";

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  > *:first-child {
    flex: 1;
  }
`;

export const StyledHeading = styled.div`
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

export const StyledHeadingTitle = styled.span`
  margin: 0;
  font-size: 1.1em;
  line-height: 1em;
  font-weight: 500;
  color: #333333;
`;

export const StyledSubHeading = styled.div`
  text-align: center;
  margin: 0.5em 0;
  line-height: 1.5em;
  font-size: 1em;
  font-weight: 500;
`;
export const StyledSubHeadingSpan = styled.span`
  font-size: 1em;
  line-height: 1.2em;
  font-weight: normal;
`;

export const Content = styled.div`
  display: flex;
  overflow: initial;
  /** for Firefox */
  overflow-y: -moz-hidden-unscrollable;
  padding: 4em 8em;
  text-align: center;
  position: relative;
  border-radius: 1em;
  ${mediaQueries("lg")`
    padding: 2em 1em;
    flex-direction: column;
  `};
  ${mediaQueries("md")`
    padding: 2em;
  `};
  ${mediaQueries("sm")`
    padding: 4em;
 `};
`;

export const ContentLeft = styled.div`
  min-width: 372px;
  ${mediaQueries("md")`
    min-width: unset;
    width: 90%;
    margin: 0 auto;
  `};
  ${mediaQueries("sm")`
    width: 80%;
  `};
`;

export const ContentRight = styled.div`
  padding: 34px 54px;
  text-align: left;
  ${mediaQueries("sm")`
  text-align: center;
  `};
`;

export const StyledReactModal = styled.div`
  background: #fff;
  height: 95%;
  width: 100%;
  display: flex;
  margin: 0;
  padding: 20px;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 99999;
  text-align: left;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  transition: all 0.4s ease;
  flex-direction: column;
  ${mediaQueries("md")`
    padding: 20px 0;
  `};
`;

export const VideoDownloadCameraName = styled.div`
  background: #efefef;
  text-align: left;
  color: #4d4d4d;
  font-weight: 400;
`;

export const VideoDownloadContainer = styled.div`
  position: relative;
  padding-bottom: 56%;
  width: 100%;
  overflow: hidden;
  position: relative;
  font-size: 1em;

  ${mediaQueries("lg")`
  padding-bottom: 40%;
`};
`;

export const VideoContainer = styled.div`
  flex: 0 0 50%;
  display: flex;
  box-sizing: border-box;
  max-width: 50%;
  height: auto;
  background-color: #000;
  margin: 0 auto;
`;

export const ModalDownloadArchiveInputsWrapper = styled.div`
  margin: 0.5em auto;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mediaQueries("sm")`
  flex-direction: column;
`};
`;

export const ModalDownloadArchiveInputWrapper = styled.div`
  margin: 0 0 0.9em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;

  ${mediaQueries("md")`
    margin: 0 0 0.9em;
  `};
`;

export const ModalDownloadArchiveSpan = styled.span`
  font-family: Arial;
  font-size: 0.8em;
  line-height: 1em;
  color: #757575;
  margin: 0 0 3px 0;
`;

export const ErrorArchiveSpan = styled.div`
  position: absolute;
  font-size: 0.8em;
  color: #ff0000;
  left: 0;
  top: 1.9em;
`;

export const TimeInputStyled = styled.input`
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

export const ModalDownloadArchiveCloseWrapper = styled.div`
  position: absolute;
  top: 24px;
  left: 10px;
  cursor: pointer;
  z-index: 9999;
`;

export const ModalDownloadArchiveCloseText = styled.span`
  font-weight: 400;
  color: #333333;
`;

export const BackSvgBtnStyled = styled(BackSvgBtn)`
  margin-right: 9px;
`;

export const ModalDownloadArchiveChip = styled.div`
  color: rgba(0, 0, 0, 0.87);
  height: 32px;
  display: inline-flex;
  outline: 0;
  padding: 0;
  font-size: 1rem;
  box-sizing: border-box;
  align-items: center;
  white-space: nowrap;
  border-radius: 10px;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;
`;

export const ModalDownloadArchiveInputDivider = styled.div`
  padding: 0 8px;
  display: flex;
  ${mediaQueries("sm")`
    display: none;
  `};
`;

export const ModalDownloadArchiveChipText = styled.span`
  overflow: hidden;
  white-space: nowrap;
  padding: 0;
  text-overflow: ellipsis;
  font-weight: 600;
`;

export const ModalDownloadArchiveStyledDatepicker = styled(DatePicker)`
  text-align: center;
  font-size: 1rem;
  border: 1px solid #acacac;
  border-radius: 4px;
  padding: 12px 0;

  & button {
    &:after {
      background-color: #fff !important;
      color: #acacac;
    }
  }
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  box-shadow: unset;
  padding: 0 1.5em;
  position: relative;
  min-width: 140px;
`;

export const StyledArrowCollapseDown = styled(ArrowCollapseDown)`
  margin-right: 6px;
`;
