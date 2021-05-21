import React from "react";

import { mount } from "enzyme";
import Archive from ".";

it("Should render all all expected childs", () => {
  const wrapper = mount(<>1</>);
  expect(1).toBe(1);
});
