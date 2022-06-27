import { httpServer } from "./src/http_server/index.js";
import robot from "robotjs";
import { WebSocketServer, createWebSocketStream } from "ws";
import { app } from "./src/app.js";

const HTTP_PORT = 3000;
const WSS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WSS_PORT });

wss.on("connection", (ws) => {
  console.log("Connection accepted!");

  const duplex = createWebSocketStream(ws, {
    encoding: "utf8",
    decodeStrings: false,
  });

  duplex.on("readable", async function () {
    let chunk = "";
    let data = "";

    while (null !== (chunk = duplex.read())) {
      data += chunk;
    }
    app(duplex, data, robot);
  });
});
