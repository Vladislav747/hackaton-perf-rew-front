import React from "react";
import { shallow, mount } from "enzyme";

import EzHlsPlayer from ".";

describe("<EzHlsPlayer />", () => {
  const propsInitial = {
    url: "http://cams-devtest3.is74.ru/live/cam9258-master.m3u8",
    playing: true,
    muted: false,
    playsinline: false,
    poster: "",
    volume: "0.5",
    quality: "HD", //"LD"
    playbackRate: 1,
    pip: false,
    onReady: () => {},
    onBuffer: () => {},
    onPlay: () => {},
    onBufferEnd: () => {},
    onPause: () => {},
    onEnded: () => {},
    onError: () => {},
    onEnablePIP: () => {},
    onDisablePIP: () => {},
    onChangeQuality: () => {},
  };

  const setUpShallow = (props = propsInitial) =>
    shallow(<EzHlsPlayer url={props.url} />);

  const component = setUpShallow();
  const instance = component.instance();

  const setUpMount = (props = propsInitial) =>
    mount(<EzHlsPlayer url={props.url} />);

  //FIXME: Попытался просто проверить класс - пишет что нет экземпляра player - пока не знаю как это решить
  test("className", t => {
    t.true(setUpShallow().hasClass("react-player"));
  });
});
