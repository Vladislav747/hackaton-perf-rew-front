interface cameraEvent {
  //Идентификатор события
  ID: number;

  //Дата начала события
  //Допустимые значения: "dd.mm.yyyy H:i:s"
  START_DATE: Date;

  //Дата конца события
  //Допустимые значения: "dd.mm.yyyy H:i:s"
  END_DATE: Date;

  //Тип события (1 - просто движение)
  TYPE: number;
}

interface EventsProps {
  eventsNotFoundOrFailed: boolean;
  cameraEvents: cameraEvent[];
  eventsLoadingInProgress: boolean;
  setUserSeletedTimestamp: Function;
  cameraId: number;
  updateCameraEvents: Function;
  cleanCameraEvents: Function;
}
