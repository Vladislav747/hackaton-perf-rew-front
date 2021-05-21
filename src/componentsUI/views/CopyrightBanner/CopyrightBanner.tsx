import React from "react";

import { StyledModal, ModalHeaderStyled, ModalBodyStyled, ModalBodyText, ModalBodyImportantText, ModalHeaderTitleText, ModalFooterStyled, ButtonStyled } from "./styled-components";
import Button from "../../../UIKit/atoms/Button";


const CopyrightBanner = (props: CopyrightBannerProps) => {
  const {
    hasSeenCopyrightBanner: hasSeenCopyrightBannerProps,
    changeHasSeenCopyrightBannerVal: changeHasSeenCopyrightBannerValProps,
  } = props;

  const setModalIsClose = () => changeHasSeenCopyrightBannerValProps(true);

  return (
    <>
      <StyledModal
        show={!hasSeenCopyrightBannerProps}
        onHide={setModalIsClose}
        animation={true}
        className="banner-copyright__modal"
        backdrop="static"
        keyboard={false}
      >
        <ModalHeaderStyled>
          <ModalHeaderTitleText>Авторское право</ModalHeaderTitleText>
        </ModalHeaderStyled>
        <ModalBodyStyled className="modal-body">
          <ModalBodyText className="modal-body__intro-text">
            При публикации в интернете загруженного с этого сайта видео, снятого
            камерами наблюдения, обязателен сопроводительный комментарий:
          </ModalBodyText>
          <ModalBodyImportantText className="modal-body__important-text">
            Видеоматериалы зафиксированы камерами наблюдения компании
            "Интерсвязь".
          </ModalBodyImportantText>
          <ModalBodyText className="modal-body__footer-text">
            Напоминаем, что все фото-видеоматериалы, размещённые на этом ресурсе
            является объектами авторского права компании «Интерсвязь». Все права
            автора защищены. Разрешено воспроизведение в личных целях. Любое
            публичное воспроизведение или использование в средствах массовой
            информации возможно только после получения письменного разрешения
            автора.
          </ModalBodyText>
        </ModalBodyStyled>
        <ModalFooterStyled>
          <ButtonStyled round="disabled" onClick={setModalIsClose}>
            Принимаю
          </ButtonStyled>
        </ModalFooterStyled>
      </StyledModal>
    </>
  );
};
export default CopyrightBanner;
