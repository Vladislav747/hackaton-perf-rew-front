import React from "react";
import "jest-styled-components";
import { mount, shallow } from "enzyme";

import Timeline from "./Timeline";

describe("<Timeline />", () => {
  const propsInitial = {
    currentVideoTimestamp: 1611216517080,
    timelineInterval: { timelineEndPositionInMs: Date.now() },
    speedCoefficient: 1,
    fiveSecondBack: () => {},
    fiveSecondForward: () => {},
    setIsPlaying: () => {},
    isPlaying: true,
    setCurrentVideoTimestamp: Date.now(),
  };

  const wrapperShallow = shallow(
    <Timeline
      currentVideoTimestamp={propsInitial.cameraData}
      timelineInterval={propsInitial.timelineInterval}
      speedCoefficient={propsInitial.speedCoefficient}
      fiveSecondBack={propsInitial.fiveSecondBack}
      fiveSecondForward={propsInitial.fiveSecondForward}
      setIsPlaying={propsInitial.setIsPlaying}
      isPlaying={propsInitial.isPlaying}
      setCurrentVideoTimestamp={propsInitial.setCurrentVideoTimestamp}
    />
  );

  const wrapperMount = mount(
    <Timeline
      currentVideoTimestamp={propsInitial.cameraData}
      timelineInterval={propsInitial.timelineInterval}
      speedCoefficient={propsInitial.speedCoefficient}
      fiveSecondBack={propsInitial.fiveSecondBack}
      fiveSecondForward={propsInitial.fiveSecondForward}
      setIsPlaying={propsInitial.setIsPlaying}
      isPlaying={propsInitial.isPlaying}
      setCurrentVideoTimestamp={propsInitial.setCurrentVideoTimestamp}
    />
  );

  test("div with class timeline__canvas-wrap renders correctly in Timeline component ", async () => {
    //TODO: Не убирать
    //console.log(wrapperMount.debug()); // View shallowly rendered component
    const divTimeline = wrapperShallow.find(".timeline__canvas-wrap");

    expect(divTimeline).toHaveClassName("timeline__canvas-wrap");
  });
});
