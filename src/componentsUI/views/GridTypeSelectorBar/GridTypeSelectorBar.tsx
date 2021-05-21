import React, { useState, useRef, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";

import ContainerWithSpan from "../../../UIKit/atoms/ContainerWithSpan/index";
import GridGenerationBar from "../../../UIKit/atoms/GridGenerationBar/index";

import { viewTypes } from "../../../modules/streetsOnline/schema";

import {
  MapIconStyled,
  BigPanelIconStyled,
  FourPanelIconStyled,
  NinePanelIconStyled,
  ListIconStyled,
  CalculatorIconStyled,
} from "./styled-components/index";

import { ViewSelectorGroup, ViewSelectorContainer } from "./styled-components";

/* Подсказки */
const mapIconText = "Вывести карту";
const bigPanelIconText = "Вывести большую панель камер";
const fourPanelIconText = "Вывести 3 камеры в ряд";
const ninePanelIconText = "Вывести 5 камер в ряд";
const calculatorPanelIconText = "Настроить сетку камер";

const GridTypeSelectorBar = (props: GridTypeSelectorBarProps) => {
  const {
    currentGridType,
    setCalculatedNum,
    calculatedNum,
    onSelectView,
  } = props;

  const [showGridGenerator, setShowGridGenerator] = useState(false);
  const wrapperRef = useRef();

  /* 
    Отслеживает нажатие вне 
    выпадающего списка для калькулятора - 
    чтобы сворачивать выпадающей список 
    */
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        wrapperRef &&
        wrapperRef.current &&
        //@ts-ignore-start
        !wrapperRef.current.contains(event.target)
      ) {
        setShowGridGenerator(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  /* Применен деклоративный подход, для очевидности. */
  return (
    <ViewSelectorGroup className="view-selector-group">
      {/*
                @todo сюрприз
                <ViewSelectorContainer
                    className="view-selector-group__search"
                    active={currentGridType === viewTypes.SEARCH}
                    displayReady={true}
                    onClick={() => {
                        onSelectView(viewTypes.SEARCH)
                    }}
                >
                    <SearchIconStyled/>
                </ViewSelectorContainer>
                */}

      <ViewSelectorContainer
        className="view-selector-group__map"
        active={currentGridType === viewTypes.MAP}
        displayReady={false}
        onClick={() => {
          onSelectView(viewTypes.MAP);
        }}
      >
        <Tooltip title={mapIconText} placement="top">
          <MapIconStyled />
        </Tooltip>
      </ViewSelectorContainer>

      <ViewSelectorContainer
        className="view-selector-group__big-panel"
        active={currentGridType === viewTypes.BIG_PANEL}
        displayReady={true}
        onClick={() => {
          onSelectView(viewTypes.BIG_PANEL);
        }}
      >
        <Tooltip title={bigPanelIconText} placement="top">
          <BigPanelIconStyled />
        </Tooltip>
      </ViewSelectorContainer>

      <ViewSelectorContainer
        className="view-selector-group__four-panel"
        active={currentGridType === viewTypes.FOUR_PANEL}
        displayReady={true}
        onClick={() => {
          onSelectView(viewTypes.FOUR_PANEL);
        }}
      >
        <Tooltip title={fourPanelIconText} placement="top">
          <FourPanelIconStyled />
        </Tooltip>
      </ViewSelectorContainer>

      <ViewSelectorContainer
        className="view-selector-group__nine-panel"
        active={currentGridType === viewTypes.NINE_PANEL}
        displayReady={true}
        onClick={() => {
          onSelectView(viewTypes.NINE_PANEL);
        }}
      >
        <Tooltip title={ninePanelIconText} placement="top">
          <NinePanelIconStyled />
        </Tooltip>
      </ViewSelectorContainer>

      <ViewSelectorContainer
        className="view-selector-group__list"
        displayReady={false}
        active={currentGridType === viewTypes.LIST_PANEL}
        onClick={() => {
          onSelectView(viewTypes.LIST_PANEL);
        }}
      >
        <ListIconStyled />
      </ViewSelectorContainer>

      <ViewSelectorContainer
        className="view-selector-group__calculator"
        displayReady={true}
        ref={wrapperRef}
        active={currentGridType === viewTypes.CALCULATOR}
        falloutMenu={true}
        onClick={() => {
          setShowGridGenerator(!showGridGenerator);
        }}
      >
        <Tooltip title={calculatorPanelIconText} placement="top">
          <CalculatorIconStyled />
        </Tooltip>

        <ContainerWithSpan visibility={showGridGenerator}>
          <GridGenerationBar
            calculatedNum={calculatedNum}
            onChangeCamsInRow={(gridInRow: number) => {
              onSelectView(viewTypes.CALCULATOR);
              setCalculatedNum(gridInRow);
              setShowGridGenerator(false);
            }}
          />
        </ContainerWithSpan>
      </ViewSelectorContainer>
    </ViewSelectorGroup>
  );
};

export default GridTypeSelectorBar;
