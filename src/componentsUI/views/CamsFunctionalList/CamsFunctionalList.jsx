import React from "react";
import { List } from "react-virtualized";
import PropTypes from "prop-types";

import { OverflowTextRow } from "../../../helpers/streetsOnlineElements/elements";
import { validateCameraObject } from "../../../helpers/streetsOnlineElements/serviceFunctions";

import {
  FunctionalListRowWrapper,
  CameraRow,
  CameraObject,
  SmallItem,
  CameraImageInFunctionalList,
  TextElement,
  FunctionalMenu,
  CamsFunctionalListContainer,
  StyledHeartIcon,
  StyledFolderIcon,
  StyledSquareIcon,
} from "./styled-components";

/**
 * Служебные константы
 */
const apiUrl = process.env.REACT_APP_BASE_STREAMS_URL;
const gridElementMarging = 8;
const tabletMaxWidth = 765;
const minTabletWidth = 50;
const minScreenWidth = 100;

const _renderRowInsideList = ({ index, key, style }, camerasList) => {
  return (
    <FunctionalListRowWrapper
      className="functionalListRowWrapper"
      style={{ ...style }}
      key={key}
    >
      <CameraRow className="functionalListRowWrapper__cameraRow">
        {camerasList[index]}
      </CameraRow>
    </FunctionalListRowWrapper>
  );
};

/**
 * Генерация списка для List react-virtualized
 * @param {*} height
 * @param {*} width
 * @param {*} camsList
 * @param {*} onScroll
 * @param {*} scrollTop
 */
const _renderRows = (height, width, camsList, onScroll, scrollTop) => {
  const rowHeight =
    width > tabletMaxWidth
      ? minTabletWidth
      : minScreenWidth + gridElementMarging;

  const camsListLocal = [...camsList];

  const splittedList = [];

  while (camsListLocal.length > 0) {
    const styledRow = [];
    const twoCameras = camsListLocal.splice(0, 2);
    //@todo fix svg
    twoCameras.map((value, index) => {
      //Сначала валидируем объект на наличие необходимых свйоств
      const validatedValue = validateCameraObject(value);
      if (validatedValue.VALID) {
        styledRow.push(
          <CameraObject
            className="camera-object"
            key={validatedValue.ID}
            first={index === 0}
          >
            <SmallItem className="camera-object__small-item">
              <CameraImageInFunctionalList
                src={`${apiUrl}${validatedValue.LOSSYSNAPSHOT}`}
              />
            </SmallItem>
            <TextElement className="camera-object__text-element">
              <OverflowTextRow
                text={validatedValue.NAME}
                id={validatedValue.ID}
              />
            </TextElement>
            <FunctionalMenu className="functionalMenu">
              <StyledHeartIcon />
              <StyledFolderIcon />
              <StyledSquareIcon />
            </FunctionalMenu>
          </CameraObject>
        );
      }
    });
    splittedList.push(styledRow);
  }

  return (
    <List
      autoHeight
      onScroll={onScroll}
      scrollTop={scrollTop}
      rowHeight={rowHeight + gridElementMarging}
      width={width}
      height={height}
      rowCount={splittedList.length}
      rowRenderer={({ index, key, style }) => {
        return _renderRowInsideList({ index, key, style }, splittedList);
      }}
    />
  );
};

const CamsFunctionalList = props => {
  const {
    sizeParams: sizeParamsProps,
    selectedCamerasList: selectedCamerasListProps,
    onScroll: onScrollProps,
    scrollTop: scrollTopProps,
  } = props;

  const { height, width } = sizeParamsProps;

  return (
    <CamsFunctionalListContainer
      className="camsFunctionalListContainer"
      style={{
        width: width,
      }}
    >
      {_renderRows(
        height,
        width,
        selectedCamerasListProps,
        onScrollProps,
        scrollTopProps
      )}
    </CamsFunctionalListContainer>
  );
};

CamsFunctionalList.propTypes = {
  sizeParams: PropTypes.object.isRequired,
  selectedCamerasList: PropTypes.array.isRequired,
  onScroll: PropTypes.func.isRequired,
  scrollTop: PropTypes.func.isRequired,
};

CamsFunctionalList.displayName = "CamsFunctionalList";

export default CamsFunctionalList;
