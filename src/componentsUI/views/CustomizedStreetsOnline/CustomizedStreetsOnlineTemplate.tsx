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
    camerasSelector: camerasSelectorProps,
    gridTypeSelector: gridTypeSelectorProps,
    sortBar: sortBarProps,
    cameras: camerasProps,
    additionalControll: additionalControllProps,
    deleteAllControl: deleteAllControlProps,
    openCustomGroupsControl: openCustomGroupsControlProps,
  }}: StreetsOnlineCustomizedProps
) => {

  return (
    <StreetsOnlineWrapper className="streets-online__wrapper streets-online">
      <StreetsOnlineTopPanel className="streets-online__top-panel">
        <StreetsOnlineTopPanelLeftPart className="streets-online__left-part">
          {camerasSelectorProps || gridTypeSelectorProps ? (
            <>
              {camerasSelectorProps && (
                <StreetsOnlineTopPanelControl className="streets-online__modal-window-cameras">
                  {camerasSelectorProps}
                </StreetsOnlineTopPanelControl>
              )}
              {deleteAllControlProps && (
                <StreetsOnlineTopPanelControl className="streets-online__delete-all-container">
                  {deleteAllControlProps}
                </StreetsOnlineTopPanelControl>
              )}
              {openCustomGroupsControlProps && (
                <StreetsOnlineTopPanelControl className="streets-online__add-custom-group-container">
                  {openCustomGroupsControlProps}
                </StreetsOnlineTopPanelControl>
              )}

            </>
          ) : null}
        </StreetsOnlineTopPanelLeftPart>
        <StreetsOnlineTopPanelRightPart className="streets-online__right-part">
          {
            <SortRow className="sort-row">
              {sortBarProps && (sortBarProps)}
            </SortRow>
          }
          {gridTypeSelectorProps && (gridTypeSelectorProps)}
          {additionalControllProps && (additionalControllProps)}
        </StreetsOnlineTopPanelRightPart>
      </StreetsOnlineTopPanel>

      {camerasProps && (camerasProps)}
    </StreetsOnlineWrapper>
  );
};

export default CustomizedStreetsOnlineTemplate;
