import React, { Component } from "react";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import Hls from "hls.js";

import { getAccessToken } from "../authTokens";
import {
  IOSCheck,
  canPlay,
  canEnablePIP,
  checkSupportForWebKitPresentationMode,
} from "../device";
import sendErrorToSentry from "../sentry";

/**
 * Ищем есть ли требуемое нам качество у этого видео?
 * @param {string} qualityName - наименование качества
 * @param {object} hls - непосредественно сам объект Hls
 */
const findQualityLvlByName = (qualityName, hls = false) => {
  if (hls && Array.isArray(hls.levels)) {
    return hls.levels.findIndex(e => e.name === qualityName);
  }
  return 0; // значение по умолчанию
};

export class EzHlsPlayer extends Component {
  static displayName = "EzHlsPlayer";
  static canPlay = canPlay;
  static canEnablePIP = canEnablePIP;

  constructor(props) {
    super(props);
    this.state = {
      forceHlsStartLoad: false,
    };
    this.stopHlsTimeOut = null;
  }

  componentDidMount() {
    this.addListeners(this.player);
    this.load(this.props.url);

    this.player.playbackRate = this.props.live
      ? 1.0
      : this.props.playSpeed ?? 1.0;

    /*
      Выбор времени при выборе времени 
      на таймлайне будет происходить только при режиме архива(Не live)
    */
    if (!this.props.live) {
      this.player.currentTime = this.props.newSelectedTime ?? 0;
    }

    if (this.props.playing) this.play();
    else this.pause();

    //TODO: чуть подробней посмотеть при проверке IOS. Потестить на IOS устройствах
    if (IOSCheck) {
      this.player.load();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      newSelectedTime: newSelectedTimeProp,
      playSpeed: playSpeedProp,
      url: urlProps,
      playing,
      volume,
      muted,
      playbackRate,
      quality,
      poster,
      pip,
      live: liveProps,
    } = this.props;

    if (!isEqual(prevProps.url, urlProps)) {
      /* Уничтожить старый плеер */
      this.removeListeners(this.player);
      this.hls.destroy();
      this.hls = null;

      /* Навешиваем обработчики на элемент video */
      this.addListeners(this.player);

      this.load(urlProps);

      /*
      Выбор времени при выборе времени 
      на таймлайне будет происходить только при режиме архива(Не live)
    */
      if (!liveProps) {
        this.player.currentTime = newSelectedTimeProp
          ? `${newSelectedTimeProp}.0`
          : 0;
      }

      if (this.props.playing) this.play();
    }

    this.player.playbackRate = liveProps ? 1.0 : playSpeedProp ?? 1.0;

    /*
      Выбор времени при выборе времени 
      на таймлайне будет происходить только при режиме архива(Не live)
    */
    if (prevProps.newSelectedTime != newSelectedTimeProp && !liveProps) {
      this.player.currentTime = `${newSelectedTimeProp}.0`;
    }
    if (!prevProps.playing && playing) {
      this.setHlsLoading(true);
      this.play();
    }

    if (prevProps.playing && !playing) {
      this.pause();
    }

    if (!prevProps.pip && pip) {
      this.enablePIP();
    }

    if (prevProps.pip && !pip) {
      this.disablePIP();
    }
    if (prevProps.volume !== volume && volume !== null) {
      this.setVolume(volume);
    }

    if (prevProps.quality !== quality && quality !== null) {
      this.changeQuality(quality);
    }

    if (prevProps.muted !== muted) {
      if (muted) {
        this.mute();
      } else {
        this.unmute();
        if (volume !== null) {
          // Set volume next tick to fix a bug with DailyMotion
          setTimeout(() => this.setVolume(volume));
        }
      }
    }
    if (prevProps.playbackRate !== playbackRate) {
      this.setPlaybackRate(playbackRate);
    }
  }

  componentWillUnmount() {
    this.removeListeners(this.player);
    this.hls.destroy();
    this.hls = null;
  }

