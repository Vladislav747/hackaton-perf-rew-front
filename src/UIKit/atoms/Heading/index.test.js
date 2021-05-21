import React from "react";
import { shallow, mount } from "enzyme";
import Heading from ".";

const defaultProps = { palette: "grayscale", level: 4 };

describe("<Heading component />", () => {
  const wrap = (props = defaultProps) => shallow(<Heading {...props} />);
  const wrapMount = (props = defaultProps) => mount(<Heading {...props} />);

  it("renders children when passed in", () => {
    const wrapper = wrap({ children: "test" });
    expect(wrapper.contains("test")).toBe(true);
  });

  it("renders props when passed in", () => {
    const wrapper = wrap({ id: "foo" });
    expect(wrapper.find({ id: "foo" })).toHaveLength(1);
  });

  it("renders h4 by default", () => {
    const wrapper = wrapMount();
    expect(wrapper.find("h4")).toHaveLength(1);
  });

  it("renders hLevel when level is passed in", () => {
    const wrapper = wrapMount({ level: 2 });
    expect(wrapper.find("h2")).toHaveLength(1);
  });
});
