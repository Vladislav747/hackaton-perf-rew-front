import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AutoSizer,
  CellMeasurerCache,
  CellMeasurer,
  List,
} from "react-virtualized";

import Modal from "../../../UIKit/moleculs/Modal";

import "react-virtualized/styles.css";
import FCamListHeaderGroup from "../../containers/FCamListHeaderGroup";
import FCamListSearchGroup from "../../containers/FCamListSearchGroup";
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
const DEFAULT_LIST_TITLE = "Добавить камеры в группу";

const _cache = new CellMeasurerCache({
  defaultHeight: DEFAULT_ROW_HEIGHT,
  minHeight: DEFAULT_ROW_HEIGHT,
  fixedWidth: true,
});

const measureRowRenderer = (
  nodes,
  setActiveId,
  toggleSelectedArg,
  selectedObjectsArg,
  loadingIds,
  failedIds
) => ({ key, index, style, parent }) => {
  const node = nodes[index];
  const { relation } = node;

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
            name={relation.NAME}
            path={relation.PATH}
            id={node.id}
            objectType={relation.OBJECT}
            setActiveId={setActiveId}
            toggleSelected={toggleSelectedArg}
            measure={measure}
            isSelected={selectedObjectsArg?.includes(node.id)}
            isLoading={loadingIds?.includes(node.id)}
            isFailed={failedIds?.includes(node.id)}
          />
        </ItemContainer>
      )}
    </CellMeasurer>
  );
};

export const getSpinner = ({ height, width }) => (
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
const handleInit = (isInitArg, initArg) => {
  if (!isInitArg && typeof initArg === "function") {
    initArg();
  }
};

const FCamListGroup = props => {
  const {
    list: listProps,
    isInit: isInitProps,
    isLoading: isLoadingProps,
    setActiveObjectId: setActiveObjectIdProps,
    toggleSelected: toggleSelectedProps,
    selectedObjects: selectedObjectsProps,
    initList: initListProps,
    loadingObjects: loadingObjectsProps,
    failedObjects: failedObjectsProps,
    linkName: linkNameProps,
  } = props;

  const [isOpenState, setIsOpenState] = useState();

  const handleToggleIsOpen = () => {
    handleInit(isInitProps, initListProps);
    setIsOpenState(!isOpenState);
  };

  return (
    <>
      <ListOpenContainer
        className="cameras-list__btn"
        onClick={handleToggleIsOpen}
      >
        <IconContainer className="cameras-list__icon-container">
          <PlusCircleIcon className="cameras-list__icon" />
        </IconContainer>
        <ListOpenLink className="cameras-list__link">
          {linkNameProps || DEFAULT_LIST_TITLE}
        </ListOpenLink>
      </ListOpenContainer>

      <Modal
        className="cameras-list__modal"
        onClose={() => {
          handleToggleIsOpen();
        }}
        isOpen={isOpenState}
        closeable
        ariaHideApp={false}
      >
        <ModalInnerStyled className="cameras-list__inner-styled">
          <HeaderContainer className="cameras-list__header-container">
            <SearchContainer className="cameras-list__search-container">
              <FCamListSearchGroup />
            </SearchContainer>
            <FCamListHeaderGroup />
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
                      setActiveObjectIdProps,
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

FCamListGroup.propTypes = {
  initList: PropTypes.func.isRequired,
  toggleSelected: PropTypes.func,
  list: PropTypes.array,
  isLoading: PropTypes.bool,
  isInit: PropTypes.bool,
};

FCamListGroup.defaultProps = {
  list: [],
};
FCamListGroup.displayName = "FCamListGroup";
export default FCamListGroup;
