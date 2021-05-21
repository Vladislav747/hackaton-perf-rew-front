import RoundedRect from "../shapes/roundedRect/RoundedRect";
import { TooltipOptions } from "./types/TootipTypes";

import {
  TOOLTIP_TEXT_COLOR,
  TOOLTIP_BACKGROUND_COLOR,
  TOOLTIP_EXTRA_PADDING,
  FONT_SIZE,
} from "../../config";

const DefaultTooltipOptions: TooltipOptions = {
  x: -1,
  y: -1,
  text: "",
  visible: false,
};

export default class Tooltip {
  private _x: number;
  private _y: number;
  private _text: string;
  private _visible: boolean;
  private readonly _tooltipRadius: number;
  private readonly _tooltipPadding: number;

  constructor({ x, y, text, visible }: TooltipOptions = DefaultTooltipOptions) {
    this._x = x;
    this._y = y;
    this._text = text;
    this._visible = visible;
    this._tooltipRadius = 4;
    this._tooltipPadding = 4;
  }

  /**
   * Отрисовка подсказки
   * @param {CanvasRenderingContext2D} context контекст для отрисовки
   */
  render(context: CanvasRenderingContext2D): void {
    if (!this._visible) return;
    context.beginPath();
    context.fillStyle = TOOLTIP_BACKGROUND_COLOR;
    const textHeight = FONT_SIZE;
    const textWidth = context.measureText(this._text).width;
    const x = this._x - textWidth / 2;
    const y = this._y + TOOLTIP_EXTRA_PADDING;

    const textX = x + this._tooltipPadding;
    const textY = y + textHeight + this._tooltipPadding / 2;
    new RoundedRect({
      x: x,
      y: y,
      width: textWidth,
      height: textHeight,
      radius: this._tooltipRadius,
      padding: this._tooltipPadding,
    }).createShape(context);
    context.fill();
    context.closePath();

    context.beginPath();
    context.fillStyle = TOOLTIP_TEXT_COLOR;
    context.fillText(this._text, textX, textY);
    context.closePath();
  }

  set y(value: number) {
    this._y = value;
  }
  get y(): number {
    return this._y;
  }

  set x(value: number) {
    this._x = value;
  }
  get x(): number {
    return this._x;
  }

  set text(value: string) {
    this._text = value;
  }

  set visible(value: boolean) {
    this._visible = value;
  }
}
