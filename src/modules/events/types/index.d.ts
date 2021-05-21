interface cameraEvent {
  //Идентификатор события
  ID: Number;

  //Дата начала события
  //Допустимые значения: "dd.mm.yyyy H:i:s"
  START_DATE: Date;

  //Дата конца события
  //Допустимые значения: "dd.mm.yyyy H:i:s"
  END_DATE: Date;

  //Тип события (1 - просто движение)
  TYPE: Number;
}

interface archiveReduxShema {
  eventsNotFoundOrFailed: boolean;
  cameraEvents: cameraEvent[];
  eventsLoadingInProgress: boolean;
  selectedEventsDate: Date;
}

interface eventsReduxAction {
  type: string;
  payload: any;
}
