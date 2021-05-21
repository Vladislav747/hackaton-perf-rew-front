import React from "react";

import {
  StyledReactModal,
  GlobalStyle,
  CloseBtn,
  Header,
  StyledHeading,
  Content,
} from "./styled-components";

const Modal = ({
  children: childrenProps,
  title: titleProps,
  closeable: closeableProps,
  onClose: onCloseProps,
  zIndex: zIndexProps,
  ...props
}: ModalProps) => {
  return (
    <StyledReactModal
      className="cameras-list__modal"
      contentLabel={titleProps || "Modal"}
      onRequestClose={onCloseProps}
      hasHeader={titleProps}
      zIndex={zIndexProps}
      {...props}
    >
      <GlobalStyle />
      {closeableProps && <CloseBtn onClick={onCloseProps}>×</CloseBtn>}
      {titleProps && (
        <Header>
          {/* @ts-ignore */}
          <StyledHeading level={2}>{titleProps}</StyledHeading>
        </Header>
      )}
      <Content>{childrenProps}</Content>
    </StyledReactModal>
  );
};

Modal.displayName = "Modal";
export default Modal;
