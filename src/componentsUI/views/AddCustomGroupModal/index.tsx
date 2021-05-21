import React, { useRef, useState, useEffect } from "react";

import Modal from "../../../UIKit/moleculs/Modal";
import FCamListCustomGroup from "../../containers/FCamListCustomGroup";
import { notifyError } from "../../../helpers/toast";

import {
  ModalInner,
  HeaderContainer,
  InputStyled,
  ModalInnnerBody,
  ModalInnerFooter,
  StyledButton,
  CheckboxStyled,
} from "./styled-components";

const AddCustomGroupModal = (props: AddCustomGroupModalProps) => {
  const {
    closeAddGroupModal: closeAddGroupModalProps,
    statusModal: statusModalProps,
    addPersonalGroupForUser: addPersonalGroupForUserProps,
    addSelectedCamerasFromFlistInCustomGroup: addSelectedCamerasFromFlistInCustomGroupProps,
  } = props;

  const [
    addAllCurrentCamsInCustomGroupState,
    setAddAllCurrentCamsInCustomGroupState,
  ] = useState<boolean>(false);

  //Ссылка на input
  const inputEl = useRef<HTMLInputElement>(null!);

  const stopPropagation = (e: any) => e.stopPropagation();

  //Обработка нажатия сохранить список
  const handleClickBtnSaveGroup = (status: boolean) => {
    //Если объект пустой то просто закрываем окно иначе запускаем обработчик для создания группы

    if (inputEl?.current?.value && inputEl.current.value !== "") {
      addPersonalGroupForUserProps(inputEl.current.value);
      //Закрыть модалку
      closeAddGroupModalProps(status);
    } else {
      notifyError("Имя группы не может быть пустым");
    }
  };

  //Обработка нажатия enter
  const handleEnterPressedAdd = (e: KeyboardEvent) => {
    if (e.key === "Enter" && statusModalProps) {
      handleClickBtnSaveGroup(false);
    }
  };

  //Вешаем обработчик для клавиши enter
  useEffect(() => {
    if (statusModalProps) {
      document.addEventListener("keypress", handleEnterPressedAdd);
    }
    return () =>
      document.removeEventListener("keypress", handleEnterPressedAdd);
  }, [statusModalProps]);

  //Обработка нажатия checkbox добавить все текущие камеры в группу
  const handleChangeAllCurrentCameras = (status: boolean) => {
    addSelectedCamerasFromFlistInCustomGroupProps(status);
    setAddAllCurrentCamsInCustomGroupState(status);
  };

  return (
    <>
      <Modal
        className="add-custom-group__modal"
        isOpen={statusModalProps}
        closeable
        ariaHideApp={false}
        onClose={() => {
          closeAddGroupModalProps(false);
        }}
      >
        <ModalInner className="add-custom-group__inner-styled">
          <HeaderContainer className="add-custom-group__header-container">
            Введите название группы
          </HeaderContainer>

          <ModalInnnerBody className="add-custom-group__modal-body">
            <InputStyled
              ref={inputEl}
              className="add-custom-group__input"
              type="text"
              aria-label="add-custom-text"
              placeholder="Введите название"
              autoFocus={true}
            />
            {/* <div>Все текущие камеры будут добавлены в новую группу</div> */}
          </ModalInnnerBody>
          <ModalInnerFooter>
            <FCamListCustomGroup />
            <label onClick={stopPropagation}>
              <CheckboxStyled
                onChange={() => {
                  handleChangeAllCurrentCameras(
                    !addAllCurrentCamsInCustomGroupState
                  );
                }}
              />
              Сохранить все текущие камеры в группу
            </label>
            <StyledButton
              className="add-custom-group__btn"
              height={42}
              disabled={false}
              onClick={() => {
                handleClickBtnSaveGroup(false);
              }}
            >
              Сохранить группу
            </StyledButton>
          </ModalInnerFooter>
        </ModalInner>
      </Modal>
    </>
  );
};

AddCustomGroupModal.displayName = "AddCustomGroupModal";

export default AddCustomGroupModal;
