import styled from "styled-components";
// @ts-ignore-start
import { ifProp } from "styled-tools";
import { palette } from "styled-theme";
import { Grid, Row, Col } from "react-flexbox-grid";

export const GridStyled = styled.div`
  box-sizing: border-box;
  height: 80px;
  width: 100%;
  padding: 0 8px;
  margin: 0 auto;
`;

export const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  & {
    margin-right: 0px;
    padding-right: 0px;
  }
`;

export const SocialIconContainer = styled.div`
  width: 36px;
  height: 36px;
  & svg {
    fill: ${ifProp("disabled", palette("grayscale", 2), palette("primary", 2))};
    stroke: none;
    cursor: ${ifProp("disabled", "not-allowed", "pointer")};
  }
`;

export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 16px;
`;

export const ContactPhoneLink = styled.a`
  text-decoration: none;
`;

export const ContactPhone = styled.div`
  font-weight: bold;
  font-style: normal;
  font-size: 18px;
  color: ${palette("primary", 2)};
`;

export const ContactDescription = styled.div`
  font-size: 11px;
`;

export const CopyRight = styled.div`
  font-size: 14px;
  line-height: 24px;
  display: inline;
`;

export const RowStyled = styled(Row)`
  height: calc(100% - 10px);
`;

export const ColStyled = styled(Col)`
  &&& {
    padding-right: 0px;
  }
`;

export const HrStyled = styled.hr`
  margin: 0 -8px;
  @media (max-width: 1288px) {
    margin-left: -16px;
    margin-right: -16px;
  }
  @media (max-width: 575px) {
    margin-left: -16px;
    margin-right: -16px;
  }
  &&& {
    box-sizing: border-box;
  }
`;
