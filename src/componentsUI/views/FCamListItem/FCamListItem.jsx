/**
 * FIXME: автоматически проставляются чекбоксы - надо попраивть эту ошибку
 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";

//@todo Перенести стили чекбокса в styled-components и прикрутить темы
import "../../../assets/css/rc-checkbox/index.css";
import { ReactComponent as FolderIcon } from "../../../assets/img/FCamListItem/folder.svg";

import { objectTypes } from "../../../modules/flist";
import { getSpinner } from "../FCamList/FCamList";

import {
  Container,
  IconContainer,
  Wrapper,
  TitleContainer,
  Title,
  SubTitle,
  SubTitleContainer,
  CheckboxStyled,
} from "./styled-components";

const isCamera = (objectType) => objectType === objectTypes.CAMERA;
const stopPropagation = (e) => e.stopPropagation();

const handleClick = ({ id, objectType, setCurrentGroup, toggleSelected }) => (
  e
) => {
  if (isCamera(objectType)) {
    toggleSelected([id]);
    return;
  }
  setCurrentGroup(id);
};

const getPathComponent = path => {
  if (path && path[0] && typeof path[0] === "string") {
    const splitPath = path[0].split("//");
    splitPath.pop();
    return (
      <SubTitleContainer>
        {splitPath.map((item, index) => (
          <SubTitle key={index}>{item}</SubTitle>
        ))}
      </SubTitleContainer>
    );
  }
};

const FCamListItem = props => {
  const {
    name,
    path,
    setCurrentGroup,
    id,
    objectType,
    isSelected,
    measure,
    toggleSelected,
    isLoading,
    isFailed,
  } = props;
  useEffect(() => {
    if (typeof measure === "function") {
      measure();
    }
  }, [measure, name]);
  return (
    <Container className="cam-list-item">
      <Wrapper
        onClick={handleClick({
          id,
          objectType,
          setCurrentGroup,
          toggleSelected,
        })}
      >
        <IconContainer>
          {isCamera(objectType) ? "" : <FolderIcon />}
        </IconContainer>
        <TitleContainer>
          {path && getPathComponent(path)}
          <Title>{name}</Title>
        </TitleContainer>

        {isCamera(objectType) &&
          (() => {
            if (isLoading) {
              return (
                <div
                  style={{ padding: "0 1em", height: "24px", width: "24px" }}
                >
                  {getSpinner({ height: 24, width: 24 })}
                </div>
              );
            } else if (isFailed) {
              return (
                <label onClick={stopPropagation}>
                  <CheckboxStyled
                    onChange={() => {
                      if (typeof toggleSelected === "function") {
                        toggleSelected([id]);
                      }
                    }}
                    disabled={true}
                    checked={1}
                  />
                </label>
              );
            } else {
              return (
                <label onClick={stopPropagation}>
                  <CheckboxStyled
                    onChange={() => {
                      if (typeof toggleSelected === "function") {
                        toggleSelected([id]);
                      }
                    }}
                    checked={isSelected ? 1 : 0}
                  />
                </label>
              );
            }
          })()}
      </Wrapper>
    </Container>
  );
};

FCamListItem.propTypes = {
  name: PropTypes.string,
  setActiveId: PropTypes.func,
  toggleSelected: PropTypes.func,
  measure: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  objectType: PropTypes.string,
  isSelected: PropTypes.bool,
};
FCamListItem.defaultProps = {};
FCamListItem.displayName = "FCamListItem";
export default FCamListItem;
