import React from "react";
import { shallow, mount } from "enzyme";

import FCamList from "./FCamList";

describe("<FCamList />", () => {
  const propsInitial = {
    list: [
      {
        id: "1091_9258",
        RELATION_OBJECT: "CAMERA",
        children: [],
        parentId: "16_1091",
        isLoaded: false,
        relationId: 9258,
        relation: {
          ID: 9258,
          HLS: "/live/cam9258-master.m3u8",
          NAME: "Аргаяш, Гагарина - Ленина",
          OBJECT: "CAMERA",
          REALTIME_HLS: "/live/cam9258-realtime-master.m3u8",
        },
      },
      {
        id: "1091_9307",
        RELATION_OBJECT: "CAMERA",
        children: [],
        parentId: "16_1091",
        isLoaded: false,
        relationId: 9307,
        relation: {
          ID: 9307,
          HLS: "/live/cam9307-master.m3u8",
          NAME: "Аргаяш, Мичурина - Октябрьская",
          OBJECT: "CAMERA",
          REALTIME_HLS: "/live/cam9307-realtime-master.m3u8",
        },
      },
      {
        id: "1091_9259",
        RELATION_OBJECT: "CAMERA",
        children: [],
        parentId: "16_1091",
        isLoaded: false,
        relationId: 9259,
        relation: {
          ID: 9259,
          HLS: "/live/cam9259-master.m3u8",
          NAME: "Аргаяш, ул. Комсомольская",
          OBJECT: "CAMERA",
          REALTIME_HLS: "/live/cam9259-realtime-master.m3u8",
        },
      },
    ],
    isInit: true,
    isLoading: false,
    activeObjectName: "Аргаяш",
    //setActiveObjectId: setActiveObjectIdProps,
    activeObjectId: "16_1091",
    parentObjectId: "0_16",
    parentIsSelectable: true,
    //toggleSelected: toggleSelectedProps,  // console.log через Dispatch actions
    selectedObjects: ["1091_9258", "1091_9307"], // console.log протестироваить также случай когда нет выделенных объектов
    fullSelectedGroups: [],
    //initList: initListProps, // console.log через Dispatch actions
    //setCamerasReadyState: setCamerasReadyStateProps, // console.log через Dispatch actions
    searchString: "",
    //changeSearchString: changeSearchStringProps,  // console.log через Dispatch actions в компонент FCamListSearch
    //cleanAll: cleanAllProps,
    loadingObjects: ["1091_9258", "1091_9307", "1091_9259"],
    failedObjects: [],
  };

  const wrapperShallow = shallow(
    <FCamList
      list={propsInitial.list}
      isInit={propsInitial.isInit}
      isLoading={propsInitial.isLoading}
      activeObjectName={propsInitial.activeObjectName}
      activeObjectId={propsInitial.activeObjectId}
      parentObjectId={propsInitial.parentObjectId}
      parentIsSelectable={propsInitial.parentIsSelectable}
      //toggleSelected={propsInitial.toggleSelected}
      selectedObjects={propsInitial.selectedObjects}
      fullSelectedGroups={propsInitial.fullSelectedGroups}
      //initList={propsInitial.initList}
      //setCamerasReadyState={propsInitial.setCamerasReadyState}
      searchString={propsInitial.searchString}
      //changeSearchString={propsInitial.changeSearchString}
      //cleanAll={propsInitial.cleanAll}
      loadingObjects={propsInitial.loadingObjects}
      failedObjects={propsInitial.failedObjects}
    />
  );

  const setUp = () =>
    shallow(
      <FCamList
        list={propsInitial.list}
        isInit={propsInitial.isInit}
        isLoading={propsInitial.isLoading}
        activeObjectName={propsInitial.activeObjectName}
        activeObjectId={propsInitial.activeObjectId}
        parentObjectId={propsInitial.parentObjectId}
        parentIsSelectable={propsInitial.parentIsSelectable}
        //toggleSelected={propsInitial.toggleSelected}
        selectedObjects={propsInitial.selectedObjects}
        fullSelectedGroups={propsInitial.fullSelectedGroups}
        //initList={propsInitial.initList}
        //setCamerasReadyState={propsInitial.setCamerasReadyState}
        searchString={propsInitial.searchString}
        //changeSearchString={propsInitial.changeSearchString}
        //cleanAll={propsInitial.cleanAll}
        loadingObjects={propsInitial.loadingObjects}
        failedObjects={propsInitial.failedObjects}
      />
    );

  const component = setUp();
  const instance = component.instance();

  const wrapperMount = mount(
    <FCamList
      list={propsInitial.list}
      isInit={propsInitial.isInit}
      isLoading={propsInitial.isLoading}
      activeObjectName={propsInitial.activeObjectName}
      activeObjectId={propsInitial.activeObjectId}
      parentObjectId={propsInitial.parentObjectId}
      parentIsSelectable={propsInitial.parentIsSelectable}
      //toggleSelected={propsInitial.toggleSelected}
      selectedObjects={propsInitial.selectedObjects}
      fullSelectedGroups={propsInitial.fullSelectedGroups}
      //initList={propsInitial.initList}
      //setCamerasReadyState={propsInitial.setCamerasReadyState}
      searchString={propsInitial.searchString}
      //changeSearchString={propsInitial.changeSearchString}
      //cleanAll={propsInitial.cleanAll}
      loadingObjects={propsInitial.loadingObjects}
      failedObjects={propsInitial.failedObjects}
    />
  );

  test(" Если мы нажимаем клик по ссылке то открывается модальное окно", async () => {
    //Эмулируем клик по ссылку для открытия модального окна
    wrapperShallow.find(".cameras-list").simulate("click");
    //Дождемся обновления
    wrapperShallow.update();

    //Находим модальное окно
    const divModal = wrapperShallow.find(".cameras-list__modal").prop("isOpen");

    expect(divModal).toBe(true);
  });

  //TODO: Прошу пока не убирать
  //   test("Проверяем что обновляется state", async () => {
  //     const setIsOpenState = jest.fn();

  //     wrapperShallow.find(".cameras-list").simulate("click");
  //     const handleClick = jest.spyOn(React, "useState");
  //     handleClick.mockImplementation(isOpenState => [
  //       isOpenState,
  //       setIsOpenState,
  //     ]);
  //     //Дождемся обновления
  //     wrapperShallow.update();

  //     expect(setIsOpenState).toBe(true);
  //   });

  //TODO: Прошу пока не убирать
  //   test(" Если мы передаем 3 id камер то они загрузятся в react-visualized как 3 элемента", async () => {
  //     //Эмулирвем клик по ссылку для открытия модального окна
  //     wrapperShallow.find(".cameras-list").simulate("click");
  //     //Дождемся обновления
  //     wrapperShallow.update();

  //     const divCamListItem = wrapperShallow.find(".cam-list-item");

  //     expect(divCamListItem).to.have.lengthOf(3);
  //   });

  //   test("Если выбраны все элементы в группе то в ", () => {
  //     const wrapperShallowlocal = shallow(
  //       <FCamList
  //         list={propsInitial.list}
  //         isInit={propsInitial.isInit}
  //         isLoading={propsInitial.isLoading}
  //         activeObjectName={propsInitial.activeObjectName}
  //         activeObjectId={propsInitial.activeObjectId}
  //         parentObjectId={propsInitial.parentObjectId}
  //         parentIsSelectable={propsInitial.parentIsSelectable}
  //         //toggleSelected={propsInitial.toggleSelected}
  //         selectedObjects={propsInitial.selectedObjects}
  //         fullSelectedGroups={[{ ID: 1091, NAME: "Аргаяш" }]}
  //       />
  //     );

  //     //Эмулируем клик по ссылку для открытия модального окна
  //     wrapperShallowlocal.find(".cameras-list").simulate("click");
  //     //Дождемся обновления
  //     wrapperShallowlocal.update();

  //     console.log(wrapperShallowlocal.debug());
  //     const headerCamerasList = wrapperShallowlocal
  //       .find(".cameras-list__header")
  //       .prop("isSelected");
  //     expect(headerCamerasList).toEqual(true);
  //   });
});
