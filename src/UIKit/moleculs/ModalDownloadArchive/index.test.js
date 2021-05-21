import React from "react";
import { shallow, mount } from "enzyme";
import { addMinutes, subMinutes } from "date-fns";

import ModalDownloadArchive from ".";

describe("<ModalDownloadArchive />", () => {
  const propsInitial = {
    title: "Скачивание архива",
    loadingVideoStatus: false,
    selectedDateTime: 1611350478907,
    cameraName: "Аргаяш, Гагарина - Ленина",
  };

  const wrapperShallow = shallow(
    <ModalDownloadArchive
      title={propsInitial.title}
      cameraName={propsInitial.cameraName}
      selectedDateTime={propsInitial.selectedDateTime}
    />
  );

  const wrapperMount = mount(
    <ModalDownloadArchive
      title={propsInitial.title}
      cameraName={propsInitial.cameraName}
      selectedDateTime={propsInitial.selectedDateTime}
    />
  );

  test("propsInitial.cameraName renders in div with class ('modal-download-archive-inner__cameraName')", async () => {
    const cameraNameDiv = wrapperShallow.find(
      ".modal-download-archive-inner__cameraName"
    );

    expect(cameraNameDiv.text()).toEqual(propsInitial.cameraName);
  });

  test("propsInitial.title renders in div with class ('modal-download-archive__title')", async () => {
    const titleDiv = wrapperShallow.find(".modal-download-archive__title");

    expect(titleDiv.text()).toEqual(propsInitial.title);
  });

  test("propsInitial.loadingVideoStatus renders in btn with class ('modal-download-archive__btn')", async () => {
    const modalBtn = wrapperShallow
      .find(".modal-download-archive__btn")
      .prop("disabled");

    expect(modalBtn).toEqual(propsInitial.loadingVideoStatus);
  });

  test("При рендеринге страницы и передаче времени из propsInitial.selectedDateTimeProps мы проверяем что изначальный промежуток ставится 15 мин", async () => {
    const startTimeDatepickerDiv = wrapperShallow
      .find(".modal-download-archive__start-time")
      .prop("selected");
    const endTimeDatepickerDiv = wrapperShallow
      .find(".modal-download-archive__end-time")
      .prop("selected");

    const resultStartTime = subMinutes(propsInitial.selectedDateTime, 15);
    const resultEndTime = addMinutes(propsInitial.selectedDateTime, 0);

    //TODO: Не убирать
    //console.log(wrapperMount.debug()); // View  rendered component

    expect(startTimeDatepickerDiv).toEqual(resultStartTime);
    expect(endTimeDatepickerDiv).toEqual(resultEndTime);
  });
});
