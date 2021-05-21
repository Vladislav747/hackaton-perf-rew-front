interface mark {
  value: number;
}

interface TimelineComponentProps {
  timelineInterval: any;
  setSelectedTimestamp?: Function;
  setTimelineInAction?: Function;
  cursorLocked: boolean;
  cameraData?: cameraObj;
  loadedStart?: number;
  loadedEnd?: number;
  playerUrl?: string;
  speedCoefficient: number;
  fiveSecondBack: () => void;
  fiveSecondForward: () => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentVideoTimestamp: Function;
  timelineEndTimestamp: number;
  currentVideoTimestamp: number;
}

interface cameraObj {
  ID: number;
}
