import React, { useRef, useState, useEffect, useCallback } from "react";

import { viewTypes } from "../../../modules/streetsOnline/schema";
import { elementsNumForTypes } from "../../../modules/streetsOnline/schema";

import {
  validateCameraObject,
  getFunctionByName,
} from "../../../helpers/streetsOnlineElements/serviceFunctions";

import PlayerBoxWithState from "../../containers/PlayerBoxWithState";
import { breakpoints } from "../../../helpers/styled-components";

import notAbleImg from "../../../assets/img/player/unavilable.png";

import {
  StyledList,
  CameraViewWrapper,
  FallbackFrame,
  FallbackImg,
  СameraInRowStyleBigIconMatrix,
  RowRootWrapper,
  RowRootPaddingWrapper,
  GridInRowWrapper,
  simpleGridItemStyleBig,
  bigGridItemStyle,
} from "./styled-components";

const apiUrl = process.env.REACT_APP_BASE_STREAMS_URL;

const preloadRows = 5;

const _cellRenderer = (
  { index, key, style }: cellRendererInputProps,
  listForRender: HTMLDivElement[],
  viewType: string,
  calculatedNum: number
) => {
  return (
    <RowRootWrapper
      className={`LazyListRows__root-wrapper-row${index}`}
      key={key}
      style={style}
    >
      <RowRootPaddingWrapper
        className={`LazyListRows__padding-wrapper-row${index}`}
      >
        <GridInRowWrapper
          className={`LazyListRows__grid-wrapper-row${index}`}
          viewType={viewType}
          index={index}
          calculatedNum={calculatedNum}
        >
          {[...listForRender]}
        </GridInRowWrapper>
      </RowRootPaddingWrapper>
    </RowRootWrapper>
  );
};

export const CameraView = ({
  key,
  style = {},
  validatedCameraOject,
}: CameraViewProps) => {
  const isCameraDataValid =
    validatedCameraOject.hasOwnProperty("VALID") && validatedCameraOject.VALID;

  return isCameraDataValid ? (
    <CameraViewWrapper
      className="CameraView__wrapper"
      style={{ ...style }}
      key={key}
    >
      <PlayerBoxWithState
        url={`${apiUrl}${validatedCameraOject.HLS}`}
        poster={`${apiUrl}${validatedCameraOject.LOSSYSNAPSHOT}`}
        cameraName={validatedCameraOject.NAME}
        id={validatedCameraOject.ID}
        showUI={true}
        playNow={false}
      />
    </CameraViewWrapper>
  ) : (
    <FallbackFrame style={{ ...style }} key={key}>
      <FallbackImg src={notAbleImg} />
    </FallbackFrame>
  );
};

const _splitListForBigFirstRow = (сamerasList: validatedObject[]) => {
  const сamerasListLocal = [...сamerasList];
  const iconsList = [];
  for (let i in сamerasListLocal) {
    iconsList.push(
      CameraView({
        key: "row_" + i,
        style: parseInt(i) === 0 ? bigGridItemStyle : simpleGridItemStyleBig,
        validatedCameraOject: сamerasListLocal[i],
      })
    );
  }
  return iconsList;
};

const _splitListToRowWithStep = (
  сamerasList: validatedObject[],
  step: number = elementsNumForTypes.NINE_PANEL,
  elementStyle: Object = {}
) => {
  const сamerasListLocal = [...сamerasList];
  const matrixWithStep: JSX.Element[][] | any = [];
  while (сamerasListLocal.length > 0) {
    const rowElemets = сamerasListLocal.splice(0, step);
    const row: JSX.Element[] = [];
    rowElemets.map((cameraValue, index) => {
      row.push(
        CameraView({
          key: "row_" + index,
          style: elementStyle,
          validatedCameraOject: cameraValue,
        })
      );
    });
    matrixWithStep.push(row);
  }
  return matrixWithStep;
};

const _splitIntoBigIconMatrix = (сamerasList: validatedObject[]) => {
  const сamerasListLocal = [...сamerasList];

  const gridWithBigViewElemetCount = elementsNumForTypes.BIG_PANEL_FIRST_ROW;
  const gridRegularElemetCount = elementsNumForTypes.BIG_PANEL_REST_ROW;

  const bigIconMatrix = [];
  if (сamerasListLocal.length <= gridWithBigViewElemetCount) {
    const iconsList = _splitListForBigFirstRow(сamerasListLocal);
    bigIconMatrix.push(iconsList);
  } else {
    const gridCamerasList = сamerasListLocal.splice(
      0,
      gridWithBigViewElemetCount
    );
    const iconsList = _splitListForBigFirstRow(gridCamerasList);
    bigIconMatrix.push(iconsList);
    const restRows = _splitListToRowWithStep(
      сamerasListLocal,
      gridRegularElemetCount,
      СameraInRowStyleBigIconMatrix
    );
    bigIconMatrix.push(...restRows);
  }
  return bigIconMatrix;
};

