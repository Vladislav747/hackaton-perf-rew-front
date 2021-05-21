/**
 * Расчет количества делений и расстояния между ними
 * @param {number} width ширина канваса
 * @param {number} minutesCount количество минутных делений
 * @param {number} secondsCount количество секундных делений
 */
export const calcDashes = (
  width: number,
  minutesCount: number,
  secondsCount: number
): Array<number> => {
  const totalDashes = minutesCount * secondsCount + minutesCount;

  return [width / minutesCount / secondsCount, totalDashes];
};

/**
 * Кол-ва минутных делений в зависимости от брейкпоинта
 */
export const minuteBreakpoints = {
  mobile: 5,
  tablet: 12,
  desktop: 12,
};

/**
 * Расчет кол-ва минутных делений в зависимости от ширины экрана
 * @param width - ширина экрана
 */
export const getMinuteDashesCount = (width: number): number => {
  if (width <= 480) return minuteBreakpoints.mobile;
  if (width <= 768) return minuteBreakpoints.tablet;
  return minuteBreakpoints.desktop;
};

/**
 * Форматирование времени
 * @param {Date} time - объект времени
 * @param {boolean} withSeconds - добавление секунд
 */
export const formatTime = (time: Date, withSeconds = false): string => {
  const hours = (): string => {
    return time.getHours() < 10
      ? `0${time.getHours()}`
      : time.getHours().toString();
  };

  const minutes = (): string => {
    return time.getMinutes() < 10
      ? `0${time.getMinutes()}`
      : time.getMinutes().toString();
  };

  const seconds = (): string => {
    return time.getSeconds() < 10
      ? `0${time.getSeconds()}`
      : time.getSeconds().toString();
  };

  if (withSeconds) return `${hours()}:${minutes()}:${seconds()}`;

  return `${hours()}:${minutes()}`;
};

/**
 * Вызов функции в определенное кол-во секунд
 * @param {Function} func функция для вызова
 * @param {number} timeout кол-во мс
 */
export const debounce = (
  func: () => unknown,
  timeout: number
): (() => unknown) => {
  let innerTimeout: number;
  return function() {
    clearTimeout(innerTimeout);
    innerTimeout = setTimeout(func, timeout);
  };
};
