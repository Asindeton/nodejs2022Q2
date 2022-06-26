import Jimp from "jimp";
import { Duplex } from "stream";
import { EventController } from "./controllers/eventController";
import { EWebsocketCommands } from "./models/websocketCommands";
import { captureImage } from "./utils/captureImage";

export const app = (duplex: Duplex, data: string, robot: any) => {
  const eventController = new EventController(data, robot);
  const { event, x, y } = eventController;
  console.log({ event, x, y });
  if (event == EWebsocketCommands.MOUSE_RIGHT) {
    eventController.mouseRight();
    duplex.write(EWebsocketCommands.MOUSE_RIGHT);
  } else if (event == EWebsocketCommands.MOUSE_LEFT) {
    eventController.mouseLeft();
    duplex.write(EWebsocketCommands.MOUSE_LEFT);
  } else if (event == EWebsocketCommands.MOUSE_UP) {
    eventController.mouseUp();
    duplex.write(EWebsocketCommands.MOUSE_UP);
  } else if (event == EWebsocketCommands.MOUSE_DOWN) {
    eventController.mouseDown();
    duplex.write(EWebsocketCommands.MOUSE_DOWN);
  } else if (event == EWebsocketCommands.MOUSE_POSITION) {
    duplex.write(`${EWebsocketCommands.MOUSE_POSITION} ${x},${y}`);
  } else if (event == EWebsocketCommands.DRAW_CIRCLE) {
    eventController.drawCircle();
    duplex.write(EWebsocketCommands.DRAW_CIRCLE);
  } else if (event == EWebsocketCommands.DRAW_SQUARE) {
    eventController.drawRectangle();
    duplex.write(EWebsocketCommands.DRAW_SQUARE);
  } else if (event == EWebsocketCommands.DRAW_RECTANGLE) {
    eventController.drawRectangle();
    duplex.write(EWebsocketCommands.DRAW_RECTANGLE);
  } else if (event == EWebsocketCommands.PRNT_SCRN) {
    var size = 100;
    const { width, height } = robot.getScreenSize();
    let _x = x - size / 2 < size / 2 ? x : x - size / 2;
    let _y = y - size / 2 < size / 2 ? y : y - size / 2;
    if (_x > width - size) {
      _x = width - size;
    }
    if (_y > height - size) {
      _y = height - size;
    }
    captureImage({
      x: _x,
      y: _y,
      w: size,
      h: size,
    }).getBase64(Jimp.MIME_BMP, (err, res) => {
      duplex.write(EWebsocketCommands.PRNT_SCRN + " " + res.split(",")[1]);
    });
  }
};
