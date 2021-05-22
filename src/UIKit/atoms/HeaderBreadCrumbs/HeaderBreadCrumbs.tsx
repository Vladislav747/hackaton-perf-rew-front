import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import {
  HeaderBreadcrumbsRow,
  HeaderBreadCrumbsDividerIcon,
  HeaderBreadcrumbsRowSpan,
} from "./styled-components";

/**
 * Проверка выводить ли доп заголовки
 * @param groupName
 * @returns {Boolean}
 */
const checkActiveObjectNameProps = (groupName: string) => {
  const acceptedData = ["Выбрать камеру", "Улицы Онлайн"];

  if (groupName === undefined || !groupName) {
    return false;
  }

  return !(typeof groupName === "string" && acceptedData.includes(groupName));
};

const HeaderBreadCrumbs = ({
  currentObjectName: currentObjectNameProps,
}: HeaderBreadCrumbsProps) => {
  //Статус открытия/закрытия подменю  мое видео
  const [currentObjectNameState, setCurrentObjectNameState] = useState<
    String | undefined
  >(currentObjectNameProps);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/favourites") {
      setCurrentObjectNameState("Избранное");
    }
  }, [location]);

  return (
    <>
      <HeaderBreadcrumbsRow
        className="header-breadcrumbs"
        onClick={() => {
          history.push(`/`);
        }}
      >
        <HeaderBreadcrumbsRowSpan className="header-breadcrumbs__root">
          Главная
        </HeaderBreadcrumbsRowSpan>
        {currentObjectNameProps &&
          checkActiveObjectNameProps(currentObjectNameProps) && (
            <>
              <span>
                <HeaderBreadCrumbsDividerIcon />
              </span>
              <HeaderBreadcrumbsRowSpan>
                {currentObjectNameState}
              </HeaderBreadcrumbsRowSpan>
            </>
          )}
      </HeaderBreadcrumbsRow>
    </>
  );
};
export default HeaderBreadCrumbs;
