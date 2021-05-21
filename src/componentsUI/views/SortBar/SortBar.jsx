import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { ReactComponent as ArrowDownIcon } from "../../../assets/svgs/streetsOnline/RawSvg/arrow_down.svg";

import {
  SortItem,
  TopBarContainer,
  SortBarContainer,
  SortElementContainer,
  SortTextContainer,
  ArrowContainer,
  SortBarTitle,
} from "./styled-components";

const SortBar = props => {
  /**
   * по выбору типа сортировки
   */
  const {
    sortTypesObject,
    currentSortFunctionName,
    currentSortType,
    onChangeSortType,
  } = props;

  const [sortElement, setSortElement] = useState([]);

  useEffect(() => {
    const localSortElement = [];
    for (let sortItem in sortTypesObject) {
      if (sortTypesObject[sortItem].display) {
        localSortElement.push(
          <SortItem key={sortTypesObject[sortItem].id}>
            {sortTypesObject[sortItem].text}
          </SortItem>
        );
      }
    }
    setSortElement(localSortElement);
  }, [sortTypesObject]);

  const sortTypesKeys = Object.keys(sortTypesObject);
  return (
    <>
      <TopBarContainer className="top-container">
        <SortBarContainer className="top-container__sort-bar-container sort-bar-container">
          <SortBarTitle className="sort-bar-container__sort-bar-title">
            Сортировка:
          </SortBarTitle>
          {sortElement.map((value, index) => {
            return (
              <SortElementContainer
                key={index}
                onClick={() => {
                  onChangeSortType(
                    sortTypesKeys[index + 1],
                    currentSortType === "inc" ? "dec" : "inc"
                  );
                }}
              >
                <SortTextContainer
                  className="sort-bar-container__text-container"
                  active={currentSortFunctionName === sortTypesKeys[index + 1]}
                >
                  {value}
                </SortTextContainer>
                {(() => {
                  if (currentSortFunctionName !== sortTypesKeys[index + 1]) {
                    return (
                      <ArrowContainer className="arrowContainer" active={false}>
                        <ArrowDownIcon />
                      </ArrowContainer>
                    );
                  } else {
                    return currentSortType === "inc" ? (
                      <ArrowContainer
                        className="arrowContainer"
                        active={true}
                        currentSortType={currentSortType}
                      >
                        <ArrowDownIcon />
                      </ArrowContainer>
                    ) : (
                      <ArrowContainer
                        className="arrowContainer"
                        active={false}
                        currentSortType={currentSortType}
                      >
                        <ArrowDownIcon />
                      </ArrowContainer>
                    );
                  }
                })()}
              </SortElementContainer>
            );
          })}
        </SortBarContainer>
      </TopBarContainer>
    </>
  );
};

SortBar.propTypes = {
  sortTypesObject: PropTypes.object,
  currentSortFunctionName: PropTypes.string,
  onChangeSortType: PropTypes.func,
  cleanAllProps: PropTypes.func,
};

SortBar.defaultProps = {
  sortTypesObject: {},
};

SortBar.displayName = "SortBar";

export default SortBar;
