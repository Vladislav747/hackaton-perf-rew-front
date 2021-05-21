interface PlayerControlsProps {
  isPlaying: boolean;
  togglePlaying: () => void;
  isHd: boolean;
  toggleHd: () => void;
  isPip: boolean;
  canPip: boolean;
  togglePip: () => void;
  refForFullscreen: any;
  addCameraToActive: (string) => void;
  removeCameraFromActive: (string) => void;
  cameraId: string;
  canHide: boolean = false;
  canTimeOutHide: boolean;
  timeoutHide: number = 8000;
}
