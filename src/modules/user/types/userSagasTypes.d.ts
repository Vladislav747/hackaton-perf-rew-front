interface updateTokenWorkerType {
  payload: updateTokenWorkerTypePayload;
}

type updateTokenWorkerTypePayload = {
  token: string;
};

interface authStartWorkerType {
  payload: authStartWorkerTypePayload;
}

type authStartWorkerTypePayload = {
  username: string;
};

interface authCompleteWorkerType {
  payload: authCompleteWorkerTypePayload;
}

type authCompleteWorkerTypePayload = {
  data: object;
};
