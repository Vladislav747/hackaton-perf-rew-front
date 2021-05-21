import React from "react";
import { shallow } from "enzyme";
import CustomTimeInputForDatepicker from ".";

describe("<CustomTimeInputForDatepicker />", () => {
  const propsInitial = {
    value: "01:04",
  };

  const wrapperShallow = shallow(
    <CustomTimeInputForDatepicker value={propsInitial.value} />
  );

  test("If we pass time '01-04' we will get '01' in hours input(class='custom-time__input-hours')", async () => {
    //TODO: Не убирать
    //console.log(wrapperMount.debug()); // View shallowly rendered component

    const inputHourVal = wrapperShallow
      .find(".custom-time__input-hours")
      .prop("value");

    const time = propsInitial.value.split(":");
    const hour = time[0];

    expect(inputHourVal).toEqual(hour);
  });

  test("If we pass time '01-04' we will get '04' in minutes input(class='custom-time__input-minutes')", async () => {
    const inputMinutesVal = wrapperShallow
      .find(".custom-time__input-minutes")
      .prop("value");
    const time = propsInitial.value.split(":");
    const minutes = time[1];

    expect(inputMinutesVal).toEqual(minutes);
  });
});
