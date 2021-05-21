import styled from "styled-components";

import { ReactComponent as SearchIcon } from "../../../../assets/svgs/streetsOnline/RawSvg/search.svg";
import { ReactComponent as MapIcon } from "../../../../assets/svgs/streetsOnline/RawSvg/map.svg";
import { ReactComponent as BigPanelIcon } from "../../../../assets/svgs/streetsOnline/RawSvg/big_panel.svg";
import { ReactComponent as FourPanelIcon } from "../../../../assets/svgs/streetsOnline/RawSvg/4_panel.svg";
import { ReactComponent as NinePanelIcon } from "../../../../assets/svgs/streetsOnline/RawSvg/9_panel.svg";
import { ReactComponent as ListIcon } from "../../../../assets/svgs/streetsOnline/RawSvg/list.svg";
import { ReactComponent as CalculatorIcon } from "../../../../assets/svgs/streetsOnline/RawSvg/calculator.svg";

import { mediaQueries } from "../../../../helpers/styled-components/";

export const SearchIconStyled = styled(SearchIcon)``;

export const MapIconStyled = styled(MapIcon)`
  ${mediaQueries("sm")`
    display: none;
        width: 0px;
        height: 0px;
  `};
`;

export const BigPanelIconStyled = styled(BigPanelIcon)`
  ${mediaQueries("xxl")`
    display: none;
    width: 0px;
    height: 0px;
  `};
`;

export const FourPanelIconStyled = styled(FourPanelIcon)`
  ${mediaQueries("lg")`
    display: none;
    width: 0px;
    height: 0px;
  `};
`;

export const NinePanelIconStyled = styled(NinePanelIcon)`
  ${mediaQueries("lg")`
    display: none;
    width: 0px;
    height: 0px;
  `};
`;

export const ListIconStyled = styled(ListIcon)``;

export const CalculatorIconStyled = styled(CalculatorIcon)`
  ${mediaQueries("xl")`
    display: none;
    width: 0px;
    height: 0px;
  `};
`;

export const ViewSelectorGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  ${mediaQueries("lg")`
    display: none;
  `};
`;

export const ViewSelectorContainer = styled.div<ViewSelectorContainerProps>`
  margin: 8px;
  position: ${(props: ViewSelectorContainerProps) =>
    props.falloutMenu ? "relative" : "inherit"};
  display: ${(props: ViewSelectorContainerProps) =>
    props.displayReady ? "block" : "none"};
  &&& > svg {
    width: 19px;
    height: 19px;
    fill: ${(props: ViewSelectorContainerProps) =>
      props.active ? "#4479C9" : "#757575"};
    stroke: none;
    cursor: pointer;
  }
`;
