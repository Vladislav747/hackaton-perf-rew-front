interface FCamListProps {
  list: Array;
  isInit: Boolean;
  isLoading: Boolean;
  setCurrentGroup: (any) => void;
  toggleSelected: any; //console.log обрати внимание на тип
  selectedObjects: Array;
  initList: () => void;
  setCamerasReadyState: Function;
  loadingObjects: Array;
  failedObjects: Array;
}

type ItemContainerProps = {
  ref: any;
};

type SpinnerContainerProps = {
  width: string;
  height: string;
};
