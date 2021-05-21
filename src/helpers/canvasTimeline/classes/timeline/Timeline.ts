import { calcDashes, debounce, formatTime } from "../../helpers";
import Dash from "../dash/Dash";
import { EventEmitter } from "events";
import Tooltip from "../tooltip/Tooltip";
import Cursor from "../cursor/Cursor";

import {
  CanvasOptions,
  TimelineEvents,
  TimelineOptions,
} from "./types/TimelineTypes";

import {
  BACKGROUND_RENDER_CANVAS,
  DASH_COLOR,
  DASH_TEXT_COLOR,
  DISABLED_LINES_COLOR,
  FONT,
  FONT_FAMILY,
  FONT_SIZE,
  TICK_TIMEOUT_IN_MS,
} from "../../config";

const DefaultCanvasOptions: CanvasOptions = {
  width: 640,
  height: 48,
  font: FONT,
};

declare interface Timeline {
  on<U extends keyof TimelineEvents>(
    event: U,
    listener: TimelineEvents[U]
  ): this;
  emit<U extends keyof TimelineEvents>(
    event: U,
    ...args: Parameters<TimelineEvents[U]>
  ): boolean;
}

class Timeline extends EventEmitter {
  private _canvas: HTMLCanvasElement;
  private readonly _context: CanvasRenderingContext2D;
  private _width: number;
  private readonly _height: number;
  private readonly _fontSize: number;
  private readonly _fontFamily: string;
  private readonly _font: string;

  private _offset: number;
  private _startTime: Date | undefined;
  private _minuteDashes: number;
  private readonly _secondsDashes: number;
  private _dashGap: number = 0;
  //@ts-expect-error
  private _dashCount: number;
  private _pxPerSecond: number = 1;

  private _updateTimer: number = 0;
  private _speed: number = 1;
  private _maxAvailableTime: number;

  private _paused: boolean;
  private _moving: boolean;
  private _disableClick: boolean;
  private _mouseX: number;
  private _mouseY: number;

  private _timeTooltipDate: Date;
  private _timeTooltip: Tooltip;

  private _cursor: Cursor;

  /**
   * Создание экземпляра таймлайна
   * @param {HTMLCanvasElement} canvas элемент канваса
   * @param {TimelineOptions} options параметры таймлайна
   */
  constructor(canvas: HTMLCanvasElement, options: TimelineOptions) {
    super();
    const {
      startTime,
      minuteDashes,
      secondsDashes,
      canvasOptions = DefaultCanvasOptions,
    } = options;
    this._canvas = canvas;
    this._context = canvas.getContext("2d", {
      alpha: false,
    }) as CanvasRenderingContext2D;
    this._width = canvas.width = canvasOptions.width;
    this._height = canvas.height = canvasOptions.height;
    this._fontSize = FONT_SIZE;
    this._fontFamily = FONT_FAMILY;
    this._font = FONT;
    //@ts-ignore
    startTime.setSeconds(0);

    this._offset = 0;
    this._startTime = startTime;
    this._minuteDashes = minuteDashes;
    this._secondsDashes = secondsDashes;

    this._maxAvailableTime = Date.now();

    this._paused = false;
    this._moving = false;
    this._disableClick = false;
    this._mouseX = 0;
    this._mouseY = 0;

    this._timeTooltipDate = new Date();
    this._timeTooltip = new Tooltip();

    this._cursor = new Cursor({
      x: 0,
      y: 0,
      time: this.time,
    });

    this.init();
  }

  /**
   * Инициализация некоторых параметров
   * @private
   */
  private init(): void {
    this._context.font = this._font;

    this._updateTimer = performance.now();
    this._maxAvailableTime = Date.now();

    this.calcDimensions();
    this.registerCanvasEvents();

    this.setTime(Date.now());
  }

  /**
   * Расчет кол-ва делений и отступов между ними
   * @private
   */
  private calcDimensions(): void {
    const [dashGap, dashCount] = calcDashes(
      this._width,
      this._minuteDashes,
      this._secondsDashes
    );
    this._dashGap = dashGap;
    this._dashCount = dashCount;

    this._pxPerSecond = (this._dashGap * this._secondsDashes) / 60;

    this._cursor.x = this._width / 2 - Cursor.strokeWidth;
  }

