import React from "react";

import Modal from "../../../UIKit/moleculs/Modal";

import { ReactComponent as FolderIcon } from "../../../assets/img/FCamListItem/folder.svg";

import {
  ModalInner,
  HeaderContainer,
  ModalInnnerBody,
  StyledButton,
  CheckboxStyled,
  Container,
  Wrapper,
  IconContainer,
} from "./styled-components";

const ListCustomGroupsModal = (props: ListCustomGroupsModalProps) => {
  const {
    closeListCustomGroupsModal: closeListCustomGroupsModalProps,
    statusModal: statusModalProps,
    personalGroups: personalGroupsProps,
    editCameraInCustomGroup: editCameraInCustomGroupProps,
    openAddGroupModal: openAddGroupModalProps,
  } = props;

  const stopPropagation = (e: any) => e.stopPropagation();

  const toggleSelected = (id: string, checked: Boolean) => {
    //Если выбран то мы хотим удалить иначе хотим добавить камеру в группу
    if (checked) {
      editCameraInCustomGroupProps(id, "delete");
    } else {
      editCameraInCustomGroupProps(id, "add");
    }
  };

  const onAddGroupClickHandler = () => {
    closeListCustomGroupsModalProps(false);
    openAddGroupModalProps(true);
  };

  return (
    <>
      <Modal
        className="list-custom-groups__modal"
        isOpen={statusModalProps}
        closeable
        ariaHideApp={false}
        onClose={() => {
          closeListCustomGroupsModalProps(false);
        }}
      >
        <ModalInner className="list-custom-group__inner-styled">
          <HeaderContainer className="list-custom-group__header-container">
            Выберите группу для сохранения камеры
          </HeaderContainer>

          <ModalInnnerBody className="list-custom-group__modal-body">
            {personalGroupsProps.length == 0 ? (
              <>
                <Container className="list-custom-item">
                  <Wrapper>Нет групп</Wrapper>
                </Container>
                <Container className="list-custom-item">
                  <StyledButton
                    onClick={() => {
                      onAddGroupClickHandler();
                    }}
                  >
                    Добавить группу
                  </StyledButton>
                </Container>
              </>
            ) : (
              personalGroupsProps.map((el: any, index: any) => (
                <Container className="list-custom-item" key={el + index}>
                  <Wrapper>
                    <IconContainer>
                      <FolderIcon />
                    </IconContainer>
                    {el.name}
                    <label onClick={stopPropagation}>
                      <CheckboxStyled
                        onChange={() => {
                          if (typeof toggleSelected === "function") {
                            toggleSelected(el.id, el.hasSelectedCamera);
                          }
                        }}
                        checked={el.hasSelectedCamera ? 1 : 0}
                      />
                    </label>
                  </Wrapper>
                </Container>
              ))
            )}
          </ModalInnnerBody>
        </ModalInner>
      </Modal>
    </>
  );
};

ListCustomGroupsModal.displayName = "ListCustomGroupsModal";

export default ListCustomGroupsModal;