  /**
   * Установить слушателей для плеера html5
   * @param {object} player - html5 тег video
   */
  addListeners(player) {
    const { playsinline } = this.props;
    player.addEventListener("timeupdate", this.onUpdateProgressBar);
    player.addEventListener("canplay", this.onReady);
    player.addEventListener("play", this.onPlay);
    player.addEventListener("waiting", this.onBuffer);
    player.addEventListener("playing", this.onBufferEnd);
    player.addEventListener("pause", this.onPause);
    player.addEventListener("seeked", this.onSeek);
    player.addEventListener("ended", this.onEnded);
    player.addEventListener("error", this.onError);
    player.addEventListener("enterpictureinpicture", this.onEnablePIP);
    player.addEventListener("leavepictureinpicture", this.onDisablePIP);
    player.addEventListener("loadedmetadata", this.onLoadedMetaData);
    player.addEventListener(
      "webkitpresentationmodechanged",
      this.onPresentationModeChange
    );
    if (playsinline) {
      player.setAttribute("playsinline", "");
      player.setAttribute("webkit-playsinline", "");
      player.setAttribute("x5-playsinline", "");
    }
  }

  /**
   * Снять слушателей для плеера html5
   * @param {*} player - html5 тег video
   */
  removeListeners(player) {
    player.removeEventListener("timeupdate", this.onUpdateProgressBar);
    player.removeEventListener("canplay", this.onReady);
    player.removeEventListener("play", this.onPlay);
    player.removeEventListener("waiting", this.onBuffer);
    player.removeEventListener("playing", this.onBufferEnd);
    player.removeEventListener("pause", this.onPause);
    player.removeEventListener("seeked", this.onSeek);
    player.removeEventListener("ended", this.onEnded);
    player.removeEventListener("error", this.onError);
    player.removeEventListener("enterpictureinpicture", this.onEnablePIP);
    player.removeEventListener("leavepictureinpicture", this.onDisablePIP);
    player.removeEventListener("loadedmetadata", this.onLoadedMetaData);
    player.removeEventListener(
      "webkitpresentationmodechanged",
      this.onPresentationModeChange
    );
  }