  /**
   * Создание обработчиков событий
   * @private
   */
  private registerCanvasEvents(): void {
    /**
     * Наведение мышью на канвас
     * @param {number} x положение по X
     */
    const canvasEnterEventHandler = (x: number): void => {
      this._timeTooltip.visible = true;

      if (x > 0) this._mouseX = x;
    };

    /**
     * Нажатие мышью на канвас
     * @param {number} x положение по X
     */
    const canvasDownEventHandler = (x: number): void => {
      this._moving = true;

      if (x > 0) this._mouseX = x;

      this.emit("mouseMovingStarted", {
        x: this._mouseX,
        time: this.time,
      });
    };

    /**
     * Движение мышью по канвасу
     * @param {number} x положение по X
     * @param {number} dx дельта перемещения по X
     */
    const canvasMoveEventHandler = (x: number, dx: number): void => {
      //Проверяем не достигнуто ли максимально доступное время
      // console.log(this._offset, "this._offset");
      // console.log(dx, "dx");
      // console.log(x, "x");
      // console.log(this._offset - dx, "this._offset - dx");
      // console.log(
      //   this.getTimeFromOffset(this._offset - dx),
      //   "this.getTimeFromOffset(this._offset - dx)"
      // );
      const canMove =
        this.getTimeFromOffset(this._offset - dx) <= this._maxAvailableTime;

      if (x > 0) this._mouseX = x;

      this._timeTooltip.x = this._mouseX;

      if (this._moving) {
        this._canvas.style.cursor = "grabbing";
        this._disableClick = true;
        this._moving = true;
        //Если не достигнуто максимально доступное время то можно двигаться
        if (canMove) this.addOffset(-dx);
        /* 
          Если клиент пытается насильно прокрутить таймлайн вправо сверх текущего времени отбрасываем его на 10 px назад
        */ else
          this.setTime(this._maxAvailableTime - 1000);

        this.emit("mousePressedMoving", {
          x: this._mouseX,
          deltaX: dx,
          time: this.time,
        });
      } else {
        debounce(() => {
          this.emit("mouseMoving", {
            x: this._mouseX,
            time: this.time,
          });
        }, 2000);
      }
    };

    /**
     * Мышь поднята
     * @param {number} x положение по X
     */
    const canvasUpEventHandler = (x: number): void => {
      this._moving = false;
      this._canvas.style.cursor =
        "url(https://ssl.gstatic.com/ui/v1/icons/mail/images/2/openhand.cur), default";
      if (x > 0) this._mouseX = x;

      if (this._timeTooltipDate.getTime() > this._maxAvailableTime) return;

      this.emit("mouseMovingStopped", {
        x: this._mouseX,
        time: this.time,
      });
    };

    this._canvas.onmouseenter = (e: MouseEvent) => {
      canvasEnterEventHandler(e.offsetX);
    };

    this._canvas.onmousedown = (e: MouseEvent) => {
      e.preventDefault();
      canvasDownEventHandler(e.offsetX);
    };

    this._canvas.addEventListener(
      "touchstart",
      (e: TouchEvent) => {
        const touch = e.touches[0];
        const x =
          touch.clientX - (touch.target as HTMLCanvasElement).offsetLeft;
        canvasDownEventHandler(x);
      },
      { passive: true }
    );

    this._canvas.onmousemove = (e: MouseEvent) => {
      e.preventDefault();
      canvasMoveEventHandler(e.offsetX, e.offsetX - this._mouseX);
    };

    this._canvas.addEventListener(
      "touchmove",
      (e: TouchEvent) => {
        const touch = e.touches[0];
        const x =
          touch.clientX - (touch.target as HTMLCanvasElement).offsetLeft;
        canvasMoveEventHandler(x, x - this._mouseX);
      },
      { passive: true }
    );

    this._canvas.onmouseup = (e: MouseEvent) => {
      e.preventDefault();
      canvasUpEventHandler(e.offsetX);
    };

    this._canvas.addEventListener(
      "touchend",
      () => {
        canvasUpEventHandler(-1);
      },
      { passive: true }
    );

    this._canvas.addEventListener(
      "touchcancel",
      () => {
        canvasUpEventHandler(-1);
      },
      { passive: true }
    );

    this._canvas.onmouseleave = () => {
      this._timeTooltip.visible = false;
      this._moving = false;
    };

    this._canvas.onclick = () => {
      if (this._moving || this._disableClick) {
        this._disableClick = false;
        return;
      }

      if (this._timeTooltipDate.getTime() > this._maxAvailableTime) return;

      this.emit("click", {
        x: this._mouseX,
        time: this.getTimeByX(this._mouseX),
      });
    };

    this._canvas.addEventListener(
      "wheel",
      (e: WheelEvent) => {
        this._moving = true;
        canvasMoveEventHandler(e.offsetX, -e.deltaX);
        if (e.shiftKey) canvasMoveEventHandler(e.offsetX, e.deltaY);
        this._moving = false;
      },
      {
        passive: true,
      }
    );
  }

