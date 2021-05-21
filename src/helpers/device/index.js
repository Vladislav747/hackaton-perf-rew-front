/**
 * Проверки на то или иное устройство
 */

export const isAndroid = () =>
  navigator && navigator.userAgent.match(/Android/i);
export const isBlackBerry = () =>
  navigator && navigator.userAgent.match(/BlackBerry/i);
export const isIOS = () =>
  navigator && navigator.userAgent.match(/iPhone|iPad|iPod/i);
export const isOpera = () =>
  navigator && navigator.userAgent.match(/Opera Mini/i);
export const isWindows = () =>
  navigator &&
  (navigator.userAgent.match(/IEMobile/i) ||
    navigator.userAgent.match(/WPDesktop/i));

export const isAny = () =>
  isAndroid() || isBlackBerry() || isIOS() || isOpera() || isWindows();

export const IOSCheck =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !window.MSStream;

const HLS_EXTENSIONS = /\.(m3u8)($|\?)/i;

export const canPlay = function(url) {
  return HLS_EXTENSIONS.test(url);
};

export const checkSupportForWebKitPresentationMode = video => {
  if (!video) video = document.createElement("video");
  // Check if Safari supports PiP, and is not on mobile (other than iPad)
  // iPhone safari appears to "support" PiP through the check, however PiP does not function
  return (
    video.webkitSupportsPresentationMode &&
    typeof video.webkitSetPresentationMode === "function" &&
    !/iPhone|iPod/.test(navigator.userAgent)
  );
};

/**
 * Можно ли запустить плеер
 *
 * @param {string} url - наименование качества
 *
 */
export const canEnablePIP = url => {
  return (
    canPlay(url) &&
    (!!document.pictureInPictureEnabled ||
      checkSupportForWebKitPresentationMode())
  );
};

export default {
  isAndroid,
  isBlackBerry,
  isIOS,
  isOpera,
  isWindows,
  isAny,
};
