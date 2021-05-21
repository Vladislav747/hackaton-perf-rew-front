import React, { useState, useEffect, useRef, createContext } from "react";

import screenfull from "screenfull";
import _ from "lodash";
import { AutoSizer, WindowScroller } from "react-virtualized";
import { findDOMNode } from "react-dom";

import CustomizedStreetsOnlineTemplate from "../CustomizedStreetsOnline";
import FCamListNew from "../../containers/FCamListNew";
import GridTypeSelectorBar from "../GridTypeSelectorBar";
import SortBar from "../SortBar";
import ControlPanel from "../ControlPanel";
import CamsFunctionalList from "../CamsFunctionalList";
import CamerasGrid from "../CamerasGrid";
import DeleteAllContainer from "../DeleteAllComponent";

import { getSortSettings } from "../../../helpers/streetsOnlineElements/serviceFunctions";
import LoadingList from "../../../helpers/streetsOnlineElements/camerasLoading";
import { viewTypes } from "../../../modules/streetsOnline/schema";
import { breakpoints } from "../../../helpers/styled-components/";

import FullscreenCarusel from "../../containers/FullscreenCarusel";

import { FullscreenWrapper, MainCamerasContainer } from "./styled-components";

/* пока не переписано на ts */
const GridTypeSelectorBarTs: any = GridTypeSelectorBar;
const SortBarTs: any = SortBar;
const CamsFunctionalListTs: any = CamsFunctionalList;
const CamerasGridTs: any = CamerasGrid;

interface ModalContextProps {
  modalCameraId: number | null;
  modalCameraName: string | null;
  showModal: boolean;
  liveUrl: string;
}

const initModalContext: ModalContextProps = {
  modalCameraId: null,
  modalCameraName: null,
  showModal: false,
  liveUrl: "",
};
export const ModalContext: any = createContext(initModalContext);

