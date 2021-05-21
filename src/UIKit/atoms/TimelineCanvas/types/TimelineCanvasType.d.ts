interface TimelineCanvasProps {
  userSelectedTimestamp: number;
  changeCommitted: (number) => void;
  speedCoefficient: number;
  maxTime: number;
}
