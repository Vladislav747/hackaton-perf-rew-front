import React, { useState, useEffect } from "react";
import {
  AutoSizer,
  CellMeasurerCache,
  CellMeasurer,
  List,
} from "react-virtualized";

import Modal from "../../../UIKit/moleculs/Modal";

import "react-virtualized/styles.css";

import FCamListHeader from "../../containers/FCamListHeader";
import FCamListSearch from "../../containers/FCamListSearch";
import FCamListItem from "../FCamListItem";

import Spinner from "../../../UIKit/atoms/Spinner";
import { ReactComponent as PlusCircleIcon } from "../../../assets/svgs/solid/circle-plus.svg";
import {
  ListContainer,
  IconContainer,
  ItemContainer,
  SpinnerInner,
  SpinnerContainer,
  ListOpenContainer,
  ListOpenLink,
  ModalInnerStyled,
  HeaderContainer,
  SearchContainer,
} from "./styled-components";

const DEFAULT_ROW_HEIGHT = 51;
const DEFAULT_LIST_TITLE = "Выбрать камеру";

const _cache = new CellMeasurerCache({
  defaultHeight: DEFAULT_ROW_HEIGHT,
  minHeight: DEFAULT_ROW_HEIGHT,
  fixedWidth: true,
});

const measureRowRenderer = (
  elements: any,
  setCurrentGroup: any,
  toggleSelectedArg: any,
  selectedObjectsArg: any,
  loadingIds: any,
  failedIds: any
): any => ({ key, index, style, parent }: any) => {
  const node = elements[index];

  return (
    <CellMeasurer
      cache={_cache}
      columnIndex={0}
      key={key}
      rowIndex={index}
      parent={parent}
    >
      {({ measure, registerChild }) => (
        <ItemContainer
          ref={registerChild}
          style={{
            ...style,
          }}
        >
          <FCamListItem
            name={node.NAME}
            //@ts-ignore
            path={node.PATH}
            id={node.ID}
            objectType={node.OBJECT}
            setCurrentGroup={setCurrentGroup}
            toggleSelected={toggleSelectedArg}
            measure={measure}
            isSelected={selectedObjectsArg?.includes(node.ID)}
            isLoading={loadingIds?.includes(node.ID)}
            isFailed={failedIds?.includes(node.ID)}
          />
        </ItemContainer>
      )}
    </CellMeasurer>
  );
};

export const getSpinner = ({ height, width }: any) => (
  <SpinnerContainer height={height} width={width}>
    <SpinnerInner>
      <Spinner />
    </SpinnerInner>
  </SpinnerContainer>
);

/**
 * Вызов функции которая указан вторым аргументом
 * @param {*} isInitArg
 * @param {*} initArg
 */
const handleInit = (isInitArg: Boolean, initArg: Function) => {
  //TODO: доп проверка нужна ли ?
  if (!isInitArg && typeof initArg === "function") {
    initArg();
  }
};

const FCamList = ({
  list: listProps = [],
  isInit: isInitProps,
  isLoading: isLoadingProps,
  setCurrentGroup: setCurrentGroupProps,
  toggleSelected: toggleSelectedProps,
  selectedObjects: selectedObjectsProps,
  initList: initListProps,
  setCamerasReadyState: setCamerasReadyStateProps,
  loadingObjects: loadingObjectsProps,
  failedObjects: failedObjectsProps,
}: FCamListProps) => {
  const [isOpenState, setIsOpenState] = useState<Boolean>(false);

  /**
   * Обработка toggle нажатия
   */
  const handleToggleIsOpen = () => {
    setIsOpenState(!isOpenState);
  };

  useEffect(() => {
    //Инициализация данных только тогда когда статус модального окна открыто
    if (isOpenState) {
      handleInit(isInitProps, initListProps);
    }
  }, [isOpenState, isInitProps, initListProps]);

  return (
    <>
      <ListOpenContainer className="cameras-list" onClick={handleToggleIsOpen}>
        <IconContainer className="cameras-list__icon-container">
          <PlusCircleIcon className="cameras-list__plus-circle-icon" />
        </IconContainer>
        <ListOpenLink className="cameras-list__link">
          {DEFAULT_LIST_TITLE}
        </ListOpenLink>
      </ListOpenContainer>

      <Modal
        //@ts-ignore
        className="cameras-list__modal"
        onClose={() => {
          handleToggleIsOpen();
          setCamerasReadyStateProps(true);
        }}
        //@ts-ignore
        isOpen={isOpenState}
        closeable
        //@ts-ignore
        ariaHideApp={false}
      >
        <ModalInnerStyled className="cameras-list__inner-styled">
          <HeaderContainer className="cameras-list__header-container">
            <SearchContainer className="cameras-list__search-container">
              <FCamListSearch />
            </SearchContainer>
            <FCamListHeader />
          </HeaderContainer>

          <ListContainer>
            <AutoSizer>
              {({ width, height }) => {
                if (isLoadingProps) {
                  return getSpinner({ width, height });
                }
                return (
                  <List
                    className="cameras-list__list"
                    style={{
                      outline: "none",
                    }}
                    height={height}
                    overscanRowCount={40}
                    rowCount={listProps.length}
                    deferredMeasurementCache={_cache}
                    rowHeight={_cache.rowHeight}
                    rowRenderer={measureRowRenderer(
                      listProps,
                      setCurrentGroupProps,
                      toggleSelectedProps,
                      selectedObjectsProps,
                      loadingObjectsProps,
                      failedObjectsProps
                    )}
                    scrollToIndex={-1}
                    width={width}
                  />
                );
              }}
            </AutoSizer>
          </ListContainer>
        </ModalInnerStyled>
      </Modal>
    </>
  );
};
FCamList.displayName = "FCamList";
export default FCamList;
