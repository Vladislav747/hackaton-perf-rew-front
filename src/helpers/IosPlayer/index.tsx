import React, { useEffect, useRef, useState } from "react";
import sendErrorToSentry from "../sentry";

const BASE_API_URL = process.env.REACT_APP_BASE_STREAMS_URL;

const IosPlayer = React.forwardRef((props: any, ref: any) => {
  const {
    url,
    playing,
    quality,
    onBuffer,
    onBufferEnd,
    onChangeQuality,
    onStop: onStopProps,
    removeCameraFromActive: removeCameraFromActiveProps,
    cameraId: cameraIdProps,
  } = props;
  const playerRef = useRef<HTMLVideoElement | null>(null);

  const [mediumStreamUrl, setMediumStreamUrl] = useState<null | string>(null);
  const [hdStreamUrl, setHdStreamUrl] = useState<null | string>(null);
  const [currentStreamQuality, setCurrentStreamQuality] = useState("LD");

  /**
    Обработчик нажатия клика 
    - нужен чтобы останавливать плеер по клику на области самого video
    как в Youtube
    - останавливаем плеер и удаляем из активных
  */
  const clickPlayerHandler = () => {
    onStopProps();
    removeCameraFromActiveProps(cameraIdProps);
  };

  useEffect(() => {
    fetch(url)
      .then(res => res.text())
      .then(res => {
        try {
          const lines = res.split("\n");
          for (let line in lines) {
            const parsedLine: number = parseInt(line);
            if (/NAME=LD/i.test(lines[parsedLine])) {
              setMediumStreamUrl(lines[parsedLine + 1]);
            } else if (/NAME=HD/i.test(lines[parsedLine])) {
              setHdStreamUrl(lines[parsedLine + 1]);
            }
          }
        } catch (e) {
          sendErrorToSentry(`IosPlayer fetch data ${e}`, {
            place: "src/helpers/IosPlayer/index.ts",
          });
        }
      });
  }, [url]);

  useEffect(() => {
    const videoRef = playerRef.current;
    if (videoRef) {
      const video: HTMLVideoElement = videoRef as HTMLVideoElement;
      /*
                https://stackoverflow.com/questions/40360174/playing-html-5-video-from-angular-2-typescript
                https://github.com/Microsoft/TypeScript/issues/19573
            */
      // @ts-ignore-start
      video.type = "application/vnd.apple.mpegURL";
      video.muted = true; // fixes autoplay in chrome
      video.setAttribute("playsinline", "true"); // fixes autoplay in webkit (ie. mobile safari)
      // @ts-ignore-end
      video.addEventListener("waiting", onBuffer);
      video.addEventListener("playing", onBufferEnd);
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
      return () => {
        video.removeEventListener("waiting", onBuffer);
        video.removeEventListener("playing", onBuffer);
        video.removeEventListener("loadedmetadata", () => {
          video.play();
        });
      };
    }
  }, []);

  useEffect(() => {
    const video = playerRef.current;
    if (video) {
      // @ts-ignore-start
      video.src = BASE_API_URL + mediumStreamUrl;
      // @ts-ignore-end
      video.load();
    }
  }, [mediumStreamUrl]);

  useEffect(() => {
    if (currentStreamQuality !== quality) {
      setCurrentStreamQuality(quality);
      onChangeQuality(quality);
      const video = playerRef.current;
      if (video) {
        // @ts-ignore-start
        if (quality == "LD") video.src = BASE_API_URL + mediumStreamUrl;
        // @ts-ignore-start
        else video.src = BASE_API_URL + hdStreamUrl;
        video.load();
      }
    }
  }, [quality]);

  useEffect(() => {
    const video = playerRef.current;
    if (video) {
      if (playing) {
        video.load();
      } else {
        video.pause();
      }
    }
  }, [playing]);

  return (
    <video
      ref={playerRef}
      id={url}
      webkit-playsinline="true"
      controls={false}
      style={{
        position: "absolute",
        height: "auto",
        width: "100%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        objectFit: "fill",
        maxHeight: "100%",
      }}
      onClick={() => clickPlayerHandler()}
    />
  );
});

export default IosPlayer;
