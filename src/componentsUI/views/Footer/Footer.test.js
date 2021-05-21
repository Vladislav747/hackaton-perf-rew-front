import React from "react";
import { shallow, mount } from "enzyme";
import Footer from "./Footer";

describe("<Footer component />", () => {
  const wrap = (props = {}) => shallow(<Footer {...props} />);
  const wrapMount = (props = {}) => mount(<Footer {...props} />);

  it("render copyright", () => {
    expect(
      wrapMount()
        .find(".copyright")
        .first()
        .text()
    ).toMatch(/© Видеонаблюдение Интерсвязь/);
  });

  it("render copyright current year", () => {
    const currYear = "" + new Date().getFullYear();
    expect(
      wrapMount()
        .find(".copyright")
        .first()
        .text()
    ).toMatch(currYear);
  });

  it("contact 8 800 2000 747 ", () => {
    expect(
      wrapMount()
        .find(".contact-container")
        .first()
        .text()
    ).toMatch(/8 800 2000 747/);
  });

  it("render social-container__vk-icon", () => {
    expect(
      wrapMount()
        .find(".social-container__vk-icon")
        .first()
    ).toHaveLength(1);
  });
});
