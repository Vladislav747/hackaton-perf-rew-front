interface PlayerBoxWithStateProps {
  url: string;
  poster: string;
  id: string;
  authorized: boolean;
  playAllState: string[];
  playStateIds: string[];
  cameraName: string;
  hdAllStatus: boolean;
  token: string;
  showUI: boolean;
  playNow: any;
  fsId: any;
  cleanOneCamera: (string) => void;
  addCameraToActive: (string) => void;
  activePlayCameras: any;
  removeCameraFromActive: (string) => void;
  changeCustomGroup: (string) => void;
  addCameraToFavourites: (string) => void;
  deleteCameraFromFavourites: (string) => void;
  favouritesCameras: string[];
}