  /**
   * Обновление параметров таймлайна
   * @param {number} now время от запуска анимации
   */
  public update(now: number): void {
    /**
     * Обновление положения подсказки времени
     */
    const updateTooltip = () => {
      const timestampMs =
        //@ts-ignore
        this._startTime.getTime() +
        (this._offset / this._pxPerSecond) * 1000 +
        (this._mouseX / this._pxPerSecond) * 1000;

      this._timeTooltipDate = new Date(timestampMs);

      this._timeTooltip.text = formatTime(this._timeTooltipDate, true);
    };

    /**
     * Перемещение таймлайна
     */
    const translateTimeline = () => {
      const canMove = !this._paused && !this._moving;

      const secondDelay = TICK_TIMEOUT_IN_MS / this._speed;

      if (canMove) {
        this.emit("tick");
        const delta = now - this._updateTimer;
        //Быстрая перемотка
        if (delta > secondDelay && delta < 10 * secondDelay) {
          this.emit("secondTick");
          // this._maxAvailableTime += 1000;
          // this._offset += this._pxPerSecond;
          this._updateTimer = now - (delta - secondDelay);
        } else if (delta > 10 * secondDelay) {
          const factor = Math.round(delta / secondDelay);
          // this._maxAvailableTime += factor * 1000;
          // this._offset += this._pxPerSecond * factor;
          this._updateTimer = now - (delta - secondDelay * factor);
        }
      } else {
        const delta = now - this._updateTimer;
        if (delta > secondDelay && delta < 10000)
          this._updateTimer = now - (delta - secondDelay);
      }
    };

    if (this.time.getTime() > this._maxAvailableTime)
      this.setTime(this._maxAvailableTime);

    updateTooltip();
    translateTimeline();
  }

