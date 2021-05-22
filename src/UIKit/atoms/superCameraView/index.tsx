import React, { Component } from "react";
import { validateCameraObject } from "../../../helpers/streetsOnlineElements/serviceFunctions";
//import TrafficContainer from './TrafficContainer'
import styled from "styled-components";
//@ts-ignore
import { palette } from "styled-theme";
import { ReactComponent as FullScreenIcon } from "../../../assets/img/player/full_screen.svg";
import _ from "lodash";
import Player from "../../../componentsUI/views/Player";

const PlayerTs: any = Player;

const apiUrl = process.env.REACT_APP_BASE_STREAMS_URL;

interface FsContainerProps {
  show: boolean;
}

interface SuperCameraViewProps {
  rawListOfCamerasForCarusel: string[];
  currentPage: number;
  setFsId?: Function;
  fsId?: number | undefined;
  prepareNextPageNum: number | null;
}

interface SuperCameraViewState {
  showFirst: boolean;
  listOfUrls: any[];
  urlsCarusel: any;
  currentUrlIndex: number;
  preloadIndex: number;
  showFsIcon: boolean;
  hideFsIconTimeout: number;
  selfFullscreen: boolean;
  suspendFirst: boolean;
  suspendSecond: boolean;
  stopFirst: boolean;
  stopSecond: boolean;
}

interface VideoContainerProps {
  selfFullscreen: boolean;
}

const VideoContainer = styled.div<VideoContainerProps>`
  max-height: 100%;
  max-width: 100%;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  ${(props: VideoContainerProps) =>
    props.selfFullscreen
      ? `
        position: fixed;
        height: 100vh;
        width: 100vw;
        z-index: 100;
        top: 0;
        left: 0;
    `
      : ``}
`;

const OpenFullscreenControlsContainer = styled.div<FsContainerProps>`
  display: ${(props: FsContainerProps) => (props.show ? "block" : "none")};
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 100%;
  padding: 0;
  bottom: 0;
  z-index: 2;
  & svg {
    fill: white;
    stroke: none;
    cursor: pointer;
    width: 50%;
    height: 50%;
    left: 25%;
    top: 25%;
    position: absolute;
  }
`;

interface VideoContentWrapperProps {
  show: boolean;
}
const VideoContentWrapper = styled.div<VideoContentWrapperProps>`
  display: ${(props: VideoContentWrapperProps) =>
    props.show ? "flex" : "none"};
  flex-direction: column;
  max-height: 100%;
  height: 100%;
`;

const VideoPlayerWrapper = styled.div`
  display: flex;
  flex: 0 0 90%;
  max-height: 90%;
  height: calc(100% - 1.2rem);
  max-height: calc(100% - 1.2rem);
`;

const CameraViewHeadText = styled.div`
  padding-left: 5px;
  color: white;
  background-color: black;
  font-size: 1rem;
  height: 1.2rem;
  max-height: 1.2rem;
  border-radius: 10px 10px 0 0;
  border-left: 1px solid white;
  border-top: 1px solid white;
  border-right: 1px solid white;
`;

export default class SuperCameraView extends Component<
  SuperCameraViewProps,
  SuperCameraViewState
