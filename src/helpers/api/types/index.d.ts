interface requestForSagaWorkerProps {
  requestRouteName: string;
  requestProps?: any;
  requestTimeout?: number;
}

type WrapperIterator = (
  a: boolean
) => {
  next(): any;
  return(): requestForSagaWorkerResult;
  throw(e?: any): any;
};

interface requestForSagaWorkerResult {
  response: any;
  failed: boolean;
}

interface dataApiMethods {
  getGetGroup: Function;
  getCamerasLimitedInfo: Function;
  checkToken: Function;
  auth: Function;
  search: Function;
  getDownloadLink: Function;
  orderVideoForDownload: Function;
}

interface backendRequestForDownload {
  cameraId: string;
  startTimeAsString: string;
  stopTimeAsString?: string;
}

interface dataGetDownloadLink {
  jobId: string;
  cameraId: string;
}

interface dataDownloadVideo {
  downloadLink: string;
  name: string;
}

interface dataApiAuth {
  username: string;
  password: string;
}