  /**
   * Отрисовка таймлайна
   */
  public render(): void {
    /**
     * Отрисовка заднего фона
     * @param {CanvasRenderingContext2D} context контекст для отрисовки
     */
    const renderBackground = (context: CanvasRenderingContext2D) => {
      context.beginPath();
      context.fillStyle = BACKGROUND_RENDER_CANVAS;
      context.fillRect(0, 0, this._width, this._height);
      context.closePath();
    };

    /**
     * Отрисовка делений
     * @param {CanvasRenderingContext2D} context контекст для отрисовки
     */
    const renderDashes = (context: CanvasRenderingContext2D) => {
      context.strokeStyle = DASH_COLOR;
      context.fillStyle = DASH_TEXT_COLOR;
      const startIndex = Math.floor(this._offset / this._dashGap);

      for (let i = startIndex; i <= this._dashCount + startIndex; i++) {
        const isMinute = i % this._secondsDashes === 0;

        const timestampMs =
          //@ts-ignore
          this._startTime.getTime() + ((i * 60) / this._secondsDashes) * 1000;
        const timestamp = new Date(timestampMs);

        new Dash({
          x: i * this._dashGap - this._offset,
          y: 0,
          isMinute,
          timestamp,
        }).render(context);
      }
    };

    /**
     * Отрисовать черное препятствие
     * @param context
     */
    const renderDisabledFuture = (context: CanvasRenderingContext2D): void => {
      const x =
        this._cursor.x -
        Cursor.strokeWidth -
        this.getXByTime(this._maxAvailableTime);
      const renderLines = () => {
        context.beginPath();
        const angle = 135;
        for (let i = 0; i <= this._width + 100; i++) {
          if ((i - Math.floor(x)) % 20 === 0 && i > x) {
            const x1 = i;
            const y1 = 0;

            const l = Math.sqrt(this._height ** 2 + this._height ** 2);
            const shortL = Math.sqrt((i - x) ** 2 + (i - x) ** 2);
            const r = l > i - x ? shortL : l;

            const cosx = r * Math.cos(angle * (Math.PI / 180));
            const sinx = r * Math.sin(angle * (Math.PI / 180));

            const x2 = x1 + cosx;
            const y2 = y1 + sinx;

            context.strokeStyle = DISABLED_LINES_COLOR;
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            context.stroke();
          }
        }
        context.closePath();
      };

      context.beginPath();
      context.globalAlpha = 0.76;
      context.fillStyle = BACKGROUND_RENDER_CANVAS;
      context.fillRect(x, 0, this._width, this._height);
      context.globalAlpha = 1;
      context.closePath();

      renderLines();
    };

    /**
     * Отрисовка курсора времени в центре таймлайна
     * @param {CanvasRenderingContext2D} context контекст для отрисовки
     */
    const renderCursor = (context: CanvasRenderingContext2D) => {
      this._cursor.time = this.time;
      this._cursor.render(context);
    };

    const internalCanvas: HTMLCanvasElement = document.createElement(
      "canvas"
    ) as HTMLCanvasElement;
    const internalContext: CanvasRenderingContext2D = internalCanvas.getContext(
      "2d",
      {
        alpha: false,
      }
    ) as CanvasRenderingContext2D;
    internalCanvas.width = this._width;
    internalCanvas.height = this._height;
    internalContext.font = this._font;

    renderBackground(internalContext);
    renderDashes(internalContext);
    renderDisabledFuture(internalContext);
    renderCursor(internalContext);

    this._timeTooltip.render(internalContext);

    this._context.drawImage(internalCanvas, 0, 0);
  }

  /**
   * Запуск таймлайна
   */
  public start(): void {
    this.tick(0);
    this.emit("started");
  }

  /**
   * Обработка кадра анимации
   * @param now время от запуска анимации
   * @private
   */
  private tick(now: number): void {
    this.update(now);
    this.render();

    requestAnimationFrame(now => this.tick(now));
  }

  /**
   * Остановка таймлайна
   */
  public pause(): void {
    this._paused = true;
    this.emit("paused");
  }

  /**
   * Запуск таймлайна
   */
  public play(): void {
    this._paused = false;
    this.emit("played");
  }

  /**
   * Добавить секунды к времени на таймлайне
   * @param {number} seconds
   */
  public addSeconds(seconds: number): void {
    this._offset += this._pxPerSecond * seconds;
  }

  /**
   * Задать текущее время на таймлайне
   * @param {Date | number} timestamp
   */
  public setTime(timestamp: Date | number): void {
    /**
     * Установка времени должна происходить только тогда
     * когда мы закончили тащить таймлайн - поэтому проверяем
     * что в данный момент Таймлайн не перетаскивается
     */
    if (!this._moving)
      if (timestamp instanceof Date) {
        /**
         * В зависимости от того
         * прилетает нам объект Date или number
         * используем ту или иную логику
         */
        /**
         * Получаем миллисекунды отнимая
         * начальное время(время при инициализации при первом рендеринге)
         * конвертируем эти данные в секунды
         * отнимая половину canvas( половина так как курсор голубой стоит на половине)
         * добавляя ширину курсора в px
         */
        this._offset =
          // @ts-ignore
          ((timestamp.getTime() - this._startTime.getTime()) / 1000) *
            this._pxPerSecond -
          this._width / 2 +
          Cursor.strokeWidth / this._pxPerSecond;
      } else {
        this._offset =
          // @ts-ignore
          ((timestamp - this._startTime.getTime()) / 1000) * this._pxPerSecond -
          this._width / 2 +
          Cursor.strokeWidth / this._pxPerSecond;
      }
  }

