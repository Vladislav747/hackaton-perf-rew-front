import { actionTypes } from "./actions";
import { stateSchema } from "./schema";
import { generateIntervalUrl } from "../../helpers/archive";

const apiUrl = process.env.REACT_APP_BASE_STREAMS_URL;
const ThirtyMinutesAsMilliseconds = 30 * 60 * 1000;
const FiveMinutesAsMilliseconds = 5 * 60 * 1000;
const HourMinutesAsMilliseconds = 60 * 60 * 1000;

export default (state = { ...stateSchema }, action: archiveSagaAction) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_CURRENT_PLAYLIST_DURATION: {
      const { currentPlaylistDurarion } = payload;
      return { ...state, currentPlaylistDurarion };
    }
    case actionTypes.SET_LIVE: {
      const currentVideoTimestamp = Date.now();
      const timelineInterval = {
        timelineStartPositionInMs:
          currentVideoTimestamp - FiveMinutesAsMilliseconds,
        timelineEndPositionInMs: currentVideoTimestamp,
      };
      return {
        ...state,
        live: true,
        archivePlaylistStartTimestamp: 0,
        timelineInterval,
        currentVideoTimestamp,
        //@ts-ignore
        playerUrl: `${apiUrl}${state.cameraData.REALTIME_HLS}`,
      };
    }

    case actionTypes.SET_CURRENT_VIDEO_TIMESTAMP_ON_SHIFT: {
      const { offset } = payload;

      const currentVideoOffsetInSeconds =
        state.currentVideoOffsetInSeconds + offset;

      const offsetInMs = offset * 1000;

      const timelineInterval = {
        timelineStartPositionInMs:
          state.timelineInterval.timelineStartPositionInMs + offsetInMs,
        timelineEndPositionInMs: Date.now(),
      };

      const currentVideoTimestamp = state.currentVideoTimestamp + offsetInMs;

      /* Если ушли слишком далеко назад или вперед - регенерируем */
      if (
        state.live ||
        currentVideoOffsetInSeconds < 0 ||
        currentVideoOffsetInSeconds > (state.currentPlaylistDurarion || 0)
      ) {
        const archivePlaylistStartTimestamp = new Date();
        const archivePlaylistEndTimestamp = new Date();
        const selectedTimestampAsDate = new Date(currentVideoTimestamp);
        selectedTimestampAsDate.setSeconds(0);

        archivePlaylistStartTimestamp.setTime(
          selectedTimestampAsDate.valueOf() - ThirtyMinutesAsMilliseconds
        );

        archivePlaylistEndTimestamp.setTime(
          selectedTimestampAsDate.valueOf() + ThirtyMinutesAsMilliseconds
        );

        const playerUrl = generateIntervalUrl(
          //@ts-ignore
          state.cameraData.ID,
          archivePlaylistStartTimestamp,
          archivePlaylistEndTimestamp
        );

        const currentVideoOffsetInSeconds = Math.floor(
          (currentVideoTimestamp - archivePlaylistStartTimestamp.valueOf()) /
            1000
        );

        return {
          ...state,
          live: false,
          playerUrl,
          currentVideoOffsetInSeconds,
          archivePlaylistStartTimestamp: archivePlaylistStartTimestamp.valueOf(),
          newSelectedVideoOffsetInSeconds: currentVideoOffsetInSeconds,
          timelineInterval,
          currentVideoTimestamp,
        };
      }

      return {
        ...state,
        timelineInterval,
        currentVideoOffsetInSeconds,
        currentVideoTimestamp,
        newSelectedVideoOffsetInSeconds: currentVideoOffsetInSeconds,
      };
    }

    case actionTypes.UPDATE_PROGRESS_BAR: {
      const { currentVideoOffsetInSeconds } = payload;

      let timelineStartPositionInMs,
        timelineEndPositionInMs,
        timelineInterval,
        currentVideoTimestamp;

      // вот тут еще посчитать смещение.
      //

      if (state.live) {
        //@todo добавить костыль-смешение 10c?
        /**
         * если state.archivePlaylistStartTimestamp == undefined т.е. live
         */
        currentVideoTimestamp = Date.now();
        timelineInterval = {
          timelineStartPositionInMs:
            currentVideoTimestamp - FiveMinutesAsMilliseconds,
          timelineEndPositionInMs: currentVideoTimestamp,
        };
      } else {
        /**
         * если пользователь выбрал время, т.е. нe live
         */

        const timelineOffsetInMs =
          state.currentVideoTimestamp -
          state.timelineInterval.timelineStartPositionInMs;

        timelineStartPositionInMs =
          state.archivePlaylistStartTimestamp +
          currentVideoOffsetInSeconds * 1000 -
          timelineOffsetInMs;

        timelineEndPositionInMs =
          timelineStartPositionInMs + FiveMinutesAsMilliseconds;

        timelineInterval = {
          timelineStartPositionInMs: timelineStartPositionInMs,
          timelineEndPositionInMs: Date.now(),
        };

        currentVideoTimestamp =
          state.archivePlaylistStartTimestamp +
          currentVideoOffsetInSeconds * 1000;
      }

      return {
        ...state,
        timelineInterval,
        currentVideoOffsetInSeconds,
        currentVideoTimestamp,
      };
    }

    case actionTypes.SET_CAMERA_DATA: {
      const { cameraData } = payload;
      return {
        ...state,
        cameraData,
        cameraName: cameraData.NAME,
        live: true,
        playerUrl: `${apiUrl}${cameraData.REALTIME_HLS}`,
        canDownload: cameraData.ACCESS.DOWNLOAD.STATUS,
      };
    }

    /**
     * Этот редюсер применяется для стандартного перехода на следующий плейлист при
     * окончании предыдущего.
     * Для генрации плейлиста по щелчку используется другой лист.
     */
    case actionTypes.GENERATE_NEXT_PLAYLIST: {
      const needLive = state.currentVideoTimestamp + 10 * 1000 >= Date.now();
      if (needLive) {
        const currentVideoTimestamp = Date.now();
        const timelineInterval = {
          timelineStartPositionInMs:
            currentVideoTimestamp - FiveMinutesAsMilliseconds,
          timelineEndPositionInMs: currentVideoTimestamp,
        };
        return {
          ...state,
          live: true,
          archivePlaylistStartTimestamp: 0,
          timelineInterval,
          currentVideoTimestamp,
          //@ts-ignore
          playerUrl: `${apiUrl}${state.cameraData.REALTIME_HLS}`,
        };
      } else {
        const selectedTimestampAsDate = new Date(state.currentVideoTimestamp);

        const archivePlaylistStartTimestamp = new Date();
        const archivePlaylistEndTimestamp = new Date();

        selectedTimestampAsDate.setSeconds(0);

        archivePlaylistStartTimestamp.setTime(
          selectedTimestampAsDate.valueOf() - ThirtyMinutesAsMilliseconds
        );
        archivePlaylistEndTimestamp.setTime(
          selectedTimestampAsDate.valueOf() + ThirtyMinutesAsMilliseconds
        );

        const playerUrl = generateIntervalUrl(
          //@ts-ignore
          state.cameraData.ID,
          archivePlaylistStartTimestamp,
          archivePlaylistEndTimestamp
        );

        const currentVideoOffsetInSeconds = Math.floor(
          (state.currentVideoTimestamp -
            archivePlaylistStartTimestamp.valueOf()) /
            1000
        );

        const newSelectedVideoOffsetInSeconds = currentVideoOffsetInSeconds;

        const timelineOffsetInMs =
          state.currentVideoTimestamp -
          state.timelineInterval.timelineStartPositionInMs;

        const timelineStartPositionInMs =
          state.currentVideoTimestamp - timelineOffsetInMs;

        const timelineInterval = {
          timelineStartPositionInMs: timelineStartPositionInMs,
          timelineEndPositionInMs: Date.now(),
        };

        return {
          ...state,
          playerUrl,
          archivePlaylistStartTimestamp: archivePlaylistStartTimestamp.valueOf(),
          currentVideoOffsetInSeconds,
          live: false,
          newSelectedVideoOffsetInSeconds,
          timelineInterval,
        };
      }
    }

    case actionTypes.SET_CURRENT_VIDEO_TIMESTAMP_ON_CALENDAR_CHANGE: {
      const { currentVideoTimestamp } = payload;

      const selectedTimestampAsDate = new Date(currentVideoTimestamp);

      const archivePlaylistStartTimestamp = new Date();
      const archivePlaylistEndTimestamp = new Date();

      selectedTimestampAsDate.setSeconds(0);

      archivePlaylistStartTimestamp.setTime(
        selectedTimestampAsDate.valueOf() - ThirtyMinutesAsMilliseconds
      );
      archivePlaylistEndTimestamp.setTime(
        selectedTimestampAsDate.valueOf() + ThirtyMinutesAsMilliseconds
      );

      const playerUrl = generateIntervalUrl(
        //@ts-ignore
        state.cameraData.ID,
        archivePlaylistStartTimestamp,
        archivePlaylistEndTimestamp
      );

      const currentVideoOffsetInSeconds = Math.floor(
        (currentVideoTimestamp - archivePlaylistStartTimestamp.valueOf()) / 1000
      );

      const newSelectedVideoOffsetInSeconds = currentVideoOffsetInSeconds;

      const timelineOffsetInMs =
        state.currentVideoTimestamp -
        state.timelineInterval.timelineStartPositionInMs;

      const timelineStartPositionInMs =
        currentVideoTimestamp - timelineOffsetInMs;

      const timelineInterval = {
        timelineStartPositionInMs: timelineStartPositionInMs,
        timelineEndPositionInMs:
          timelineStartPositionInMs + FiveMinutesAsMilliseconds,
      };

      return {
        ...state,
        playerUrl,
        archivePlaylistStartTimestamp: archivePlaylistStartTimestamp.valueOf(),
        currentVideoOffsetInSeconds,
        currentVideoTimestamp,
        live: false,
        newSelectedVideoOffsetInSeconds,
        timelineInterval,
      };
    }

    case actionTypes.SET_CURRENT_VIDEO_TIMESTAMP_ON_CLICK: {
      // Получаем выбранный timestamp, обновляем промежутки timeline
      const { currentVideoTimestamp } = payload;

      const selectedTimestampAsDate = new Date(currentVideoTimestamp);
      const secondsOffsetOfSelectedTimestamp = selectedTimestampAsDate.getSeconds();

      // Если человек жмет на timeline из live  или по какой-то причине не задан archivePlaylistStartTimestamp

      const [
        playerUrl,
        archivePlaylistStartTimestamp,
        currentVideoOffsetInSeconds,
        newSelectedVideoOffsetInSeconds,
      ] =
        state.live || !state.archivePlaylistStartTimestamp
          ? (() => {
              // это если играл live

              const archivePlaylistStartTimestamp = new Date();
              const archivePlaylistEndTimestamp = new Date();

              selectedTimestampAsDate.setSeconds(0);

              archivePlaylistStartTimestamp.setTime(
                selectedTimestampAsDate.valueOf() - ThirtyMinutesAsMilliseconds
              );
              archivePlaylistEndTimestamp.setTime(
                selectedTimestampAsDate.valueOf() + ThirtyMinutesAsMilliseconds
              );

              const playerUrl = generateIntervalUrl(
                //@ts-ignore
                state.cameraData.ID,
                archivePlaylistStartTimestamp,
                archivePlaylistEndTimestamp
              );

              const currentVideoOffsetInSeconds = Math.floor(
                (currentVideoTimestamp -
                  archivePlaylistStartTimestamp.valueOf()) /
                  1000
              );

              return [
                playerUrl,
                archivePlaylistStartTimestamp.valueOf(),
                currentVideoOffsetInSeconds,
                currentVideoOffsetInSeconds,
              ];
            })()
          : (() => {
              // если уже не live

              // 1) проверяем нужно ли грузить новый фрагмент?
              // Грузим если он оказывается меньше чем начало загрузки плейлиста или больше чем начало плейлиста + длительность загруженного фрагмента.
              const needToUpdatePlaylist =
                state.archivePlaylistStartTimestamp > currentVideoTimestamp ||
                state.archivePlaylistStartTimestamp +
                  HourMinutesAsMilliseconds <
                  currentVideoTimestamp;

              const archivePlaylistStartTimestamp = new Date();
              // по умолчанию выставляем текущий timestamp
              archivePlaylistStartTimestamp.setTime(
                state.archivePlaylistStartTimestamp
              );

              // Смещение для плеера в секундах. Если новый лист - стандартный сдвиг, иначе считаем.

              const currentVideoOffsetInSeconds = needToUpdatePlaylist
                ? 30 * 60 + secondsOffsetOfSelectedTimestamp
                : Math.floor(
                    (currentVideoTimestamp -
                      state.archivePlaylistStartTimestamp) /
                      1000
                  );

              const playerUrl = needToUpdatePlaylist
                ? (() => {
                    const archivePlaylistEndTimestamp = new Date();

                    selectedTimestampAsDate.setSeconds(0);

                    archivePlaylistStartTimestamp.setTime(
                      selectedTimestampAsDate.valueOf() -
                        ThirtyMinutesAsMilliseconds
                    );

                    archivePlaylistEndTimestamp.setTime(
                      selectedTimestampAsDate.valueOf() +
                        ThirtyMinutesAsMilliseconds
                    );

                    return generateIntervalUrl(
                      //@ts-ignore
                      state.cameraData.ID,
                      archivePlaylistStartTimestamp,
                      archivePlaylistEndTimestamp
                    );
                  })()
                : state.playerUrl;

              return [
                playerUrl,
                archivePlaylistStartTimestamp.valueOf(),
                currentVideoOffsetInSeconds,
                currentVideoOffsetInSeconds,
              ];
            })();

      return {
        ...state,
        playerUrl,
        archivePlaylistStartTimestamp,
        currentVideoOffsetInSeconds,
        currentVideoTimestamp,
        live: false,
        newSelectedVideoOffsetInSeconds,
      };
    }

    case actionTypes.SET_DOWNLOAD_MODE: {
      const { downloadMode } = payload;
      return {
        ...state,
        downloadMode,
      };
    }

    case actionTypes.SET_DOWNLOAD_RANGE: {
      const { downloadRangeArray } = payload;
      return {
        ...state,
        downloadRangeArray,
      };
    }

    case actionTypes.START_DOWNLOAD_VIDEO_WORKER: {
      return {
        ...state,
        errorMessage: null,
      };
    }
    case actionTypes.VIDEO_DOWNLOAD_FAILED: {
      const { errorMessage } = payload;
      return {
        ...state,
        errorMessage,
      };
    }

    case actionTypes.VIDEO_DOWNLOAD_SUCCESS: {
      const { downloadLink, name } = payload;
      return {
        ...state,
        errorMessage: null,
        downloadLink,
        name,
      };
    }
    case actionTypes.SET_DOWNLOAD_LINK: {
      const { downloadLink } = payload;
      return {
        ...state,
        downloadLink,
      };
    }
    case actionTypes.SET_DOWNLOAD_NAME: {
      const { name } = payload;
      return {
        ...state,
        name,
      };
    }

    case actionTypes.SET_LOADING_PROGRESS: {
      const loadingStatus = payload;
      return {
        ...state,
        loadingProgress: loadingStatus,
      };
    }

    default: {
      return state;
    }
  }
};
