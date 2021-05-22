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
  SidebarInnerExtended,
  StyledLogoIcon,
  SidebarIconWrapperExtended,
  SidebarInnerSectionExtended,
  SidebarNameIconExtended,
  StyledLeaderIcon,
  SidebarInnerTopExtended,
  StyledHamburgerMenuIconExtended,
  StyledReviewsIcon,
  StyledProfileIcon,
} from "./styled-components";

import { getAccessToken } from "../../../helpers/authTokens";
import history from "../../../helpers/history";

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
    showSubMenuHandler(avaibleTypes.streets);
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
                  <StyledProfileIcon />
                  <SidebarNameIconExtended>
                    Профиль сотрудника
                  </SidebarNameIconExtended>
                </SidebarIconWrapperExtended>
                <SidebarIconWrapperExtended
                  className="sidebar__icon-wrapper"
                  onClick={() =>
                    setShowSubMenuVideoSidebarState(
                      !showSubMenuVideoSidebarState
                    )
                  }
                >
                  <StyledReviewsIcon />

                  <SidebarNameIconExtended>
                    Отзывы
                  </SidebarNameIconExtended>
                </SidebarIconWrapperExtended>

               
                <SidebarIconWrapperExtended
                  className="sidebar__icon-wrapper"
                  onClick={() =>
                    history.push("/card-leader")
                  }
                >
                  <StyledLeaderIcon />

                  <SidebarNameIconExtended>
                    Профиль руководителя
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
                <StyledProfileIcon
                  onClick={() =>  history.push("/")}
                />
              </SidebarIconWrapper>
              <SidebarIconWrapper className="sidebar__icon-wrapper">
                <StyledReviewsIcon  onClick={() =>  history.push("/reviews")}/>
              </SidebarIconWrapper>
              <SidebarIconWrapper className="sidebar__icon-wrapper">
                <StyledLeaderIcon onClick={() =>
                    history.push("/card-leader")
                  }/>
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
