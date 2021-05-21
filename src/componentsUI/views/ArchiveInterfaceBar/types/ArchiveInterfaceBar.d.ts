interface downlodedIntervalInfoAsTimestampInterface {
  start: number;
  end: number;
}

interface BtnProps {
  active: boolean | undefined;
  show?: boolean;
}

interface BottomPartProps {
  fsMode: boolean;
}

interface ArchiveInterfaceBarProps {
  fiveMinutesBack: function;
  fiveMinutesForward: function;
  fiveSecondBack: function;
  fiveSecondForward: function;
  timelineStartDate?: any;
  setTimelineStartDate?: function;
  selectedMinutes?: number;
  setSelectedTimeForDownload?: function;
  setSelectedDate?: function;
  setPlaying?: function;
  setFullscreen?: function;
  startLoad?: function;
  changeDate?: function;
  live?: boolean;
  setLive?: function;
  downloadMode?: boolean;
  setDownloadMode?: function;
  setHd?: function;
  hd?: boolean;
  videoTime?: number;
  selectedDateTime?: function;
  startLoad: function;
  screenshot?: function;
  selectedDate?: function;
  height?: string;
  width?: string;
  speedCoefficient?: any;
  setSpeedCoefficient?: function;
  playingStatus: boolean;
  setMute?: function;
  setVolume?: function;
  muteStatus?: boolean;
  volumeLevel?: string;
  canDownload?: boolean;
  exitFullscreen?: () => void;
  archiveDaysDuration: archiveDaysDurationType;
}

type archiveDaysDurationType = { days: number; startTime: any };
