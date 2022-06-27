import { TPosition } from "./../models/position.model";
import robot from "robotjs";

export const drawLine = (
  startPosition: TPosition,
  length: number,
  isXDrawing: boolean,
  isLeftToRight: boolean,
) => {
  const direction = isLeftToRight ? 1 : -1;
  for (let index = 0; index <= length; index++) {
    robot.dragMouse(
      isXDrawing ? startPosition.x + index * direction : startPosition.x,
      !isXDrawing ? startPosition.y + index * direction : startPosition.y,
    );
  }
};