> {
  constructor(props: SuperCameraViewProps) {
    super(props);

    const listOfUrls: any[] = [];
    this.props.rawListOfCamerasForCarusel.forEach((e: any, i: number) => {
      if (e) {
        const validOject = validateCameraObject(e);
        if (validOject.VALID) {
          listOfUrls.push({
            url: validOject.HLS,
            id: validOject.ID,
            name: validOject.NAME,
            poster: validOject.LOSSYSNAPSHOT,
          });
        }
      }
    });

    this.state = {
      listOfUrls: listOfUrls,
      showFirst: true,
      urlsCarusel: {
        first: {
          url: listOfUrls[this.props.currentPage]?.url,
          id: listOfUrls[this.props.currentPage]?.id,
          name: listOfUrls[this.props.currentPage]?.name,
        },
        second: {
          url: listOfUrls[this.props.currentPage + 1]?.url,
          id: listOfUrls[this.props.currentPage + 1]?.id,
          name: listOfUrls[this.props.currentPage + 1]?.name,
        },
      },
      currentUrlIndex: this.props.currentPage,
      preloadIndex: this.props.currentPage + 1,
      showFsIcon: false,
      hideFsIconTimeout: 0,
      selfFullscreen: false,
      suspendFirst: false,
      suspendSecond: true,
      stopFirst: false,
      stopSecond: false,
    };
  }

  componentDidUpdate(
    prevProps: SuperCameraViewProps,
    prevState: SuperCameraViewState
  ) {
    if (prevProps.currentPage != this.props.currentPage) {
      const showFirst = this.state.showFirst;

      const newCurrentUrlIndex =
        this.props.currentPage >= this.state.listOfUrls.length
          ? 0
          : this.props.currentPage;
      const newPreloadIndex =
        newCurrentUrlIndex + 1 >= this.state.listOfUrls.length
          ? 0
          : newCurrentUrlIndex + 1;

      const urlsCarusel = showFirst
        ? {
            ...this.state.urlsCarusel,
            second: {
              url: this.state.listOfUrls[newCurrentUrlIndex]?.url,
              id: this.state.listOfUrls[newCurrentUrlIndex]?.id,
              name: this.state.listOfUrls[newCurrentUrlIndex]?.name,
            },
          }
        : {
            ...this.state.urlsCarusel,
            first: {
              url: this.state.listOfUrls[newCurrentUrlIndex]?.url,
              id: this.state.listOfUrls[newCurrentUrlIndex]?.id,
              name: this.state.listOfUrls[newCurrentUrlIndex]?.name,
            },
          };

      this.setState({
        ...this.state,
        urlsCarusel,
        currentUrlIndex: newCurrentUrlIndex,
        preloadIndex: newPreloadIndex,
      });
    }

    if (
      prevProps.prepareNextPageNum != this.props.prepareNextPageNum &&
      this.props.currentPage == prevProps.currentPage
    ) {
      if (this.state.showFirst) {
        this.setState({
          ...this.state,
          stopFirst: true,
          stopSecond: false,
          suspendSecond: false,
        });
      } else {
        this.setState({
          ...this.state,
          stopFirst: false,
          stopSecond: true,
          suspendFirst: false,
        });
      }
    }
  }

  playerReady(playerNum: number) {
    if (playerNum == 1 && !this.state.showFirst) {
      this.setState({
        ...this.state,
        showFirst: true,
        suspendSecond: true,
        urlsCarusel: {
          ...this.state.urlsCarusel,
          second: {
            url: this.state.listOfUrls[this.state.preloadIndex]?.url,
            id: this.state.listOfUrls[this.state.preloadIndex]?.id,
            name: this.state.listOfUrls[this.state.preloadIndex]?.name,
          },
        },
      });
    }
    if (playerNum == 2 && this.state.showFirst) {
      this.setState({
        ...this.state,
        showFirst: false,
        suspendFirst: true,
        urlsCarusel: {
          ...this.state.urlsCarusel,
          first: {
            url: this.state.listOfUrls[this.state.preloadIndex]?.url,
            id: this.state.listOfUrls[this.state.preloadIndex]?.id,
            name: this.state.listOfUrls[this.state.preloadIndex]?.name,
          },
        },
      });
    }
  }

  render() {
    return this.state.listOfUrls.length ? (
      this.state.listOfUrls.length > 1 ? (
        <VideoContainer
          className="carusel-superCamera-videoContainer"
          onMouseOver={() => {
            if (!this.props.fsId && !this.state.showFsIcon)
              this.setState({ ...this.state, showFsIcon: true });
          }}
          onMouseLeave={() => {
            if (!this.props.fsId && this.state.showFsIcon)
              this.setState({ ...this.state, showFsIcon: false });
          }}
          selfFullscreen={this.state.selfFullscreen && !!this.props.fsId}
          onClick={() => {
            const current =
              this.props.currentPage % 2 === 0 ? "first" : "second";
            //@ts-ignore
            this.props.setFsId(
              this.state.selfFullscreen
                ? null
                : this.state.urlsCarusel[current].id
            );
            this.setState({
              ...this.state,
              selfFullscreen: !this.state.selfFullscreen,
              showFsIcon: this.props.fsId ? true : false,
            });
          }}
        >
          <OpenFullscreenControlsContainer show={this.state.showFsIcon}>
            <FullScreenIcon />
          </OpenFullscreenControlsContainer>

          <VideoContentWrapper
            className="carusel-superCamera-VideoContentWrapperP1"
            show={this.state.showFirst}
            key={"Player_1"}
          >
            <CameraViewHeadText>
              {this.state.urlsCarusel["first"].name}
            </CameraViewHeadText>
            <VideoPlayerWrapper>
              <PlayerTs
                className={"Player_1"}
                url={`${apiUrl}${this.state.urlsCarusel["first"].url}`}
                playImmediately={true}
                showInterface={false}
                sideHd={this.state.urlsCarusel["first"].id == this.props.fsId}
                playerReadyForCaruselCallback={() => this.playerReady(1)}
                suspend={this.state.suspendFirst}
                //sideStop={this.state.stopFirst}
              />
            </VideoPlayerWrapper>
          </VideoContentWrapper>

          <VideoContentWrapper
            className="carusel-superCamera-VideoContentWrapperP2"
            show={!this.state.showFirst}
            key={"Player_2"}
          >
            <CameraViewHeadText>
              {this.state.urlsCarusel["second"].name}
            </CameraViewHeadText>
            <VideoPlayerWrapper>
              <PlayerTs
                className={"Player_2"}
                url={`${apiUrl}${this.state.urlsCarusel["second"].url}`}
                playImmediately={true}
                showInterface={false}
                sideHd={this.state.urlsCarusel["second"].id == this.props.fsId}
                playerReadyForCaruselCallback={() => this.playerReady(2)}
                suspend={this.state.suspendSecond}
                //sideStop={this.state.stopSecond}
              />
            </VideoPlayerWrapper>
          </VideoContentWrapper>
        </VideoContainer>
      ) : (
        <VideoContainer
          className="carusel-superCamera-videoContainer"
          onMouseOver={() => {
            if (!this.props.fsId && !this.state.showFsIcon)
              this.setState({ ...this.state, showFsIcon: true });
          }}
          onMouseLeave={() => {
            if (!this.props.fsId && this.state.showFsIcon)
              this.setState({ ...this.state, showFsIcon: false });
          }}
          selfFullscreen={this.state.selfFullscreen && !!this.props.fsId}
          onClick={() => {
            const current =
              this.props.currentPage % 2 === 0 ? "first" : "second";
            //@ts-ignore
            this.props.setFsId(
              this.state.selfFullscreen
                ? null
                : this.state.urlsCarusel[current].id
            );
            this.setState({
              ...this.state,
              selfFullscreen: !this.state.selfFullscreen,
              showFsIcon: this.props.fsId ? true : false,
            });
          }}
        >
          <OpenFullscreenControlsContainer show={this.state.showFsIcon}>
            <FullScreenIcon />
          </OpenFullscreenControlsContainer>

          <VideoContentWrapper
            className="carusel-superCamera-VideoContentWrapperP1"
            show={true}
            key={"Player_1"}
          >
            <CameraViewHeadText>
              {this.state.urlsCarusel["first"].name}
            </CameraViewHeadText>
            <VideoPlayerWrapper>
              <PlayerTs
                className={"Player_1"}
                url={`${apiUrl}${this.state.urlsCarusel["first"].url}`}
                playImmediately={true}
                showInterface={false}
                sideHd={this.state.urlsCarusel["first"].id == this.props.fsId}
              />
            </VideoPlayerWrapper>
          </VideoContentWrapper>
        </VideoContainer>
      )
    ) : (
      <></>
    );
  }
}
