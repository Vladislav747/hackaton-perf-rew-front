type viewSelectPayloadData = {
  type: string;
  payload: {
    newViewType: string;
  };
};

type gridCalculationPayloadData = {
  type: string;
  payload: {
    num: number;
  };
};

type activeCameraId = {
  type: string;
  payload: {
    id: number;
  };
};

interface validatedObject {
  NAME: string;
  HLS: string;
  HDSNAPSHOT: string;
  LOSSYSNAPSHOT: string;
  VALID: boolean;
  ID: string;
}
