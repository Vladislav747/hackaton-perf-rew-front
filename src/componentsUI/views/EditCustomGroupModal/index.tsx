import React, { useRef, useEffect } from "react";

import Modal from "../../../UIKit/moleculs/Modal";

import { notifyError } from "../../../helpers/toast";

import FCamListGroup from "../../containers/FCamListCustomGroup";

import {
  ModalInner,
  HeaderContainer,
  InputStyled,
  ModalInnnerBody,
  ModalFooter,
  StyledButton,
} from "./styled-components";

const EditCustomGroupModal = ({
  closeEditGroupModal: closeEditGroupModalProps,
  editPersonalGroupForUser: editPersonalGroupForUserProps,
  currentEditName: currentEditNameProps,
  showEditGroupModalStatus: showEditGroupModalStatusProps,
}: EditCustomGroupModalProps) => {
  //Ссылка на input
  const inputEl = useRef<HTMLInputElement>(null!);

  //Обработка нажатия сохранить список
  const handleClickBtnSaveGroup = (status: boolean) => {
    if (inputEl.current.value === "") {
      //Имя не может быть пустым
      notifyError("Название группы не может быть пустым!");
    } else {
      //Отправляем только название группы остальное возьмем из саги
      editPersonalGroupForUserProps(inputEl.current.value);
      //Закрыть модалку
      closeEditGroupModalProps(status);
    }
  };

  //Обработка нажатия enter
  const handleEnterPressedEdit = (e: KeyboardEvent) => {
    if (e.key === "Enter" && showEditGroupModalStatusProps) {
      handleClickBtnSaveGroup(false);
    }
  };

  //Вешаем обработчик для клавиши enter
  useEffect(() => {
    if (showEditGroupModalStatusProps) {
      document.addEventListener("keypress", handleEnterPressedEdit);
    }
    return () =>
      document.removeEventListener("keypress", handleEnterPressedEdit);
  }, [showEditGroupModalStatusProps]);

  return (
    <>
      <Modal
        className="edit-custom-group__modal"
        isOpen={showEditGroupModalStatusProps}
        closeable
        ariaHideApp={false}
        onClose={() => {
          closeEditGroupModalProps(false);
        }}
      >
        <ModalInner className="edit-custom-group__inner-styled">
          <HeaderContainer className="edit-custom-group__header-container">
            Редактировать группу
          </HeaderContainer>

          <ModalInnnerBody className="edit-custom-group__modal-body">
            <InputStyled
              ref={inputEl}
              className="edit-custom-group__input"
              type="text"
              aria-label="edit-custom-text"
              placeholder="Введите название"
              defaultValue={currentEditNameProps}
              autoFocus={true}
            />

            <FCamListGroup />
          </ModalInnnerBody>
        </ModalInner>
        <ModalFooter>
          <StyledButton
            className="edit-custom-group__btn"
            height={42}
            disabled={false}
            onClick={() => {
              handleClickBtnSaveGroup(false);
            }}
          >
            Сохранить
          </StyledButton>
        </ModalFooter>
      </Modal>
    </>
  );
};

EditCustomGroupModal.displayName = "EditCustomGroupModal";

export default EditCustomGroupModal;
