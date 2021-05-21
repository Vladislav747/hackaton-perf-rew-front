import { formatTime } from "../../helpers";
import { DashOptions } from "./types/DashTypes";

import {
  MINUTE_DASH_HEIGHT,
  SECOND_DASH_HEIGHT,
  DASH_TEXT_COLOR,
  FONT,
  DASH_LINE_WIDTH,
  DASH_COLOR,
} from "../../config";
export default class Dash {
  private readonly _x: number;
  private readonly _y: number;
  private readonly _isMinute: boolean;
  private readonly _timestamp: Date | undefined;

  constructor({ x, y, isMinute, timestamp }: DashOptions) {
    this._x = x;
    this._y = y;
    this._isMinute = isMinute;
    this._timestamp = timestamp;
  }

  /**
   * Отрисовка деления
   * @param {CanvasRenderingContext2D} context контекст для отрисовки
   */
  public render(context: CanvasRenderingContext2D): void {
    context.beginPath();

    const now = Date.now();
    const x = this._x;
    const y = this._isMinute
      ? this._y
      : this._y + (MINUTE_DASH_HEIGHT - SECOND_DASH_HEIGHT);
    const height = this._isMinute ? MINUTE_DASH_HEIGHT : SECOND_DASH_HEIGHT;
    // context.strokeStyle = DASH_COLOR;

    //Если метка времени превышает текущее то показываем другой цвет как недоступное поле
    context.strokeStyle =
      //@ts-ignore
      this._timestamp > now ? "#000" : DASH_COLOR;
    context.lineWidth = DASH_LINE_WIDTH;
    context.moveTo(x, y);
    context.lineTo(x, height);
    context.save();
    context.lineWidth = DASH_LINE_WIDTH;
    context.restore();
    context.stroke();
    context.closePath();
    if (this._timestamp && this._isMinute) {
      context.beginPath();
      context.fillStyle = DASH_TEXT_COLOR;
      const formattedTime = formatTime(this._timestamp);
      const textSize = context.measureText(formattedTime);
      const textX = x - textSize.width / 2;
      const textY = y + height + 18;
      context.font = FONT;
      context.fillText(formattedTime, textX, textY);
      context.closePath();
    }
  }
}
