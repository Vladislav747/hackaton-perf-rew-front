import React from "react";
import { shallow, act } from "enzyme";

var _ = require("lodash");

import FCamListSearch from "./FCamListSearch";

describe("<FCamListSearch />", () => {
  const propsInitial = {
    searchString: "Арг",
  };

  const wrapperShallow = shallow(
    <FCamListSearch searchString={propsInitial.searchString} />
  );

  const setUp = () =>
    shallow(
      <FCamListSearch
        searchString={propsInitial.searchString}
        changeSearchString={propsInitial.changeSearchString}
      />
    );

  const component = setUp();
  const instance = component.instance();

  test("Значение searchStringProps попадает в input компонента в свойство value", async () => {
    //Находим input поиска
    const inputSearch = wrapperShallow
      .find(".search-container__input")
      .prop("defaultValue");

    expect(inputSearch).toEqual(propsInitial.searchString);
  });

  // test("При нажатии на крестик строка очищается в input (При этом изначальная строка не пустая)", async () => {
  //   const mockChangeSearchString = jest.fn();

  //   const wrapperShallowLocal = shallow(
  //     <FCamListSearch
  //       searchString={propsInitial.searchString}
  //       changeSearchString={mockChangeSearchString}
  //     />
  //   );

  //   wrapperShallowLocal
  //     .find(".search-container__clear-icon-container")
  //     .simulate("click");
  //   //Дождемся обновления
  //   wrapperShallowLocal.update();

  //   const inputSearch = wrapperShallowLocal
  //     .find(".search-container__input")
  //     .prop("value");

  //   expect(inputSearch).toEqual("");
  // });

  //FIXME: тут нужен dispatch
  // test("При изменении текста вызывается changeSearchStringProps", async () => {
  //   jest.useFakeTimers();
  //   const mockChangeSearchString = jest.fn();
  //   const debouncedFunc = _.debounce(mockChangeSearchString, 550);

  //   const wrapperShallowLocal = shallow(
  //     <FCamListSearch
  //       searchString={propsInitial.searchString}
  //       changeSearchString={mockChangeSearchString}
  //     />
  //   );

  //   debouncedFunc();
  //   debouncedFunc();

  //   wrapperShallowLocal
  //     .find(".search-container__input")
  //     .simulate("change", { target: { value: "Челяб" } });

  //   //Дождемся обновления
  //   wrapperShallowLocal.update();

  //   // Fast-forward until all timers have been executed
  //   jest.runAllTimers();

  //   expect(mockChangeSearchString).toHaveBeenCalled();
  // });
});
