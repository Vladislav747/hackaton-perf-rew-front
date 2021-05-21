import React, { useState } from "react";
import classNames from "classnames";
import { ClickAwayListener } from '@material-ui/core';

import {
  SubMenuElement,
  SubMenuLink,
  StyledGarbageIcon,
  StyledThreeDotsVerticalIcon,
  StyledEditIcon,
  DropDownWrapper,
  DropDownArrow,
  DropDownContent,
  DropDownContentInner,
  DropDownContentItem,
} from "./styled-components";

const PersonalGroupSubmenuElement = ({
  element: elementProps,
  deletePersonalGroupForUser: deletePersonalGroupForUserProps,
  openEditGroupModal: openEditGroupModalProps,
  openEditMode: openEditModeProps,
  activeGroup: activeGroupProps,
  setActivePersonalGroup: setActivePersonalGroupProps,
}: PersonalGroupSubmenuElementProps) => {

  const [showDropdownState, setShowDropdownState] = useState<boolean>(false);

  /**
  * Обработчик нажатия удаления в раскрывающем меню
  */
  const handleClickDelete = () => {
    setShowDropdownState(false);
    deletePersonalGroupForUserProps(elementProps.name);
  };

  /**
 * Обработчик нажатия редактирования в раскрывающем меню
 */
  const handleClickEdit = () => {
    setShowDropdownState(false);
    //Передаем id группы для редактирования 
    openEditModeProps(elementProps.id);
    //setCurrentGroupNameProps(elementProps.name);
    openEditGroupModalProps(true);
  };

  /**
  * Обработчик нажатия по подменю
  */
  const handleClickChoose = (id: string) => {
    setActivePersonalGroupProps(id)
  };

  /**
 * Обработчик нажатия правой клавишой мышью по группе
 */
  const handleContextMenuClick = (e: any) => {
    e.preventDefault();
    setShowDropdownState(!showDropdownState);
  };


  /**
   * Обработчик клика по области вне выпадающего меню
   */
  const handleClickOutOfDropdown = () => {
    setShowDropdownState(false);
  };


  return (
    <SubMenuElement className="sub-menu__element sub-menu-element">
      <SubMenuLink
        className={classNames({
          "sub-menu__link": true,
          active: elementProps.id === activeGroupProps,
        })}
        onClick={() => { handleClickChoose(elementProps.id) }}
        onContextMenu={(e) => { handleContextMenuClick(e) }}
      >
        {elementProps.name}
      </SubMenuLink>
      <StyledThreeDotsVerticalIcon onClick={() => { setShowDropdownState(!showDropdownState) }} />
      {showDropdownState && (<ClickAwayListener onClickAway={() => handleClickOutOfDropdown()}>
        <DropDownWrapper className="sub-menu-element__dropdown dropdown-menu" >
          <DropDownArrow className="dropdown-menu__arrow"></DropDownArrow>
          <DropDownContent>
            <DropDownContentInner>
              <DropDownContentItem onClick={() => handleClickEdit()}><StyledEditIcon /> Редактировать</DropDownContentItem>
              <DropDownContentItem onClick={() => handleClickDelete()} ><StyledGarbageIcon />Удалить</DropDownContentItem>
            </DropDownContentInner>

          </DropDownContent>

        </DropDownWrapper>
      </ClickAwayListener>)}

    </SubMenuElement>

  );
};
export default PersonalGroupSubmenuElement;
