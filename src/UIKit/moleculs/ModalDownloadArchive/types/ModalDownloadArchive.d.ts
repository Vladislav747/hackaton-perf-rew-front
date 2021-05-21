interface ModalDownloadArchiveProps {
  title: string;
  onClose: any;
  isOpen: boolean;
  liveUrl: string;
  cameraId: number;
  setDowloadTimeArray: Function;
  orderVideoFromServer: Function;
  loadingVideoStatus: boolean;
  selectedDateTime: number;
  cameraName: string;
}
