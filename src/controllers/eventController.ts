import { EMouseToggle } from "../models/mouseToggle.model";
import { drawLine } from "../utils/drawLine";

export class EventController {
  event: string;
  eventData: number[];
  x: number;
  y: number;
  robot: any;
  constructor(data: string = "mouse_pos", robot: any) {
    console.log({ data });
    this.event = data.toLocaleString().split(" ")[0];
    this.eventData = data
      .toLocaleString()
      .split(" ")
      .slice(1)
      .map((elem) => +elem);
    this.x = robot.getMousePos().x;
    this.y = robot.getMousePos().y;
    this.robot = robot;
  }
  mouseRight() {
    this.robot.moveMouse(this.x + this.eventData[0], this.y);
  }
  mouseLeft() {
    this.robot.moveMouse(this.x - this.eventData[0], this.y);
  }
  mouseUp() {
    this.robot.moveMouse(this.x, this.y - this.eventData[0]);
  }
  mouseDown() {
    this.robot.moveMouse(this.x, this.y + this.eventData[0]);
  }
  drawCircle() {
    this.robot.mouseClick();
    this.robot.mouseToggle(EMouseToggle.DOWN);
    for (let index = 0; index <= Math.PI * 2; index = index + 0.01) {
      const _x =
        this.x + this.eventData[0] * Math.cos(index) - this.eventData[0];
      const _y = this.y + this.eventData[0] * Math.sin(index);
      this.robot.dragMouse(_x, _y);
    }
    this.robot.mouseToggle(EMouseToggle.UP);
  }
  drawRectangle() {
    this.robot.mouseClick();
    this.robot.mouseToggle(EMouseToggle.DOWN);
    this.robot.dragMouse(this.x, this.y);
    drawLine({ x: this.x, y: this.y }, this.eventData[0], true, true);
    drawLine(
      { x: this.x + this.eventData[0], y: this.y },
      this.eventData[1] || this.eventData[0],
      false,
      true,
    );
    drawLine(
      {
        x: this.x + this.eventData[0],
        y: this.y + this.eventData[1] || this.y + this.eventData[0],
      },
      this.eventData[0],
      true,
      false,
    );
    drawLine(
      {
        x: this.x,
        y: this.y + this.eventData[1] || this.y + this.eventData[0],
      },
      this.eventData[1] || this.eventData[0],
      false,
      false,
    );
    this.robot.mouseToggle(EMouseToggle.UP);
  }
}