const StreetsOnline = (props: any) => {
  const {
    currentSelectedCamerasProps,
    currentSortFunctionName,
    changeViewType,
    currentView: currentViewProps,
    changeSortType,
    currentSortType,
    currentShowSceletonState,
    addPlayingId,
    currentPlayngIds,
    fullscreenMode,
    setCalculatedNum,
    calculatedNum,
    setPlayAll,
    playAllState,
    cleanAllProps,
  } = props;

  const [activatePagination, setActivatePagination] = useState<Boolean>(false);
  const [partsPassed, setPartsPassed] = useState<number>(0);
  const [fullscreen, setFullscreen] = useState<Boolean>(false);
  const [mountState, setMountState] = useState<Boolean>(false);

  const selfPartsPassed = useRef<HTMLInputElement>(null);
  // @ts-ignore-start
  selfPartsPassed.current = { partsPassed, setPartsPassed };
  const camerasRef = useRef(null);

  const validatedSortTypes = getSortSettings();

  useEffect(() => {
    if (fullscreen && mountState)
      //@ts-ignore
      screenfull.request(findDOMNode(camerasRef.current));
  }, [fullscreen, mountState]);

  const onM = () => {
    setMountState(true);
  };

  return fullscreen ? (
    <FullscreenWrapper ref={camerasRef} id="carusel">
      <FullscreenCarusel
        elementsGridNum={calculatedNum}
        rawCamerasList={currentSelectedCamerasProps}
        onM={onM}
      />
    </FullscreenWrapper>
  ) : (
    <CustomizedStreetsOnlineTemplate>
      {{
        //@ts-ignore
        camerasSelector: <FCamListNew />,
        gridTypeSelector: currentShowSceletonState ? null : (
          <GridTypeSelectorBarTs
            currentGridType={currentViewProps}
            onSelectView={(viewTypeName: string) => {
              changeViewType(viewTypeName);
            }}
            setCalculatedNum={(elemInRow: number) =>
              setCalculatedNum(elemInRow)
            }
            calculatedNum={calculatedNum}
          />
        ),
        sortBar: currentShowSceletonState ? null : (
          <SortBarTs
            currentSortFunctionName={currentSortFunctionName}
            sortTypesObject={validatedSortTypes}
            currentSortType={currentSortType}
            onChangeSortType={(newSortTypeName: string, type: number) => {
              changeSortType(newSortTypeName, type);
            }}
          />
        ),
        additionalControll: currentShowSceletonState ? null : (
          <ControlPanel
            className="addition-control-panel"
            // @ts-ignore-start
            showMode={
              currentViewProps === viewTypes.CALCULATOR ? "true" : undefined
            }
            startRotate={() => {
              setActivatePagination(!activatePagination);
            }}
            changePlayAll={() => {
              setPlayAll(!playAllState);
            }}
            fullscreen={() => {
              setFullscreen(true);
              // @ts-ignore-start
              screenfull.on("change", () => {
                // @ts-ignore-start
                if (!screenfull.isFullscreen) {
                  setFullscreen(false);
                }
              });
            }}
          />
        ),
        deleteAllControl: <DeleteAllContainer cleanAll={cleanAllProps} />,
        cameras: (
          //@ts-ignore
          <WindowScroller scrollElement={window}>
            {({
              height,
              isScrolling,
              registerChild,
              onChildScroll,
              scrollTop,
            }) => (
              <MainCamerasContainer id="window-scroll">
                <AutoSizer disableHeight>
                  {({ width }) => {
                    if (currentShowSceletonState)
                      return <LoadingList sizeParams={{ height, width }} />;

                    if (
                      width > breakpoints.lg &&
                      (currentViewProps == viewTypes.TABLET ||
                        currentViewProps == viewTypes.MOBILE)
                    ) {
                      changeViewType(viewTypes.FOUR_PANEL);
                    } else if (
                      width < breakpoints.xl &&
                      currentViewProps == viewTypes.BIG_PANEL
                    ) {
                      changeViewType(viewTypes.FOUR_PANEL);
                    } else if (
                      width <= breakpoints.xl &&
                      width > breakpoints.lg &&
                      currentViewProps != viewTypes.FOUR_PANEL &&
                      currentViewProps != viewTypes.NINE_PANEL
                    ) {
                      changeViewType(viewTypes.FOUR_PANEL);
                    } else if (
                      width <= breakpoints.lg &&
                      width > breakpoints.sm &&
                      currentViewProps != viewTypes.TABLET
                    ) {
                      changeViewType(viewTypes.TABLET);
                    } else if (
                      width <= breakpoints.sm &&
                      currentViewProps != viewTypes.MOBILE
                    ) {
                      changeViewType(viewTypes.MOBILE);
                    }
                    return (() => {
                      switch (currentViewProps) {
                        case viewTypes.LIST_PANEL:
                          return (
                            <CamsFunctionalListTs
                              selectedCamerasList={currentSelectedCamerasProps}
                              sizeParams={{
                                height,
                                width,
                              }}
                              onScroll={onChildScroll}
                              scrollTop={scrollTop}
                            />
                          );
                        default:
                          return (
                            <div ref={registerChild}>
                              <CamerasGridTs
                                activatePagination={activatePagination}
                                fullscreen={fullscreen}
                                fullscreenMode={fullscreenMode}
                                addPlayingId={addPlayingId}
                                playngIds={currentPlayngIds}
                                isScrolling={isScrolling}
                                currentGridType={currentViewProps}
                                selectedCamerasList={
                                  currentSelectedCamerasProps
                                }
                                currentSortFunctionName={
                                  currentSortFunctionName
                                }
                                currentSortType={currentSortType}
                                sizeParams={{
                                  height,
                                  width,
                                }}
                                onChildScroll={onChildScroll}
                                scrollTop={scrollTop}
                                calculatedNum={calculatedNum}
                              />
                            </div>
                          );
                      }
                    })();
                  }}
                </AutoSizer>
              </MainCamerasContainer>
            )}
          </WindowScroller>
        ),
      }}
    </CustomizedStreetsOnlineTemplate>
  );
};

export default StreetsOnline;
