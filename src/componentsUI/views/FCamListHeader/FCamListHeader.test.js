import React from "react";
import { shallow, mount } from "enzyme";

import FCamListHeader from "./FCamListHeader";

describe("<FCamListHeader />", () => {
  const propsInitial = {
    name: "Аргаяш",
    parentObjectId: "",
    fullSelectedGroups: false,
    isSelectable: true,
    id: "16_1091",
    cleanAll: () => {},
  };

  const setUp = (
    props = {
      name: "",
      parentObjectId: "0_16",
      id: "16_1091",
      fullSelectedGroups: false,
      isSelectable: true,
      setActiveObject: null,
      cleanAll: null,
    }
  ) =>
    shallow(
      <FCamListHeader
        name={props.name}
        parentObjectId={props.parentObjectId}
        fullSelectedGroups={props.fullSelectedGroups}
        id={props.id}
        isSelectable={props.isSelectable}
        setActiveObject={props.setActiveObject}
        cleanAll={props.cleanAll}
      />
    );

  const setUpMount = (
    props = {
      name: "",
      parentObjectId: "0_16",
      id: "16_1091",
      fullSelectedGroups: false,
      isSelectable: true,
      setActiveObject: null,
      cleanAll: null,
    }
  ) =>
    mount(
      <FCamListHeader
        name={props.name}
        parentObjectId={props.parentObjectId}
        fullSelectedGroups={props.fullSelectedGroups}
        id={props.id}
        isSelectable={props.isSelectable}
        setActiveObject={props.setActiveObject}
        cleanAll={props.cleanAll}
      />
    );

  const component = setUp();
  const instance = component.instance();

  test("Значение nameProps попадает в заголовок h4 компонента Heading class ('cam-list-header__arrow-left-icon')", async () => {
    //Находим заголовок h4
    const divHeader = setUpMount({ name: propsInitial.name }).find("h4");

    expect(divHeader.text()).toEqual(propsInitial.name);
  });

  test("Если значение nameProps не передается либо undefined то в заголовок компонента Heading h4 class ('cam-list-header__arrow-left-icon') дефолтное значение выбрать камеру", async () => {
    const DEFAULT_LIST_TITLE = "Выбрать камеру";
    const divHeader = setUpMount().find("h4");

    expect(divHeader.text()).toEqual(DEFAULT_LIST_TITLE);
  });

  // test("Если  передано fullSelectedGroupProps false то checkbox не выбран", async () => {
  //   const iconsContainerCheckbox = setUpMount({ fullSelectedGroups: true })
  //     .find(".icons-container__checkbox")
  //     .first()
  //     .prop("checked");
  //   expect(iconsContainerCheckbox).toEqual(true);
  // });

  // test("Если  передано fullSelectedGroupProps false то checkbox не выбран", async () => {
  //   const iconsContainerCheckbox = setUpMount({ fullSelectedGroups: false })
  //     .find(".icons-container__checkbox")
  //     .first()
  //     .prop("checked");
  //   expect(iconsContainerCheckbox).toEqual(false);
  // });

  // test("Если не передано idProps то checkbox не выбран", async () => {
  //   const iconsContainerCheckbox = setUpMount({
  //     id: "",
  //     isSelectable: true,
  //   })
  //     .find(".icons-container__checkbox")
  //     .first()
  //     .prop("checked");
  //   expect(iconsContainerCheckbox).toEqual(false);
  // });

  test("Если не передано isSelectableProps то checkbox не появиться (не будет рендериться)", async () => {
    const iconsContainerCheckbox = setUpMount({ isSelectable: false }).find(
      ".icons-container__checkbox"
    );
    expect(iconsContainerCheckbox).toHaveLength(0);
  });

  test("Если id undefined то стрелка назад не отрисовывается", async () => {
    const divCamListHeaderIconContainer = setUpMount({
      parentObjectId: undefined,
    }).find(".cam-list-header__icon-container");
    expect(divCamListHeaderIconContainer).toHaveLength(0);
  });

  //   test("При клике на стрелку назад вызывается ф-ция 1 раз возврата назад", async () => {
  //     const mockArrowBackFunc = jest.fn();
  //     const divHeader = setUpMount({
  //       setActiveObject: () => {},
  //       parentObjectId: "0_16",
  //     })
  //       .find(".cam-list-header__icon-container")
  //       .first()
  //       .simulate("click");

  //     expect(mockArrowBackFunc).toHaveBeenCalled();
  //   });

  test("При клике на иконку корзины вызывается ф-ция 1 раз удалить все", async () => {
    const mockDeleteAllFunc = jest.fn();
    const divHeader = setUp({
      cleanAll: mockDeleteAllFunc,
      parentObjectId: "0_16",
    })
      .find(".icon-container__garbage-icon")
      .first()
      .simulate("click");

    expect(mockDeleteAllFunc).toHaveBeenCalled();
  });
});
