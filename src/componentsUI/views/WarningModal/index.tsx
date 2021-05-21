import React, {useEffect} from "react";
import Modal from "../../../UIKit/moleculs/Modal";

import {
  ModalInner,
  HeaderContainer,
  ModalInnerBody,
  ModalInnerFooter,
  StyledButton,
  DisagreedStyledButton,
} from "./styled-components";

const WarningModal = (props: WarningModalProps) => {
  const {
    closeWarningModal: closeWarningModalProps,
    openWarningModal: openWarningModalProps,
    deleteAllCamerasFlag: deleteAllCamerasFlagProps,
  } = props;

  const deleteAllCamsAgree = (status: boolean) => {
    deleteAllCamerasFlagProps(status);
    closeWarningModalProps(false);
  };

  //Обработка нажатия enter
  const handleEnterPressed = (e: KeyboardEvent) => {
    if (e.code === "Enter" && openWarningModalProps) {
      deleteAllCamsAgree(true);
    }
  };

  //Вешаем обработчик для клавиши enter
  useEffect(() => {
    if (openWarningModalProps) {
      document.addEventListener("keypress", handleEnterPressed);
    }
    return () =>
      document.removeEventListener("keypress", handleEnterPressed);
  }, [openWarningModalProps]);

  return (
    <>
      <Modal
        className="warning__modal"
        isOpen={openWarningModalProps}
        closeable
        ariaHideApp={false}
        zIndex={10000}
        onClose={() => {
          deleteAllCamsAgree(false);
        }}
      >
        <ModalInner className="warning__inner-styled">
          <HeaderContainer className="warning__header-container">
            Предупреждение
          </HeaderContainer>
          <ModalInnerBody>
            Данное действие очистит текущий список отображаемых камер. Вы
            уверены, что хотите продолжить?
          </ModalInnerBody>
          <ModalInnerFooter>
            <StyledButton onClick={() => { deleteAllCamsAgree(true); }}>
              Продолжить
            </StyledButton>
            <DisagreedStyledButton onClick={() => { deleteAllCamsAgree(false);}}>
              Отмена
            </DisagreedStyledButton>
          </ModalInnerFooter>
        </ModalInner>
      </Modal>
    </>
  );
};

WarningModal.displayName = "WarningModal";

export default WarningModal;