  /**
   * Добавить отступ таймлайна
   * @param {number} pixels
   */
  public addOffset(pixels: number): void {
    this._offset += pixels;
  }

  /**
   * Получить время из оффсета
   * @param {number} offset оффсет
   * @returns {number} число миллисекунд времени
   */
  public getTimeFromOffset(offset: number): number {
    /**
     * Начальное время (первое при рендеринге)
     * + прокрутка offset в секундах
     * + половина canvas так как мы на половине курсор голубой поставили
     * - минус ширины курсора для четкости данных
     *
     * В итоге конвертируем все в дату со временем
     */
    const timestampMs =
      // @ts-ignore
      this._startTime.getTime() +
      (offset / this._pxPerSecond) * 1000 +
      (this._width / 2 / this._pxPerSecond) * 1000 -
      ((Cursor.strokeWidth * 2) / this._pxPerSecond) * 1000;
    return new Date(timestampMs).getTime();
  }

  /**
   * Получение положения X конкретного времени
   * @param {Date | number} date время
   * @private
   * @returns {number} положение по Х
   */
  private getXByTime(date: Date | number): number {
    return (
      ((this.time.getTime() - (date instanceof Date ? date.getTime() : date)) /
        1000) *
      this._pxPerSecond
    );
  }

  /**
   * Получить время по положению X
   * @param {number} x положение по X
   * @private
   * @returns {Date} время на таймлайне
   */
  private getTimeByX(x: number): Date {
    const timestampMs: number =
      //@ts-ignore
      this._startTime.getTime() +
      (this._offset / this._pxPerSecond) * 1000 +
      (x / this._pxPerSecond + Cursor.strokeWidth) * 1000;

    return new Date(timestampMs);
  }

  /**
   * Текущее время на таймлайне
   * @returns {Date} текущее время на таймлайне
   */
  get time(): Date {
    const timestampMs =
      //@ts-ignore
      this._startTime.getTime() +
      (this._offset / this._pxPerSecond) * 1000 +
      (this._width / 2 / this._pxPerSecond - Cursor.strokeWidth) * 1000;
    return new Date(timestampMs);
  }

  /**
   * Начальное время таймлайна
   * @returns {Date} начальное время таймлайна
   */
  get startTime(): Date {
    const timestampMs =
      //@ts-ignore
      this._startTime.getTime() + (this._offset / this._pxPerSecond) * 1000;
    return new Date(timestampMs);
  }

  /**
   * Конечное время таймлайна
   * @returns {Date} конечное время таймлайна
   */
  get endTime(): Date {
    const timestampMs =
      //@ts-ignore
      this._startTime.getTime() +
      (this._offset / this._pxPerSecond) * 1000 +
      (this._width / this._pxPerSecond) * 1000;
    return new Date(timestampMs);
  }

  /**
   * Установка минутных делений
   * @param {number} value кол-во минутных делений
   */
  set minuteDashes(value: number) {
    const t = this.time.getTime();
    this._minuteDashes = value;
    this.calcDimensions();
    this.addSeconds((t - this.time.getTime()) / 1000);
  }

  set speed(value: number) {
    this._speed = value;
  }

  get speed(): number {
    return this._speed;
  }

  set maxAvailableTime(value: number) {
    this._maxAvailableTime = value;
  }

  get maxAvailableTime(): number {
    return this._maxAvailableTime;
  }

  /**
   * Установка ширины канваса
   * @param {number} value ширина канваса
   */
  set canvasWidth(value: number) {
    const t = this.time.getTime();
    this._width = value;
    this._canvas.width = value;
    this.calcDimensions();
    this.addSeconds((t - this.time.getTime()) / 1000);
  }
}

export default Timeline;
