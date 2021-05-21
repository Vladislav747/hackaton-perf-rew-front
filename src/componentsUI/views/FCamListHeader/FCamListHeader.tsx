import React from "react";

import { ReactComponent as ArrowLeftIcon } from "../../../assets/svgs/solid/arrow-left.svg";
import { ReactComponent as GarbageIcon } from "../../../assets/img/FCamListItem/garbage.svg";

import {
  Header,
  IconContainer,
  HeadingStyled,
  Grow,
  CheckboxStyled,
  SelectableLabel,
  IconsContainer,
} from "./styled-components";

/**
 * Возвращение вызова функции с аргументом
 * @param {string} id
 * @param {function} fn
 */
const handleArrowLeftClick = (id: string | number, fn: Function) => () => {
  return fn(id);
};

/**
 * Проверка нужно ли рисовать стрелку назад в шапке модального окна
 * @param {string} id
 */
const isDrawIcon = (id: string) => typeof id !== "undefined" && id !== null;

/**
 * Сгенерировать props
 * @param {string} id
 */
const getHeadingProps = (id: string) => {
  let props: any = {};
  if (isDrawIcon(id)) {
    props.withicon = "true";
  }
  return props;
};

const FCamListHeader = (props: FCamListHeaderProps) => {
  const {
    id: idProps,
    name: nameProps,
    parentGroupId: parentGroupIdProps,
    isSelectable: isSelectableProps,
    setActiveGroupId: setActiveGroupIdProps,
    toggleSelected: toggleSelectedProps,
    cleanAll: cleanAllProps,
    fullSelectedGroups: fullSelectedGroupsProps,
  } = props;

  const DEFAULT_LIST_TITLE = "Выбрать камеру";

  return (
    <Header className="cam-list-header">
      {isDrawIcon(parentGroupIdProps) && (
        <IconContainer
          className="cam-list-header__icon-container"
          onClick={handleArrowLeftClick(
            parentGroupIdProps,
            setActiveGroupIdProps
          )}
        >
          <ArrowLeftIcon className="cam-list-header__arrow-left-icon" />
        </IconContainer>
      )}
      <HeadingStyled {...getHeadingProps(parentGroupIdProps)}>
        {nameProps || DEFAULT_LIST_TITLE}
      </HeadingStyled>
      <Grow className="cam-list-header__grow" />
      <IconsContainer className="icons-container">
        {isSelectableProps && (
          <SelectableLabel className="icons-container__selectable-label">
            <CheckboxStyled
              className="icons-container__checkbox"
              onChange={() => {
                if (typeof toggleSelectedProps === "function") {
                  toggleSelectedProps(idProps);
                }
              }}
              checked={fullSelectedGroupsProps}
            />
          </SelectableLabel>
        )}
        <IconContainer className="icon-container">
          <GarbageIcon
            className="icon-container__garbage-icon"
            onClick={() => {
              cleanAllProps();
            }}
          />
        </IconContainer>
      </IconsContainer>
    </Header>
  );
};

FCamListHeader.displayName = "FCamListHeader";
export default FCamListHeader;
