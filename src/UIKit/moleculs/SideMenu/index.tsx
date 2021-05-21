import React, { useState, useEffect } from "react";
//@ts-ignore
import classNames from "classnames";
import { useLocation } from "react-router-dom";

import {
  SidebarWrapper,
  SidebarIconWrapper,
  SidebarInner,
  SidebarInnerTop,
  SidebarInnerSection,
  StyledHamburgerMenuIcon,
  StyledFavouritesIcon,
  StyledVideoNabludenieIcon,
  StyledStreetsOnlineIcon,
  StyledFolderIcon,
  StyledDemoIcon,
  SidebarInnerExtended,
  StyledLogoIcon,
  SidebarIconWrapperExtended,
  SidebarInnerSectionExtended,
  SidebarNameIconExtended,
  StyledArrowDownIcon,
  SubMenuSidebarWrapper,
  SubMenuElement,
  SubMenuLink,
  SidebarInnerTopExtended,
  StyledHamburgerMenuIconExtended,
  SubMenuBtn,
  SubMenuNoElements,
  StyledFavouritesFilledIcon,
} from "./styled-components";

import { getAccessToken } from "../../../helpers/authTokens";
import history from "../../../helpers/history";

import PersonalGroupSubmenuElement from "../../atoms/PersonalGroupSubmenuElement";
import UnAuthorizedTooltip from "../../atoms/UnAuthorizedTooltip";
import {
  ymSendAnalytics,
  yandexEvents,
} from "../../../helpers/yandex-analytics";

