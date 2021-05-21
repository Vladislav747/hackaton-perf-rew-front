import styled from "styled-components";
import { ReactComponent as DotsIcon } from "../../../../assets/img/3dot.svg";

export const CamContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  min-height: 154px;
  min-width: 248px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const CamHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  background-color: #757575;
  border-radius: 10px 10px 0px 0px;
`;

export const CamTitle = styled.div`
  display: inline;
  padding-left: 8px;
  padding-right: 8px;
  white-space: nowrap;
  overflow: hidden;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
`;

export const CamMenu = styled(DotsIcon)`
  padding-left: 8px;
  padding-right: 8px;
  display: block;
`;

export const PlayerContainer = styled.div`
  height: calc(100% - 16px);
`;
