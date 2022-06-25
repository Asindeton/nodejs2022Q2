import Jimp from "jimp";
import { httpServer } from "./src/http_server/index.js";
import robot from "robotjs";
import { WebSocketServer } from "ws";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
const server = httpServer;
server.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Connection accepted!");
  ws.on("message", (data) => {
    const commands = data.toLocaleString().split(" ")[0];
    const commandsData: number = +data.toLocaleString().split(" ")[1];
    const { x, y } = robot.getMousePos();
    console.log(data.toLocaleString());
    if (commands == "mouse_right") {
      robot.moveMouse(x + commandsData, y);
      ws.send(`mouse_right`);
    } else if (commands == "mouse_left") {
      robot.moveMouse(x - commandsData, y);
      ws.send(`mouse_left`);
    } else if (commands == "mouse_up") {
      robot.moveMouse(x, y - commandsData);
      ws.send(`mouse_up`);
    } else if (commands == "mouse_down") {
      robot.moveMouse(x, y + commandsData);
      ws.send(`mouse_down`);
    } else if (commands == "mouse_position") {
      ws.send(`mouse_position ${x},${y}`);
    } else if (commands == "draw_circle") {
      robot.mouseClick();
      robot.mouseToggle("down");
      for (let index = 0; index <= Math.PI * 2; index = index + 0.01) {
        const _x = x + commandsData * Math.cos(index) - commandsData;
        const _y = y + commandsData * Math.sin(index);
        robot.dragMouse(_x, _y);
      }
      robot.mouseToggle("up");
      ws.send(`draw_circle`);
    } else if (commands == "draw_square") {
      robot.mouseClick();
      robot.mouseToggle("down");
      robot.dragMouse(x, y);
      drawLine(robot, { x, y }, commandsData, true, true);
      drawLine(robot, { x: x + commandsData, y }, commandsData, false, true);
      drawLine(
        robot,
        { x: x + commandsData, y: y + commandsData },
        commandsData,
        true,
        false,
      );
      drawLine(robot, { x, y: y + commandsData }, commandsData, false, false);
      robot.mouseToggle("up");

      ws.send(`draw_square`);
    } else if (commands == "draw_rectangle") {
      const commandsAdditionalData: number = +data
        .toLocaleString()
        .split(" ")[2];

      robot.mouseClick();
      robot.mouseToggle("down");
      robot.dragMouse(x, y);
      drawLine(robot, { x, y }, commandsData, true, true);
      drawLine(
        robot,
        { x: x + commandsData, y },
        commandsAdditionalData,
        false,
        true,
      );
      drawLine(
        robot,
        { x: x + commandsData, y: y + commandsAdditionalData },
        commandsData,
        true,
        false,
      );
      drawLine(
        robot,
        { x, y: y + commandsAdditionalData },
        commandsAdditionalData,
        false,
        false,
      );
      robot.mouseToggle("up");

      ws.send(`draw_square`);
    } else if (commands == "prnt_scrn") {
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
      console.log({ _x, _y }, { x, y }, { width, height });
      captureImage({
        x: _x,
        y: _y,
        w: size,
        h: size,
      }).getBase64(Jimp.MIME_BMP, (err, res) => {
        ws.send("prnt_scrn " + res.split(",")[1]);
      });
    }
  });
});
const drawLine = (
  robot: any,
  startPosition: IStartPosition,
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
interface IStartPosition {
  x: number;
  y: number;
}

function captureImage({
  x,
  y,
  w,
  h,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  const pic = robot.screen.capture(x, y, w, h);
  const width = pic.byteWidth / pic.bytesPerPixel; // pic.width is sometimes wrong!
  const height = pic.height;
  const image = new Jimp(width, height);
  let red: number, green: number, blue: number;
  pic.image.forEach((byte: number, i: number) => {
    switch (i % 4) {
      case 0:
        return (blue = byte);
      case 1:
        return (green = byte);
      case 2:
        return (red = byte);
      case 3:
        image.bitmap.data[i - 3] = red;
        image.bitmap.data[i - 2] = green;
        image.bitmap.data[i - 1] = blue;
        image.bitmap.data[i] = 255;
    }
  });
  return image;
}
