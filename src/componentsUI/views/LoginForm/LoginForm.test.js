import React from "react";
import { shallow, mount } from "enzyme";
import LoginForm from "./LoginForm";

describe("<LoginForm view Component/>", () => {
  const loginProps = { isAuthorized: true };
  const wrap = (loginProps) => shallow(<LoginForm {...loginProps} />);
  const wrapMount = (loginProps) => mount(<LoginForm {...loginProps} />);

  //Проверяем что есть поле ввода с id username
  it("LoginForm has input with id username and it only one - when you Authorized", () => {
    expect(wrap().find("#username")).toHaveLength(1);
  });

  //Проверяем что есть поле ввода с id password
  it("LoginForm has input with id password and it only one - when you Authorized", () => {
    expect(wrap().find("#password")).toHaveLength(1);
  });
});
