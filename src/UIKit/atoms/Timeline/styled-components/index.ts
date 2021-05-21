import styled from "styled-components";
// @ts-ignore-start
import { ifProp } from "styled-tools";

export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

export const ArrowBack = styled.i`
  cursor: pointer;
  flex: 1 1 auto;
  max-height: 100%;
  border: ${ifProp("active", "solid #2c66be", "white")};
  color: ${ifProp("active", "#2C66BE", "white")};
  border-width: 0 3px 3px 0;
  display: ${ifProp("active", "inline-block", "none")};
  padding: 3px;
  margin: 2px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
`;

export const ArrowForward = styled.i`
  cursor: pointer;
  border: ${ifProp("active", "solid #2c66be", "white")};
  color: ${ifProp("active", "#2C66BE", "white")};
  border-width: 0 3px 3px 0;
  display: ${ifProp("active", "inline-block", "none")};
  padding: 3px;
  margin: 2px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
`;

export const ValueContainer = styled.div`
  height: 2em;
  width: 2em;
`;

export const TimelineWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

export const VcTimelineWrapper = styled.div`
  width: 100%;
  user-select: none;
  position: relative;
  z-index: 1;
`;

export const TimelineCanvasWrapper = styled.div`
  width: fit-content;
  overflow: hidden;
  position: relative;
  padding: 10px 40px 0;
  background: #262e3c;
`;

export const TimelineSliderTimeLine = styled.div`
  position: absolute;
  height: 49px;
  width: 9px;
  top: 15px;
  z-index: 105;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  text-align: center;
  opacity: 0;
`;
