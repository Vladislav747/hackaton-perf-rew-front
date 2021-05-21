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

import {
  ymSendAnalytics,
  yandexEvents,
} from "../../../helpers/yandex-analytics";

const Footer = () => (
  <GridStyled>
    <HrStyled />
    <RowStyled between="xs" middle="xs">
      <Col md={4} xs={12}>
        <Row start="md" center="xs">
          <CopyRight className="copyright">
            © Видеонаблюдение Интерсвязь {new Date().getFullYear()}
          </CopyRight>
        </Row>
      </Col>
      <Col md={4} xs={12}>
        <ContactContainer className="contact-container">
          <ContactPhoneLink href="tel:8 (800) 500-47-11">
            <ContactPhone>8 800 2000 747</ContactPhone>
          </ContactPhoneLink>
          <ContactDescription>(звонок бесплатный)</ContactDescription>
        </ContactContainer>
      </Col>
      <ColStyled md={4} sm={12}>
        <Row end="md" center="xs">
          <SocialContainer className="social-container__vk-icon">
            <SocialIconContainer
              onClick={() => ymSendAnalytics(yandexEvents.clickSocialNetwork)}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://vk.com/intersvyaz"
              >
                <Vk2Icon />
              </a>
            </SocialIconContainer>
            <SocialIconContainer
              onClick={() => ymSendAnalytics(yandexEvents.clickSocialNetwork)}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://t.me/intersvyaz"
              >
                <TgIcon />
              </a>
            </SocialIconContainer>
            <SocialIconContainer
              className="social-container__instagramm-icon"
              onClick={() => ymSendAnalytics(yandexEvents.clickSocialNetwork)}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/intersvyaz/"
              >
                <InIcon />
              </a>
            </SocialIconContainer>
            <SocialIconContainer
              onClick={() => ymSendAnalytics(yandexEvents.clickSocialNetwork)}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/channel/UC4eru9eR_Ii8zSgj2xGVjqw"
              >
                <YouIcon />
              </a>
            </SocialIconContainer>
            <SocialIconContainer
              onClick={() => ymSendAnalytics(yandexEvents.clickSocialNetwork)}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/intersvyaz/"
              >
                <FbIcon />
              </a>
            </SocialIconContainer>
            <SocialIconContainer
              onClick={() => ymSendAnalytics(yandexEvents.clickSocialNetwork)}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/intersvyaz"
              >
                <TwIcon />
              </a>
            </SocialIconContainer>
            <SocialIconContainer
              onClick={() => ymSendAnalytics(yandexEvents.clickSocialNetwork)}
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://ok.ru/intersvyaz"
              >
                <OkIcon />
              </a>
            </SocialIconContainer>
          </SocialContainer>
        </Row>
      </ColStyled>
    </RowStyled>
  </GridStyled>
);

Footer.defaultProps = {};
Footer.displayName = "Footer";
export default Footer;
