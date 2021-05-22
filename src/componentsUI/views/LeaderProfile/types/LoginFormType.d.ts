interface LoginFormProps {
  handleSubmit: function;
  errorMsg: string;
  authInProgress: boolean;
  isAuthorized: boolean;
  location: locationPropsType;
  frontendIsReady: boolean;
}

interface locationPropsType {
  state?: statePropertyInLocationPropsType;
  pathname?: string;
}

interface statePropertyInLocationPropsType {
  from?: formPropertyInStateType;
}

interface formPropertyInStateType {
  pathname?: object;
}
