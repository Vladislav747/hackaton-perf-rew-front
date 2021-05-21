import styled from "styled-components";
import { List } from "react-virtualized";
import {
  viewTypes,
  elementsNumForTypes,
} from "../../../../modules/streetsOnline/schema";

export const StyledList = styled(List)`
  &:focus {
    outline: none;
  }
`;

export const bigGridItemStyle = {
  gridColumn: "1/4",
  gridRow: "1/4",
  display: "flex",
};

export const simpleGridItemStyleBig = {
  display: "flex",
};

export const RowRootWrapper = styled.div``;
export const RowRootPaddingWrapper = styled.div`
  position: relative;
  padding-bottom: 5px;
  padding-top: 5px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

export const GridInRowWrapper = styled.div<GridInRowWrapperProps>`
  display: grid;
  grid-template-columns: ${(props: GridInRowWrapperProps) =>
    `repeat(${(() => {
      switch (props.viewType) {
        case viewTypes.CALCULATOR: {
          return props.calculatedNum;
        }
        case viewTypes.MOBILE: {
          return elementsNumForTypes.MOBILE;
        }
        case viewTypes.TABLET: {
          return elementsNumForTypes.TABLET;
        }
        case viewTypes.FOUR_PANEL: {
          return elementsNumForTypes.FOUR_PANEL;
        }
        default: {
          return elementsNumForTypes.NINE_PANEL;
        }
      }
    })()}, minmax(1px, 1fr))`};
  grid-template-rows: ${(props: GridInRowWrapperProps) =>
    props.viewType === viewTypes.BIG_PANEL
      ? props.index === 0
        ? "repeat(3, minmax(1px, 1fr))"
        : "minmax(1px, 100%)"
      : "minmax(1px, 100%)"};
  grid-gap: 10px;
  height: 100%;
  width: 100%;
`;

export const CameraViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
`;

export const CamerasRow = styled.div`
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(5, minmax(248px, 1fr));
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
`;

export const CameraViewHead = styled.div`
  display: flex;
  flex-wrap: nowrap;
  background-color: #757575;
  border-radius: 10px 10px 0px 0px;
  justify-content: space-between;
  padding-right: 10px;
  height: 1em;
`;

export const CameraViewHeadText = styled.div`
  display: inline;
  padding: 0 0.8rem;
  overflow: hidden;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
`;

export const CameraSnapShot = styled.div`
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  height: calc(100% - 1em);
`;
export const FallbackFrame = styled.div`
  position: relative;
`;

export const FallbackImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const СameraInRowStyleBigIconMatrix = {
  display: "flex",
  width: "100%",
  height: "100%",
};
