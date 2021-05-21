export type CanvasOptions = {
  width: number;
  height: number;
  font: string;
};

export type TimelineOptions = {
  startTime?: Date;
  minuteDashes: number;
  secondsDashes: number;
  canvasOptions?: CanvasOptions;
};

export type TimelineMouseEvent = {
  x: number;
  time: Date;
};

export type TimelineMouseMoveEvent = TimelineMouseEvent & {
  deltaX: number;
};

export interface TimelineEvents {
  inited: () => void;
  mouseMovingStarted: (args: TimelineMouseEvent) => void;
  mouseMovingStopped: (args: TimelineMouseEvent) => void;
  mousePressedMoving: (args: TimelineMouseMoveEvent) => void;
  mouseMoving: (args: TimelineMouseEvent) => void;
  click: (args: TimelineMouseEvent) => void;
  started: () => void;
  paused: () => void;
  played: () => void;
  tick: () => void;
  secondTick: () => void;
}
