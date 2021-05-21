import styled from "styled-components";
import { Modal } from "react-bootstrap";
import Button from "../../../../UIKit/atoms/Button";

export const StyledModal = styled(Modal)`
  & .modal-content {
    padding: 2.7em 3.2em;
    @media (max-width: 768px) {
      width: inherit;
      padding: 1.3em 1.4em;
    }
  }

  @media (min-width: 576px) {
    & .modal-dialog {
      max-width: 625px;
    }
  }
`;

export const ModalHeaderStyled = styled(Modal.Header)`
  padding: 20px 0 10px;
  border: none;
`;

export const ModalHeaderTitleText = styled(Modal.Title)`
  font-weight: 700;
  font-size: 1.65em;
  color: #283241;
`;

export const ModalBodyStyled = styled(Modal.Body)`
  padding: 10px 0 0;
`;

export const ModalBodyText = styled.p`
  padding: 10px 0;
  font-weight: 700;
  color: #575757;
  margin: 0;
  line-height: 150%;
`;

export const ModalBodyImportantText = styled.p`
  padding: 10px 0;
  font-weight: 700;
  font-size: 1.1em;
  line-height: 20px;
  margin: 0;
  color: #283241;
`;

export const ModalFooterStyled = styled(Modal.Footer)`
  border: none;
  padding: 28px 0 0;
`;

export const ButtonStyled = styled(Button)`
  background: #2c6bbe;
  color: #ffffff;
  padding: 15px 37px;
  font-size: 20px;
  height: initial;
  margin: 0;
`;