  /**
   * Установить слушателей для экземпляра hls
   * @param {object} hls - экземпляр hls
   */
  addHlsListeners(hls) {
    /**
     * Когда произошла ошибка в Hls плеере
     * Обработка ошибки
     */
    hls.on(Hls.Events.ERROR, (e, data) => {
      //@todo ревизия этого куска с ошибками.
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            sendErrorToSentry(
              "EzHlsPlayer Component hls NETWORK_ERROR",
              data,
              true
            );
            hls.startLoad();

            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            //FIXME: ошибка не фатальна - а данный тип ошибок относится к не фатальным ошибкам - исполниться ли данный код?
            sendErrorToSentry(
              "EzHlsPlayer Component hls MEDIA_ERROR",
              data,
              true
            );
            hls.destroy();
            break;
          default:
            //Сначала попробуем восстановиться а только потом уничтожим экземпляор
            try {
              hls.recoverMediaError();
            } catch (error) {
              sendErrorToSentry(
                "EzHlsPlayer Component hls fatal error",
                error,
                true
              );
              hls.destroy();
            }
            break;
        }
        //Обработка не фатальных ошибок
      } else if (!data.fatal && data.type === "mediaError") {
        switch (data.details) {
          case "fragParsingError":
            sendErrorToSentry(
              "EzHlsPlayer Component hls error fragParsingError",
              data,
              true
            );
            hls.recoverMediaError();
            this.play();
            break;
          case "bufferStalledError":
            /*sendErrorToSentry(
              "EzHlsPlayer Component hls error bufferStalledError",
              data,
              true
            );
            */
            hls.recoverMediaError();
            this.play();

            break;
          default:
            //Сначала попробуем восстановиться а только потом уничтожим экземпляор
            try {
              hls.recoverMediaError();
              this.play();
            } catch (error) {
              sendErrorToSentry(
                "EzHlsPlayer Component hls non fatal error",
                error,
                true
              );
              hls.destroy();
            }
            break;
        }
      }
      this.onError(e, data, this.hls);
    });
    //Обработчик при переключении качества видео
    hls.on(Hls.Events.LEVEL_SWITCHED, (e, data) => {
      const { level } = data;
      this.onChangeQuality(hls.levels[level].name);
    });
  }

  // Proxy methods to prevent listener leaks
  onUpdateProgressBar = (...args) => {
    typeof this.props.onUpdateProgressBar === "function" &&
      this.props.onUpdateProgressBar(...args);

    if (typeof this.props.updateVideoProgress === "function") {
      const videoArgs = args[0];
      const roundedCurrentTime = Math.floor(videoArgs.srcElement.currentTime);
      if (
        roundedCurrentTime != 0 &&
        roundedCurrentTime != this.props.currentVideoTime
      )
        this.props.updateVideoProgress(roundedCurrentTime);
    }
  };

  onReady = (...args) => {
    typeof this.props.onReady === "function" && this.props.onReady(...args);
  };

  onPlay = (...args) => {
    if (
      this.hls &&
      this.hls.streamController &&
      this.hls.streamController.state === "STOPPED"
    ) {
      this.setHlsLoading(true);
    }
    if (typeof this.props.onPlay === "function") {
      this.props.onPlay(...args);
    }
  };
  onBuffer = (...args) =>
    typeof this.props.onBuffer === "function" && this.props.onBuffer(...args);
  onBufferEnd = (...args) =>
    typeof this.props.onBufferEnd === "function" &&
    this.props.onBufferEnd(...args);
  onPause = (...args) => {
    if (typeof this.props.onPause === "function") {
      this.props.onPause(...args);
    }
  };

  onEnded = (...args) => {
    typeof this.props.onEnded === "function" && this.props.onEnded(...args);
  };

  onLoadedMetaData = () => {
    typeof this.props.setCurrentPlaylistDurarion === "function" &&
      this.props.setCurrentPlaylistDurarion(
        this.props.live ? null : this.player.duration
      );
  };

  onError = (...args) =>
    typeof this.props.onError === "function" && this.props.onError(...args);

  onEnablePIP = (...args) =>
    typeof this.props.onEnablePIP === "function" &&
    this.props.onEnablePIP(...args);

  onDisablePIP = e => {
    const { onDisablePIP, playing } = this.props;
    if (typeof onDisablePIP === "function") {
      onDisablePIP(e);
    }
    if (playing) {
      this.play();
    }
  };

  onPresentationModeChange = e => {
    if (this.player && checkSupportForWebKitPresentationMode(this.player)) {
      const { webkitPresentationMode } = this.player;
      if (webkitPresentationMode === "picture-in-picture") {
        this.onEnablePIP(e);
      } else if (webkitPresentationMode === "inline") {
        this.onDisablePIP(e);
      }
    }
  };

  onChangeQuality = (...args) =>
    typeof this.props.onChangeQuality === "function" &&
    this.props.onChangeQuality(...args);

  onSeek = e => {
    if (typeof this.props.onSeek === "function") {
      this.props.onSeek(e.target.currentTime);
    }
  };

  /**
   * Метод создании экземпляра Hls
   * @param {string} urlProps
   */
  load(urlProps) {
    const {
      config: { hlsOptions },
    } = this.props;
    const currentLevel = findQualityLvlByName(this.props.quality);
    this.hls = new Hls({
      // https://github.com/video-dev/hls.js/issues/2064
      enableWorker: false,
      autoStartLoad: true,
      initialLiveManifestSize: 2,
      debug: false,
      ...hlsOptions,
    });
    this.hls.nextLevel = currentLevel;
    this.addHlsListeners(this.hls);
    this.hls.attachMedia(this.player);
    if (urlProps) {
      this.hls.loadSource(urlProps);
    }
  }
  /**
   * Изменение качества видео HD или LD
   * @param {string} qualityName - качество
   */

  changeQuality(qualityName) {
    /*
      При смене уровня качества нужно продолжить воспроизведенение видео
      Поскольку оно при сменее качества останавливается
    */

    this.hls.currentLevel = findQualityLvlByName(qualityName, this.hls);
    this.pause();
    this.hls.startLoad();

    if (this.props.playing) this.play();
  }

  /**
   * Остановка/включение загрузки данных для плеера
   * @param {boolean} playingStatus -
   */
  setHlsLoading(playingStatus) {
    //https://github.com/video-dev/hls.js/issues/1719
    if (this.hls) {
      playingStatus ? this.hls.startLoad() : this.hls.stopLoad();
    }
  }

  /**
   * Запуск воспроизведения плеера video html5
   */
  play() {
    const promise = this.player.play();
    if (promise) {
      promise.catch((...args) => {
        this.onError(...args);
      });
    }
  }

  /**
   * Пауза воспроизведения плеера video html5
   */
  pause() {
    this.player.pause();
  }

  /**
   * Остановка воспроизведения плеера video html5
   */

  stop() {
    this.player.removeAttribute("src");
    if (this.hls) {
      this.hls.destroy();
    }
  }

  /**
   * Установить время для плеера video html5
   * @param {*} seconds
   */
  seekTo(seconds) {
    this.player.currentTime = seconds;
  }

  /**
   * Установить уровень громкости для плеера video html5
   * @param {*} seconds
   */
  setVolume(fraction) {
    this.player.volume = fraction;
  }

  /**
   * Установить режим без звука(mute) для плеера video html5
   */
  mute = () => {
    this.player.muted = true;
  };

  /**
   * Установить режим со звуком (отключить mute режим) для плеера video html5
   */
  unmute = () => {
    this.player.muted = false;
  };

  /**
   * Запустить режим мини-плеер
   */
  enablePIP() {
    if (
      this.player.requestPictureInPicture &&
      document.pictureInPictureElement !== this.player
    ) {
      this.player.requestPictureInPicture();
    } else if (
      checkSupportForWebKitPresentationMode(this.player) &&
      this.player.webkitPresentationMode !== "picture-in-picture"
    ) {
      this.player.webkitSetPresentationMode("picture-in-picture");
    }
  }

  /**
   * Выключить режим мини-плеер
   */
  disablePIP() {
    if (
      document.exitPictureInPicture &&
      document.pictureInPictureElement === this.player
    ) {
      document.exitPictureInPicture();
    } else if (
      checkSupportForWebKitPresentationMode(this.player) &&
      this.player.webkitPresentationMode !== "inline"
    ) {
      this.player.webkitSetPresentationMode("inline");
    }
  }

  /**
   * Установить скорость воспроизведения для плеера video html5
   * @param {} rate
   */
  setPlaybackRate(rate) {
    this.player.playbackRate = rate;
  }

  /**
   * Получить длительность плеера video html5
   */
  getDuration() {
    if (!this.player) return null;
    const { duration, seekable } = this.player;
    // on iOS, live streams return Infinity for the duration
    // so instead we use the end of the seekable timerange
    if (duration === Infinity && seekable.length > 0) {
      return seekable.end(seekable.length - 1);
    }
    return duration;
  }

  /**
   * Получить текущее время плеера video html5
   */
  getCurrentTime() {
    if (!this.player) return null;
    return this.player.currentTime;
  }

  /**
   * Получить количество загруженных секунд
   */
  getSecondsLoaded() {
    if (!this.player) return null;
    const { buffered } = this.player;
    if (buffered.length === 0) {
      return 0;
    }
    const end = buffered.end(buffered.length - 1);
    const duration = this.getDuration();
    if (end > duration) {
      return duration;
    }
    return end;
  }

  /**
   * Ссылка на предыдущий объект плеера
   */
  ref = player => {
    if (this.player) {
      // Store previous player to be used by removeListeners()
      this.prevPlayer = this.player;
    }
    this.player = player;
  };

  /**
    Обработчик нажатия клика - нужен чтобы останавливать плеер по клику на области самого video
    как в Youtube
  */
  handleClickPlayer() {
    /*
      Данный плеер используется также в архиве 
      и там нам не требуется удалять его из активных
      мы проверяем наличие необходимых функций
    */
    if (
      this.props.removeCameraFromActivePlayerProps &&
      this.props.cameraIdPlayerProps &&
      this.props.onStopPlayerProps
    ) {
      this.props.onStopPlayerProps();
      this.props.removeCameraFromActivePlayerProps(
        this.props.cameraIdPlayerProps
      );
    } // Если это остановка плеера в архиве то там используется другая функция для остановки плеера
    else if (this.props.setPlaying && this.props.isPlaying !== undefined) {
      this.props.setPlaying(!this.props.isPlaying);
    }
  }

  render() {
    const {
      muted,
      config: { attributes },
    } = this.props;

    const style = {
      position: "absolute",
      height: "auto",
      width: "100%",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      objectFit: "fill",
      maxHeight: "100%",
    };
    return (
      <video
        ref={this.ref}
        style={style}
        preload="metadata"
        controls={false}
        muted={muted}
        {...attributes}
        onClick={() => {
          this.handleClickPlayer();
        }}
      />
    );
  }
}

EzHlsPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  playing: PropTypes.bool,
  muted: PropTypes.bool,
  playsinline: PropTypes.bool,
  poster: PropTypes.string,
  volume: PropTypes.string,
  quality: PropTypes.string,
  playbackRate: PropTypes.number,
  pip: PropTypes.bool,
  onReady: PropTypes.func,
  onBuffer: PropTypes.func,
  onPlay: PropTypes.func,
  onBufferEnd: PropTypes.func,
  onPause: PropTypes.func,
  onEnded: PropTypes.func,
  onError: PropTypes.func,
  onEnablePIP: PropTypes.func,
  onDisablePIP: PropTypes.func,
  onChangeQuality: PropTypes.func,
  config: PropTypes.shape({
    hlsOptions: PropTypes.object,
    attributes: PropTypes.object,
  }),
};

EzHlsPlayer.defaultProps = {
  playing: false,
  playsinline: true,
  playbackRate: 1,
  config: {
    hlsOptions: {
      startLevel: 1,
      autoStartLoad: true,
      startPosition: -1,
      capLevelOnFPSDrop: false,
      capLevelToPlayerSize: false,
      defaultAudioCodec: undefined,
      maxBufferLength: 60,
      maxBufferSize: 120,
      maxBufferHole: 0.5,
      lowBufferWatchdogPeriod: 0.5, // deprecated  https://github.com/video-dev/hls.js/blob/master/docs/API.md#lowbufferwatchdogperiod-deprecated
      highBufferWatchdogPeriod: 3, // if media element is expected to play and if currentTime has not moved for more than highBufferWatchdogPeriod and if there are more than maxBufferHole seconds buffered upfront, hls.js will jump buffer gaps, or try to nudge playhead to recover playback
      nudgeOffset: 0.1,
      nudgeMaxRetry: 4,
      maxFragLookUpTolerance: 0.25,
      liveSyncDurationCount: 4,
      liveMaxLatencyDurationCount: Infinity,
      liveDurationInfinity: false,
      liveBackBufferLength: 0,
      enableSoftwareAES: true,
      manifestLoadingTimeOut: 5000,
      manifestLoadingMaxRetry: 1,
      manifestLoadingRetryDelay: 1000,
      manifestLoadingMaxRetryTimeout: 64000,
      levelLoadingTimeOut: 5000,
      levelLoadingMaxRetry: 4,
      levelLoadingRetryDelay: 1000,
      levelLoadingMaxRetryTimeout: 64000,
      fragLoadingTimeOut: 2000,
      fragLoadingMaxRetry: 6,
      fragLoadingRetryDelay: 1000,
      fragLoadingMaxRetryTimeout: 64000,
      startFragPrefetch: false,
      testBandwidth: true,
      fpsDroppedMonitoringPeriod: 5000,
      fpsDroppedMonitoringThreshold: 0.2,
      appendErrorMaxRetry: 3,
      enableWebVTT: true,
      enableCEA708Captions: true,
      stretchShortVideoTrack: false,
      maxAudioFramesDrift: 1,
      forceKeyFrameOnDiscontinuity: true,
      abrEwmaFastLive: 3.0,
      abrEwmaSlowLive: 9.0,
      abrEwmaFastVoD: 3.0,
      abrEwmaSlowVoD: 9.0,
      abrEwmaDefaultEstimate: 500000,
      abrBandWidthFactor: 0.95,
      abrBandWidthUpFactor: 0.7,
      abrMaxWithRealBitrate: false,
      maxStarvationDelay: 4,
      maxLoadingDelay: 4,
      minAutoBitrate: 0,
      emeEnabled: false,
      widevineLicenseUrl: undefined,
      drmSystemOptions: {},
      xhrSetup: (xhr, url) => {
        const token = getAccessToken();
        xhr.open("GET", url, true);
        if (token) {
          xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        }
      },
    },
  },
};

export default EzHlsPlayer;
