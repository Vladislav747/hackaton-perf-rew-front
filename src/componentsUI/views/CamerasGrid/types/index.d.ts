interface cellRendererInputProps {
  index: number;
  key: string;
  style: any;
}

interface CameraViewProps {
  key: string;
  style: any;
  validatedCameraOject: validatedCameraOjectType;
}

type validatedCameraOjectType = {
  VALID: boolean;
  HLS: string;
  LOSSYSNAPSHOT: string;
  NAME: string;
  ID: any;
};

interface GridInRowWrapperProps {
  index: number;
  viewType: string;
  calculatedNum?: number;
}

interface CamerasGridFabricProps {
  currentGridType: string;
  currentSortFunctionName: string;
  currentSortType: string;
  selectedCamerasList: any[];
  sizeParams: any;
  onChildScroll: Function;
  scrollToIndex: Function;
  registerChild: any;
  setCurrenMaketSize: number;
  calculatedNum: number;
  setRowOnScreen: Function;
  height: number;
  width: number;
  isScrolling: Function;
  scrollTop: Function;
}

type lazyListRef = {
  recomputeRowHeights(): void;
  forceUpdate(): void;
};