const splitToRenderMatrix = (
  currentGridTypeProps: string,
  selectedCamerasListSorted: validatedObject[],
  calculatedNumProps: number
) => {
  if (currentGridTypeProps == viewTypes.BIG_PANEL) {
    return _splitIntoBigIconMatrix(selectedCamerasListSorted);
  } else if (currentGridTypeProps == viewTypes.FOUR_PANEL) {
    return _splitListToRowWithStep(
      selectedCamerasListSorted,
      elementsNumForTypes.FOUR_PANEL
    );
  } else if (currentGridTypeProps == viewTypes.CALCULATOR) {
    return _splitListToRowWithStep(
      selectedCamerasListSorted,
      calculatedNumProps
    );
  } else if (currentGridTypeProps == viewTypes.MOBILE) {
    return _splitListToRowWithStep(
      selectedCamerasListSorted,
      elementsNumForTypes.MOBILE
    );
  } else if (currentGridTypeProps == viewTypes.TABLET) {
    return _splitListToRowWithStep(
      selectedCamerasListSorted,
      elementsNumForTypes.TABLET
    );
  } else {
    return _splitListToRowWithStep(
      selectedCamerasListSorted,
      elementsNumForTypes.NINE_PANEL
    );
  }
};

const _noRowsRenderer = () => {
  //@todo стильно сделать.
  return <div>Не выбрано ни одной камеры.</div>;
};

const CamerasGridFabric = (props: CamerasGridFabricProps) => {
  const {
    currentGridType: currentGridTypeProps,
    currentSortFunctionName: currentSortFunctionNameProps,
    currentSortType: currentSortTypeProps,
    selectedCamerasList: selectedCamerasListProps,
    onChildScroll: onChildScrollProps,
    scrollToIndex: scrollToIndexProps,
    calculatedNum: calculatedNumProps,
    sizeParams: sizeParamsProps,
    isScrolling: isScrolling,
    scrollTop: scrollTopProps,
  } = props;

  const { height: heightProps, width: widthProps } = sizeParamsProps;

  const listRef = useRef<lazyListRef>(null!);

  const [listForRender, setListForRender] = useState<HTMLDivElement[][] | []>(
    []
  );

  const _prepareListForRender = useCallback(() => {
    const localSelectedCamerasList = [];

    if (selectedCamerasListProps.length === 0) {
      setListForRender([]);
      return;
    }

    for (let i in selectedCamerasListProps) {
      const validObject = validateCameraObject(selectedCamerasListProps[i]);
      localSelectedCamerasList.push(validObject);
    }

    const sortFunc = getFunctionByName(currentSortFunctionNameProps);
    const selectedCamerasListSorted = sortFunc(
      localSelectedCamerasList,
      currentSortTypeProps
    );

    const newListForRender = splitToRenderMatrix(
      currentGridTypeProps,
      selectedCamerasListSorted,
      calculatedNumProps
    );

    setListForRender(newListForRender);
  }, [
    selectedCamerasListProps,
    currentGridTypeProps,
    currentSortFunctionNameProps,
    currentSortTypeProps,
    calculatedNumProps,
  ]);

  const _countRowHeight = useCallback(
    (index: number) => {
      let padding = 0;
      if (window.innerWidth >= breakpoints.xl) {
        padding = 96 * 2;
      } else if (
        window.innerWidth >= breakpoints.sm &&
        window.innerWidth < breakpoints.xl
      ) {
        padding = 24 * 2;
      }
      const currentInnerWidth =
        window.innerWidth > 2100 ? 2100 - padding : window.innerWidth - padding;
      const paddingFor19and9 = 0.56;
      const standartHeight =
        (currentInnerWidth / elementsNumForTypes.BIG_PANEL_REST_ROW) *
        paddingFor19and9;
      if (currentGridTypeProps === viewTypes.BIG_PANEL) {
        return index === 0
          ? standartHeight * 3 /* 3 строки */ + 20 /* отступы */
          : standartHeight;
      } else if (currentGridTypeProps === viewTypes.FOUR_PANEL) {
        return (
          (currentInnerWidth / elementsNumForTypes.FOUR_PANEL) *
          paddingFor19and9
        );
      } else if (currentGridTypeProps === viewTypes.MOBILE) {
        return (
          (currentInnerWidth / elementsNumForTypes.MOBILE) * paddingFor19and9
        );
      } else if (currentGridTypeProps === viewTypes.CALCULATOR) {
        return (currentInnerWidth / calculatedNumProps) * paddingFor19and9;
      } else if (currentGridTypeProps === viewTypes.TABLET) {
        return (
          (currentInnerWidth / elementsNumForTypes.TABLET) * paddingFor19and9
        );
      } else {
        return standartHeight;
      }
    },
    [currentGridTypeProps, calculatedNumProps]
  );

  useEffect(() => {
    _prepareListForRender();
  }, [selectedCamerasListProps]);

  useEffect(() => {
    _prepareListForRender();
    listRef.current.recomputeRowHeights();
    listRef.current.forceUpdate();
  }, [
    currentSortTypeProps,
    currentGridTypeProps,
    heightProps,
    widthProps,
    calculatedNumProps,
    currentSortFunctionNameProps,
    currentSortTypeProps,
  ]);

  return (
    <StyledList
      className={`LazyListHoc`}
      ref={listRef}
      key={"ListType_" + currentGridTypeProps}
      overscanRowCount={preloadRows}
      width={widthProps}
      autoHeight
      noRowsRenderer={_noRowsRenderer}
      height={heightProps}
      rowCount={listForRender.length}
      onScroll={onChildScrollProps}
      isScrolling={isScrolling}
      scrollTop={scrollTopProps}
      scrollToIndex={scrollToIndexProps}
      rowHeight={({ index }: { index: number }) => _countRowHeight(index)}
      rowRenderer={({ index, key, style }: cellRendererInputProps) => {
        return _cellRenderer(
          { index, key, style },
          listForRender[index],
          currentGridTypeProps,
          calculatedNumProps
        );
      }}
    />
  );
};

export default CamerasGridFabric;
