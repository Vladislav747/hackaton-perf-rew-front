import styled, { keyframes } from "styled-components";
import { Row, Col } from "react-flexbox-grid";

import { ReactComponent as BackArrowIcon } from "../../../../assets/svgs/streetsOnline/RawSvg/back_arrow.svg";
import { mediaQueries } from "../../../../helpers/styled-components";
import { ReactComponent as CloseSmallSvg } from "../../../../assets/svgs/solid/close-small.svg";

export const HeaderStyled = styled.header`
  width: 100%;
  padding: 0 0 14px;
  border-bottom: 1px solid #efefef;

  ${mediaQueries("md")`
    margin-bottom: 1rem;
  `};
`;

const fadeOut = keyframes`
  from {
    top: 0;
    opacity: 1;
  }

  to {
    top: -40px;
    opacity: 0;
  }
`;

export const HeaderStyledTop = styled.div`
  position: relative;
  background: #2c66be;
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  &.hide {
    visibility: visible;
    animation: ${fadeOut} 0.5s ease-in;
    top: -40px;
  }
  &.not-show {
    display: none;
  }
`;

export const HeaderStyledNoLink = styled.header`
  width: 100%;
  padding: 16px 36px 14px;
  border-bottom: 1px solid #efefef;

  ${mediaQueries("md")`
    margin-bottom: 1rem;
  `};
  ${mediaQueries("sm")`
    padding: 16px 0 14px;
  `};
`;

export const GridRowStyled = styled(Row)`
  padding: 10px 8px 0;
  ${mediaQueries("md_bootstrap")`
    flex-direction: column-reverse !important;
`};
`;

export const RowStyled = styled(Row) <RowStyledProps>`
  margin-left: 0;
  margin-right: 0;
  &.component-header__right-row{
    ${mediaQueries("md")`
      width: 100%;
      padding: 12px 0;
  `};
  }
  ${mediaQueries("md")`
    margin: 0 !important;
  `};
`;

export const ColStyled = styled(Col)`
  display: flex;

  ${mediaQueries("sm")`
    justify-content: center;
  `};

  ${mediaQueries("md")`
    padding: 0 !important;
  `};

  &.col--right{
    ${mediaQueries("md")`
      justify-content: space-between;
      width: 100%;
  `};
  }
`;

export const LeftPartCol = styled(ColStyled)`
  
`;

export const GridStyled = styled.div`
  width: 100%;
  padding: 0;
`;

export const RightPartCol = styled(ColStyled)`
  justify-content: flex-end;
  align-items: center;
  
  ${mediaQueries("md_bootstrap")`
    margin-bottom: 1rem;
  `};
  ${mediaQueries("md")`
    padding: 0;
  `};
`;

export const BackArrowIconStyled = styled(BackArrowIcon)`
  margin-left: 10px;
`;

export const CloseSmallSvgStyled = styled(CloseSmallSvg)`
  position: absolute;
  top: 4px;
  right: 10px;
  cursor: pointer;
  &:hover {
    fill: #d6d6d6;
  }
`;
