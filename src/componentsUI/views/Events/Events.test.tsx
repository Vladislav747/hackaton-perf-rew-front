import React from "react";
import { shallow, mount } from "enzyme";
import Events from "./Events";

const mockProps = {
  eventsNotFoundOrFailed: false,
  cameraEvents: [],
  cameraId: 1,
  eventsLoadingInProgress: false,
  setUserSeletedTimestamp: jest.fn(),
  updateCameraEvents: jest.fn(),
  cleanCameraEvents: jest.fn(),
}

describe("<Events />", () => {
  const wrap = (props = mockProps) => shallow(<Events {...props} />);
  const wrapMount = (props = mockProps) => mount(<Events {...props} />);
  it("no test...", () => {
    expect(true).toEqual(true);
  });
});
