import React, { Component } from "react";
import styled from "styled-components";
import SuperCameraView from "../../../componentsUI/containers/SuperCameraView";
import FullscreenMenuControl from "./FullscreenMenuControl";
import screenfull from "screenfull";

interface GridWrapperProps {
  elementsGridNum: number;
}

const GridWrapper = styled.div<GridWrapperProps>`
  display: grid;
  grid-template-columns: ${(props: GridWrapperProps) =>
    `repeat(${props.elementsGridNum}, minmax(1px, 1fr))`};
  grid-template-rows: ${(props: GridWrapperProps) =>
    `repeat(${props.elementsGridNum}, minmax(1px, 1fr))`};
  grid-gap: 10px;
  width: 100vw;
  height: 100vh;
`;

interface FullscreenCaruselProps {
  elementsGridNum: number;
  rawCamerasList: Array<any>;
  onM: Function;
  caruselIsRunning: boolean;
  runCarusel: Function;
  stopCarusel: Function;
  hdAllStatus?: boolean;
  toggleHdAll?: Function;
  fsId?: number;
  setFsId?: Function;
}

interface FullscreenCaruselState {
  preparedSuperList: Array<any>;
  elementsGridNum: number;
  fullscreenOneCamera: boolean;
  currentPage: number;
  caruselIsRunning: boolean;
  maxPages: number;
  screenUpdateInSecondsState: number;
  prepareNext: boolean;
  prepareNextPageNum: number | null;
}

export default class FullscreenCarusel extends Component<
  FullscreenCaruselProps,
  FullscreenCaruselState
> {
  private caruselRotateInterval = 0;
  private DEFAULT_ROTATE_INTERVAL = 30; /* sec */
  private screenUpdateInSeconds = this.DEFAULT_ROTATE_INTERVAL;

  constructor(props: FullscreenCaruselProps) {
    super(props);

    const rawList = [...this.props.rawCamerasList];
    const listLen = rawList.length;
    const gridFullLenght =
      this.props.elementsGridNum * this.props.elementsGridNum;

    const camsLeft = listLen % gridFullLenght;
    const fullIteration =
      Math.floor(listLen / gridFullLenght) + (camsLeft ? 1 : 0);
    const listOfCamerasObjectsForSuper: any = [
      ...Array(gridFullLenght),
    ].map((e, i) => []);

    for (let i = 0; i < fullIteration; i++) {
      for (let k = 0; k < gridFullLenght; k++) {
        if (rawList.length)
          listOfCamerasObjectsForSuper[k].push(rawList.splice(0, 1)[0]);
        else listOfCamerasObjectsForSuper[k].push(null);
      }
    }
    const maxPages = listOfCamerasObjectsForSuper[0].length;

    this.state = {
      elementsGridNum: this.props.elementsGridNum,
      preparedSuperList: listOfCamerasObjectsForSuper,
      fullscreenOneCamera: false,
      currentPage: 0,
      caruselIsRunning: true,
      maxPages,
      screenUpdateInSecondsState: this.screenUpdateInSeconds,
      prepareNext: false,
      prepareNextPageNum: null,
    };
  }

  generateScreenUpdateInterval(interval: number) {
    clearInterval(this.caruselRotateInterval);
    return setInterval(() => {
      if (this.props.caruselIsRunning) {
        const currentPage =
          this.state.currentPage + 1 > this.state.maxPages
            ? 0
            : this.state.currentPage + 1;
        const nextPage =
          currentPage + 1 > this.state.maxPages ? 0 : currentPage + 1;
        this.setState({
          ...this.state,
          currentPage,
        });
        setTimeout(() => {
          this.setState({
            ...this.state,
            prepareNextPageNum: nextPage,
          });
        }, 1000 * (interval - 4));
      }
    }, interval * 1000);
  }

  componentDidMount() {
    this.props.onM();
    //@ts-ignore
    screenfull.on("change", () => this.props.setFsId(null));
    this.caruselRotateInterval = this.generateScreenUpdateInterval(
      this.screenUpdateInSeconds
    );
  }

  componentWillUnmount() {
    clearInterval(this.caruselRotateInterval);
  }

  componentDidUpdate(
    prevProps: FullscreenCaruselProps,
    prevState: FullscreenCaruselState
  ) {
    if (prevProps.fsId != this.props.fsId) {
      !this.props.fsId ? this.props.runCarusel!() : this.props.stopCarusel!();
    }
  }

  render() {
    return (
      <>
        <GridWrapper
          elementsGridNum={this.state.elementsGridNum}
          className="carusel-gridWrapper"
        >
          {this.state.preparedSuperList.map((e, i, a) => (
            <SuperCameraView
              key={`${i}_camera`}
              rawListOfCamerasForCarusel={e}
              currentPage={this.state.currentPage}
              prepareNextPageNum={this.state.prepareNextPageNum}
            />
          ))}
        </GridWrapper>

        <FullscreenMenuControl
          hdAllStatus={this.props.hdAllStatus}
          //@ts-ignore
          tHdAll={(hd: boolean) => this.props.toggleHdAll(hd)}
          //@ts-ignore
          exitFullscreen={() => {
            //@ts-ignore
            screenfull.exit();
            this.props.setFsId!(null);
          }}
          setRotateInterval={(interval: number) => {
            this.screenUpdateInSeconds = interval;
            this.caruselRotateInterval = this.generateScreenUpdateInterval(
              this.screenUpdateInSeconds
            );
            this.setState({
              ...this.state,
              screenUpdateInSecondsState: interval,
            });
          }}
          fsId={this.props.fsId}
          exitCameraFs={() => {
            if (this.props.setFsId) this.props.setFsId(null);
            this.props.runCarusel!();
          }}
          rotateInterval={this.state.screenUpdateInSecondsState}
        />
      </>
    );
  }
}