const SideMenu = ({
  optionsForStreetsMenu: optionsForStreetsMenuProps,
  chooseCity: chooseCityProps,
  showExtendedSidebarStatus: showExtendedSidebarStatusProps,
  setExtendedSidebarStatus: setExtendedSidebarStatusProps,
  openAddGroupModal: openAddGroupModalProps,
  openEditGroupModal: openEditGroupModalProps,
  personalGroups: personalGroupsProps,
  deletePersonalGroupForUser: deletePersonalGroupForUserProps,
  openEditMode: openEditModeProps,
  activeGroup: activeGroupProps,
  setActivePersonalGroup: setActivePersonalGroupProps,
  showExtendedSubMenuCustomGroupsStatus: showExtendedSubMenuCustomGroupsStatusProps,
  showExtendedSubMenuStreetsStatus: showExtendedSubMenuStreetsStatusProps,
  setSubmenuCustomGroupsStatus: setSubmenuCustomGroupsStatusProps,
  setSubmenuStreetsStatus: setSubmenuStreetsStatusProps,
  chooseFavourites: chooseFavouritesProps,
}: SideMenuProps) => {
  const avaibleTypes: any = {
    streets: "streets",
    customGroups: "customGroups",
  };

  const isAuthorized = getAccessToken();

  /**
   * Обработчик раскрывания/закрытия бокового меню
   */
  const showExtendedMenuHandler = () => {
    ymSendAnalytics(yandexEvents.clickOpenIconSidemenu);
    setExtendedSidebarStatusProps(!showExtendedSidebarStatusProps);
  };

  //Статус открытия/закрытия подменю  мое видео
  const [
    showSubMenuVideoSidebarState,
    setShowSubMenuVideoSidebarState,
  ] = useState<Boolean>(false);

  //Статус активности избранного - находимся ли мы в этом разделе сейчас
  const [isFavouritesActiveState, setIsFavouritesActiveState] = useState<
    Boolean
  >(false);

  /**
   * Обработчик раскрывания подменю
   */
  const showSubMenuHandler = (type: showSubMenuHandlerType) => {
    setExtendedSidebarStatusProps(true);
    if (type === avaibleTypes.streets) {
      setSubmenuStreetsStatusProps(true);
    } else if (type === avaibleTypes.customGroups) {
      setSubmenuCustomGroupsStatusProps(true);
    }
  };

  /**
   * Обработчик для custom group в раскрытом меню
   */
  const handleCustomGroupsClick = () => {
    //Если мы авторизованы то показываем меню иначе редиректим на авторизацию
    if (isAuthorized) {
      setSubmenuCustomGroupsStatusProps(
        !showExtendedSubMenuCustomGroupsStatusProps
      );
    } else {
      history.push("/authorization");
    }
  };

  /**
   * Обработчик для streets online в нераскрытом меню
   */
  const showSubMenuStreetsOnlineHandler = () => {
    ymSendAnalytics(yandexEvents.clickSidemenuStreetsOpenIcon);
    setSubmenuStreetsStatusProps(!showExtendedSubMenuStreetsStatusProps);
  };

  /**
   * Обработчик для custom group в нераскрытом меню
   */
  const showSubMenuCustomGroupsHandler = () => {
    //Если мы авторизованы то показываем меню иначе редиректим на авторизацию
    if (isAuthorized) {
      showSubMenuHandler(avaibleTypes.customGroups);
    } else {
      history.push("/authorization");
    }
  };

  /**
   * Обработчик для раздела избранного
   */
  const openFavouritesHandler = () => {
    //Если мы авторизованы то показываем меню иначе редиректим на авторизацию
    if (isAuthorized) {
      history.push("/favourites");
      chooseFavouritesProps();
    } else {
      history.push("/authorization");
    }
  };

  const location = useLocation();

  //Проверка url на предмет того не находимся ли мы в избранном?
  //Если мы поменяли изначальную дату - нужно новый кусок видео закачать
  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/favourites") {
      setIsFavouritesActiveState(true);
    } else {
      setIsFavouritesActiveState(false);
    }
  }, [location]);
  /**
   * Обработчик нажатия по скрытой иконке улицы онлайн
   */
  const streetsIconSidemenuHideHandler = () => {
    ymSendAnalytics(yandexEvents.clickStreetsIconSidemenu);
    showSubMenuHandler(avaibleTypes.streets);
  };

  /**
   * Обработчик нажатия по городу в боковом меню в улицах онлайн
   */
  const chooseCityHandler = (id: number, name: string) => {
    ymSendAnalytics(yandexEvents.clickSidemenuStreetsChooseCity);
    chooseCityProps(id, name);
  };

  return (
    <>
      {showExtendedSidebarStatusProps ? (
        <>
          <SidebarWrapper className="sidebar__wrapper sidebar--opened">
            <SidebarInnerExtended className="sidebar__inner">
              <SidebarInnerTopExtended className="sidebar-inner__top">
                <SidebarIconWrapper
                  className="sidebar__icon-wrapper"
                  onClick={() => showExtendedMenuHandler()}
                >
                  <StyledHamburgerMenuIconExtended />
                </SidebarIconWrapper>
                <StyledLogoIcon />
              </SidebarInnerTopExtended>
              <SidebarInnerSectionExtended className="sidebar-inner__section">
                <SidebarIconWrapperExtended
                  className="sidebar__icon-wrapper"
                  onClick={() => showSubMenuStreetsOnlineHandler()}
                >
                  <StyledStreetsOnlineIcon />
                  <SidebarNameIconExtended>
                    Улицы Онлайн
                  </SidebarNameIconExtended>
                  <StyledArrowDownIcon
                    opened={showExtendedSubMenuStreetsStatusProps.toString()}
                  />
                </SidebarIconWrapperExtended>
                <SubMenuSidebarWrapper
                  className={classNames({
                    "sub-menu__wrapper": true,
                    opened: showExtendedSubMenuStreetsStatusProps === true,
                  })}
                >
                  {optionsForStreetsMenuProps.map((el: any, index: number) => {
                    return (
                      <React.Fragment key={index}>
                        <SubMenuElement className="sub-menu__element">
                          <SubMenuLink
                            key={el.id + index}
                            className="sub-menu__link"
                            onClick={() => chooseCityHandler(+el.id, el.name)}
                          >
                            {el.name}
                          </SubMenuLink>
                        </SubMenuElement>
                      </React.Fragment>
                    );
                  })}
                </SubMenuSidebarWrapper>
                <SidebarIconWrapperExtended
                  className="sidebar__icon-wrapper"
                  onClick={() =>
                    setShowSubMenuVideoSidebarState(
                      !showSubMenuVideoSidebarState
                    )
                  }
                >
                  <StyledVideoNabludenieIcon />

                  <SidebarNameIconExtended>
                    Мое видеонаблюдение
                  </SidebarNameIconExtended>
                  <StyledArrowDownIcon
                    opened={showSubMenuVideoSidebarState.toString()}
                  />
                </SidebarIconWrapperExtended>
                <SubMenuSidebarWrapper
                  className={classNames({
                    "sub-menu__wrapper": true,
                    opened: showSubMenuVideoSidebarState === true,
                  })}
                >
                  <SubMenuElement className="sub-menu__element">
                    <SubMenuLink className="sub-menu__link">
                      Мой дом
                    </SubMenuLink>
                  </SubMenuElement>
                </SubMenuSidebarWrapper>
                <UnAuthorizedTooltip>
                  <SidebarIconWrapperExtended
                    className="sidebar__icon-wrapper --auth"
                    onClick={() => {
                      handleCustomGroupsClick();
                    }}
                  >
                    <StyledFolderIcon />
                    <SidebarNameIconExtended>
                      Мои группы камер
                    </SidebarNameIconExtended>
                    <StyledArrowDownIcon
                      opened={showExtendedSubMenuCustomGroupsStatusProps.toString()}
                    />
                  </SidebarIconWrapperExtended>
                </UnAuthorizedTooltip>

                <SubMenuSidebarWrapper
                  className={classNames({
                    "sub-menu__wrapper": true,
                    opened: showExtendedSubMenuCustomGroupsStatusProps === true,
                  })}
                >
                  <SubMenuElement>
                    <SubMenuBtn
                      onClick={() => {
                        openAddGroupModalProps(true);
                      }}
                    >
                      Добавить группу
                    </SubMenuBtn>
                  </SubMenuElement>
                  {personalGroupsProps.length > 0 ? (
                    personalGroupsProps.map((el: any, index: number) => (
                      <PersonalGroupSubmenuElement
                        element={el}
                        key={index}
                        deletePersonalGroupForUser={
                          deletePersonalGroupForUserProps
                        }
                        openEditGroupModal={openEditGroupModalProps}
                        openEditMode={openEditModeProps}
                        activeGroup={activeGroupProps}
                        setActivePersonalGroup={setActivePersonalGroupProps}
                      />
                    ))
                  ) : (
                    <SubMenuNoElements>Нет групп камер</SubMenuNoElements>
                  )}
                </SubMenuSidebarWrapper>
                <SidebarIconWrapperExtended
                  className="sidebar__icon-wrapper"
                  onClick={() =>
                    setShowSubMenuVideoSidebarState(
                      !showSubMenuVideoSidebarState
                    )
                  }
                >
                  <StyledVideoNabludenieIcon />

                  <SidebarNameIconExtended>
                    Мое видеонаблюдение
                  </SidebarNameIconExtended>
                  <StyledArrowDownIcon
                    opened={showSubMenuVideoSidebarState.toString()}
                  />
                </SidebarIconWrapperExtended>
                <SubMenuSidebarWrapper
                  className={classNames({
                    "sub-menu__wrapper": true,
                    opened: showSubMenuVideoSidebarState === true,
                  })}
                >
                  <SubMenuElement className="sub-menu__element">
                    <SubMenuLink className="sub-menu__link">
                      Мой дом
                    </SubMenuLink>
                  </SubMenuElement>
                </SubMenuSidebarWrapper>
                <UnAuthorizedTooltip>
                  <SidebarIconWrapperExtended
                    className="sidebar__icon-wrapper"
                    onClick={() => openFavouritesHandler()}
                  >
                    {isFavouritesActiveState ? (
                      <StyledFavouritesFilledIcon />
                    ) : (
                      <StyledFavouritesIcon />
                    )}
                    <SidebarNameIconExtended>Избранное</SidebarNameIconExtended>
                  </SidebarIconWrapperExtended>
                </UnAuthorizedTooltip>
              </SidebarInnerSectionExtended>
              <SidebarInnerSectionExtended>
                <SidebarIconWrapperExtended className="sidebar__icon-wrapper">
                  <StyledDemoIcon />
                  <SidebarNameIconExtended>
                    Раздел на будущее
                  </SidebarNameIconExtended>
                </SidebarIconWrapperExtended>
              </SidebarInnerSectionExtended>
            </SidebarInnerExtended>
          </SidebarWrapper>
        </>
      ) : (
        <SidebarWrapper className="sidebar__wrapper sidebar--closed">
          <SidebarInner className="sidebar__inner">
            <SidebarInnerTop className="sidebar-inner__top">
              <SidebarIconWrapper
                className="sidebar__icon-wrapper"
                onClick={() => showExtendedMenuHandler()}
              >
                <StyledHamburgerMenuIcon />
              </SidebarIconWrapper>
            </SidebarInnerTop>
            <SidebarInnerSection className="sidebar-inner__section">
              <SidebarIconWrapper className="sidebar__icon-wrapper">
                <StyledStreetsOnlineIcon
                  onClick={() => streetsIconSidemenuHideHandler()}
                />
              </SidebarIconWrapper>
              <SidebarIconWrapper className="sidebar__icon-wrapper">
                <UnAuthorizedTooltip>
                  <StyledFolderIcon
                    onClick={() => showSubMenuCustomGroupsHandler()}
                  />
                </UnAuthorizedTooltip>
              </SidebarIconWrapper>
              <SidebarIconWrapper className="sidebar__icon-wrapper">
                <StyledVideoNabludenieIcon />
              </SidebarIconWrapper>
              <SidebarIconWrapper className="sidebar__icon-wrapper">
                <UnAuthorizedTooltip>
                  {isFavouritesActiveState ? (
                    <StyledFavouritesFilledIcon
                      onClick={() => openFavouritesHandler()}
                    />
                  ) : (
                    <StyledFavouritesIcon
                      onClick={() => openFavouritesHandler()}
                    />
                  )}
                </UnAuthorizedTooltip>
              </SidebarIconWrapper>
            </SidebarInnerSection>
            <SidebarInnerSection className="sidebar-inner__bottom">
              <SidebarIconWrapper className="sidebar__icon-wrapper">
                <StyledDemoIcon />
              </SidebarIconWrapper>
            </SidebarInnerSection>
          </SidebarInner>
        </SidebarWrapper>
      )}
    </>
  );
};

SideMenu.displayName = "SideMenu";
export default SideMenu;
