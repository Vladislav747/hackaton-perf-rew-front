import React from "react";
import { Row, Col } from "react-flexbox-grid";

import { ReactComponent as Vk2Icon } from "../../../assets/img/vk2.svg";
import { ReactComponent as TgIcon } from "../../../assets/img/tg.svg";
import { ReactComponent as InIcon } from "../../../assets/img/in.svg";
import { ReactComponent as YouIcon } from "../../../assets/img/you.svg";
import { ReactComponent as FbIcon } from "../../../assets/img/fb.svg";
import { ReactComponent as TwIcon } from "../../../assets/img/tw.svg";
import { ReactComponent as OkIcon } from "../../../assets/img/ok.svg";

import {
  GridStyled,
  SocialContainer,
  HrStyled,
  RowStyled,
  CopyRight,
  ContactContainer,
  ContactPhoneLink,
  ContactPhone,
  ContactDescription,
  ColStyled,
  SocialIconContainer,
} from "./styled-components";

const Footer = () => (
  <GridStyled>
    <HrStyled />
    <RowStyled between="xs" middle="xs">
      <Col md={4} xs={12}>
        <Row start="md" center="xs">
          <CopyRight className="copyright">
            © Performance Review Интерсвязь {new Date().getFullYear()}
          </CopyRight>
        </Row>
      </Col>
      <Col md={4} xs={12}></Col>
      <ColStyled md={4} sm={12}>
        <Row end="md" center="xs"></Row>
      </ColStyled>
    </RowStyled>
  </GridStyled>
);

Footer.defaultProps = {};
Footer.displayName = "Footer";
export default Footer;
