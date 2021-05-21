import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../../../../assets/img/bootstrap-close-btn.svg";

export const CloseSvg = styled(CloseIcon)<CloseSvgProps>`
  cursor: pointer;
  ${(props: CloseSvgProps) =>
    props.inFlex
      ? ``
      : `position: absolute;
    z-index: 1;
    top: 3px;
    right: 3px;`}
  width: 2em;
  height: 2em;

  & path {
    fill: #2c66be;
  }
  &:hover {
    & path {
      fill: #193b6e;
    }
  }
`;
