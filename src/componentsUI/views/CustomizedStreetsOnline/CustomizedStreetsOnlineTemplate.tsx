import React from "react";

import {
  StreetsOnlineWrapper,
  StreetsOnlineTopPanel,
  StreetsOnlineTopPanelControl,
  SortRow,
  StreetsOnlineTopPanelLeftPart,
  StreetsOnlineTopPanelRightPart,
} from "./styled-components";

const CustomizedStreetsOnlineTemplate = ({
  children: {
    reviews: reviewsProps,
  }}: StreetsOnlineCustomizedProps
) => {

  return (
    <StreetsOnlineWrapper className="streets-online__wrapper streets-online">
      <StreetsOnlineTopPanel className="streets-online__top-panel">
        <StreetsOnlineTopPanelLeftPart className="streets-online__left-part">
          Верхняя панель
        </StreetsOnlineTopPanelLeftPart>
        <StreetsOnlineTopPanelRightPart className="streets-online__right-part">
         
        </StreetsOnlineTopPanelRightPart>
      </StreetsOnlineTopPanel>

      {reviewsProps && (reviewsProps)}
    </StreetsOnlineWrapper>
  );
};

export default CustomizedStreetsOnlineTemplate;
