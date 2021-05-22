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
  name: string;
  phone: string;
};

interface authCompleteWorkerType {
  payload: authCompleteWorkerTypePayload;
}

type authCompleteWorkerTypePayload = {
  data: dataTypeAuth;
};

type dataTypeAuth = {
  token:string;
}
