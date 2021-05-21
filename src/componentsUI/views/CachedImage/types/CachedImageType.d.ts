interface CachedImageTypes {
  url: string;
  setPlayerMode: Function;
  authorized: boolean;
  token: string;
  idCachedImage: string;
  addCameraToActive: Function;
  cameraId: number;
  isCameraInFavourites: boolean;
  addCameraToFavourites: (number) => void;
  deleteCameraFromFavourites: (number) => void;
}

interface imgDataStateType {
  objSource: string;
  lastTimestamp: string;
  lastUrl: string;
  source: string;
  lastTry?: number;
  url?: string;
}
