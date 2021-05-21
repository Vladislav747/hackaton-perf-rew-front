import React from "react";
import { createGlobalStyle } from "styled-components";
import { font, palette } from "styled-theme";
import styled, { css } from "styled-components";
import ReactModal from "react-modal";

import Heading from "../../../atoms/Heading";

export const GlobalStyle = createGlobalStyle`
  body.ReactModal__Body--open {
    overflow: hidden;
  }
`;

export const overlayStyles = css`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: ${({ zIndex }) => (zIndex ? zIndex : "9999")};
  transition: opacity 250ms ease-in-out;
  opacity: 0;
  &[class*="after-open"] {
    opacity: 1;
  }
  &[class*="before-close"] {
    opacity: 0;
  }
`;

export const ModalBox = styled(ReactModal)`
  position: absolute;
  display: flex;
  flex-direction: column;
  font-family: ${font("primary")};
  font-size: 1rem;
  background-color: ${palette("grayscale", 0, true)};
  border-radius: 0.571rem;
  color: ${palette("grayscale", 0)};
  top: calc(50% - 1rem);
  left: calc(50% - 1rem);
  right: auto;
  bottom: auto;
  margin: 1rem calc(-50% + 1rem) 1rem 1rem;
  transform: translate(-50%, 100%);
  transition: transform 250ms ease-in-out;
  outline: none;
  box-sizing: border-box;
  min-width: 320px;
  max-width: calc(640px - 1rem);
  padding-top: ${({ hasHeader }) => (hasHeader ? 0 : "1.8rem")};
  @media screen and (max-width: 640px) {
    margin-top: 2rem;
    min-width: 0;
  }
  &[class*="after-open"] {
    transform: translate(-50%, -50%);
  }
  &[class*="before-close"] {
    transform: translate(-50%, 100%);
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  > *:first-child {
    flex: 1;
  }
`;

export const StyledHeading = styled(Heading)`
  margin: 0 1rem 0 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Content = styled.div`
  margin-bottom: 1rem;
`;

export const StyledReactModal = styled(({ className, ...props }) => (
  <ModalBox overlayClassName={className} closeTimeoutMS={250} {...props} />
))`
  ${overlayStyles}
`;
export const CloseBtn = styled.button`
  position: absolute;
  top: -1.5rem;
  right: -1.5rem;
  background: transparent;
  border: transparent;
  text-align: left;
  color: ${palette("grayscale", 1, true)};
  font-size: 2.2rem;
  line-height: 0.63rem;
  outline: none;
  padding: 10px;
  margin: -10px;
  cursor: pointer;
  @media screen and (max-width: 640px) {
    top: -1.2rem;
    right: -0.9rem;
  }
`;
